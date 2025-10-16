"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";

const TaxPlanningHeaderSection = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "/web";

  return (
    <section className={`header-section ${styles["header-section"]}`}>
      <div className={`${styles["header-section-background-overlay"]}`}></div>

      <div className={`${styles["header-section-container"]}`}>
        <div className={`${styles["header-section-content"]}`}>
          <h2 className="header-section-bold-title">
            Trim the Tax <br />
            Boost the Benefits!
          </h2>
          <br />

          {isHomePage ? (
            <Link
              href="/tax-planning-page#TaxPlanningSection"
              className="text-decoration-none text-center"
            >
              <button
                className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
              >
                GET STARTED
              </button>
            </Link>
          ) : (
            <a
              href="/pricing?service=tax-planning"
              className="text-decoration-none"
            >
              <button
                className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
              >
                GET STARTED
              </button>
            </a>
          )}
        </div>

        <div className={`${styles["header-section-image"]}`}>
          <div
            className={`${styles["header-section-image-container"]} ${styles["animated"]} ${styles["animatedFadeInUp"]} ${styles["fadeInUp"]}`}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_STATIC_URL}media/wp/TaxPlan/taxPlanningSectionImg.svg`}
              alt="Tax Planning"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxPlanningHeaderSection;
