"use client";

import React, { useEffect } from "react";
import FaqSection from "@/components/HTML/Stockadvisory/FaqSection";
import HeaderSection from "@/components/HTML/Stockadvisory/HeaderSection";
import YoutubevideoSection from "@/components/HTML/Stockadvisory/YoutubevideoSection";
import SecuritySection from "@/components/HTML/SecuritySection";
import Fullpage from "@/components/Layouts/Fullpage";
import WidgetSection from "@/components/HTML/Stockadvisory/WidgetSection";
import AdvisorycardSection from "@/components/HTML/Stockadvisory/AdvisorySection";
import ReportsPage from "@/components/HTML/Stockadvisory/ReportsPage";
import FeaturesSection from "@/components/HTML/Stockadvisory/FeaturesSection";
import AssistedUAESection from "@/components/HTML/Stockadvisory/AssistedUAESection";

import dynamic from "next/dynamic";
const StepForm = dynamic(() => import("@/components/StepForm/StepForm"), { ssr: false });

const Stockadvisory = () => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("MainDivRemove");
    }
  }, []);

  return (
    <Fullpage>
      <HeaderSection />
      <section style={{ backgroundColor: "rgb(230, 234, 239)" }}>
        <WidgetSection />
      </section>

      <AssistedUAESection />
      <AdvisorycardSection />
      <FeaturesSection />
      <ReportsPage />
      <YoutubevideoSection />
      <SecuritySection />

      {/* ✅ StepForm replaces AppointmentBox */}
      <section id="GETREPORTS">
        <StepForm
          eventCode="Callback_mintyApp_89"
          serviceName="Direct Domestic Equity"
          eventUrl="https://calendly.com/fintoo/15-min-consultation-call-domestic-equity?hide_event_type_details=1"
          planId="48"
        />
      </section>

      <FaqSection />
    </Fullpage>
  );
};

export default Stockadvisory;
