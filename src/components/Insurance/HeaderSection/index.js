"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // for App Router
import styles from "./style.module.css";

const HeaderSection = () => {
  const pathname = usePathname();

  const isHomePage =
    pathname === "/" || pathname === "/web";

  return (
    <section className={`header-section ${styles["header-section"]}`}>
      <div className={`${styles["header-section-background-overlay"]}`}></div>

      <div className={`${styles["header-section-container"]}`}>
        <div className={`${styles["header-section-content"]}`}>
          <h2 className="header-section-bold-title">
            Expect the Unexpected, <br />
            Protect What’s Yours!
          </h2>
          {/* Uncomment if you want subtitle */}
          {/* <h3 className={`${styles["section-sub-title"]}`}>
            Give yourself and all your loved one’s a financially secured and
            stress-free future.
          </h3> */}
          <br />

          {isHomePage ? (
            <Link
              href="/risk-management#WhyInsuranceSection"
              className="text-decoration-none text-center"
            >
              <button
                className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
              >
                GET STARTED
              </button>
            </Link>
          ) : (
            <a href="#book-appointment">
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
              src={`${process.env.NEXT_PUBLIC_STATIC_URL}media/wp/insurance-1.png`}
              alt="Insurance"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
