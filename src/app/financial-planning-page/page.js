"use client";
import React, { useEffect, useRef, useState } from "react";
import HeroSection from "../../components/NewPlanningpage/HeroSection";
import PlanSection from "../../components/NewPlanningpage/PlanSection";
import Whyfintoo from "../../components/NewPlanningpage/whyfintoo";
import FPPlanner from "../../components/NewPlanningpage/FPPlanner";
import KeyElements from "../../components/NewPlanningpage/KeyElements";
import KeyFactors from "../../components/NewPlanningpage/FactorsFP";
import PortFolios from "../../components/NewPlanningpage/PortFolios";
import FpBenefits from "../../components/NewPlanningpage/FpBenefits";
import InvestmentInstruments from "../../components/NewPlanningpage/InvestmentInstruments";
import WhoisfpPlanner from "../../components/NewPlanningpage/WhoisfpPlanner/";
import FaqSection from "../../components/NewPlanningpage/FaqSection";
import Book_consultation from "../../components/NewPlanningpage/Book_consultation";
import FpProcess from "../../components/NewPlanningpage/FpProcess";
import ExpertReview from "../../components/NewPlanningpage/ExpertReview";
import ClientTestimonial from "../../components/NewPlanningpage/ClientReviews";
import CalendlySectionView from "../../components/NewPlanningpage/CalendlySection"
import StepForm from "@/components/StepForm/StepForm";

const images = [
  process.env.NEXT_PUBLIC_STATIC_URL + "media/LandingPage/FPExpert.webp",
  process.env.NEXT_PUBLIC_STATIC_URL + "media/LandingPage/FPExpert2.webp",
  process.env.NEXT_PUBLIC_STATIC_URL + "media/LandingPage/FPExpert3.webp",
];

const NewPlanningpage = () => {
  const calendlyRef = useRef(null);
  const bookConsultationRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isCalendlyVisible, setIsCalendlyVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isBookVisible, setIsBookVisible] = useState(true);

  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
  });

  const scrollToCalendly = () => {
    if (calendlyRef.current) {
      calendlyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // IMAGE SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      const heroElement =
        typeof document !== "undefined"
          ? document.getElementById("hero-section")
          : null;
      const footerElement =
        typeof document !== "undefined"
          ? document.getElementById("FooterView")
          : null;
      const calendlyElement = calendlyRef.current;

      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setIsHeroVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }

      if (calendlyElement) {
        const rect = calendlyElement.getBoundingClientRect();
        setIsCalendlyVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }

      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        setIsBookVisible(!(footerRect.top <= 200));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <div id="hero-section">
        <HeroSection
          scrollToCalendly={scrollToCalendly}
          setFormData={setFormData}
          formData={formData}
        />
      </div>

      {/* MAIN CONTENT */}
      <PlanSection />
      <Whyfintoo />
      <FPPlanner
        title="What is Financial Planning?"
        textInfo2="The process typically includes assessing your current financial situation, setting realistic goals, identifying available resources, developing strategies, and implementing a monitoring framework to track progress. From budgeting to risk management, financial planning encompasses various aspects that ensure financial health and growth."
        textInfo="Financial planning is the systematic approach to managing one’s financial resources to achieve personal, business, or organizational objectives. Financial planning involves creating a strategy for efficiently allocating and managing money to meet both short-term and long-term goals. Whether you're an individual investor, a family office, or a business owner, a comprehensive financial plan ensures that your financial decisions are aligned with your future objectives."
      />
      <KeyElements />
      <FPPlanner
        title="Why is Financial Planning Important?"
        textInfo2="Fintoo can help you structure an optimized, personalized financial plan, so your investments work for you."
        textInfo="Financial planning is important because it helps manage your financial future. It ensures that your objectives are realistically achievable and lays down a systematic path for wealth creation and protection. Without financial planning, it’s easy to fall prey to poor financial decisions, excessive debt, or missed investment opportunities."
      />
      <FpProcess />
      <PortFolios />
      <KeyFactors />
      <FpBenefits />
      <InvestmentInstruments />
      <WhoisfpPlanner />
      <div style={{ background: "#fff" }}>
        <ClientTestimonial />
      </div>
      <div className="calendlyfp">
      <StepForm
       eventCode={'Callback_mintyApp_8'} serviceName="Financial Planning" eventUrl={"https://calendly.com/fintoo/fintoo-15-mins-consultation-call-yt-fp?hide_event_type_details=1"} planId="29"/>
     </div>
        {/* <div ref={calendlyRef}>
        
    <CalendlySectionView formData={formData} />
      </div> */}
      <ExpertReview />
      <FaqSection />

      {/* BOOK CONSULTATION - FIXED BOTTOM */}
      {isBookVisible && !isHeroVisible && !isCalendlyVisible && (
        <div
          ref={bookConsultationRef}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Book_consultation
            currentIndex={currentIndex}
            images={images}
            fade={fade}
            scrollToCalendly={scrollToCalendly}
          />
        </div>
      )}
    </div>
  );
};

export default NewPlanningpage;
