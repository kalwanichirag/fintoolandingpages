"use client"
import styles from "./style.module.css";
import commonStyles from "../Layouts/Fullpage/style.module.css";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
// import TaxData from "./TaxData.json";
import { getUserId } from "@/app/common_utilities";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import commonEncode from "@/app/commonEncode";
import VerificationSection from "./VerificationSection";

function AppointmentBox({ eventCode, eventUrl, serviceName, planId, extraParams }) {

  const loggedIn = useSelector((state) => state.loggedIn);

  const [currAppointmentView, setCurrAppointmentView] = useState('VERIFICATION');
  const [show, SetShow] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    SetShow(false);
    Boolean(loggedIn) == false ? setCurrAppointmentView('VERIFICATION') : setCurrAppointmentView('CALENDLY');

    dispatch({
      type: "SET_LEAD_DATA", payload: {
        fullname: "",
        mobile: "",
        email: ""
      }
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

    const membertUserData = member.filter(data => data.id == userid)[0];
    const currentUserData = users.filter(data => data.id == userid)[0]

    console.log('currentUserDatacurrentUserData', currentUserData)

    dispatch({
      type: "SET_LEAD_DATA", payload: {
        fullname: membertUserData?.name,
        mobile: currentUserData?.mobile,
        email: currentUserData?.email
      }
    });

    setCurrAppointmentView('CALENDLY');
  }

  useEffect(() => {
    Boolean(loggedIn) == false ? setCurrAppointmentView('VERIFICATION') : handleLoggedInCase();
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
            <VerificationSection eventCode={eventCode} eventUrl={eventUrl} serviceName={serviceName} planId={planId} extraParams={extraParams}  currAppointmentView={currAppointmentView}      // pass state
  setCurrAppointmentView={setCurrAppointmentView}/>
          </div>
        </div>
        <br />
      </section>
    </>
  );
}

export default AppointmentBox;
