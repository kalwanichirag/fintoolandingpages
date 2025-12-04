"use client";

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

import FaqSection from "../../components/RetirementPlanning/FaqSection";
import FinancialReport from "../../components/RetirementPlanning/FinancialReport";
import HeaderSection from "../../components/RetirementPlanning/HeaderSection";
import HowWeWorkSection from "../../components/RetirementPlanning/StepsFinancialPlan";
import YoutubevideoSection from "../../components/RetirementPlanning/YoutubevideoSection";
import SecuritySection from "../../components/HTML/SecuritySection";
import Fullpage from "../../components/Layouts/Fullpage";
import LandingPageCalendly from "@/components/landingpagesCalendly/LandingPageCalendly";

export default function RetirementPlanning() {
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);
  const [pageurl, setPageurl] = useState(null);
  const HowWeWorkSectionRef = useRef(null);

  // Extract URL params and set cookies (client-side only)
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
        // Restore from cookies if available
        setUtmSource(Cookies.get("utm_source") || null);
        setTagval(Cookies.get("tagval") || null);
        setPageurl(Cookies.get("pageurl") || null);
      }
    };

    extractParametersFromURL();
    window.addEventListener("popstate", extractParametersFromURL);
    return () => window.removeEventListener("popstate", extractParametersFromURL);
  }, []);

  // Scroll to section if URL hash matches
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash === "#HowWeWorkSection" && HowWeWorkSectionRef.current) {
      HowWeWorkSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Fullpage>
      <HeaderSection />
      <p style={{ height: "6rem" }} ref={HowWeWorkSectionRef}></p>
      <HowWeWorkSection />
      <FinancialReport />
      <YoutubevideoSection />
      <SecuritySection />

      <section id="book-appointment">
        {/* <h2 className="text-center py-4 fs-1 fw-bold"> GOT QUESTION? LET'S TALK!</h2> */}
        <LandingPageCalendly
          servicename={"assisted_advisory_fixed_fees"}
          calendlyurl={"https://calendly.com/d/2zt-z8p-34k/15-min-consultation-call-retirement-planning?hide_event_type_details=1"} />

         {/* <StepForm
            eventCode="Callback_mintyApp_113"
          serviceName="Retirement Planning"
          eventUrl="https://calendly.com/fintoo/15-minutes-consultation-call-retirement-planning?hide_event_type_details=1"
          planId="20"
          /> */}
       
      </section>

      <FaqSection />
    </Fullpage>
  );
}
