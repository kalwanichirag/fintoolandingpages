"use client"
import { useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

export default function FinalCTA() {
  const [showThankYou, setShowThankYou] = useState(false);

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      console.log("Calendly event data:", e.data);

      const inviteeUri = e?.data?.payload?.invitee?.uri;
      if (!inviteeUri) return console.error("No invitee URI from Calendly");

      // Fetch full invitee data
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

// Normalize question text to catch both "Mobile Number" and "Moblie Number"
const mobile = qna.find(q =>
  q.question.toLowerCase().includes("mobile number") ||
  q.question.toLowerCase().includes("moblie number") ||
  q.question.toLowerCase().includes("phone")
)?.answer || "";

const income = qna.find(q =>
  q.question.toLowerCase().includes("annual income")
)?.answer || "";
      // Build CRM payload
      const payload = {
        fullname: resource?.name || "",
        email: resource?.email || "",
        mobile: mobile,
        comment: income,
        servicename: "Retirement Planning",
        plan_name: "Retirement Plan",
        status: "Introductory meet",
        tags: "Callback_mintyApp_8",
        utm_source: "26",
        rm_id: "96",
        service: "98",
        tagval: "",
        skip_sms: "",
      };

      console.log("Sending to CRM:", payload);

      // Send to CRM
      fetch("https://www.fintoo.in/callback-services/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          const response = await res.json().catch(() => ({}));
          console.log("CRM Response:", response);
          setShowThankYou(true); // ✅ Show thank-you popup
        })
        .catch((err) => console.error("Error sending data:", err));
    },
  });


  return (
    <section id="final-cta" className="tw-py-20 tw-bg-white">
      <div className="tw-container tw-mx-auto tw-px-6">
        <div className="tw-text-center tw-mb-12">
          <h2 className="tw-text-3xl lg:tw-text-6xl tw-font-bold tw-text-fintoo-blue tw-mb-6">
            Your Retirement Won't Plan Itself.{" "}
            <span className="tw-text-fintoo-orange">Let's Do It Together.</span>
          </h2>
          <p className="tw-text-base lg:tw-text-xl lg:tw-text-2xl tw-text-gray-600 tw-mb-8 tw-max-w-4xl tw-mx-auto tw-leading-relaxed">
            Book your complimentary consultation and take the first step towards your early retirement plan.
          </p>
        </div>

        <div className="tw-grid lg:tw-grid-cols-2 tw-gap-16 tw-items-center tw-max-w-7xl tw-mx-auto">
          <div>
            <img
              className="tw-w-full tw-h-auto tw-max-h-[400px] sm:tw-max-h-[500px] tw-object-cover tw-rounded-2xl tw-shadow-2xl"
              src={"images/retirement/image-4.jpg"}
              alt="Indian couple planning retirement"
            />
            <div className="tw-mt-8 tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-text-center"><div className="tw-flex tw-flex-col tw-items-center"><div className="tw-bg-blue-100 tw-p-4 tw-rounded-full tw-mb-4"><i className="fa-solid fa-clock tw-text-2xl tw-text-blue-600"></i></div><div className="tw-font-semibold tw-text-fintoo-blue">Free 30-Minute Session</div><div className="tw-text-sm tw-text-gray-500">No obligations, just expert advice</div></div><div className="tw-flex tw-flex-col tw-items-center"><div className="tw-bg-green-100 tw-p-4 tw-rounded-full tw-mb-4"><i className="fa-solid fa-user-tie tw-text-2xl tw-text-green-600"></i></div><div className="tw-font-semibold tw-text-fintoo-blue">Certified Experts</div><div className="tw-text-sm tw-text-gray-500">SEBI registered advisors</div></div><div className="tw-flex tw-flex-col tw-items-center"><div className="tw-bg-orange-100 tw-p-4 tw-rounded-full tw-mb-4"><i className="fa-solid fa-chart-line tw-text-2xl tw-text-orange-600"></i></div><div className="tw-font-semibold tw-text-fintoo-blue">Proven Results</div><div className="tw-text-sm tw-text-gray-500">Average 18% returns</div></div></div>
          </div>

          <div className="tw-bg-gradient-to-br tw-from-fintoo-blue tw-to-blue-800 tw-rounded-3xl tw-p-6 sm:tw-p-8 lg:tw-p-12 tw-text-white">
            <div className="tw-text-center tw-mb-8">
              <h3 className="tw-text-3xl tw-font-bold tw-mb-4">Get Your Free Consultation</h3>
              <p className="tw-text-lg tw-opacity-90">
                Book a time below, and our advisor will connect with you soon.
              </p>
            </div>

            <InlineWidget url="https://calendly.com/d/cwkx-wvw-y7t/15-minute-consultation-call-for-retirement-planning?hide_event_type_details=1" />
          </div>
        </div>

        {showThankYou && (
          <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/60 tw-z-50">
            <div className="tw-bg-white tw-rounded-2xl tw-px-8 tw-py-10 tw-text-center tw-max-w-md tw-shadow-2xl">
              <h3 className="tw-text-2xl tw-font-bold tw-text-fintoo-blue tw-mb-4 tw-pb-0">Thank You!</h3>
              <p className="tw-text-xl tw-text-gray-600 tw-mb-6">
                Your consultation has been successfully scheduled. Our advisor will connect with you soon.
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
      </div>
    </section>
  );
}
