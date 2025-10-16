"use client"; // Required for client-side hooks

import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ScrollToTopimg from "./Scrolltop.svg";
import Scrolltop_white from "./Scrolltop_white.svg";

const ScrollToTop = () => {
  const pathname = usePathname();
  const eleRef = useRef(null);
  const [pageurl, setPageurl] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  useEffect(() => {
    if (pathname) {
      setPageurl(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }

      const footerElement = document.querySelector("#FooterView");
      if (footerElement) {
        const rect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const isVisible = rect.top <= windowHeight && rect.bottom >= 0;
        setIsFooterVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isScrollButtonVisible && (
        <div
          ref={eleRef}
          className={`${pageurl === "/web/financial-health-checkup" ? styles["scrolltopdiv1"] : styles["scrolltopdiv"]}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image
            src={isFooterVisible ? Scrolltop_white : ScrollToTopimg}
            alt="Scroll to top"
            style={{ width: isFooterVisible ? "30px" : undefined }}
            width={30}
            height={30}
          />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
