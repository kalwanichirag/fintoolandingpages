"use client";
export const ssr = false;

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DirectMFHeaderSection from "../../components/HTML/DirectMF/DirectMFHeaderSection";
import FeaturesSection from "../../components/HTML/DirectMF/FeaturesSection";
import FaqSection from "../../components/HTML/DirectMF/FaqSection";
import Fullpage from "../../components/Layouts/Fullpage";
import ThankyouSection from "../../components/ThankyouSection";
import Cookies from "js-cookie";
const StatsSection = dynamic(() => import("../../components/HTML/DirectMF/StatsSection"), { ssr: false });


const AppointmentBox = dynamic(() => import("../../components/Calendly"), { ssr: false });
const ClientTestimonial = dynamic(() => import("../../components/HTML/ClientTestimonial"), { ssr: false });

function DirectMF() {
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

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("MainDivRemove");
    }
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
