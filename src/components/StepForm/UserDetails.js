"use client";
import { useState } from "react";
import styles from "./StepFrom.module.css";
import { apiCall } from "@/app/common_utilities";
import { BASE_API_URL } from "@/app/constants";
import { FaWhatsapp } from "react-icons/fa";

export default function UserDetails({ formData, setFormData, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullname: "",
    mobile: "",
    email: "",
  });

  const validate = () => {
    const newErrors = { fullname: "", mobile: "", email: "" };
    if (!formData.fullname.trim()) newErrors.fullname = "Name is required.";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    setErrors(newErrors);
    return !Object.values(newErrors).some((v) => v);
  };

  // 🔹 Manual validation for triggering WebEngage
  const validateFieldManually = (fieldName, value) => {
    switch (fieldName) {
      case "fullname":
        return /^[A-Za-z\s]{2,}$/.test(value.trim());
      case "mobile":
        return /^[1-9]{1}[0-9]{9}$/.test(value.trim());
      case "email":
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.trim());
      default:
        return false;
    }
  };

  // 🔹 WebEngage event trigger on blur
  const handleBlurManual = (fieldName, value) => {
    const isValid = validateFieldManually(fieldName, value);

    if (isValid && typeof webengage !== "undefined") {
      switch (fieldName) {
        case "fullname":
          webengage.track("name entered", { name: value ?? "" });
          console.log("webengage event trigger - name entered", { name: value });
          break;
        case "mobile":
          webengage.track("phone entered", { phone: value ?? "" });
          console.log("webengage event trigger - phone entered", { phone: value });
          break;
        case "email":
          webengage.track("email entered", { email: value ?? "" });
          console.log("webengage event trigger - email entered", { email: value });
          break;
      }
    }
  };

  // 🔹 OTP Send Function
  const sendOtp = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      console.log("📤 Sending OTP request...");
      const result = await apiCall(
      "/api/sendotp"
,
        { mobile_number: formData.mobile },
        false,
        false
      );

      console.log("📥 OTP API Response:", result);

      if (!result) {
        setErrors((prev) => ({ ...prev, mobile: "No response from server." }));
        return;
      }

      if (result.error_code == 100) {
        console.log("✅ OTP Sent Successfully");

        // 🔹 Track successful OTP send event
        if (typeof webengage !== "undefined") {
          webengage.track("otp sent", {
            mobile: formData.mobile,
            email: formData.email,
            name: formData.fullname,
          });
          console.log("webengage event trigger - otp sent");
        }

        onSuccess();
      } else {
        setErrors((prev) => ({
          ...prev,
          mobile: result.message || "Failed to send OTP.",
        }));
      }
    } catch (e) {
      console.error("❌ OTP Send Error:", e);
      setErrors((prev) => ({
        ...prev,
        mobile: "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <img
        src="https://www.fintoo.in/web/static/media/wp/Fintoologo_.svg"
        alt="logo"
        className={styles.logo}
      />
      <div className={styles.logoborder}></div>

      <h2 className={styles.title}>Enter Details</h2>

      {/* NAME FIELD */}
      <div className="mb-4">
        <label>Name *</label>
        <input
          type="text"
          value={formData.fullname}
          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          onBlur={() => handleBlurManual("fullname", formData.fullname)}
          className={errors.fullname ? styles.errorInput : ""}
        />
        {errors.fullname && <p className={styles.error}>{errors.fullname}</p>}
      </div>

      {/* MOBILE FIELD */}
      <div className="mb-4">
        <label>Mobile Number *</label>
        <div className={styles.numberinput}>
          <img
            alt="IN"
            src="https://www.fintoo.in/web/static/media/flagIndia.svg"
            className={styles.INDimg}
          />
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setFormData({ ...formData, mobile: val });
            }}
            onBlur={() => handleBlurManual("mobile", formData.mobile)}
            className={errors.mobile ? styles.errorInput : ""}
            maxLength={10}
          />
        </div>
        {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
      </div>

      {/* EMAIL FIELD */}
      <div className="mb-4">
        <label>Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={() => handleBlurManual("email", formData.email)}
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      {/* CHECKBOXES */}
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked
            disabled
            onClick={() => {
              if (typeof webengage !== "undefined") {
                webengage.track("terms and conditions clicked");
                console.log("webengage event trigger - terms and conditions clicked");
              }
            }}
          />
          <div>
            I agree to the{" "}
            <a
              href="https://www.fintoo.in/web/terms-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              href="https://www.fintoo.in/web/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={formData.whatsapp || true}
            onChange={(e) => {
              setFormData({ ...formData, whatsapp: e.target.checked });
              if (typeof webengage !== "undefined") {
                webengage.track("whatsapp opt in", {
                  "WhatsApp Opt In": e.target.checked ? "True" : "False",
                });
                console.log("webengage event trigger - whatsapp opt in", {
                  "WhatsApp Opt In": e.target.checked ? "True" : "False",
                });
              }
            }}
          />
          <div>
            Subscribe me for <FaWhatsapp color="#25D366" /> notifications
          </div>
        </label>
      </div>

      <button onClick={sendOtp} disabled={loading} className={styles.primaryBtn}>
        {loading ? "Sending..." : "Continue"}
      </button>
    </div>
  );
}
