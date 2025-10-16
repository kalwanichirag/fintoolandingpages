"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./style.module.css";
import { FcGoogle } from "react-icons/fc";
import Avatar from "react-avatar";
import { usePathname } from "next/navigation";

export default function ClientReviews() {
  const pathname = usePathname();
  const [pageurl, setPageurl] = useState(false);

  useEffect(() => {
    setPageurl(pathname);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.add("Client-Slider");
    return () => {
      document.body.classList.remove("Client-Slider");
    };
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "4rem",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const isFHCPage = pageurl === "/web/financial-health-checkup" || pageurl === "/web/financial-health-checkup/";

  const testimonials = [
    {
      name: "Vijay Rajagopal",
      review: "Very happy with the services provided by Fintoo so far. We consulted with them for Financial planning and we feel very comfortable that we have reached out to the right people for advise. Their response is also very prompt. Shout out to our advisor Meghna Jain for taking time to explain things patiently and always putting customer first and chalking out an action plan with us to help us achieve our goals.",
      avatar: null,
    },
    {
      name: "Shivaranjan Guru",
      review: "I have been using Fintoo's expertise on my financial planning since few months and it's been a very useful journey so far. Meghna who has been coordinating and communicating has been very prompt and approachable. The plans she shared looked very practical and holistic. Hoping the journey to continue for long and fruitful.",
      avatar: "https://lh3.googleusercontent.com/a-/ACB-R5QjkST2h8iF4EsRxEo2XRK1ULyLvJY3aOVamfw0M94=s40-c-c0x00000000-cc-rp-mo-br100",
    },
    {
      name: "Manish Sharma",
      review: "I am with Fintoo since last 6 months and since then I am getting all the possible help from them in the financial world. They helped me in creating financial plan for future on the basis of my earnings and also recommended some investments, all the things were also thoroughly discussed with me. They also helps in keeping you market aware with best stock recommendations. I want to thanks Ms. Palak Mundhra for all till now and also looking forward for more interesting investments.",
      avatar: "https://lh3.googleusercontent.com/a-/ACB-R5RnHLBlfcfru2eox0Nt9PQlkD7Qa61r2bYgcZzByDM=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
    },
    {
      name: "Bhagat Singh",
      review: "It has been a great journey with Fintoo so far. I am consulting them for financial planning and they have not disappointed me in their methods, research and the plan was custom made to fit my needs and goals. Special thanks to Mr. Kosar and Ms. Kiran for their valuable and prompt support on any financial query that I have.",
      avatar: "https://lh3.googleusercontent.com/a-/ACB-R5SHuGIJoXuNTiCv0BvRdKiwT81kytYRhXaacUkNCJM=s40-c-c0x00000000-cc-rp-mo-br100",
    },
    {
      name: "Sharad Kumar",
      review: "I am a client of Fintoo for many years by now. I had a wonderful experience with Ms Ragni for Income Tax revision filing. She helped me quite expeditiously and adroitly. I wish her and the company all luck.",
      avatar: null,
    },
    {
      name: "Mayank Pandey",
      review: "I have been customer of fintoo for last 10 months and I must say that am absolutely delighted with your service. It is really refreshing to work with Ms Harjas Kaur, my financial adviser who is truly interested in their client’s needs, circumstances and preferences. What really impressed me was the way you took the time to get a feeling for where I was at, your depth of knowledge, lateral thinking and your common sense approach. Your professional, ethical and caring demeanour elicits my trust and respect and I gladly recommend your services whenever possible.",
      avatar: null,
    },
    {
      name: "Rajyalakshmi Aravalli",
      review: "Fintoo is continuously helping me in my IT returns since last 9 years. Ragini Vasu is extremely good and constantly supporting me for IT returns. She is very approachable and have sound knowledge regarding IT returns. Many thanks to you ragini for all your nice gestures. Kudos to entire team.",
      avatar: null,
    },
    {
      name: "Sundaram Ragunathan",
      review: "I have been using Fintoo for the last four years . During 2020 pandemic setback our net worth had eroded and we were in for a shock. But our advisor Mr Koser advises us to maintain calm, to be patient and with his good effort resurrected the portfolio and it has almost come to pre pandemic level. Our retirement savings got “ saved “ thanks to Koser . Thanks a lot , our advisor- friend.",
      avatar: "https://lh3.googleusercontent.com/a-/ACB-R5RPHU4dcPJSqIWxOOY8WNMwNfcd11IIHOzvjBjr=s40-c-c0x00000000-cc-rp-mo-br100",
    },
    {
      name: "Sumeet Dash",
      review: "Fintoo help me with an personalized plan based on my earning potential and ready to change it as per my priority going forward. Helped me in fine tuning my equity portfolio. Thanks to Palak and team.",
      avatar: null,
    },
    {
      name: "Arunava C",
      review: "Meghna has done a brilliant job of organising my savings for my retirement. She understood my requirements and made a plan which is as per my risk appetite and goals. Your savings are in safe hands if you invest with Meghna Jain of Fintoo.",
      avatar: null,
    },
    {
      name: "Jyothy Jaikrishnan",
      review: "We have been associated with Fintoo for 14-15 yrs now. They have been giving us financial advisory services and managing our finance portfolio. Since my Husband's death, Fintoo team has been great in helping me understand my finances and especially Kosar Tidiwala who has been always available and approachable for me to ask questions, learn abt my finances and also make the right decisions. They have strengthened my financial stability to a great extent.",
      avatar: null,
    },
  ];

  return (
    <Slider {...settings} className={`${styles.SlideShow}`}>
      {testimonials.map((t, index) => (
        <a
          key={index}
          className="text-decoration-none"
          style={{ color: "#000" }}
          target="_blank"
          rel="noopener noreferrer"
          href={isFHCPage ? "#" : "https://www.google.com/search?q=fintoo"}
        >
          <div className={`ClientSlider ${styles.TestimonialCard}`}>
            <div className={`justify-content-between ${styles.TestimonialCardHeader}`}>
              <div className={`d-flex ${styles.CardProfile}`}>
                <div className={`${styles.CardProfileImg}`}>
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} />
                  ) : (
                    <Avatar googleId round name={t.name} size="40" textSizeRatio={1.75} />
                  )}
                </div>
                <div className={`ms-3 ${styles.profilecard}`}>
                  <div className={`${styles.ProfileName}`}>{t.name}</div>
                </div>
              </div>
              <div className={`${styles.socialIcon}`}>
                <FcGoogle />
              </div>
            </div>
            <div className={`${styles.clientReviewTxt}`}>
              <p>{t.review}</p>
            </div>
          </div>
        </a>
      ))}
    </Slider>
  );
}
