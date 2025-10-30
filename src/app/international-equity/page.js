"use client";

import React, { useEffect, useState } from "react";
import InternationalEquityAdvantagesSection from "@/components/HTML/InternationalEquity/AdvantagesSection";
import InternationalEquityHeaderSection from "@/components/HTML/InternationalEquity/InternatinoalEquityHeaderSection";
import WhyInvestSection from "@/components/HTML/InternationalEquity/WhyInvestSection";
import FaqSection from "@/components/HTML/InternationalEquity/FaqSection";
import Fullpage from "@/components/Layouts/Fullpage";
import ThankyouSection from "@/components/ThankyouSection";
import dynamic from "next/dynamic";

// ✅ Use StepForm instead of AppointmentBox
const StepForm = dynamic(() => import("@/components/StepForm/StepForm"), { ssr: false });

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
          <StepForm
            eventCode="Callback_mintyApp_90"
            serviceName="Direct International Equity"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-international-equity?hide_event_type_details=1"
            planId="49"
          />
        </section>

        <FaqSection />
        {show && <ThankyouSection onClose={() => setShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default InternationalEquity;
