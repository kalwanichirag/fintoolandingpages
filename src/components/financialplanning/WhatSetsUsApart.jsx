"use client";
import { ArrowRight } from "lucide-react";

export default function WhatSetsUsApart() {
  const cards = [
    { title: "Unbiased Advisory", backText: "Independent financial guidance you can trust." },
    { title: "Data Privacy & Security", backText: "Your financial data stays fully protected." },
    { title: "AI-Driven Portfolio Analysis", backText: "Leverage AI insights for better investment outcomes." },
    { title: "In-House Research Desk", backText: "Expert research to guide your portfolio decisions." },
    { title: "Zero Commission-Based Solutions", backText: "We earn through service, not commissions." },
  ];

  return (
    <section className=" tw-text-white  tw-text-center ">
      {/* What Sets Us Apart */}
      <div className="t tw-text-[#00132E] tw-py-16">
        <h2 className="tw-text-3xl tw-font-extrabold tw-mb-10">What Sets Us Apart?</h2>
        <div className="tw-grid tw-gap-8 tw-max-w-6xl tw-mx-auto tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-5 tw-px-6">
          {cards.map((card, i) => (
            <div key={i} className="tw-group tw-perspective">
              <div className="tw-relative tw-text-white tw-w-full tw-h-48 tw-transform-style-preserve-3d tw-transition-transform tw-duration-700 group-hover:tw-rotate-y-180">
                {/* Front */}
                <div className="tw-absolute tw-inset-0 tw-bg-[#00132E] tw-rounded-2xl tw-flex tw-flex-col tw-items-center tw-justify-center tw-shadow-lg tw-backface-hidden">
                  <ArrowRight className="tw-w-8 tw-h-8 tw-mb-2 tw-text-sky-400 group-hover:tw-text-white tw-transition-colors" />
                  <h3 className="tw-font-bold tw-text-lg">{card.title}</h3>
                </div>
                {/* Back */}
                <div className="tw-absolute tw-inset-0 tw-bg-sky-900 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-p-4 tw-text-sm tw-font-medium tw-rotate-y-180 tw-backface-hidden">
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
