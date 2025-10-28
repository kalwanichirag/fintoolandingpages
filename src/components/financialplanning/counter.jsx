"use client";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";

export default function CounterAndVideoSection() {
    const counters = [
        { value: 18, suffix: "+", label: "years in the industry" },
        { value: 250, suffix: "+", label: "Corporate tie-ups" },
        { value: 250, suffix: "cr+", label: "Assets Under Management" },
        { value: 200000, suffix: "+", label: "Happy Clients" },
    ];

    const videos = [
        "https://www.youtube.com/embed/Bq7vHocVG14?si=z4TJq_G83qC0kJeD",
        "https://www.youtube.com/embed/3-MGUU4QWOc?si=aeInv3tkiy7lSihQ",
        "https://www.youtube.com/embed/akCsYoRcVfU?si=OYSHCDXRLP7_pn0A",
    ];

    const [countValues, setCountValues] = useState(counters.map(() => 0));

    useEffect(() => {
        const duration = 2000;
        const interval = 30;

        counters.forEach((counter, i) => {
            let start = 0;
            const end = counter.value;
            const step = Math.ceil(end / (duration / interval));

            const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                setCountValues((prev) => {
                    const updated = [...prev];
                    updated[i] = start;
                    return updated;
                });
            }, interval);
        });
    }, []);

    return (
        <>
            <section className="tw-max-w-6xl tw-mx-auto tw-bg-white tw-py-16 tw-text-center">
                {/* Counter Section */}
                <div className="tw-container tw-mx-auto tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-px-4">
                    {counters.map((item, i) => (
                        <div
                            key={i}
                            className="tw-bg-[#00132E] tw-text-white tw-rounded-lg tw-shadow-lg tw-py-8 tw-flex tw-flex-col tw-items-center tw-justify-center tw-relative"
                        >
                            <h2 className="tw-text-4xl tw-font-bold">
                                {countValues[i].toLocaleString()}
                                {item.suffix}
                            </h2>
                            <p className="tw-text-sm tw-mt-2">{item.label}</p>
                            <div className="tw-absolute tw-bottom-0 tw-w-3/4 tw-h-[2px] tw-bg-[#00B6F0] tw-mx-auto"></div>
                        </div>
                    ))}
                </div>

                {/* Video Section */}

            </section>
<section className="tw-bg-[#00132E]">
  <div className="tw-max-w-6xl tw-mx-auto tw-text-white tw-py-16 tw-mt-12 tw-px-4">
    <h2 className="tw-text-2xl tw-text-center md:tw-text-3xl tw-font-bold tw-mb-10">
      Here’s why our clients trust us with their portfolio management.
    </h2>
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-justify-center">
      {videos.map((url, index) => (
        <div
          key={index}
          className="tw-relative tw-w-full tw-overflow-hidden tw-rounded-lg tw-shadow-lg tw-aspect-video tw-bg-gray-800"
        >
          <iframe
            src={url + "modestbranding=1&showinfo=0&rel=0&controls=1"}
            title={`Video ${index + 1}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="tw-w-full tw-h-full tw-rounded-lg"
              ></iframe>
               
          </div>
          
      ))}
                       
    </div>
  </div>
</section>

        </>
    );
}
