import { CheckCircleIcon } from "lucide-react";

export default function Points() {
  const points = [
    {
      title: "Certified Expertise",
      desc: "Chartered financial planners and registered investment advisors trusted by HNIs across India.",
    },
    {
      title: "Personalized Planning",
      desc: "From retirement investment options to education investment plans, your goals drive our strategy.",
    },
    {
      title: "Best Investment Options",
      desc: "Access handpicked portfolios, systematic investment plans, and global wealth opportunities.",
    },
    {
      title: "Tax-Smart Strategies",
      desc: "Best tax saving plans and holistic financial planning services.",
    },
    {
      title: "Trusted Wealth Partner",
      desc: "Leading wealth management company in India, delivering discretion, performance, and legacy planning.",
    },
  ];

  return (
    <ul className="tw-space-y-6">
      {points.map((item, idx) => (
        <li key={idx} className="tw-flex tw-items-start tw-gap-3">
          <CheckCircleIcon className="tw-w-5 tw-h-5 tw-text-blue-400 tw-mt-1 tw-shrink-0" />
          <p>
            <span className="tw-font-semibold">{item.title} – </span>
            {item.desc}
          </p>
        </li>
      ))}
    </ul>
  );
}
