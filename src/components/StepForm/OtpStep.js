"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./StepFrom.module.css";
import { apiCall } from "@/app/common_utilities";
import { BASE_API_URL } from "@/app/constants";
import { ArrowLeft } from "lucide-react";

export default function OtpStep({ formData, onVerifySuccess, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(120);
  const refs = Array.from({ length: 5 }, () => useRef(null));

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleInput = (value, index) => {
    if (/^\d?$/.test(value)) {
      const copy = [...otp];
      copy[index] = value;
      setOtp(copy);
      if (value && refs[index + 1]?.current) refs[index + 1].current.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some((x) => !x)) return setError("Please enter full OTP");

    try {
      const result = await apiCall(
        "/api/verifyotp",
        { otp: otp.join(""), mobile_number: formData.mobile },
        false,
        false
      );
      console.log("📥 OTP Verify Response:", result);

if (result?.error_code == 100 || result?.error_code === "100") {
        console.log("✅ OTP Verified — Triggering Calendly Step");
  localStorage.setItem("fintoo_user", JSON.stringify(formData));

        onVerifySuccess();
      } else {
        setError(result?.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("❌ Verification Error:", err);
      setError("Verification failed. Try again.");
    }
  };

  return (
    <div className={styles.card}>
      {/* 🔙 Back Arrow Icon (Lucide) */}
      <button className={styles.backArrow} onClick={onBack} aria-label="Go Back">
        <ArrowLeft size={24} /> 
      </button>

      <img
        src="https://www.fintoo.in/web/static/media/wp/Fintoologo_.svg"
        alt="logo"
        className={styles.logo}
      />
      <h2>Two-Factor Verification</h2>
      <p>Enter the verification code sent to</p>
      <p className={styles.masked}>{`******${formData.mobile.slice(-4)}`}</p>

      <div className={styles.otpContainer}>
        {otp.map((val, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={val}
            onChange={(e) => handleInput(e.target.value, i)}
            maxLength={1}
          />
        ))}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button onClick={handleVerify} className={styles.primaryBtn}>
        Verify OTP
      </button>

      <p className={styles.timer}>
        Didn’t get the code?{" "}
        {countdown > 0 ? (
          <span>
            Resend in {Math.floor(countdown / 60)}:
            {("0" + (countdown % 60)).slice(-2)}
          </span>
        ) : (
          <span className={styles.resend} onClick={() => setCountdown(120)}>
            Resend
          </span>
        )}
      </p>
    </div>
  );
}
