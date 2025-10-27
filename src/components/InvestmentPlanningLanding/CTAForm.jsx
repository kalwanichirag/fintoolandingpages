"use client"
import React, { useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

export default function CTAForm() {
  const [showThankYou, setShowThankYou] = useState(false);

  // ✅ Listen for Calendly event scheduling
  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      console.log("Calendly event data:", e.data);

      const inviteeUri = e?.data?.payload?.invitee?.uri;
      if (!inviteeUri) return console.error("No invitee URI from Calendly");

      // Fetch full invitee details
      const r = await fetch(inviteeUri, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjQ4MjExMjQ0LCJqdGkiOiJmMmM1YWIwOC01N2ZiLTQ0YzAtODNjYy1lM2QxZWZhZGY2YzMiLCJ1c2VyX3V1aWQiOiI0ODVhZTAyZC02ZGNiLTQ1MjktODdiYi01MGY2NDE3NGI4ZWYifQ.5bIIwHH3DTn1Vp7Oj6hZlLkVIbI1q7jxqFogGaGkb1g",
        },
      });
      const inviteeData = await r.json();
      const resource = inviteeData?.resource;

      const qna = resource?.questions_and_answers || [];

      // ✅ Extract data (handles variations in spelling)
      const mobile =
        qna.find(
          (q) =>
            q.question.toLowerCase().includes("mobile number") ||
            q.question.toLowerCase().includes("moblie number") ||
            q.question.toLowerCase().includes("phone")
        )?.answer || "";

      const income =
        qna.find((q) =>
          q.question.toLowerCase().includes("annual income")
        )?.answer || "";

      // ✅ Prepare CRM payload
      const payload = {
        fullname: resource?.name || "",
        email: resource?.email || "",
        mobile: mobile,
        comment: income,
        servicename: "Investment Planning",
        plan_name: "Investment Plan",
        status: "Introductory meet",
        tags: "Callback_mintyApp_8",
        utm_source: "26",
        rm_id: "96",
        service: "98",
        tagval: "",
        skip_sms: "",
      };

      console.log("Sending to CRM:", payload);

      // ✅ Send to CRM
      fetch("https://www.fintoo.in/callback-services/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          const response = await res.json().catch(() => ({}));
          console.log("CRM Response:", response);
          setShowThankYou(true); // Show thank-you popup
        })
        .catch((err) => console.error("Error sending data:", err));
    },
  });

  return (
    <section
      id="cta-form-section"
      className="tw-py-20 tw-bg-gradient-to-r tw-from-fintoo-blue tw-to-blue-800"
    >
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-grid lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
          {/* Left Side */}
          <div className="tw-text-white tw-space-y-8">
            <div className="tw-flex tw-flex-wrap tw-gap-3 tw-mb-6">
              <div className="tw-bg-white tw-text-fintoo-blue tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium tw-border tw-border-white/20">
                <i className="fas fa-gift tw-mr-2 tw-text-fintoo-blue"></i>
                Free Consultation
              </div>
              <div className="tw-bg-white tw-text-fintoo-blue tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium tw-border tw-border-white/20">
                <i className="fas fa-clock tw-mr-2 tw-text-fintoo-blue"></i>
                30-Min Session
              </div>
              <div className="tw-bg-white tw-text-fintoo-blue tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium tw-border tw-border-white/20">
                <i className="fas fa-user-graduate tw-mr-2 tw-text-fintoo-blue"></i>
                Certified Advisors
              </div>
            </div>

            <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-bold tw-leading-tight">
              Plan Smarter.{" "}
              <span className="tw-text-fintoo-orange">Invest Better</span>.
              Grow Confidently.
            </h2>

            <p className="tw-text-xl tw-text-blue-100 tw-leading-relaxed">
              Schedule your complimentary 1-on-1 wealth planning session with a
              certified Fintoo financial advisor today.
            </p>
          </div>

          {/* Right Side Calendly */}
          <div className="tw-bg-white tw-rounded-3xl tw-p-8 tw-shadow-2xl">
            <div className="tw-text-center tw-mb-8">
              <h3 className="tw-text-3xl tw-font-bold tw-text-fintoo-blue tw-mb-2">
                Book Your Free Consultation
              </h3>
              <p className="tw-text-gray-600">
                Start your wealth transformation journey today
              </p>
            </div>

            <InlineWidget url="https://calendly.com/d/cxbp-w25-r83/15-minute-consultation-call-for-investment-planning?hide_event_type_details=1" />

            <div className="tw-text-center tw-text-sm tw-text-gray-500">
              <i className="fas fa-shield-alt tw-mr-1"></i>100% Secure &
              Confidential
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Thank You Popup */}
      {showThankYou && (
        <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/60 tw-z-50">
          <div className="tw-bg-white tw-rounded-2xl tw-px-8 tw-py-10 tw-text-center tw-max-w-md tw-shadow-2xl">
            <h3 className="tw-text-2xl tw-font-bold tw-text-fintoo-blue tw-mb-4">
              Thank You!
            </h3>
            <p className="tw-text-xl tw-text-gray-600 tw-mb-6">
              Your consultation has been successfully scheduled. Our advisor
              will connect with you soon.
            </p>
            <button
              onClick={() => setShowThankYou(false)}
              className="tw-bg-fintoo-blue tw-text-white tw-px-6 tw-py-3 tw-rounded-full tw-font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
