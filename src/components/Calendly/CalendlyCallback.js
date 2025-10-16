import { fetchData, getItemLocal } from "../../app/common_utilities";
import { BASE_API_URL } from "../../app/constants";
import { apiCall } from "../../app/common_utilities";
import { useEffect } from "react";

const CalendlyCallback = () => {

  const incomeSlabAnswers = ['$60K to $100K', '$100K to $500K', '$500K & Above'];
  const incomeSlabAnswersuae = ['0 to 45k AED', '45k to 155k AED', '155k to 222k AED', '222k to 444k AED', 'Above 444K AED'];
  const incomeSlabAnswerslandingPage = ['0 to 10 Lac', '10 Lac to 25 Lac', '25 Lac to 50 Lac', '50 Lac to 1 Crore', 'Above 1 Crore'];
  const incomeSlabAnswerswealthmanagementlandingPage = ['0 to 25K AED', '25K to 50 AED', '50K AED & Above'];
  const incomeSlabAnswerspersonalfinancepage = ['0 to 25K AED', '25K to 50K AED', '50K AED & Above'];

  const onLoad = async () => {
    try {
      let eventURL = localStorage.getItem("eventURL");
      let eventType = localStorage.getItem("eventType");
      let serviceName = localStorage.getItem("serviceName");
      let extraParams = localStorage.getItem("extraParams") == null ? {} : JSON.parse(localStorage.getItem("extraParams"));
      localStorage.removeItem("eventURL");
      localStorage.removeItem("eventType");
      localStorage.removeItem("serviceName");
      localStorage.removeItem("extraParams");

      localStorage.removeItem("email");
      localStorage.removeItem("fullname");
      localStorage.removeItem("mobile");
      localStorage.removeItem("itr-page");

      if (eventURL == null) return;

      if (eventType == null) {
        eventType = "Callback_mintyApp_8";
      }
      if (serviceName == null) {
        serviceName = "Financial Planning";
      }
      // Check if the page URL is "web/wealth-management"
      const isWealthManagementPage = window.location.pathname.indexOf("web/wealth-management") > -1;

      const incomeQuestion = isWealthManagementPage ? "Monthly Income" : "Income Slab";

      const r = await fetchData({
        url: eventURL,
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQ4MjExMjQ0LCJqdGkiOiJmMmM1YWIwOC01N2ZiLTQ0YzAtODNjYy1lM2QxZWZhZGY2YzMiLCJ1c2VyX3V1aWQiOiI0ODVhZTAyZC02ZGNiLTQ1MjktODdiYi01MGY2NDE3NGI4ZWYifQ.5bIIwHH3DTn1Vp7Oj6hZlLkVIbI1q7jxqFogGaGkb1g",
        },
      });

      console.log("sdfr------->", r.resource);
      console.log("sdfr------->", r.resource['questions_and_answers'][1]['answer']);


      const mobileArr = r.resource.questions_and_answers.filter(
        (v) => v.question.toLowerCase().indexOf("mobile") > -1
      );
      if (mobileArr.length > 0) {
        console.log('mobileArr', mobileArr);
        var mobile = mobileArr[0]["answer"].replace(/[^0-9]/g, "");
        mobile = mobile.substring(mobile.length - 10, mobile.length);

        let payload = {
          method: "POST",
          url: process.env.REACT_APP_CONTACT_FORM,
          data: {
            fullname: r.resource.name,
            email: r.resource.email,
            tagval: "",
            servicename: serviceName,
            tags: eventType,
            utm_source: "26",
            mobile: "" + mobile,
            skip_sms: "",
            rm_id: "96",
            status: "Introductory meet",
            ...extraParams
          },
        };

        // add custom params if any
        const incomeSlab = r.resource.questions_and_answers.filter(
          (v) => v.question.toLowerCase().includes("monthly income") || v.question.toLowerCase().includes("income slab")
        );

        // console.log('sdf incomeSlab', incomeSlab, incomeQuestion.toLowerCase());
        if (incomeSlab.length > 0) {
          payload.data.incomeslab = incomeSlabAnswers.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
          if (payload.data.incomeslab == 0) {
            payload.data.incomeslab = incomeSlabAnswerslandingPage.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;

          }
          if (payload.data.incomeslab == 0) {
            payload.data.incomeslab = incomeSlabAnswersuae.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;

          }
          if (payload.data.incomeslab == 0) {
            payload.data.incomeslab = incomeSlabAnswerswealthmanagementlandingPage.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
          }
          if (payload.data.incomeslab == 0) {
            payload.data.incomeslab = incomeSlabAnswerspersonalfinancepage.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
          }
        }
        console.log("sdf shubham yyyy =====>>>>> ", payload.data.incomeslab)
        // end
        console.log('nil rt', payload);
        console.log("nil m--------->123");
        const r1 = await fetchData(payload);
        console.log("nil rr----->", r1);
      }
    } catch (e) { }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (<></>);
};
export default CalendlyCallback;

