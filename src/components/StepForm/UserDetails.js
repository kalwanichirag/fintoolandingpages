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

  const sendOtp = async () => {
  if (!validate()) return;
  setLoading(true);
  try {
    console.log("📤 Sending OTP request...");
    const result = await apiCall(
      BASE_API_URL + "restapi/sendotpapi/",
      { mobile_number: formData.mobile },
      false, // 🔄 Try changing to true if backend expects encrypted data
      false
    );

    console.log("📥 OTP API Response:", result);

    if (!result) {
      setErrors((prev) => ({ ...prev, mobile: "No response from server." }));
      return;
    }

    // Sometimes API returns string numbers ("100"), so check loosely
    if (result.error_code == 100) {
      console.log("✅ OTP Sent Successfully");
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
        onChange={(e) =>
          setFormData({ ...formData, fullname: e.target.value })
        }
        className={errors.fullname ? styles.errorInput : ""}
      />
      {errors.fullname && <p className={styles.error}>{errors.fullname}</p>}
          </div>
          <div className="mb-4">
      {/* MOBILE FIELD */}
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
            // Only digits allowed
            const val = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, mobile: val });
          }}
          className={errors.mobile ? styles.errorInput : ""}
          maxLength={10}
        />
      </div>
      {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
          </div>
          <div className="mb-4">
      {/* EMAIL FIELD */}
      <label>Email *</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        className={errors.email ? styles.errorInput : ""}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
</div>
      {/* CHECKBOXES */}
      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
                  <input type="checkbox" checked disabled />
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
            onChange={(e) =>
              setFormData({ ...formData, whatsapp: e.target.checked })
            }
                  />
                  <div>
          Subscribe me for <FaWhatsapp color="#25D366" /> notifications</div>
        </label>
      </div>

      <button
        onClick={sendOtp}
        disabled={loading}
        className={styles.primaryBtn}
      >
        {loading ? "Sending..." : "Continue"}
      </button>
    </div>
  );
}
