"use client";

import React, { useEffect, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { generateLead } from "@/app/actions/generateLead";

const LandingPageCalendly = ({ servicename, calendlyurl, variant = "full" }) => {

  const [utmSource, setUtmSource] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const utm = urlParams.get("utm_source") || "";
      const tag = urlParams.get("tags") || "";
      setUtmSource(utm);
      setTags(tag);
    }
  }, []);

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      console.log("Calendly event data:", e.data);

      const inviteeUri = e?.data?.payload?.invitee?.uri;
      if (!inviteeUri) return console.error("No invitee URI from Calendly");

      const r = await fetch(inviteeUri, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQ4MjExMjQ0LCJqdGkiOiJmMmM1YWIwOC01N2ZiLTQ0YzAtODNjYy1lM2QxZWZhZGY2YzMiLCJ1c2VyX3V1aWQiOiI0ODVhZTAyZC02ZGNiLTQ1MjktODdiYi01MGY2NDE3NGI4ZWYifQ.5bIIwHH3DTn1Vp7Oj6hZlLkVIbI1q7jxqFogGaGkb1g",
        },
      });

      const inviteeData = await r.json();
      const resource = inviteeData?.resource;
      console.log(resource, "calendly full response");

      const qna = resource?.questions_and_answers || [];

      const mobile =
        qna.find((q) =>
          q.question.toLowerCase().includes("mobile") ||
          q.question.toLowerCase().includes("phone")
        )?.answer || "";

      const income =
        qna.find((q) => q.question.toLowerCase().includes("income"))?.answer || "";

      const payload = {
        full_name: resource?.name || "",
        email: resource?.email || "",
        tag: tags,
        services: Array.isArray(servicename)
          ? servicename
          : ["assisted_advisory_fixed_fees"],

        source: utmSource || "Website Callback",
        mobile,
        slab: income,
      };

      await generateLead(payload);
    },
  });

  if (variant === "minimal") {
    return (
      <div className="py-4 tw-w-full">
        <InlineWidget url={calendlyurl} />
      </div>
    );
  }

  return (
    <div className="py-5" style={{ background: "#042b62" }}>
      <div className="container">
        <div className="row align-items-center justify-content-betweeen g-md-5">
          <div className="col-lg-6">
            <h2 className="text-center text-white fs-2 fw-bold mb-4 mb-md-0">
              Book an introductory
              <span style={{ color: "#dd7300" }}>
                {" "}Complimentary 15 Minutes Call{" "}
              </span>
              with our Financial Experts to know more about our offerings and advice.
            </h2>
          </div>
          <div className="col-lg-6">
            <InlineWidget url={calendlyurl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageCalendly;
