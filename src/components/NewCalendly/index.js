import React, { useState } from "react";
import { InlineWidget } from "react-calendly";
import styles from "./CalendlyForm.module.css";

export default function CalendlyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showCalendly, setShowCalendly] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCalendly(true);
  };

  return (
    <div className={styles.container}>
      {!showCalendly ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Book Your Free Consultation</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Continue
          </button>
        </form>
      ) : (
        <div className={styles.calendlyWrapper}>
          <InlineWidget
            url={`https://calendly.com/fintoo/15-min-consultation-call-financial-planning?hide_event_type_details=1`}
            prefill={{
              name: formData.name,
              email: formData.email,
               customAnswers: {
       a2: '+91' + formData.phone, // ✅ Prefills the "Mobile Number" question
    },
            }}
            styles={{
              height: "700px",
            }}
          />
        </div>
      )}
    </div>
  );
}
