"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import SecuritySection from "@/components/HTML/SecuritySection";
import BondInvestmentHeaderSection from "@/components/HTML/BondInvestment/BondInvestmentHeader";
import WhyChooseBondInvestmentSection from "@/components/HTML/BondInvestment/WhyChooseBondInvestmentSection";
import BondinvestmentVideoSection from "@/components/HTML/BondInvestment/BondInvestmentVideoSection";
import Fullpage from "@/components/Layouts/Fullpage";
import ThankyouSection from "@/components/ThankyouSection";
import dynamic from "next/dynamic";
const AppointmentBox = dynamic(() => import("../../components/Calendly"), { ssr: false });
import FaqSection from '@/components/HTML/BondInvestment/FaqSection';

import Cookies from 'js-cookie'
function BondInvestment() {

  const [show, setShow] = useState(false);
  const [pageurl, setPageurl] = useState();
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const extractParametersFromURL = () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const utmSourceParam = urlSearchParams.get("utm_source");
      const tagvalParam = urlSearchParams.get("tags");

      if (utmSourceParam || tagvalParam) {
        setUtmSource(utmSourceParam);
        setTagval(tagvalParam);
        setPageurl(window.location.pathname);

        const cookieOptions = { expires: 0.0208 }; // ~30 minutes
        Cookies.set("utm_source", utmSourceParam || "", cookieOptions);
        Cookies.set("tagval", tagvalParam || "", cookieOptions);
        Cookies.set("pageurl", window.location.pathname, cookieOptions);
      } else {
        const storedUtmSource = Cookies.get("utm_source") || null;
        const storedTagval = Cookies.get("tagval") || null;
        const storedPageurl = Cookies.get("pageurl") || null;

        setUtmSource(storedUtmSource);
        setTagval(storedTagval);
        setPageurl(storedPageurl);
      }
    };

    extractParametersFromURL();

    window.addEventListener("popstate", extractParametersFromURL);
    return () => {
      window.removeEventListener("popstate", extractParametersFromURL);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const hasCookies =
        Cookies.get("utm_source") ||
        Cookies.get("tagval") ||
        Cookies.get("pageurl");

      if (!hasCookies) {
        setUtmSource(utmSource);
        setTagval(null);
        setPageurl(null);
      }
    }, 500);
      return () => clearInterval(interval);
        }, [utmSource]);
      
        useEffect(() => {
          if (typeof document !== "undefined") {
            document.body.classList.add("MainDivRemove");
          }
        }, []);


  return (
    <Fullpage>
    <Head>
        <title>Best Online Bond Investment Platform</title>
        <meta
          name="description"
          content="Explore all available bonds, select the ones that match your requirements, and invest for a secure and profitable financial future."
        />
      </Head>

      <div style={{ backgroundColor: "white" }}>
        <BondInvestmentHeaderSection />
        <WhyChooseBondInvestmentSection />
        <BondinvestmentVideoSection />
        <SecuritySection />
        {/* <FaqSection /> */}
        <section
          style={{

          }}
          id="bondInvestmentContact"
        >
          {utmSource && tagval ? (
            <AppointmentBox
              extraParams={{ "utm_source": utmSource, "service": 98 }}
              eventCode={tagval}
              serviceName="Bonds"
              eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-bond-investment?hide_event_type_details=1"}
              planId = "47"
            />
          ) : (
            <AppointmentBox
              eventCode={'Callback_mintyApp_33'}
              serviceName="Bonds"
              eventUrl={"https://calendly.com/fintoo/15-min-consultation-call-bond-investment?hide_event_type_details=1"}
              planId = "47"
            />
          )}
          {/* <AppointmentBox eventCode={'Callback_mintyApp_33'} serviceName="Bonds" eventUrl="https://calendly.com/fintoo/15-min-consultation-call-bond-investment?hide_event_type_details=1" /> */}
          {/* <WealthContactForm imgSrc={backImg} serviceType={servicesTypes.bondInvestment} onSuccess={() => SetShow(true)} /> */}
        </section>
        <FaqSection />
        {show && <ThankyouSection onClose={() => SetShow(false)} />}
      </div>
    </Fullpage>
  );
}

export default BondInvestment;