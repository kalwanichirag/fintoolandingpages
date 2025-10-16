"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { usePathname } from "next/navigation";

const OurAchievements = ({ isMFSnippet }) => {
  const timerStarted = useRef(false);
  const autoInc = useRef(0);
  const pathname = usePathname();
  const [pageurl, setPageurl] = useState(false);

  useEffect(() => {
    if (pathname?.includes("/nri-desk-dubai")) {
      setPageurl(true);
    } else {
      setPageurl(false);
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const section = document.getElementById("oa-y-9");
    if (!section) return;

    if (
      scrollPosition > section.offsetTop - section.clientHeight &&
      !timerStarted.current
    ) {
      timerStarted.current = true;

      if (isMFSnippet) {
        if (document.getElementById("b1").innerHTML * 1 === 0) {
          startAnimationForMFSnippet();
        }
      } else {
        if (document.getElementById("b2").innerHTML * 1 === 0) {
          startAnimation();
        }
      }
    }
  };

  const startAnimation = () => {
    const max = 1000;
    const min = 100;

    const b2 = document.getElementById("b2").getAttribute("max") * 1;
    const b3 = document.getElementById("b3").getAttribute("max") * 1;
    const b4 = document.getElementById("b4").getAttribute("max") * 1;
    const b5 = document.getElementById("b5").getAttribute("max") * 1;
    const b6 = document.getElementById("b6").getAttribute("max") * 1;

    const timer = setInterval(() => {
      document.getElementById("b2").innerHTML = Math.round(
        (autoInc.current * (b2 / min)) / 10
      );
      document.getElementById("b3").innerHTML = Math.round(
        (autoInc.current * (b3 / min)) / 10
      );
      document.getElementById("b4").innerHTML =
        "" + Math.round((autoInc.current * (b4 / min)) / 10).toLocaleString("en-IN");
      document.getElementById("b5").innerHTML =
        "" + Math.round((autoInc.current * (b5 / min)) / 10).toLocaleString("us-IN");
      document.getElementById("b6").innerHTML = Math.round(
        (autoInc.current * (b6 / min)) / 10
      ).toLocaleString("us-IN");

      autoInc.current = autoInc.current + 1;
      if (autoInc.current > max) {
        clearInterval(timer);
      }
    }, 1);
  };

  const startAnimationForMFSnippet = () => {
    const max = 1000;
    const min = 100;

    const b1 = document.getElementById("b1").getAttribute("max") * 1;
    const b2 = document.getElementById("b2").getAttribute("max") * 1;
    const b3 = document.getElementById("b3").getAttribute("max") * 1;
    const b4 = document.getElementById("b4").getAttribute("max") * 1;

    const timer = setInterval(() => {
      document.getElementById("b1").innerHTML = Math.round(
        (autoInc.current * (b1 / min)) / 10
      );
      document.getElementById("b2").innerHTML = Math.round(
        (autoInc.current * (b2 / min)) / 10
      );
      document.getElementById("b3").innerHTML = Math.round(
        (autoInc.current * (b3 / min)) / 10
      );
      document.getElementById("b4").innerHTML =
        "" + Math.round((autoInc.current * (b4 / min)) / 10).toLocaleString("en-IN");

      autoInc.current = autoInc.current + 1;
      if (autoInc.current > max) {
        clearInterval(timer);
      }
    }, 1);
  };

  return (
    <section className={`${styles.section}`} id="oa-y-9">
      <div className={styles.overlay}></div>
      <div className={`${styles.container} container`}>
        <div className={`text-center ${styles.GlobalText}`}>Global Scorecard</div>
        {!isMFSnippet ? (
          <div style={{ padding: "0px 0px 50px 0px" }}>
            <div className={`${styles.cards} timer-dv`}>
              <div className={styles["card-item"]}>
                <div className={pageurl ? "d-none" : ""}>
                  <p className={styles.number}>
                    <span id="b2" max="250">
                      0
                    </span>
                    <span className={styles.smallfont}>+</span>
                  </p>
                  <p className={styles.label}>Corporate tie-ups</p>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div className={pageurl ? "" : "d-none"}>
                  <p className={styles.number}>
                    <span id="b6" max="3">
                      0
                    </span>
                    <span className={styles.smallfont}>+ Billion</span>
                  </p>
                  <p className={styles.label}>Assets Under Tracking (AUT)</p>
                </div>
                <div className={pageurl ? "d-none" : ""}>
                  <p className={styles.number}>
                    <span id="b3" max="300">
                      0
                    </span>
                    <span className={styles.smallfont}>+ cr</span>
                  </p>
                  <p className={styles.label}>Assets Under Tracking (AUT)</p>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div className={pageurl ? "" : "d-none"}>
                  <p className={styles.number}>
                    <span id="b5" max="150000">
                      0
                    </span>
                    <span className={styles.smallfont}>+</span>
                  </p>
                  <p className={styles.label}>Happy Clients</p>
                </div>
                <div className={pageurl ? "d-none" : ""}>
                  <p className={styles.number}>
                    <span id="b4" max="150000">
                      0
                    </span>
                    <span className={styles.smallfont}>+</span>
                  </p>
                  <p className={styles.label}>Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "0px 0px 50px 0px" }}>
            <div className={`${styles.cards} timer-dv`}>
              <div className={styles["card-item"]}>
                <div>
                  <p className={styles.number}>
                    <span id="b1" max="3500">
                      0
                    </span>
                    <span className={styles.smallfont}> cr</span>
                  </p>
                  <p className={styles.label}>Assets Under Tracking (AUT)</p>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div>
                  <p className={styles.number}>
                    <span id="b2" max="20">
                      0
                    </span>
                    <span className={styles.smallfont}>+</span>
                  </p>
                  <p className={styles.label}>Years of exp</p>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div>
                  <p className={styles.number}>
                    <span id="b3" max="100">
                      0
                    </span>
                    <span className={styles.smallfont}>+</span>
                  </p>
                  <p className={styles.label}>Team size</p>
                </div>
              </div>
              <div className={styles["card-item"]}>
                <div>
                  <p className={styles.number}>
                    <span id="b4" max="5000">
                      0
                    </span>
                    <span className={styles.smallfont}></span>
                  </p>
                  <p className={styles.label}>No of clients</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurAchievements;
