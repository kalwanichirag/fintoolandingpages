"use client";

import React, { useEffect, useState } from "react";
import InternationalEquityAdvantagesSection from "@/components/HTML/InternationalEquity/AdvantagesSection";
import InternationalEquityHeaderSection from "@/components/HTML/InternationalEquity/InternatinoalEquityHeaderSection";
import WhyInvestSection from "@/components/HTML/InternationalEquity/WhyInvestSection";
import FaqSection from "@/components/HTML/InternationalEquity/FaqSection";
import Fullpage from "@/components/Layouts/Fullpage";
import ThankyouSection from "@/components/ThankyouSection";
import LandingPageCalendly from "@/components/landingpagesCalendly/LandingPageCalendly";


function InternationalEquity() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("MainDivRemove");
    }
  }, []);

  return (
    <Fullpage>
      <div style={{ backgroundColor: "white" }}>
        <InternationalEquityHeaderSection />

        <InternationalEquityAdvantagesSection />

        <section style={{ backgroundColor: "rgb(230, 234, 239)" }}>
          <WhyInvestSection />
        </section>

        {/* ✅ Replaced Calendly AppointmentBox with StepForm */}
        <section id="internationalEquityContact">
          <LandingPageCalendly
          servicename={"assisted_advisory_fixed_fees"}
          calendlyurl={"https://calendly.com/d/cr76-3f4-jgz/15-mins-consultation-call-international-equity?hide_event_type_details=1"} />

          {/* <StepForm
            eventCode="Callback_mintyApp_90"
            serviceName="Direct International Equity"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-international-equity?hide_event_type_details=1"
            planId="49"
          /> */}
        </section>

        <FaqSection />
        {show && <ThankyouSection onClose={() => setShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default InternationalEquity;
