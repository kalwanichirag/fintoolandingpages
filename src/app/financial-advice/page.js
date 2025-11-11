import React from 'react'
import HeroSection from '@/components/FinancialPlanningPage/Hero'
import TrustBar from '@/components/FinancialPlanningPage/TrustBar'
import AboutSection from '@/components/FinancialPlanningPage/About'
import ServicesSection from '@/components/FinancialPlanningPage/Service'
import HowItWorksSection from '@/components/FinancialPlanningPage/HowItWorks'
import WhyChoose from '@/components/FinancialPlanningPage/WhyChoose'
import PerformanceSection from '@/components/FinancialPlanningPage/PerformanceSection'
import TestimonialsSection from '@/components/FinancialPlanningPage/Testimonals'
import FaqSection from '@/components/FinancialPlanningPage/Faqs'
import FinalCTA from '@/components/FinancialPlanningPage/FinalCTA'
import Disclaimer from "../../components/retirement-planning-tailwind/Disclaimer";


const FinancialPlanningPage = () => {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChoose />
      <PerformanceSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCTA />
      <Disclaimer />

    </>
  )
}

export default FinancialPlanningPage