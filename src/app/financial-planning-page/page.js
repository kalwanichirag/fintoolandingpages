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
import LandingPageCalendly from "@/components/landingpagesCalendly/LandingPageCalendly";

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

    // HERO VISIBLE CHECK
    if (heroElement) {
      const rect = heroElement.getBoundingClientRect();
      setIsHeroVisible(rect.top < window.innerHeight && rect.bottom > 0);
    }

    // CALENDLY VISIBLE CHECK
    if (calendlyElement) {
      const rect = calendlyElement.getBoundingClientRect();
      setIsCalendlyVisible(rect.top < window.innerHeight && rect.bottom > 0);
    }

    // FOOTER VISIBLE CHECK
    if (footerElement) {
      const footerRect = footerElement.getBoundingClientRect();

      const footerVisible =
        footerRect.top < window.innerHeight && footerRect.bottom > 0;

      // Hide Book Bar when footer visible
      setIsBookVisible(!footerVisible);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
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
      <div className="calendlyfp" ref={calendlyRef}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="mb-5"><svg width="80" height="88" viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse opacity="0.0786365" cx="40.0094" cy="44.4609" rx="39.15" ry="43.5" fill="white"></ellipse><path d="M40.4578 28.9609C31.5126 28.9609 24.2578 35.4371 24.2578 43.4371C24.2578 51.4371 31.5126 57.9133 40.4578 57.9133C41.8665 57.9133 43.3456 57.7609 44.7543 57.38L52.8543 60.8847C52.9248 60.8847 52.9952 60.9609 53.1361 60.9609C53.2769 60.9609 53.4178 60.8847 53.5587 60.8086C53.77 60.6562 53.8404 60.3514 53.8404 60.1228L53.0656 52.5038C55.39 49.9895 56.6578 46.7133 56.6578 43.4371C56.6578 35.4371 49.403 28.9609 40.4578 28.9609Z" fill="white"></path></svg></div>
              <h2 className="text-white fs-1 fw-bold">
                Schedule a Complimentary Consultation with Fintoo Today

              </h2>

            </div>
            <div className="col-lg-6">
              <LandingPageCalendly
                servicename={"assisted_advisory_fixed_fees"}
                calendlyurl={"https://calendly.com/d/cr76-3f4-jgz/15-mins-consultation-call-yt-fp?hide_event_type_details=1"}
                variant="minimal"
              />
            </div>
          </div>
        </div>


      </div>
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
