"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import SecuritySection from "@/components/HTML/SecuritySection";
import BondInvestmentHeaderSection from "@/components/HTML/BondInvestment/BondInvestmentHeader";
import WhyChooseBondInvestmentSection from "@/components/HTML/BondInvestment/WhyChooseBondInvestmentSection";
import BondinvestmentVideoSection from "@/components/HTML/BondInvestment/BondInvestmentVideoSection";
import Fullpage from "@/components/Layouts/Fullpage";
import ThankyouSection from "@/components/ThankyouSection";
import dynamic from "next/dynamic";
import FaqSection from '@/components/HTML/BondInvestment/FaqSection';
import LandingPageCalendly from "@/components/landingpagesCalendly/LandingPageCalendly";
const StepForm = dynamic(() => import("@/components/StepForm/StepForm"), { ssr: false });

function BondInvestment() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("MainDivRemove");
    }
  }, []);

  return (
    <Fullpage>
      <Head>
        <title>Best Online Bond Investment Platform</title>
        <meta
          name="description"
          content="Explore all available bonds, select the ones that match your requirements, and invest for a secure and profitable financial future."
        />
      </Head>

      <div style={{ backgroundColor: "white" }}>
        <BondInvestmentHeaderSection />
        <WhyChooseBondInvestmentSection />
        <BondinvestmentVideoSection />
        <SecuritySection />

        {/* ✅ Replace AppointmentBox with StepForm */}
        <section id="bondInvestmentContact">
          <LandingPageCalendly
            servicename={"assisted_advisory_fixed_fees"}
            calendlyurl={"https://calendly.com/fintoo/15-min-consultation-call-bond-investment?hide_event_type_details=1"} />

          {/* <StepForm
            eventCode="Callback_mintyApp_33"
            serviceName="Bonds"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-bond-investment?hide_event_type_details=1"
            planId="47"
          /> */}
        </section>

        <FaqSection />
        {show && <ThankyouSection onClose={() => setShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default BondInvestment;
