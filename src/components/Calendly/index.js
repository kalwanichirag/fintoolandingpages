import styles from "./style.module.css";
import commonStyles from "../../components/Layouts/Fullpage/style.module.css";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
// import TaxData from "./TaxData.json";
import { fetchData, getUserId } from "../../app/common_utilities";
import { useEffect, useState } from "react";

import commonEncode from "../../app/commonEncode";
import VerificationSection from "./VerificationSection";

function AppointmentBox({ eventCode, eventUrl, serviceName, planId, extraParams, loggedInProp = false }) {

  // Replace Redux loggedIn with prop or local state
  const [loggedIn, setLoggedIn] = useState(loggedInProp);
  const [currAppointmentView, setCurrAppointmentView] = useState('VERIFICATION');
  const [show, setShow] = useState(false);

  // Lead data state (replacing Redux)
  const [leadData, setLeadData] = useState({
    fullname: "",
    mobile: "",
    email: ""
  });

  const handleClose = () => {
    setShow(false);
    setCurrAppointmentView(loggedIn ? 'CALENDLY' : 'VERIFICATION');

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
    const currentUserData = users.filter(data => data.id == userid)[0]

    console.log('currentUserData', currentUserData)

    setLeadData({
      fullname: memberUserData?.name,
      mobile: currentUserData?.mobile,
      email: currentUserData?.email
    });

    setCurrAppointmentView('CALENDLY');
  }

  useEffect(() => {
    loggedIn ? handleLoggedInCase() : setCurrAppointmentView('VERIFICATION');
  }, [loggedIn])

  return (
    <>
      <section
        id="appointment-section"
        className={`${styles["appointment-section"]} ${commonStyles["padding-class"]}`}
      >
        <p className={`text-center ${styles.SectionTitle}`}>GOT QUESTIONS? LET'S TALK!</p>
        <div className={`${styles["appointment-section-container"]}`}>
          <div className={`pe-3 text-center ${styles["appointment-section-text"]}`}>
            Schedule a Call with Our Financial Advisor and Get Expert Insights Today!
          </div>
          <div>
            <VerificationSection 
              eventCode={eventCode} 
              eventUrl={eventUrl} 
              serviceName={serviceName} 
              planId={planId} 
              extraParams={extraParams} 
              leadData={leadData} 
              setLeadData={setLeadData} 
              currAppointmentView={currAppointmentView} 
              setCurrAppointmentView={setCurrAppointmentView} 
            />
          </div>
        </div>
        <br />
      </section>
    </>
  );
}

export default AppointmentBox;
