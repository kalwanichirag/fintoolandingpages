"use client";

import React from "react";
import { usePathname } from "next/navigation"; 
import BoldSectionHeader from "../../BoldSectionHeader";
// import Testimonial from "../../Testimonial";
import ClientReviews from "../ClientReviews";
import styles from "./style.module.css";
import BorderDivider from "../../BorderDivider";

const ClientTestimonial = () => {
  const pathname = usePathname(); // gives current path
  const isMutualFundSnippet =
    pathname === "/web/mutual-fund-snippet" ||
    pathname === "/web/mutual-fund-snippet/";

  return (
    <section className={`${styles.investsection} py-5`}>
      <div className="text-center">
        <span className={`${styles["section-title"]}`}>
          Wall of <span className={`${styles.DiffText}`}>Trust</span>{" "}
          {isMutualFundSnippet ? (
            <span>- Your Wealth, Our Expertise.</span>
          ) : (
            "@ Fintoo"
          )}
        </span>
        <BorderDivider />
      </div>
      <div>
        <ClientReviews />
      </div>
    </section>
  );
};

export default ClientTestimonial;
