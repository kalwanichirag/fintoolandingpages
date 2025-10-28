"use client";
import Image from "next/image";

export default function TeamSection() {
    const team = [
        {
            name: "CA Manish Hingar",
            role: "Founder & CEO",
            img: "/images/manish-sir.png", // replace with actual image
        },
        {
            name: "Sneha Gupta",
            role: "Financial Coach",
            img: "/images/suchita-maam.png",
        },
        {
            name: "Rohit Mehta",
            role: "Investment Advisor",
            img: "/images/nikhil-sir.png",
        },
    ];

    return (
        <section className="tw-max-w-6xl tw-mx-auto  tw-py-16 tw-text-center tw-flex tw-flex-col tw-items-center">
            {/* Title */}
            <h2 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-[#00132E]">
                One Team... One Goal.
            </h2>
            <p className="tw-text-[#00132E]/80 tw-mt-2 tw-mb-10 tw-text-sm md:tw-text-base">
                Meet Our Team, Whose Only Goal Is To Assist You In Achieving Your Financial Independence.
            </p>

            {/* Team Cards */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-justify-items-center tw-gap-6   tw-px-4">
                {team.map((member, i) => (
                    <div
                        key={i}
                        className="tw-relative tw-bg-white tw-overflow-hidden tw-rounded-2xl tw-max-w-[200px] tw-group tw-cursor-pointer"
                    >
                        <div className="tw-overflow-visible tw-relative">
                            <Image
                                src={member.img}
                                alt={member.name}
                                width={200}
                                height={200}
                                className="tw-w-full tw-h-auto tw-object-cover tw-transition-transform tw-duration-500 group-hover:tw-scale-125"
                            />
                        </div>

                        <div className="tw-absolute tw-bottom-[-100%] tw-left-0 tw-right-0 tw-bg-[#00132E] tw-text-white tw-py-3 tw-transition-all tw-duration-500 group-hover:tw-bottom-0">
                            <h3 className="tw-font-semibold tw-text-base">{member.name}</h3>
                            <p className="tw-text-sm tw-text-gray-300">{member.role}</p>
                        </div>
                    </div>

                ))}
            </div>



        </section>
    );
}
