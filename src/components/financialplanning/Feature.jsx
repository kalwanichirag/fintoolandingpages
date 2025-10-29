"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Feature = () => {
  const featuredLogos = [
    "https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-5.png",
    "https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-6.png",
    "https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-4.png",
    "https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-8.png",
    "https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-7.png",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="tw-py-12 tw-bg-white tw-text-center">
      <h2 className="tw-text-2xl md:tw-text-4xl tw-font-bold tw-mb-10 tw-text-black">
        Featured In
      </h2>
      <div className="tw-max-w-6xl tw-mx-auto tw-px-6">
        <Slider {...sliderSettings}>
          {featuredLogos.map((logo, index) => (
            <div
              key={index}
              className="!tw-flex tw-justify-center tw-items-center tw-px-6"
            >
              <img
                src={logo}
                alt={`Featured logo ${index + 1}`}
                className="tw-h-12 sm:tw-h-16 md:tw-h-20 tw-w-auto tw-object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
