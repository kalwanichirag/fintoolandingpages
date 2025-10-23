"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import FaqSection from "../../components/HTML/Insurance/FaqSection";
import HeaderSection from "../../components/HTML/Insurance/HeaderSection";
import HowWeWorkSection from "../../components/HTML/Insurance/HowWeWorkSection";
import WhyInsuranceSection from "../../components/HTML/Insurance/WhyInsuranceSection";
import SecuritySection from "../../components/HTML/SecuritySection";
import Fullpage from "../../components/Layouts/Fullpage";
import ThankyouSection from "../../components/ThankyouSection";
// import AppointmentBox from "../../components/Pages/Calendly";
import ClientTestimonial from "../../components/HTML/ClientTestimonial";
import Cookies from "js-cookie";
import Insurancecalculator from "../../components/HTML/Insurance/insurancecalculator";
import { usePathname, useSearchParams } from "next/navigation";

function RiskManagementContent() {
  const [show, SetShow] = useState(false);
  const [pageurl, setPageurl] = useState();
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);
  const WhyInsuranceSectionRef = useRef(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract URL params or fallback to cookies
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

    const handlePopstate = () => extractParametersFromURL();
    window.addEventListener("popstate", handlePopstate);

    return () => window.removeEventListener("popstate", handlePopstate);
  }, [pathname, searchParams]);

  // Recheck cookies periodically
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

  // Scroll to section if hash present
  useEffect(() => {
    if (window.location.hash === "#WhyInsuranceSection" && WhyInsuranceSectionRef.current) {
      WhyInsuranceSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <Fullpage>
      <div style={{ backgroundColor: "white" }}>
        <HeaderSection />
        <p style={{ height: "6rem" }} ref={WhyInsuranceSectionRef}></p>
        <WhyInsuranceSection />
        <HowWeWorkSection />
        <SecuritySection DynamicBgColor={"#E6EAEF"} />
        <Insurancecalculator
          title={"Human Life Value Calculator"}
          description={
            "Determine your ideal sum assured effortlessly with our Human Life Value Calculator. Customize key values to get a precise estimate of the financial protection your family needs."
          }
        />
        <ClientTestimonial />
        {/* <section id="book-appointment">
          {utmSource && tagval ? (
            <AppointmentBox
              extraParams={{ utm_source: utmSource, service: 98 }}
              eventCode={tagval}
              serviceName="Insurance"
              eventUrl="https://calendly.com/fintoo/15-min-consultation-call-risk-management?hide_event_type_details=1"
              planId="45"
            />
          ) : (
            <AppointmentBox
              eventCode="Callback_mintyApp_12"
              serviceName="Insurance"
              eventUrl="https://calendly.com/fintoo/15-min-consultation-call-risk-management?hide_event_type_details=1"
              planId="45"
            />
          )}
        </section> */}
        <FaqSection />
        {show && <ThankyouSection onClose={() => SetShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default function RiskManagement() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RiskManagementContent />
    </Suspense>
  );
}
