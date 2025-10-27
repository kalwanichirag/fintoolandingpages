"use client"
import styles from "./style.module.css";

// import TaxData from "./TaxData.json";
import { getUserId } from "@/app/common_utilities";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import UserVerification from "./UserVerification";
import ThankyouSection from "../ThankyouSection";
import { useDispatch, useSelector } from "react-redux";
import commonEncode from "@/app/commonEncode";

function VerificationSection({
  isWP,
  eventCode,
  eventUrl,
  serviceName,
  planId,
  extraParams,
  logo,
  addIncomSlabAndComment,
  currAppointmentView,       // coming from parent
  setCurrAppointmentView     // coming from parent
}) {

  const loggedIn = useSelector((state) => state.loggedIn);
  const [show, SetShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    SetShow(false);
    // Use parent state setter
    Boolean(loggedIn) === false
      ? setCurrAppointmentView('VERIFICATION')
      : handleLoggedInCase();

    dispatch({
      type: "SET_LEAD_DATA",
      payload: {
        fullname: "",
        mobile: "",
        email: ""
      }
    });
  }

  const handleLoggedInCase = () => {
    setTimeout(() => {
      assignUserData();
    }, 2000);
  }

  const assignUserData = () => {
    const userid = getUserId();

    let member = JSON.parse(commonEncode.decrypt(localStorage.getItem("member")));
    let users = JSON.parse(commonEncode.decrypt(localStorage.getItem("allMemberUser")));

    const membertUserData = member.filter(data => data.id == userid)[0];
    const currentUserData = users.filter(data => data.id == userid)[0];

    console.log('currentUserData', currentUserData);

    dispatch({
      type: "SET_LEAD_DATA",
      payload: {
        fullname: membertUserData?.name,
        mobile: currentUserData?.mobile,
        email: currentUserData?.email
      }
    });

    // Update parent state to show Calendly
    setCurrAppointmentView('CALENDLY');
  }

  useEffect(() => {
    Boolean(loggedIn) === false
      ? setCurrAppointmentView('VERIFICATION')
      : handleLoggedInCase();
  }, [loggedIn, setCurrAppointmentView]);

  return (
    <>
      {currAppointmentView === 'VERIFICATION' && (
        <UserVerification logo={logo} setCurrAppointmentView={setCurrAppointmentView} />
      )}

      {currAppointmentView === 'CALENDLY' && (
        <div className={`${styles["appointment-section-iframe"]}`}>
          <div
            className="calendly-inline-widget"
            style={{
              width: "100%",
            }}
          >
            <Calendar
              isWP={isWP}
              extraParams={extraParams}
              eventCode={eventCode}
              url={eventUrl}
              serviceName={serviceName}
              planId={planId}
              SetShow={SetShow}
              addIncomSlabAndComment={addIncomSlabAndComment}
            />
          </div>
        </div>
      )}

      {show && <ThankyouSection onClose={handleClose} />}
    </>
  );
}

export default VerificationSection;
