import styles from "./style.module.css";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
// import TaxData from "./TaxData.json";
import { fetchData, getUserId } from "../../app/common_utilities";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import UserVerification from "./UserVerification";
import ThankyouSection from "../ThankyouSection";
import commonEncode from "../../app/commonEncode";

function VerificationSection({ 
    isWP, 
    eventCode, 
    eventUrl, 
    serviceName, 
    planId, 
    extraParams, 
    logo, 
    addIncomSlabAndComment, 
    loggedInProp = false,
    leadData, 
    setLeadData,
    currAppointmentView,
    setCurrAppointmentView
}) {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setCurrAppointmentView(loggedInProp ? 'CALENDLY' : 'VERIFICATION');

        setLeadData({
            fullname: "",
            mobile: "",
            email: ""
        });
    }

    const handleLoggedInCase = () => {
        setTimeout(() => {
            assignUserData()
        }, 2000)
    }

    const assignUserData = () => {
        const userid = getUserId();

        let member = JSON.parse(commonEncode.decrypt(localStorage.getItem("member")));
        let users = JSON.parse(commonEncode.decrypt(localStorage.getItem("allMemberUser")));

        const memberUserData = member.filter(data => data.id == userid)[0];
        const currentUserData = users.filter(data => data.id == userid)[0];

        setLeadData({
            fullname: memberUserData?.name,
            mobile: currentUserData?.mobile,
            email: currentUserData?.email
        });

        setCurrAppointmentView('CALENDLY');
    }

    useEffect(() => {
        loggedInProp ? handleLoggedInCase() : setCurrAppointmentView('VERIFICATION');
    }, [loggedInProp]);

    return (
        <>
            {currAppointmentView === 'VERIFICATION' && 
                <UserVerification 
                    logo={logo} 
                    setCurrAppointmentView={setCurrAppointmentView} 
                />
            }

            {currAppointmentView === 'CALENDLY' && 
                <div className={`${styles["appointment-section-iframe"]}`}>
                    <div className="calendly-inline-widget" style={{ width: "100%" }}>
                        <Calendar 
                            isWP={isWP} 
                            extraParams={extraParams} 
                            eventCode={eventCode} 
                            url={eventUrl} 
                            serviceName={serviceName} 
                            planId={planId} 
                            SetShow={setShow} 
                            addIncomSlabAndComment={addIncomSlabAndComment} 
                        />
                    </div>
                </div>
            }

            {show && <ThankyouSection onClose={handleClose} />}
        </>
    );
}

export default VerificationSection;
