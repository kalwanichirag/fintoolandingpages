"use client";
import { useState, useEffect } from "react";
import styles from "./StepFrom.module.css";
import UserDetails from "./UserDetails";
import OtpStep from "./OtpStep";
import CalendlyStep from "./CalendlyStep";

export default function StepForm({ eventUrl, eventCode, serviceName }) {


  const [step, setStep] = useState("DETAILS");
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    
    const saved = localStorage.getItem("fintoo_user");
if (saved) {
  const user = JSON.parse(saved);
  setFormData(user);
  setStep("CALENDLY");
} else {
  console.log("⚠️ No saved user data found");
}

  }, []);

  const nextStep = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setStep("OTP");
  };

  const verified = () => setStep("CALENDLY");

  const goBack = () => setStep("DETAILS");

  return (
    <div className="container py-5 my-md-4 questiontitlehd">
            <h3 className={styles.questionTitle}>GOT QUESTIONS? LET'S TALK!</h3>

  <div className="row align-items-center">
        <div className="col-md-6 questiontitle">
          <h3 className={styles.schedule}>
            Schedule a Call with Our Financial Advisor and Get Expert Insights Today!

          </h3>
    </div>
    <div className="col-md-6">
      <div className={styles.formWrapper}>
        {step === "DETAILS" && (
          <UserDetails
            formData={formData}
            setFormData={setFormData}
            onSuccess={nextStep}
          />
        )}
        {step === "OTP" && (
          <OtpStep
            formData={formData}
            onVerifySuccess={verified}
            onBack={goBack}
          />
        )}
        {step === "CALENDLY" && (
          <CalendlyStep
            formData={formData}
            eventUrl={eventUrl}
            eventCode={eventCode}
            serviceName={serviceName}
          />
        )}
      </div>
    </div>
  </div>
</div>

  );
}