// ================================================================================================================================================================

export const calendlyCallbackFun = async (scheduleData, addIncomSlabAndComment) => {

  const urlParams = new URLSearchParams(window.location.search);
  let utm_source_value = urlParams.get("utm_source");
  let tags_value = urlParams.get("tags");
  if (utm_source_value) {
    utm_source_value = utm_source_value + ''
  }
  if (tags_value) {
    tags_value = tags_value + ''
  }

  console.log("scheduleData", scheduleData, addIncomSlabAndComment)

  // const url_string = window.location.href;
  // const construvtedUrl = new URL(url_string);
  // const utm_source_value = construvtedUrl.searchParams.get("utm_source");

  const incomeSlabAnswers = ['$60K to $100K', '$100K to $500K', '$500K & Above'];
  const incomeSlabAnswersuae = ['0 to 45k AED', '45k to 155k AED', '155k to 222k AED', '222k to 444k AED', 'Above 444K AED'];
  const incomeSlabAnswerslandingPage = ['0 to 10 Lac', '10 Lac to 25 Lac', '25 Lac to 50 Lac', '50 Lac to 1 Crore', 'Above 1 Crore'];
  const incomeSlabAnswerswealthmanagementlandingPage = ['0 to 25K AED', '25K to 50 AED', '50K AED & Above'];
  const incomeSlabAnswerspersonalfinancepage = ['0 to 25K AED', '25K to 50K AED', '50K AED & Above'];
  const incomeSlabAnswersITRPage = ['0 to 10 Lakhs', '10 to 25 Lakhs', '25 to 50 Lakhs', '50 Lakhs to 1 Crore', '1 Crore and Above'];
  try {
    let isWP = scheduleData.isWP;
    let eventURL = scheduleData.eventURL;
    let eventURL2 = scheduleData.eventURL2;
    let eventType = scheduleData.eventType;
    let serviceName = scheduleData.serviceName;
    let planId = scheduleData.planId;
    let extraParams = scheduleData.extraParams == null ? {} : scheduleData.extraParams;

    let email = scheduleData.email;
    let fullname = scheduleData.fullname;
    let mobileNumber = scheduleData.mobileNumber;

    if (eventURL == null) return;

    if (eventType == null) {
      eventType = "Callback_mintyApp_8";
    }
    if (serviceName == null) {
      serviceName = "Financial Planning";
    }
    // Check if the page URL is "web/wealth-management"
    const isWealthManagementPage = window.location.pathname.indexOf("web/wealth-management") > -1;

    const incomeQuestion = isWealthManagementPage ? "Monthly Income" : "Income Slab";

    const r = await fetchData({
      url: eventURL,
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQ4MjExMjQ0LCJqdGkiOiJmMmM1YWIwOC01N2ZiLTQ0YzAtODNjYy1lM2QxZWZhZGY2YzMiLCJ1c2VyX3V1aWQiOiI0ODVhZTAyZC02ZGNiLTQ1MjktODdiYi01MGY2NDE3NGI4ZWYifQ.5bIIwHH3DTn1Vp7Oj6hZlLkVIbI1q7jxqFogGaGkb1g",
      },
    });

    const inviteeDetails = r.resource;

    let payload;

    if (isWP) {

      const incomeSlabArr = r.resource.questions_and_answers.filter(
        (v) => v.question.toLowerCase().indexOf(incomeQuestion.toLowerCase()) > -1
      );

      console.log('incomeSlabArrllkkllll', incomeSlabArr, incomeSlabArr[0]?.position)

      const getIncomSlabNo = (slabTxt) => {
        switch (slabTxt) {
          case '0 to 10 Lacs':
            return 1
          case '10 to 25 Lacs':
            return 2
          case '25 to 50 Lacs':
            return 3
          case '50 to 1 Cr':
            return 4
          case 'Above 1 Crore':
            return 5
          default:
            return 1
        }
      }

      const getDefaultTag = (service) => {
        switch (service + '') {
          case '100':
            return 'reg_fp'
          case '26':
            return 'reg_wm'
          default:
            return 'reg_fp'
        }
      }

      payload = {
        method: "POST",
        url: process.env.REACT_APP_CONTACT_FORM,
        data: {
          fullname: fullname ? fullname : r.resource.name,
          email: email ? email : r.resource.email,
          // tagval: eventType,
          tagval: extraParams.service ? 'Callback_mintyApp_' + extraParams.service : getDefaultTag(extraParams.service),
          service: extraParams.service,
          servicename: extraParams.plan_name ?? serviceName,
          tags: tags_value ? tags_value : getDefaultTag(extraParams.service),
          utm_source: utm_source_value ? utm_source_value : "26",
          mobile: mobileNumber ? mobileNumber : "",
          skip_sms: "",
          rm_id: "96",
          status: "Introductory meet",
          incomeslab: incomeSlabArr ? getIncomSlabNo(incomeSlabArr[0]?.answer ?? '') : 1
          // incomeslab: 0
        },

      };
    } else {
      payload = {
        method: "POST",
        url: process.env.REACT_APP_CONTACT_FORM,
        data: {
          fullname: fullname ? fullname : r.resource.name,
          email: email ? email : r.resource.email,
          tagval: "",
          servicename: serviceName,
          tags: eventType,
          utm_source: utm_source_value ? utm_source_value : "26",
          mobile: mobileNumber ? mobileNumber : "",
          skip_sms: "",
          rm_id: "96",
          status: "Introductory meet",
          ...extraParams
        },

      };
    }

    const incomeSlab = r.resource.questions_and_answers.filter(
      (v) => v.question.toLowerCase().indexOf(incomeQuestion.toLowerCase()) > -1
    );

    console.log('incomeSlab in calendly callback', incomeSlab, payload.data.incomeslab)

    if (incomeSlab.length > 0) {
      if (!isWP) {
        payload.data.incomeslab = incomeSlabAnswers.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
        if (payload.data.incomeslab == 0) {
          payload.data.incomeslab = incomeSlabAnswerslandingPage.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
        }

        if (payload.data.incomeslab == 0) {
          payload.data.incomeslab = incomeSlabAnswersITRPage.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
        }

        if (payload.data.incomeslab == 0) {
          payload.data.incomeslab = incomeSlabAnswersuae.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;

        }
        if (payload.data.incomeslab == 0) {
          payload.data.incomeslab = incomeSlabAnswerswealthmanagementlandingPage.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
        }
        if (payload.data.incomeslab == 0) {
          payload.data.incomeslab = incomeSlabAnswerspersonalfinancepage.indexOf(incomeSlab[0]['answer'].split(" ").filter(v => v).join(" ")) + 1;
        }
      }
    }

    if (addIncomSlabAndComment) {
      if (!isWP) {
        payload.data.portfolio_slab = r.resource.questions_and_answers[2]

        if (r.resource.questions_and_answers[1]?.answer == "0  to 10  Lakhs" || r.resource.questions_and_answers[1]?.answer == "0-10 LPA") {
          payload.data.portfolio_slab = 1;
        }
        if (r.resource.questions_and_answers[1]?.answer == "10 Lakhs to 25 Lakhs" || r.resource.questions_and_answers[1]?.answer == "10-25 LPA") {
          payload.data.portfolio_slab = 2;
        }
        if (r.resource.questions_and_answers[1]?.answer == "25 Lakhs to 50 Lakhs" || r.resource.questions_and_answers[1]?.answer == "25-50 LPA") {
          payload.data.portfolio_slab = 3;
        }
        if (r.resource.questions_and_answers[1]?.answer == "50 Lakhs to 1 Crore" || r.resource.questions_and_answers[1]?.answer == "50 Lacs - 1 Crore PA") {
          payload.data.portfolio_slab = 4;
        }
        if (r.resource.questions_and_answers[1]?.answer == "Above 1 Crore" || r.resource.questions_and_answers[1]?.answer == "More than 1 Crore PA") {
          payload.data.portfolio_slab = 5;
        }

        payload.data.comment = r.resource.questions_and_answers[1]?.answer ?? "";

        console.log(" payload.data.comment", r.resource.questions_and_answers[0])
      }
    }


    if (!scheduleData.loggedIn) {
      const user_register_payload = {
        "fullname": fullname ? fullname : r.resource.name,
        "mobile": mobileNumber ? mobileNumber : "",
        "email": email ? email : r.resource.email,
        "country_code": "91",
        "tags": "fin_web_reg",
        "utm_source": 27,
        "service": "98",
        "skip_mail": "1",
        "rm_id": "96",
        "react": "1",
        "plan_id": "",
        "is_expert": "1"
      }

      await apiCall(
        BASE_API_URL + "restapi/UserRegisterApi/",
        user_register_payload,
        false,
        false
      );
    }

    const r1 = await fetchData(payload);

    if (r1.error_code == "0") {

      if (isWP) {
        conversionFun('AW-948765509', 'xQivCMC_6cADEMWGtMQD');
      }

      const r = await fetchData({
        url: eventURL2,
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQ4MjExMjQ0LCJqdGkiOiJmMmM1YWIwOC01N2ZiLTQ0YzAtODNjYy1lM2QxZWZhZGY2YzMiLCJ1c2VyX3V1aWQiOiI0ODVhZTAyZC02ZGNiLTQ1MjktODdiYi01MGY2NDE3NGI4ZWYifQ.5bIIwHH3DTn1Vp7Oj6hZlLkVIbI1q7jxqFogGaGkb1g",
        },
      });

      // ======================================= web engage ====================================================

      // for userItrData

      const userItrData = getItemLocal('itrUserData')

      function transformGuestEmails(data) {
        const guests = {};
        data.forEach((item, index) => {
          guests[`guest${index + 1}`] = item.email || null;
        });

        return [guests];

      }

      function convertTo12Hour(time24) {
        const [hourStr, minute] = time24.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12;
        if (hour === 0) hour = 12; // handle midnight/noon edge cases
        return `${hour}:${minute} ${ampm}`;
      }

      const time = new Date(r.resource.start_time).toTimeString().split(' ')[0];
      // const time = new Date(r.resource.start_time).toLocaleTimeString('en-US', {
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   hour12: false
      // });

      //   {
      //     "user_id": 259542,
      //     "pan": "ABWPW3054L",
      //     "dob": "2007-08-05",
      //     "mobile": "6000000030",
      //     "email": "testitr25@yopmail.com",
      //     "name": "testitr",
      //     "last_name": "testitr",
      //     "gender": "male",
      //     "bse_reg": "N"
      // }
      const callbackEventData = {
        "lead_id": r1.data.log_id,
        "name": fullname ? fullname : r.resource.name,
        "email": email ? email : r.resource.email,
        "guest_emails": transformGuestEmails(r.resource.event_guests),
        "phone": mobileNumber ? mobileNumber : "",
        "asset_size": inviteeDetails?.questions_and_answers[1]?.answer ?? '',
        "text_pone": mobileNumber ? mobileNumber : "",
        // "date_selected": new Date(r.resource.start_time).toISOString().slice(0, 10) ?? '',
        "date_selected": new Date(r.resource.start_time),
        // "time_selected": convertTo12Hour(time) ?? '',
        // "time_selected": time ?? '',
        "time_selected": new Date(r.resource.start_time),
        "timezone": inviteeDetails?.timezone ?? '',
        "continent": inviteeDetails?.timezone ?? '',
        "page_url": window.location.href ?? '',
        "utm_source": utm_source_value ? utm_source_value : 27 + '',

        // if itr Page - then pass this keys
        'dob': userItrData?.dob ?? '',
        'gender': userItrData?.gender ?? '',
        'pan card': userItrData?.pan ? true : false,
        'Service': "ITR",
      }


      const callbackITREventData = {
        "lead_id": r1.data.log_id,
        "name": fullname ? fullname : r.resource.name,
        "email": email ? email : r.resource.email,
        "guest_emails": transformGuestEmails(r.resource.event_guests),
        "phone": mobileNumber ? mobileNumber : "",
        "asset_size": inviteeDetails?.questions_and_answers[1]?.answer ?? '',
        "text_pone": mobileNumber ? mobileNumber : "",
        // "date_selected": new Date(r.resource.start_time).toISOString().slice(0, 10) ?? '',
        "date_selected": new Date(r.resource.start_time),
        // "time_selected": convertTo12Hour(time) ?? '',
        // "time_selected": time ?? '',
        "time_selected": new Date(r.resource.start_time),
        "timezone": inviteeDetails?.timezone ?? '',
        "continent": inviteeDetails?.timezone ?? '',
        "page_url": window.location.href ?? '',
        "utm_source": utm_source_value ? utm_source_value : 27 + '',
        'dob': userItrData?.dob ?? '',
        'gender': userItrData?.gender ?? '',
        'pan card': userItrData?.pan ? true : false,
        'Service': "ITR",
      }


      console.log('callbackEventDatadattaa', callbackEventData)

      webengage.user.login(r1.data.u_id);

      webengage.user.setAttribute('we_first_name', fullname ? fullname : r.resource.name);
      webengage.user.setAttribute('we_email', email ? email : r.resource.email);
      webengage.user.setAttribute('we_phone', mobileNumber ? mobileNumber : "");
      // webengage.user.setAttribute('we_Application', 100);
      webengage.user.setAttribute('PortfolioSlab', "");
      webengage.user.setAttribute('IncomeSlab', inviteeDetails?.questions_and_answers[1]?.answer ?? '');
      webengage.user.setAttribute('LeadDate', new Date());
      webengage.user.setAttribute('LeadStatus', "Introductory meet");
      webengage.user.setAttribute('Tag', eventType);
      webengage.user.setAttribute('we_email_opt_in', true); //Email
      webengage.user.setAttribute('we_sms_opt_in', true); //SMS

      const checked = JSON.parse(localStorage.getItem('subscribenotificationsChecked'));
      webengage.user.setAttribute('we_whatsapp_opt_in', checked); //WhatsApp
      localStorage.removeItem('subscribenotificationsChecked');

      webengage.track("appointment scheduled", callbackEventData);

      console.log("scheduleData.itrPag", scheduleData.itrPage)

      if(scheduleData.itrPage){
        webengage.track("appointment scheduled", callbackITREventData);
      }

      console.log('webengage event trigger - appointment scheduled', callbackEventData)

      // ======================================= web engage ====================================================

      console.log("r.resource.location", r.resource)

      const appointmentScheduledData = {
        date: (new Date(r.resource.start_time)).toLocaleDateString('en-ca'),
        time: ((new Date(r.resource.start_time)).toLocaleTimeString('en-US', { hour12: false })),
        // meeting_link: r.resource.location.join_url,
        meeting_link: '',
        appointment_uri: r.resource.uri,
        income_slab: payload.data.incomeslab
      }

      const payload_data = {
        "user_id": Number(r1.data.u_id),
        "plan_id": Number(planId),
        "expert_id": 96,
        // "appointment_status":1,
        "date": appointmentScheduledData.date,
        "time": appointmentScheduledData.time,
        "meeting_link": appointmentScheduledData.meeting_link,
        "latest_appointment_uri": appointmentScheduledData.appointment_uri,
        "income_slab": appointmentScheduledData.income_slab
      }
      // await apiCall(
      //   BASE_API_URL + "restapi/appointment/createappointment/",
      //   payload_data,
      //   false,
      //   false
      // );

      // For ITR Related Changes

      if (!scheduleData.itrPage) {
        await apiCall(
          BASE_API_URL + "restapi/appointment/createappointment/",
          payload_data,
          false,
          false
        );
      }


    }
  } catch (e) { }
};

