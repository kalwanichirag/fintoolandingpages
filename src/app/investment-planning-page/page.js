"use client";
import AdvisorycardSection from "../../components/HTML/InvestmentPlanning/AdvisorySection";
import HeaderSection from "../../components/HTML/InvestmentPlanning/HeaderSection";
import FaqSection from "../../components/HTML/InvestmentPlanning/FaqSection";
import SecuritySection from "../../components/HTML/SecuritySection";
import Fullpage from "../../components/Layouts/Fullpage";

import React from "react";
import { useEffect, useRef, useState }  from "react"
import ThankyouSection from "../../components/ThankyouSection";
import KeyDifferentiators from "../../components/HTML/InvestmentPlanning/KeyDifferentiators";
import Equity_Offerings from "../../components/HTML/InvestmentPlanning/Equity_Offerings";
import DebtInvestments from "../../components/HTML/InvestmentPlanning/DebtInvestments";
import AlternateInvestments from "../../components/HTML/InvestmentPlanning/AlternateInvestments";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from 'js-cookie'
const InvestPlanning = () => {
  const [show, setShow] = useState(false);
  const [pageurl, setPageurl] = useState();
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);
  const AdvisorycardSectionRef = useRef(null);

  // Next.js hooks for URL info
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract UTM parameters and cookies
  useEffect(() => {
    function extractParametersFromURL() {
      const utmSourceParam = searchParams.get("utm_source");
      const tagvalParam = searchParams.get("tags");

      if (utmSourceParam || tagvalParam) {
        setUtmSource(utmSourceParam);
        setTagval(tagvalParam);
        setPageurl(pathname);

        const cookieOptions = { expires: 0.0208 }; // ~30 minutes
        Cookies.set("utm_source", utmSourceParam || "", cookieOptions);
        Cookies.set("tagval", tagvalParam || "", cookieOptions);
        Cookies.set("pageurl", pathname, cookieOptions);
      } else {
        const storedUtmSource = Cookies.get("utm_source") || null;
        const storedTagval = Cookies.get("tagval") || null;
        const storedPageurl = Cookies.get("pageurl") || null;

        setUtmSource(storedUtmSource);
        setTagval(storedTagval);
        setPageurl(storedPageurl);
      }
    }

    extractParametersFromURL();
  }, [pathname, searchParams]);

  // Fallback interval to reset values if cookies disappear
  useEffect(() => {
    const interval = setInterval(() => {
      if (!Cookies.get("utm_source") && !Cookies.get("tagval") && !Cookies.get("pageurl")) {
        setUtmSource(utmSource);
        setTagval(null);
        setPageurl(null);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [utmSource]);

  // Scroll to Advisory section if hash present
  useEffect(() => {
    if (window.location.hash === "#AdvisorycardSection" && AdvisorycardSectionRef.current) {
      AdvisorycardSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);
    return (
      <div className="Customp">
    <Fullpage>
      <HeaderSection />
      <p style={{ height: "6rem" }} ref={AdvisorycardSectionRef}></p>
      <AdvisorycardSection />
      <section
        style={{
          backgroundColor: "rgb(230, 234, 239)",
        }}
      >
        <KeyDifferentiators />
        {/* <StepsInvestmentPlan /> */}
      </section>
      <Equity_Offerings />

      {/* <section
        style={{
          backgroundColor: "#fff",
        }}
      >
        {/* <StepsInvestmentPlan /> */}
      {/* </section> */}
      <section
        style={{
          backgroundColor: "rgb(230, 234, 239)",
        }}
      >
        <DebtInvestments />
      </section>
      <AlternateInvestments />
      {/* <YoutubevideoSection /> */}
      <SecuritySection DynamicBgColor={"rgb(230, 234, 239)"} />
      {/* <section style={{}} id="book-appointment">

        {utmSource && tagval ? (
          <AppointmentBox
            extraParams={{ "utm_source": utmSource, "service": 98 }}
            eventCode={tagval}
            serviceName="Investment Planning"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-investment-planning"
            planId="18"
          />
        ) : (
          <AppointmentBox
            eventCode={'Callback_mintyApp_57'}
            serviceName="Investment Planning"
            eventUrl="https://calendly.com/fintoo/15-min-consultation-call-investment-planning"
            planId="18"
          />
        )}
      </section> */}
      <FaqSection />
      {show && <ThankyouSection onClose={() => SetShow(false)} />}
            </Fullpage>
            </div>
  );
};
export default InvestPlanning;
