"use client";
import Image from "next/image";
import Points from "./point";
import LandingPageCalendly from "../landingpagesCalendly/LandingPageCalendly";
import "../../app/tailwind.css"

export const PersonalFinancialSections = () => {
  return (
    <section className="tw-bg-[#010920] tw-h-[100vh] tw-text-white tw-py-16 tw-px-6 md:tw-px-16 lg:tw-px-24 tw-flex">
      <div className="tw-max-w-7xl tw-mx-auto tw-grid md:tw-grid-cols-2 tw-gap-12 tw-items-center">
        {/* Left Section */}
        <div>
          <Image
            src="https://www.fintoo.in/wealthmanagement/wp-content/uploads/2024/10/Fintoo-White-Logo-With-Tag-Line-Transparent-BG-for-landing-apge.png"
            alt="Fintoo Logo"
            width={160}
            height={50}
            className="tw-mb-8"
          />

          <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-4">
            Wealth. Security. Growth. Tailored for India&apos;s.
          </h1>
          <p className="tw-text-gray-300 tw-mb-8 tw-leading-relaxed">
            Speak to Certified Financial Planners and a team of Chartered
            Financial Advisors. Grow, protect, and preserve your legacy.
          </p>

          <div className="tw-border-t tw-border-gray-600 tw-mb-8 tw-w-4/5"></div>

          <Points />
        </div>

        {/* Right Section */}
        <div className="tw-w-full tw-flex tw-justify-center md:tw-justify-end">
                             <LandingPageCalendly servicename={"assisted_advisory_fixed_fees"} calendlyurl={"https://calendly.com/d/2zt-z8p-34k/15-min-consultation-call-financial-planning?hide_event_type_details=1"} variant='minimal'/>

        </div>
      </div>
    </section>
  );
};
