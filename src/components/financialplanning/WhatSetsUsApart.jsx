"use client";
import { ArrowRight } from "lucide-react";
import "../../app/tailwind.css"

export default function WhatSetsUsApart() {
  const cards = [
    { title: "Unbiased Advisory", backText: "Virtuous and unbiased advisory while catering to fiduciary matters." },
    { title: "Data Privacy & Security", backText: "Adherence to privacy, data security, and transparency with end-to-end encryption technology." },
    { title: "AI-Driven Portfolio Analysis", backText: "A tech-driven system that performs real-time portfolio analysis to identify suitable opportunities." },
    { title: "In-House Research Desk", backText: "A robust in-house research team for real-time and dynamic portfolio monitoring." },
    { title: "Zero Commission-Based Solutions", backText: "A fee-only advisory ensuring unbiased advice spanning diversified investment solutions." },
  ];

  return (
    <section className=" tw-text-white  tw-text-center ">
      {/* What Sets Us Apart */}
      <div className="t tw-text-[#00132E] tw-py-16">
        <h2 className="tw-text-4xl tw-font-extrabold tw-mb-10">What Sets Us Apart?</h2>
        <div className="tw-grid tw-gap-8 tw-max-w-6xl tw-mx-auto tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-5 tw-px-6">
          {cards.map((card, i) => (
            <div key={i} className="tw-group tw-perspective">
              <div className="tw-relative tw-w-full tw-h-48 tw-transform-style-preserve-3d tw-transition-transform tw-duration-200 group-hover:[transform:rotateY(180deg)]">
                
                {/* Front */}
                <div className="tw-absolute tw-inset-0 tw-bg-[#00132E] tw-rounded-2xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-shadow-lg tw-backface-hidden">
                  <ArrowRight className="tw-w-8 tw-h-8 tw-mb-2 tw-text-sky-400 group-hover:tw-text-white tw-transition-colors" />
                  <h3 className="tw-font-bold tw-text-lg tw-text-white">{card.title}</h3>
                </div>

                {/* Back */}
                <div className="tw-absolute tw-inset-0 tw-bg-[#00132E] tw-text-white tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-p-4 tw-text-sm tw-font-lg tw-rotate-y-180 tw-backface-hidden">
                  {card.backText}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Advice Section */}
      <div className="tw-bg-[#00132E] tw-py-20 tw-text-center tw-text-white">
        <h2 className="tw-text-3xl tw-font-extrabold tw-mb-3">Expert Advice For Extra Performance</h2>
        <p className="tw-text-gray-300 tw-mb-10">
          Boost your annual returns with the help of Fintoo’s Premium Wealth Management Services.
        </p>
        <div className="tw-flex tw-justify-center">
          <img
            src="https://www.fintoo.in/wealthmanagement/wp-content/uploads/2023/10/Equity-Returns-data.png"
            alt="Expert Advice Chart"
            className="tw-rounded-lg tw-shadow-lg tw-max-w-4xl tw-w-full"
          />
        </div>
      </div>
    </section>
  );
}
