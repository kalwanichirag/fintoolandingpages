"use client";
export const ssr = false;

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DirectMFHeaderSection from "../../components/HTML/DirectMF/DirectMFHeaderSection";
import FeaturesSection from "../../components/HTML/DirectMF/FeaturesSection";
import FaqSection from "../../components/HTML/DirectMF/FaqSection";
import Fullpage from "../../components/Layouts/Fullpage";
import ThankyouSection from "../../components/ThankyouSection";
import LandingPageCalendly from "@/components/landingpagesCalendly/LandingPageCalendly";

// ✅ Use StepForm instead of AppointmentBox
const StatsSection = dynamic(() => import("../../components/HTML/DirectMF/StatsSection"), { ssr: false });
const ClientTestimonial = dynamic(() => import("../../components/HTML/ClientTestimonial"), { ssr: false });

function DirectMF() {
  const [show, setShow] = useState(false);

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

        {/* ✅ Replace AppointmentBox with StepForm */}
        <section id="directMFContact">
             <LandingPageCalendly
            servicename={"assisted_advisory_fixed_fees"}
            calendlyurl={"https://calendly.com/fintoo/15-min-consultation-call-mutual-fund?hide_event_type_details=1"} />

      
          {/* <StepForm
            eventCode="Callback_mintyApp_25"
            serviceName="Mutual Fund"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-mutual-fund?hide_event_type_details=1"
            planId="46"
          /> */}
        </section>

        <FaqSection />
        {show && <ThankyouSection onClose={() => setShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default DirectMF;
