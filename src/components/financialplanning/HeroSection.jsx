"use client"
import React from 'react'
import "../../app/tailwind.css"
import { Mouse } from "lucide-react";


const HeroSection = () => {
  const handleScrollToCalendly = () => {
    const section = document.getElementById("calendly-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };    return (
        <section
            className="tw-relative tw-h-[70vh] tw-text-white tw-bg-cover tw-bg-center tw-flex tw-flex-col tw-justify-center tw-items-center"
            style={{
                backgroundImage: `url('https://www.fintoo.in/static/media/bannerBackground2.34a2f12cf611ecf0d147.jpg')`
            }}
        >
            <div className="tw-bg-black/75 tw-absolute tw-inset-0"></div>
            <div className="tw-relative tw-text-center tw-z-10">
                <h1 className="tw-text-3xl md:tw-text-5xl tw-font-bold tw-mb-4">Get your Goal-Driven Financial Plan.
                   

                </h1>
                 <h1 className="tw-text-3xl md:tw-text-5xl tw-font-bold tw-mb-4">
                    Crafted by Qualified Wealth Advisors.

                </h1>
                <p className="tw-text-lg md:tw-text-xl tw-mb-6">Delivering reliable financial advice based on extensive market research and a personalized approach.
</p>
                <button className="tw-bg-[#00AEEF] tw-px-6 tw-py-3 tw-rounded-lg tw-font-semibold hover:tw-bg-[#0093cc]"           onClick={handleScrollToCalendly}
> 
                    Book an Appointment
                </button>
            </div>
            
<div className="tw-absolute tw-bottom-6 tw-animate-bounce">
  <Mouse className="tw-w-8 tw-h-8 tw-text-white" />
</div>

        </section>
    )
}

export default HeroSection