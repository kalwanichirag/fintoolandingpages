"use client";
import { FileText, TrendingUp, BarChart3, PiggyBank, Users, Percent } from "lucide-react";

export default function WeDeliver() {
  const services = [
    {
      title: "Financial Planning",
      desc: "An expert-curated personalised financial plan that helps you navigate the best way to achieve your goals.",
      icon: <FileText className="tw-w-10 tw-h-10 tw-text-sky-400 group-hover:tw-text-white tw-transition-all tw-duration-300" />,
    },
    {
      title: "Tax Planning",
      desc: "Complete tax planning guidance to ensure maximum savings.",
      icon: <BarChart3 className="tw-w-10 tw-h-10 tw-text-sky-400 group-hover:tw-text-white tw-transition-all tw-duration-300" />,
    },
    {
      title: "Investment Planning",
      desc: "Step-by-step assistance in making and managing the right investments based on your risk profile, preferences, and needs.",
      icon: <TrendingUp className="tw-w-10 tw-h-10 tw-text-sky-400 group-hover:tw-text-white tw-transition-all tw-duration-300" />,
    },
    {
      title: "Retirement Planning",
      desc: "Retire on your terms and live a financially secure retired life with your desired income.",
      icon: <PiggyBank className="tw-w-10 tw-h-10 tw-text-sky-400 group-hover:tw-text-white tw-transition-all tw-duration-300" />,
    },
    {
      title: "Equity management",
      desc: "Private equity management for effective wealth creation.",
      icon: <Users className="tw-w-10 tw-h-10 tw-text-sky-400 group-hover:tw-text-white tw-transition-all tw-duration-300" />,
    },
    {
      title: "Risk Management",
      desc: "Get tailored protection and risk management solutions to mitigate risk exposures.",
      icon: <Percent className="tw-w-10 tw-h-10 tw-text-sky-400 group-hover:tw-text-white tw-transition-all tw-duration-300" />,
    },
  ];

  return (
    <section className="tw-bg-[#031735] tw-py-16 tw-text-white tw-text-center">
      <h2 className="tw-text-4xl   tw-font-extrabold tw-mb-12">We Deliver</h2>
      <div className="tw-grid tw-gap-6 tw-max-w-6xl tw-px-4  tw-mx-auto tw-grid-cols-1 md:tw-grid-cols-2 ">
        {services.map((service, i) => (
          <div
            key={i}
            className="tw-border tw-border-gray-500 tw-rounded-lg tw-p-4 lg:tw-p-8 tw-flex tw-items-start  tw-border-white tw-border-solid tw-gap-5 tw-bg-[#031735] hover:tw-bg-sky-900 tw-transition-all tw-duration-300 group"
          >
            <div>{service.icon}</div>
            <div className="tw-text-left">
              <h3 className="tw-font-semibold tw-text-lg tw-mb-0 tw-pb-0">{service.title}</h3>
              <p className="tw-text-sm tw-text-gray-300 tw-mt-1 tw-mb-0">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
