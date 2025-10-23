"use client";
import AdvisorycardSection from "../../components/HTML/InvestmentPlanning/AdvisorySection";
import HeaderSection from "../../components/HTML/InvestmentPlanning/HeaderSection";
import FaqSection from "../../components/HTML/InvestmentPlanning/FaqSection";
import SecuritySection from "../../components/HTML/SecuritySection";
import Fullpage from "../../components/Layouts/Fullpage";
import ThankyouSection from "../../components/ThankyouSection";
import KeyDifferentiators from "../../components/HTML/InvestmentPlanning/KeyDifferentiators";
import Equity_Offerings from "../../components/HTML/InvestmentPlanning/Equity_Offerings";
import DebtInvestments from "../../components/HTML/InvestmentPlanning/DebtInvestments";
import AlternateInvestments from "../../components/HTML/InvestmentPlanning/AlternateInvestments";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function InvestmentPlanningContent() {
  const [show, setShow] = useState(false);
  const [pageurl, setPageurl] = useState();
  const [utmSource, setUtmSource] = useState(26);
  const [tagval, setTagval] = useState(null);
  const AdvisorycardSectionRef = useRef(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmSourceParam = searchParams.get("utm_source");
    const tagvalParam = searchParams.get("tags");

    if (utmSourceParam || tagvalParam) {
      setUtmSource(utmSourceParam);
      setTagval(tagvalParam);
      setPageurl(pathname);

      const cookieOptions = { expires: 0.0208 }; // ~30 mins
      Cookies.set("utm_source", utmSourceParam || "", cookieOptions);
      Cookies.set("tagval", tagvalParam || "", cookieOptions);
      Cookies.set("pageurl", pathname, cookieOptions);
    } else {
      setUtmSource(Cookies.get("utm_source") || null);
      setTagval(Cookies.get("tagval") || null);
      setPageurl(Cookies.get("pageurl") || null);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!Cookies.get("utm_source") && !Cookies.get("tagval") && !Cookies.get("pageurl")) {
        setUtmSource(null);
        setTagval(null);
        setPageurl(null);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
        <section style={{ backgroundColor: "rgb(230, 234, 239)" }}>
          <KeyDifferentiators />
        </section>
        <Equity_Offerings />
        <section style={{ backgroundColor: "rgb(230, 234, 239)" }}>
          <DebtInvestments />
        </section>
        <AlternateInvestments />
        <SecuritySection DynamicBgColor={"rgb(230, 234, 239)"} />
        <FaqSection />
        {show && <ThankyouSection onClose={() => setShow(false)} />}
      </Fullpage>
    </div>
  );
}

// ✅ Wrapped inside Suspense for Next.js 13+ (App Router)
export default function InvestPlanning() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvestmentPlanningContent />
    </Suspense>
  );
}
