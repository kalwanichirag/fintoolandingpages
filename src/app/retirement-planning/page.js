"use client"

import Hero from "../../components/retirement-planning-tailwind/Hero";
import HowFintooHelps from "../../components/retirement-planning-tailwind/HowFintoo";
import WhyRetirementPlanning from "../../components/retirement-planning-tailwind/WhyRetirementPlanning";
import Testimonials from "../../components/retirement-planning-tailwind/testimonials";
import FinalCTA from "../../components/retirement-planning-tailwind/FinalCta";
import Disclaimer from "../../components/retirement-planning-tailwind/Disclaimer";
import "../tailwind.css"
export default function RetirementPlanningNew() {

  return (
    <>
      <Hero />
      <HowFintooHelps />
      <WhyRetirementPlanning />
      <Testimonials />
      <FinalCTA />
      <Disclaimer />
    </>
  );
}
