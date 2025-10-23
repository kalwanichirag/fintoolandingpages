"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import FaqSection from "../../components/HTML/TaxPlanning/FaqSection";
import SecuritySection from "../../components/HTML/SecuritySection";
import TaxPlanningHeaderSection from "../../components/HTML/TaxPlanning/TaxPlanningHeaderSection";
import Fullpage from "../../components/Layouts/Fullpage";
import ThankyouSection from "../../components/ThankyouSection";
import WidgetSection from "../../components/HTML/TaxPlanning/WidgetSection";
import TPCardSection from "../../components/HTML/TaxPlanning/TPCardSection";
import Cookies from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";

function TaxPlanningContent() {
  const [show, SetShow] = useState(false);
  const [pageurl, setPageurl] = useState();
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);
  const TaxPlanningRef = useRef(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract UTM and tag params from URL or cookies
  useEffect(() => {
    function extractParametersFromURL() {
      const utmSourceParam = searchParams.get("utm_source");
      const tagvalParam = searchParams.get("tags");

      if (utmSourceParam || tagvalParam) {
        setUtmSource(utmSourceParam);
        setTagval(tagvalParam);
        setPageurl(pathname);
        const cookieOptions = { expires: 0.0208 };
        Cookies.set("utm_source", utmSourceParam || "", cookieOptions);
        Cookies.set("tagval", tagvalParam || "", cookieOptions);
        Cookies.set("pageurl", pathname, cookieOptions);
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

    const handlePopstate = () => {
      extractParametersFromURL();
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [pathname, searchParams]);

  // Fallback interval to reset cookies
  useEffect(() => {
    const interval = setInterval(() => {
      if (!Cookies.get("utm_source") && !Cookies.get("tagval") && !Cookies.get("pageurl")) {
        setUtmSource(utmSource);
        setTagval(null);
        setPageurl(null);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [utmSource]);

  console.log("utmSource:", utmSource, "tagval:", tagval, "pageurl:", pageurl);

  // Scroll to TaxPlanningRef if hash matches
  useEffect(() => {
    if (window.location.hash === "#TaxPlanningSection" && TaxPlanningRef.current) {
      TaxPlanningRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <Fullpage>
      <div style={{ backgroundColor: "white" }}>
        <TaxPlanningHeaderSection />
        <p style={{ height: "6rem" }} ref={TaxPlanningRef}></p>
        <TPCardSection />
        {/* <WhyTaxPlanningSection /> */}
        <WidgetSection />
        {/* <TaxPlanningVideoSection /> */}
        <SecuritySection />
        {/* 
        <section id="book-appointment">
          {utmSource && tagval ? (
            <AppointmentBox
              extraParams={{ utm_source: utmSource, service: 98 }}
              eventCode={tagval}
              serviceName="Tax Planning"
              eventUrl="https://calendly.com/fintoo/15-min-consultation-call-tax-planning-website?hide_event_type_details=1"
            />
          ) : (
            <AppointmentBox
              eventCode="Callback_mintyApp_9"
              serviceName="Tax Planning"
              eventUrl="https://calendly.com/fintoo/15-min-consultation-call-tax-planning-website?hide_event_type_details=1"
            />
          )}
        </section> 
        */}
        {/* <WealthContactForm imgSrc={backImg} serviceType={servicesTypes.taxPlanning} onSuccess={() => SetShow(true)} /> */}
        <FaqSection />
        {show && <ThankyouSection onClose={() => SetShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default function TaxPlanning() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaxPlanningContent />
    </Suspense>
  );
}
