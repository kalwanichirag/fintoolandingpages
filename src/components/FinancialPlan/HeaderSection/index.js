"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const HeaderSection = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "/web";

  return (
    <section
      className={`header-section ${styles["header-section"]} ${styles["padding-class"]}`}
    >
      <div className={`${styles["header-section-background-overlay"]}`}></div>
      <div className={`${styles["header-section-container"]}`}>
        <div className={`${styles["header-section-content"]}`}>
          <LeftSection />
          <br />
          <Link
            href={
              isHomePage
                ? "/financial-planning-page#FPCardSection"
                : "/pricing"
            }
            className="text-decoration-none text-center"
          >
            <button
              className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
            >
              GET STARTED
            </button>
          </Link>
        </div>
        <div className={`${styles["header-section-image"]}`}>
          <RightSection />
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
