"use client"
import { useEffect, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useSelector } from "react-redux";
import { calendlyCallbackFun } from "../CalendlyCallback";
import { fetchData } from "@/app/common_utilities";

const Calendar = ({ isWP, eventCode, url, serviceName, planId, extraParams = {}, SetShow, calendlyCallbackFunMFSnippet, addIncomSlabAndComment, itrPage, useritrdata }) => {

  console.log("addIncomSlabAndComment",planId, addIncomSlabAndComment)

  const leadData = useSelector(
    (state) => state.leadData
  );

  console.log("leadData",useritrdata)


  const loggedIn = useSelector((state) => state.loggedIn);

  const [prefillState, setPrefillState] = useState({
    email: '',
    name: '',
    location: '',
    customAnswers: {
      a2: '',
    },
  })

  useCalendlyEventListener({

    onEventScheduled: async (e) => {
      if (calendlyCallbackFunMFSnippet) {

        const r = await fetchData({
          url: e.data.payload.invitee.uri,
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQ4MjExMjQ0LCJqdGkiOiJmMmM1YWIwOC01N2ZiLTQ0YzAtODNjYy1lM2QxZWZhZGY2YzMiLCJ1c2VyX3V1aWQiOiI0ODVhZTAyZC02ZGNiLTQ1MjktODdiYi01MGY2NDE3NGI4ZWYifQ.5bIIwHH3DTn1Vp7Oj6hZlLkVIbI1q7jxqFogGaGkb1g",
          },
        });

        calendlyCallbackFunMFSnippet(r.resource.name, r.resource.email, r.resource.questions_and_answers[0].answer)
      } else {
        const r = await fetchData({
          url: e.data.payload.invitee.uri,
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQ4MjExMjQ0LCJqdGkiOiJmMmM1YWIwOC01N2ZiLTQ0YzAtODNjYy1lM2QxZWZhZGY2YzMiLCJ1c2VyX3V1aWQiOiI0ODVhZTAyZC02ZGNiLTQ1MjktODdiYi01MGY2NDE3NGI4ZWYifQ.5bIIwHH3DTn1Vp7Oj6hZlLkVIbI1q7jxqFogGaGkb1g",
          },
        });
        const mobileAnswer = r.resource.questions_and_answers.find(
          (q) => q.question === "Mobile Number"
        )?.answer;
        
        console.log("mobileAnswer", mobileAnswer);
    
        
        calendlyCallbackFun({
          isWP: isWP,
          eventURL: e.data.payload.invitee.uri,
          eventURL2: e.data.payload.event.uri,
          eventType: eventCode,
          serviceName: serviceName,
          extraParams: extraParams,
          planId: planId,
          email: leadData.email,
          fullname:  leadData.fullname,
          mobileNumber: itrPage ? mobileAnswer : leadData.mobile,
          loggedIn: loggedIn,
          itrPage
        }, addIncomSlabAndComment);
      }

      SetShow(true)
    },
  });

  // useEffect(() => {
  //   setPrefillState(prev => ({
  //     ...prev, email: leadData.email, name: leadData.fullname, location: leadData.mobile,
  //     customAnswers: {
  //       ...prev.customAnswers, a2: '+91' + leadData.mobile
  //     }
  //   }))
  // }, [leadData])

  useEffect(() => {
    const isITRPage = window?.location?.pathname === "/web/itr-Appointment";
    console.log("isITRPage", isITRPage)
  
    if (isITRPage) {
      setPrefillState(prev => ({
        ...prev,
        email: useritrdata.email,
        name: `${useritrdata.first_name} ${useritrdata.last_name}`,
        location: useritrdata.mobile,
        customAnswers: {
          ...prev.customAnswers,
          a2: '+91' + useritrdata.mobile
        }
      }));
    } else {
      setPrefillState(prev => ({
        ...prev,
        email: leadData.email,
        name: leadData.fullname,
        location: leadData.mobile,
        customAnswers: {
          ...prev.customAnswers,
          a2: '+91' + leadData.mobile
        }
      }));
    }
  }, [leadData, useritrdata]);
  

  return (
    <>
      <InlineWidget url={url} prefill={prefillState} />
    </>
  );
};
export default Calendar;
