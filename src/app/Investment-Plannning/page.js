"use client"

import CTAForm from "../../components/InvestmentPlanningLanding/CTAForm";
import Hero from "../../components/InvestmentPlanningLanding/Hero";
import KeyTakeawaysSection from "../../components/InvestmentPlanningLanding/KeyTakeawaysSection";
import Disclaimer from "../../components/retirement-planning-tailwind/Disclaimer";

export default function InvestmentPlanningNew() {
    return (
        <>
            <Hero />
            <KeyTakeawaysSection />
            <CTAForm/>
            <Disclaimer/>
        </>
    )
}