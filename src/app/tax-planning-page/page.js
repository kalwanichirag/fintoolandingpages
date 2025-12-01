"use client";

import React, { useEffect, useRef, Suspense } from "react";
import FaqSection from "../../components/HTML/TaxPlanning/FaqSection";
import SecuritySection from "../../components/HTML/SecuritySection";
import TaxPlanningHeaderSection from "../../components/HTML/TaxPlanning/TaxPlanningHeaderSection";
import Fullpage from "../../components/Layouts/Fullpage";
import ThankyouSection from "../../components/ThankyouSection";
import WidgetSection from "../../components/HTML/TaxPlanning/WidgetSection";
import TPCardSection from "../../components/HTML/TaxPlanning/TPCardSection";
import StepForm from "@/components/StepForm/StepForm";

function TaxPlanningContent() {
  const TaxPlanningRef = useRef(null);

  // Optional smooth scroll if URL hash is present
  useEffect(() => {
    if (window.location.hash === "#TaxPlanningSection" && TaxPlanningRef.current) {
      TaxPlanningRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("MainDivRemove");
    }
  }, []);

  return (
    <Fullpage>
      <div style={{ backgroundColor: "white" }}>
        <TaxPlanningHeaderSection />
        <p style={{ height: "6rem" }} ref={TaxPlanningRef}></p>
        <TPCardSection />
        <WidgetSection />
        <SecuritySection />

        {/* ✅ StepForm replaces AppointmentBox */}
        <section id="book-appointment">
            <LandingPageCalendly
          servicename={"assisted_advisory_fixed_fees"}
          calendlyurl={"https://calendly.com/d/2zt-z8p-34k/15-min-consultation-call-tax-planning-website?hide_event_type_details=1"} />

          {/* <StepForm
            eventCode="Callback_mintyApp_9"
            serviceName="Tax Planning"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-tax-planning-website?hide_event_type_details=1"
            planId="25"
          /> */}
        </section>

        <FaqSection />
        {/* Optional: if you still want Thankyou popup for later use */}
        {/* <ThankyouSection onClose={() => SetShow(false)} /> */}
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
