"use client"

import React, { useEffect, useState } from "react";
import InternationalEquityAdvantagesSection from "@/components/HTML/InternationalEquity/AdvantagesSection";
import InternationalEquityHeaderSection from "@/components/HTML/InternationalEquity/InternatinoalEquityHeaderSection";
import InternationalEquityContactForm from "@/components/HTML/InternationalEquity/InternationalEquityContactSection";
import WhyInvestSection from "@/components/HTML/InternationalEquity/WhyInvestSection";
import FaqSection from "@/components/HTML/InternationalEquity/FaqSection";
import Fullpage from "@/components/Layouts/Fullpage";
import ThankyouSection from "@/components/ThankyouSection";
import dynamic from "next/dynamic";
const AppointmentBox = dynamic(() => import("@/components/Calendly"), { ssr: false });
import Cookies from 'js-cookie'
function InternationalEquity() {
   
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
      <div style={{ backgroundColor: "white" }}>
        <InternationalEquityHeaderSection />

        {/* <InternationalEquityContactForm serviceType={servicesTypes.internationalEquity} onSuccess={() => SetShow(true)} /> */}

        <InternationalEquityAdvantagesSection />

        <section
          style={{
            backgroundColor: "rgb(230, 234, 239)",
          }}
        >
          <WhyInvestSection />
        </section>

        {show && <ThankyouSection onClose={() => SetShow(false)} />}
        <section id="calendlySection">
          {utmSource && tagval ? (
            <AppointmentBox
              extraParams={{ "utm_source": utmSource, "service": 98 }}
              eventCode={tagval}
              serviceName="Direct International Equity"
              eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-international-equity?hide_event_type_details=1"}
              planId="49"
            />
          ) : (
            <AppointmentBox
              eventCode={'Callback_mintyApp_90'}
              serviceName="Direct International Equity"
              eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-international-equity?hide_event_type_details=1"}
              planId="49"
            />
          )}
        </section>

        {/* <AppointmentBox eventCode={'Callback_mintyApp_90'} serviceName="Direct International Equity" eventUrl="https://calendly.com/fintoo/15-min-consultation-call-international-equity?hide_event_type_details=1" /> */}
        <FaqSection />
      </div>
    </Fullpage>
  );
}

export default InternationalEquity;
