"use client"
import React, { useEffect, useState } from "react";
import DirectMFHeaderSection from "../../components/HTML/DirectMF/DirectMFHeaderSection";

import FeaturesSection from "../../components/HTML/DirectMF/FeaturesSection";
import StatsSection from "../../components/HTML/DirectMF/StatsSection";
import FaqSection from "../../components/HTML/DirectMF/FaqSection";
import Fullpage from "../../components/Layouts/Fullpage";
import ThankyouSection from "../../components/ThankyouSection";
import AppointmentBox from "../../components/Calendly";
import ClientTestimonial from "../../components/HTML/ClientTestimonial";
import Cookies from 'js-cookie'
function DirectMF() {
  const [show, SetShow] = useState(false);

  const [pageurl, setPageurl] = React.useState();
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);
    useEffect(() => {
        if (typeof window === "undefined") return; // ✅ Prevent SSR crash

    function extractParametersFromURL() {
      // const urlSearchParams = new URLSearchParams(new URL(url).search);
      const urlSearchParams = new URLSearchParams(window.location.search);
      const utmSourceParam = urlSearchParams.get("utm_source");
      const tagvalParam = urlSearchParams.get("tags");

      if (utmSourceParam || tagvalParam) {
        setUtmSource(utmSourceParam);
        setTagval(tagvalParam);
        setPageurl(window.location.pathname);
        const cookieOptions = { expires: 0.0208 };
        // const cookieOptions = { expires: 0.00139 };
        Cookies.set("utm_source", utmSourceParam || "", cookieOptions);
        Cookies.set("tagval", tagvalParam || "", cookieOptions);
        Cookies.set("pageurl", window.location.pathname, cookieOptions);
      } else {
        const storedUtmSource = Cookies.get("utm_source") || null;
        const storedTagval = Cookies.get("tagval") || null;
        const storedPageurl = Cookies.get("pageurl") || null;

        setUtmSource(storedUtmSource);
        setTagval(storedTagval);
        setPageurl(storedPageurl);
      }
    }

    extractParametersFromURL();
    window.addEventListener("popstate", extractParametersFromURL);

    return () => {
      window.removeEventListener('popstate', extractParametersFromURL);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!Cookies.get("utm_source") && !Cookies.get("tagval") && !Cookies.get("pageurl")) {
        setUtmSource(utmSource);
        setTagval(null);
        setPageurl(null);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    document.body.classList.add('MainDivRemove');

  }, []);
  return (
    <Fullpage>
      <div style={{ backgroundColor: "white", overflow: "hidden" }}>
        <DirectMFHeaderSection />

        <div className="mb-md-5">
          <FeaturesSection />
        </div>

        <StatsSection />
        <ClientTestimonial />
        {utmSource && tagval ? (
          <AppointmentBox
            extraParams={{ "utm_source": utmSource, "service": 98 }}
            eventCode={tagval}
            serviceName="Mutual Fund"
            eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-mutual-fund?hide_event_type_details=1"}
            planId="46"
          />
        ) : (
          <AppointmentBox
            eventCode={'Callback_mintyApp_25'}
            serviceName="Mutual Fund"
            eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-mutual-fund?hide_event_type_details=1"}
            planId="46"
          />
        )}
        {/* <AppointmentBox eventCode={'Callback_mintyApp_25'} serviceName="Mutual Fund" eventUrl="https://calendly.com/fintoo/15-min-consultation-call-mutual-fund?hide_event_type_details=1" /> */}

        <FaqSection />
        {show && <ThankyouSection onClose={() => SetShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default DirectMF;
