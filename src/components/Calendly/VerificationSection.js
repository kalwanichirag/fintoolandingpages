"use client";
import styles from "./style.module.css";
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
  currAppointmentView,
  setCurrAppointmentView,
}) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);
  const [show, setShow] = useState(false);

  // ✅ reset form and handle close
  const handleClose = () => {
    setShow(false);

    if (!loggedIn) {
      setCurrAppointmentView("VERIFICATION");
    } else {
      handleLoggedInCase();
    }

    dispatch({
      type: "SET_LEAD_DATA",
      payload: { fullname: "", mobile: "", email: "" },
    });
  };

  const handleLoggedInCase = () => {
    setTimeout(assignUserData, 500);
  };

  const assignUserData = () => {
    try {
      const userid = getUserId();
      const member = JSON.parse(commonEncode.decrypt(localStorage.getItem("member"))) || [];
      const users = JSON.parse(commonEncode.decrypt(localStorage.getItem("allMemberUser"))) || [];

      const memberData = member.find((data) => data.id == userid);
      const currentUser = users.find((data) => data.id == userid);

      if (!memberData || !currentUser) return;

      dispatch({
        type: "SET_LEAD_DATA",
        payload: {
          fullname: memberData?.name || "",
          mobile: currentUser?.mobile || "",
          email: currentUser?.email || "",
        },
      });

      setCurrAppointmentView("CALENDLY");
    } catch (err) {
      console.error("Error assigning user data", err);
    }
  };

  // ✅ React to login change
  useEffect(() => {
    if (!loggedIn) {
      setCurrAppointmentView("VERIFICATION");
    } else {
      setCurrAppointmentView("CALENDLY");
    }
  }, [loggedIn]);

  return (
    <>
      {currAppointmentView === "VERIFICATION" && (
        <UserVerification logo={logo} setCurrAppointmentView={setCurrAppointmentView} />
      )}

      {currAppointmentView === "CALENDLY" && (
        <div className={styles["appointment-section-iframe"]}>
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
      )}

      {show && <ThankyouSection onClose={handleClose} />}
    </>
  );
}

export default VerificationSection;
