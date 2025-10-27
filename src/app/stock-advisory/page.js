"use client"
import React, { useEffect, useState } from "react";
import FaqSection from "@/components/HTML/Stockadvisory/FaqSection";
import HeaderSection from "@/components/HTML/Stockadvisory/HeaderSection";
import YoutubevideoSection from "@/components/HTML/Stockadvisory/YoutubevideoSection";
import SecuritySection from "@/components/HTML/SecuritySection";
import Fullpage from "@/components/Layouts/Fullpage";

import WidgetSection from "@/components/HTML/Stockadvisory/WidgetSection";
import AdvisorycardSection from "@/components/HTML/Stockadvisory/AdvisorySection";
import ReportsPage from "@/components/HTML/Stockadvisory/ReportsPage";
import FeaturesSection from "@/components/HTML/Stockadvisory/FeaturesSection";


import dynamic from "next/dynamic";
const AppointmentBox = dynamic(() => import("@/components/Calendly"), { ssr: false });
import AssistedUAESection from "@/components/HTML/Stockadvisory/AssistedUAESection";

import Cookies from 'js-cookie'
const Stockadvisory = () => {
 
  const [show, setShow] = useState(false);
  const [pageurl, setPageurl] = useState();
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const extractParametersFromURL = () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const utmSourceParam = urlSearchParams.get("utm_source");
      const tagvalParam = urlSearchParams.get("tags");

      if (utmSourceParam || tagvalParam) {
        setUtmSource(utmSourceParam);
        setTagval(tagvalParam);
        setPageurl(window.location.pathname);

        const cookieOptions = { expires: 0.0208 }; // ~30 minutes
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
    };

    extractParametersFromURL();

    window.addEventListener("popstate", extractParametersFromURL);
    return () => {
      window.removeEventListener("popstate", extractParametersFromURL);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const hasCookies =
        Cookies.get("utm_source") ||
        Cookies.get("tagval") ||
        Cookies.get("pageurl");

      if (!hasCookies) {
        setUtmSource(utmSource);
        setTagval(null);
        setPageurl(null);
      }
    }, 500);
      return () => clearInterval(interval);
        }, [utmSource]);
      
       
    return (
    <Fullpage>
      <HeaderSection />
      <section style={{
        backgroundColor: "rgb(230, 234, 239)"
      }}>
        <WidgetSection />
      </section>
      <AssistedUAESection />
      <AdvisorycardSection />
      <FeaturesSection />
      <ReportsPage />
      <YoutubevideoSection />
      <SecuritySection />
      {/* <FeaturedIn /> */}
      <section style={{

      }} id="GETREPORTS">
        {utmSource && tagval ? (
          <AppointmentBox
            extraParams={{ "utm_source": utmSource, "service": 98 }}
            eventCode={tagval}
            serviceName="Direct Domestic Equity"
            eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-domestic-equity?hide_event_type_details=1"}
            planId="48"
          />
        ) : (
          <AppointmentBox
            eventCode={'Callback_mintyApp_89'}
            serviceName="Direct Domestic Equity"
            eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-domestic-equity?hide_event_type_details=1"}
            planId="48"
          />
        )}
        {/* <AppointmentBox eventCode={'Callback_mintyApp_89'} serviceName="Direct Domestic Equity" eventUrl="https://calendly.com/fintoo/15-min-consultation-call-domestic-equity?hide_event_type_details=1" /> */}
        {/* <WealthContactForm imgSrc={backImg} serviceType={servicesTypes.stockAdvisory}/> */}
      </section>
      <FaqSection />
    </Fullpage>
  );
};
export default Stockadvisory;
