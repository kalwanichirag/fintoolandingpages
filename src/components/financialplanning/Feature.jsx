"use client";

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const Feature = () => {
    const featuredLogos = [
        'https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-5.png',
        'https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-6.png',
        'https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-4.png',
        'https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-8.png',
        'https://www.fintoo.in/wealthmanagement/wp-content/uploads/2022/12/Untitled-design-7.png',
        
      
    ]


    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        gap:10,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    }
    return (

        <section className="tw-py-16 tw-text-center">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-8 tw-text-black">Featured In</h2>
            <div className="tw-mx-auto tw-max-w-6xl container">
                <Slider {...sliderSettings}>
                    {featuredLogos.map((logo, index) => (
                        <div key={index} className="!tw-flex tw-justify-center tw-items-center">
                            <img src={logo} alt="featured"  className='!tw-object-contain' />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}
