"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function WebEngageScript() {
  useEffect(() => {
    // Initialize after script loads
    if (typeof window !== "undefined" && window.webengage) {
      window.webengage.init("YOUR_LICENSE_CODE_HERE"); // 🔑 replace with your actual WebEngage License Code
      console.log("✅ WebEngage initialized");
    }
  }, []);

  return (
    <>
      {/* Load the SDK using next/script for optimal performance */}
      <Script
        src="https://cdn.webengage.com/js/webengage-min-v-6.0.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.webengage) {
            window.webengage.init("in~aa131666");
            console.log("✅ WebEngage loaded and initialized");
          }
        }}
      />
    </>
  );
}
