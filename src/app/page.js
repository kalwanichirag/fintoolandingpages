"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import Fullpage from "../components/Layouts/Fullpage";
import WelcomeSection from "../components/HTML/WelcomeSection";
import AdvisorySection from "../components/HTML/Advisory";
import InvestSection from "../components/HTML/InvestSection";
import TaxSection from "../components/HTML/TaxSection";
import ClientTestimonial from "../components/HTML/ClientTestimonial";
import OurAchievements from "../components/HTML/OurAchievements";
import FeaturedIn from "../components/HTML/FeaturedIn";
import KnowledgeBase from "../components/HTML/KnowledgeBase";
import ThankyouSection from "../components/ThankyouSection";
import StepForm from "@/components/StepForm/StepForm";


const Homepage = () => {
  const [show, SetShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href.includes("fintoo.ae")) {
      window.location.href = (process.env.PUBLIC_URL || "") + "/nri-desk-dubai";
    }
  }, []);

  return (
    <Fullpage>
      <Head>
        <title>Fintoo - Financial Planning</title>
        <meta
          name="keywords"
          content="income tax filing, investment planning, financial planning, wealth management"
        />
        <meta
          name="description"
          content="Fintoo helps you plan your finances effectively."
        />
      </Head>

      <WelcomeSection />
      <AdvisorySection />
      <InvestSection />
      <TaxSection />
      <ClientTestimonial />
      <OurAchievements />
      <FeaturedIn />
      <KnowledgeBase />
      <StepForm
        eventUrl="https://calendly.com/fintoo/15-min-consultation-call-financial-planning?hide_event_type_details=1"
        eventCode="Callback_mintyApp_8"
        serviceName="Financial Planning"
        planId="29"
      />
     

      {show && <ThankyouSection onClose={() => SetShow(false)} />}
    </Fullpage>
  );
};

export default Homepage;
