"use client";

import React, { useEffect, useState } from "react";
import FaqSection from "@/components/HTML/IpoPage/FaqSection";
import IpoWhyTrustUsSection from "@/components/HTML/IpoPage/WhyInvestIpoSection";
import IpoHeaderSection from "@/components/HTML/IpoPage/IpoPageHeaderSection";
import Fullpage from "@/components/Layouts/Fullpage";
import ThankyouSection from "@/components/ThankyouSection";
import ClientTestimonial from "@/components/HTML/ClientTestimonial";
import LandingPageCalendly from "@/components/landingpagesCalendly/LandingPageCalendly";
function IpoPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("MainDivRemove");
    }
  }, []);

  return (
    <Fullpage>
      <div style={{ backgroundColor: "white" }}>
        <IpoHeaderSection />
        <IpoWhyTrustUsSection />
        <ClientTestimonial />

        {/* ✅ StepForm replaces AppointmentBox (handles OTP + Calendly + tags) */}
        <section id="ipoContactSection">
          <LandingPageCalendly
          servicename={"assisted_advisory_fixed_fees"}
          calendlyurl={"https://calendly.com/d/cr76-3f4-jgz/15-mins-consultation-call-ipo?hide_event_type_details=1"} />

          {/* <StepForm
            eventCode="Callback_mintyApp_113"
            serviceName="IPO"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-ipo?hide_event_type_details=1"
            planId="50"
          /> */}
        </section>

        {show && <ThankyouSection onClose={() => setShow(false)} />}
        <FaqSection />
      </div>
    </Fullpage>
  );
}

export default IpoPage;
