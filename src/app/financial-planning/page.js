import CounterAndVideoSection from "@/components/financialplanning/counter";
import { Feature } from "@/components/financialplanning/Feature";
import CalendlySection from "@/components/financialplanning/form";
import HeroSection from "@/components/financialplanning/HeroSection";
import TeamSection from "@/components/financialplanning/teams";
import WeDeliver  from "@/components/financialplanning/WeDeliver";
import WhatSetsUsApart from "@/components/financialplanning/WhatSetsUsApart";



export default function FinancialPlanning() {
    return (
        <>
            <div className="tw-text-white ">
                <HeroSection />
                <Feature />
                <WeDeliver />
                <WhatSetsUsApart />
                <CounterAndVideoSection />
                <TeamSection />
                <CalendlySection/>
            </div>
        </>
    )
}