"use client";
import { useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

export default function CalendlyStep({ formData, eventUrl, eventCode, serviceName, planId }) {
  const [showThankYou, setShowThankYou] = useState(false);

  // ✅ Capture UTM params
  const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search);
    const utm = {};

    utm.utm_source = params.get("utm_source");
    utm.utm_medium = params.get("utm_medium");
    utm.utm_campaign = params.get("utm_campaign");
    utm.utm_term = params.get("utm_term");
    utm.utm_content = params.get("utm_content");
    utm.tags = params.get("tags");

    return utm;
  };

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      console.log("📅 Calendly Event Scheduled:", e.data);

      const inviteeUri = e?.data?.payload?.invitee?.uri;
      if (!inviteeUri) return console.error("❌ No invitee URI from Calendly");

      // 🔹 Fetch full invitee data
      const r = await fetch(inviteeUri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_TOKEN}`,
        },
      });

      const inviteeData = await r.json();
      const resource = inviteeData?.resource;
      const qna = resource?.questions_and_answers || [];

      // ✅ Extract fields
      const mobile =
        qna.find(
          (q) =>
            q.question.toLowerCase().includes("mobile") ||
            q.question.toLowerCase().includes("phone")
        )?.answer || formData.mobile;

      const income =
        qna.find((q) => q.question.toLowerCase().includes("income"))?.answer || "";

      // ✅ Get UTM params
      const utm = getUTMParams();

      // ✅ Use safe fallbacks (not 0)
      const utmSource = utm.utm_source && utm.utm_source !== "0" ? utm.utm_source : "26"; // default
      const serviceId = utm.utm_campaign && utm.utm_campaign !== "0" ? utm.utm_campaign : "98"; // default
      const tagVal = utm.tags && utm.tags.trim() !== "" ? utm.tags : "Calendly_Booking";

      // ✅ Construct backend payload
      const payload = {
        fullname: formData.fullname || resource?.name || "",
        email: formData.email || resource?.email || "",
        mobile: mobile || "",
        comment: income || "",
        servicename: serviceName || "Financial Planning",
        plan_name: planId || "Investment Plan",
        status: "Introductory meet",
        tags: tagVal,
        utm_source: utmSource,
        rm_id: "96",
        service: serviceId,
        tagval: "",
        skip_sms: "",
      };

      console.log("📦 Sending Lead Payload:", payload);

      // ✅ Send to backend
      fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          const response = await res.json().catch(() => ({}));
          console.log("✅ CRM Response:", response);
          setShowThankYou(true);
        })
        .catch((err) => console.error("❌ Error sending data:", err));
    },
  });

  // ✅ Prefill Calendly
  const prefillData = {
    name: formData.fullname,
    email: formData.email,
    customAnswers: {
      a2: formData.mobile.startsWith("+91") ? formData.mobile : `+91${formData.mobile}`,
    },
  };

  return (
    <InlineWidget
      url={eventUrl}
      styles={{ height: "500px", width: "100%" }}
      prefill={prefillData}
    />
  );
}
