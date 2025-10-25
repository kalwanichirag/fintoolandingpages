"use client"
import styles from "./style.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [submenu, setSubmenu] = useState("");
  const [scrolled, setScrolled] = useState(false);
  

  const handleMenuChange = (menu) => {
    setSubmenu(submenu === menu ? "" : menu);
  };

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

           <header className={styles.header + " main-header"}>

    
        <div className="d-block d-lg-none container-fluid">
          <div
            className={` ${styles["mobile-menu"]} d-flex align-items-center justify-content-between`}
          >
            <div
              className={styles["menu-button"]}
              onClick={() => setOpenMenu(true)}
            >
              <div className={styles.hamburger} />
              <div className={styles.hamburger} />
              <div className={styles.hamburger} />
            </div>
            <a
              href={process.env.REACT_APP_PYTHON_URL}
              target="_self"
              className="mobile-logo"
            >
              <img
                src={process.env.NEXT_PUBLIC_STATIC_URL + "media/wp/Fintoologo_.svg"}
                alt="Fintoo logo"
              />
            </a>
          
            <div
              className={`${styles["mobile-menu-wrapper"]} ${openMenu ? styles["active"] : ""
                } `}
              id="hamburger"
            >
              <div className={styles["mobile-menu-block"]}>
                <a
                  onClick={() => setOpenMenu(false)}
                  className={styles["close-menu"]}
                >
                  ×
                </a>
                <ul className={`${styles["mobile-nav"]}`}>
                  <li className={styles["mn-li"]}>
                    <div
                      className="d-block "
                      onClick={() => handleMenuChange("menu1")}
                    >
                      Advisory{" "}
                      <span
                        className={`${styles.aspan} ${styles.mobilespan} ${submenu == "menu1" ? styles["mobilespan-open"] : ""
                          }`}
                      >
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    {submenu == "menu1" && (
                      <ul className={styles["submenu"]}>
                        <li>
                          <Link
                            target="_self"
                            onClick={() => {
                              setOpenMenu(false);
                            }}
                            href={
                              process.env.PUBLIC_URL +
                              "/financial-planning-page/"
                            }
                          >
                            Financial Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            onClick={() => setOpenMenu(false)}
                            href={
                              process.env.PUBLIC_URL +
                              "/retirement-planning-page/"
                            }
                          >
                            Retirement Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            href={
                              process.env.PUBLIC_URL +
                              "/investment-planning-page/"
                            }
                            onClick={() => setOpenMenu(false)}
                          >
                            Investment Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            href={process.env.PUBLIC_URL + "/tax-planning-page/"}
                            onClick={() => setOpenMenu(false)}
                          >
                            Tax Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            href={process.env.PUBLIC_URL + "/risk-management/"}
                            onClick={() => setOpenMenu(false)}
                          >
                            Risk Management
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className={styles["mn-li"]}>
                    <div
                      className="d-block"
                      onClick={() => handleMenuChange("menu5")}
                    >
                      Invest{" "}
                      <span className={`${styles.aspan} ${styles.mobilespan}`}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    {submenu == "menu5" && (
                      <ul className={styles["submenu"]}>
                        <li>
                          <Link
                            href={`${process.env.PUBLIC_URL}/direct-mutual-funds`}
                            onClick={() => setOpenMenu(false)}
                          >
                            Mutual Fund
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`${process.env.PUBLIC_URL}/bond-investment`}
                            onClick={() => setOpenMenu(false)}
                          >
                            Bond
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`${process.env.PUBLIC_URL}/stock-advisory`}
                            onClick={() => setOpenMenu(false)}
                          >
                            Domestic Equity
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`${process.env.PUBLIC_URL}/international-equity`}
                            onClick={() => setOpenMenu(false)}
                          >
                            International Equity
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => setOpenMenu(false)}
                            href={`${process.env.PUBLIC_URL}/ipo`}
                          >
                            IPO
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className={styles["mn-li"]}>
                    <div
                      className="d-block"
                      onClick={() => handleMenuChange("menu2")}
                    >
                      Tax{" "}
                      <span className={`${styles.aspan} ${styles.mobilespan}`}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    {submenu == "menu2" && (
                      <ul className={styles["submenu"]}>
                        <li>
                          <Link
                            target="_self"
                            onClick={() => setOpenMenu(false)}
                            href={`${process.env.PUBLIC_URL}/itr-file/`}
                          >
                            File your ITR
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            onClick={() => setOpenMenu(false)}
                            href={`${process.env.PUBLIC_URL}/nri-taxation/`}
                          >
                            NRI Taxation
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            onClick={() => setOpenMenu(false)}
                            href={`${process.env.PUBLIC_URL}/notices/`}
                          >
                            Notices
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            href={process.env.PUBLIC_URL + "/tax-planning-page"}
                            onClick={() => setOpenMenu(false)}
                          >
                            Tax Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            target="_self"
                            onClick={() => setOpenMenu(false)}
                            href={`${process.env.PUBLIC_URL}/tax-calculators`}
                          >
                            Tax Calculators
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className={styles["mn-li"]}>
                    <Link
                      style={{
                        fontWeight: "normal",
                        fontSize: "1.5rem",
                      }}
                      onClick={() => {
                        setOpenMenu(false);
                      }}
                      target="_self"
                      href={`${process.env.PUBLIC_URL}/pricing/`}
                    >
                      Pricing
                    </Link>
                  </li>

                  <li className={styles["mn-li"]}>
                    <div onClick={() => handleMenuChange("menu3")}>
                      Knowledge Base
                      <span className={`${styles.aspan} ${styles.mobilespan}`}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    {submenu == "menu3" && (
                      <ul className={styles["submenu"]}>
                        <li>
                          <a target="_self" href="https://www.fintoo.in/blog/">
                            Blogs
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className={styles["mn-li"]}>
                    <a
                      style={{
                        fontWeight: "normal",
                      }}
                      className="d-block"
                      onClick={() => handleMenuChange("menu2323")}
                    >
                      <span
                        style={{
                          verticalAlign: "textBottom",
                        }}
                      >
                        {" "}
                        <img
                          src={
                            process.env.NEXT_PUBLIC_STATIC_URL +
                            "media/Header/online_support_black.png"
                          }
                          alt=""
                          style={{ width: "27.5px", verticalAlign: "top" }}
                        />{" "}
                      </span>
                      <span> Help Support</span>
                      <span className={`${styles.aspan} ${styles.mobilespan}`}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                    {submenu == "menu2323" && (
                      <ul className={styles["submenu"]}>
                        <li className="pb-0">
                          <span>
                            <img
                              src={
                                process.env.NEXT_PUBLIC_STATIC_URL +
                                "media/Header/Call_Black.png"
                              }
                              width={20}
                            />{" "}
                          </span>
                          <span>
                            <a
                              className="text-decoration-none text-black ps-1"
                              href="tel:+91-9699 800 600"
                            >
                              +91-9699 800 600
                            </a>
                          </span>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              setOpenMenu(false);
                            }}
                            className={`text-decoration-none ${styles.Region} custom-color`}
                            href="https://fintoo.freshdesk.com/support/home"
                          >
                            Customer Help Center
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className={styles["mn-li"]}>
                    <a
                      style={{
                        fontWeight: "normal",
                      }}
                      className="d-block"
                      onClick={() => handleMenuChange("menu123")}
                    >
                      <span
                        style={{
                          verticalAlign: "textBottom",
                        }}
                      >
                        <img
                          src={
                            process.env.NEXT_PUBLIC_STATIC_URL +
                            "media/Header/global.png"
                          }
                          alt=""
                          style={{ width: "27.5px", verticalAlign: "top" }}
                        />{" "}
                      </span>
                      <span> Change Region</span>
                      <span className={`${styles.aspan} ${styles.mobilespan}`}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                    {submenu == "menu123" && (
                      <ul className={styles["submenu"]}>
                        <li>
                          <span style={{ fontSize: "1rem" }}>
                            {" "}
                            Asia Pacific
                          </span>
                          <a
                            className={`text-decoration-none ${styles.Region}`}
                            href="https://www.fintoo.in"
                          >
                            India(English)
                          </a>
                        </li>
                        <li>
                          <span style={{ fontSize: "1rem" }}> Middle East</span>
                          <a
                            className={`text-decoration-none ${styles.Region}`}
                            href="https://fintoo.ae"
                          >
                            UAE(English)
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* mobile */}
                 
                    <li
                      className={`${styles["link-url"]} ${styles["link-url-mobile"]}`}
                     
                    >
                      Login
                      {/* </a> */}
                    </li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block container-fluid">
          <div className={` ${styles["in-container"]} ${scrolled ? "pt-4" : ""}`}>
            <div className="row align-items-center">
              <div className="col-md-5">
                <a href="/">
                  <img
                    src={process.env.NEXT_PUBLIC_STATIC_URL + "media/wp/Fintoologo_.svg"}
                    alt="Fintoo logo"
                  />
                </a>
              </div>
              <div className="col-md-7">
                <ul className={styles["main-navigation"]}>
                  <li>
                    <div
                      className={` ${styles["link-url"]} main_header_link_url`}
                      href={process.env.PUBLIC_URL + "#"}
                    >
                      Advisory{" "}
                      <span className={styles.aspan}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    { }
                    <div className={styles["submenu-container"]}>
                      <ul className={styles.submenu}>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/financial-planning-page`}
                            onClick={() => toggleLoader()}
                          >
                            Financial Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/retirement-planning-page`}
                            onClick={() => toggleLoader()}
                          >
                            Retirement Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/investment-planning-page`}
                            onClick={() => toggleLoader()}
                          >
                            Investment Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/tax-planning-page`}
                            onClick={() => toggleLoader()}
                          >
                            Tax Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/risk-management`}
                            onClick={() => toggleLoader()}
                          >
                            Risk Management
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div
                      className={` ${styles["link-url"]} main_header_link_url`}
                      href={process.env.PUBLIC_URL + "#"}
                    >
                      Invest{" "}
                      <span className={styles.aspan}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className={styles["submenu-container"]}>
                      <ul className={styles.submenu}>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/direct-mutual-funds`}
                            // href={`${process.env.PUBLIC_URL}/landing-page`}
                            onClick={() => toggleLoader()}
                          >
                            Mutual Fund
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/bond-investment`}
                            onClick={() => toggleLoader()}
                          >
                            Bond
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/stock-advisory`}
                            onClick={() => toggleLoader()}
                          >
                            Domestic Equity
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/international-equity`}
                            onClick={() => toggleLoader()}
                          >
                            International Equity
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/ipo`}
                            onClick={() => toggleLoader()}
                          >
                            IPO
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div
                      className={` ${styles["link-url"]} main_header_link_url`}
                      href={process.env.PUBLIC_URL + "#"}
                    >
                      Tax{" "}
                      <span className={styles.aspan}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className={styles["submenu-container"]}>
                      <ul className={styles.submenu}>
                        {/* {process.env.REACT_APP_MODE != "live" && ( */}
                          <li>
                            <Link
                              className={` ${styles["link-url"]} main_header_link_url`}
                              href={`${process.env.PUBLIC_URL}/itr-file?utm_service=91&utm_source=26&tags=itr_filing_2025&rm_id=96`}
                              onClick={() => toggleLoader()}
                            >
                              File your ITR
                            </Link>
                          </li>
                        {/* )} */}
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/nri-taxation/`}
                            onClick={() => toggleLoader()}
                          >
                            NRI Taxation
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/notices/`}
                            onClick={() => toggleLoader()}
                          >
                            Notices
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={process.env.PUBLIC_URL + "/tax-planning-page"}
                            onClick={() => setOpenMenu(false)}
                          >
                            Tax Planning
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href={`${process.env.PUBLIC_URL}/tax-calculators`}
                            onClick={() => toggleLoader()}
                          >
                            Tax Calculators
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link
                      className={` ${styles["link-url"]} main_header_link_url`}
                      href={`${process.env.PUBLIC_URL}/pricing`}
                      onClick={() => toggleLoader()}
                    >
                      Pricing
                    </Link>
                    {/* <a
                      className={styles["link-url"]}
                      href="https://www.fintoo.in/pricing/"
                    >
                      Pricing
                    </a> */}
                  </li>

                  <li>
                    <div
                      className={` ${styles["link-url"]} main_header_link_url`}
                      href={process.env.PUBLIC_URL + "#"}
                    >
                      Knowledge Base{" "}
                      <span className={styles.aspan}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className={styles["submenu-container"]}>
                      <ul className={styles.submenu}>
                        <li>
                          <a
                            className={` ${styles["link-url"]} main_header_link_url`}
                            href="https://www.fintoo.in/blog/"
                          >
                            Blogs
                          </a>
                        </li>
                        {/* <li>
                          <a className={styles["link-url"]} href="">
                            Media Room
                          </a>
                        </li>
                        <li>
                          <a className={styles["link-url"]} href="">
                            Bytes
                          </a>
                        </li> */}
                        {/* <li>
                          <Link
                            className={styles["link-url"]}
                            href={`${process.env.PUBLIC_URL}/our-events-page/`}
                            onClick={()=> toggleLoader()}
                          >
                            Events
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>
                  {/* <li>
                    <a
                      className={styles["link-url"]}
                      href={process.env.PUBLIC_URL + "#"}
                    >
                      Corporate Care
                      <span className={styles.aspan}>
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                    <div className={styles["submenu-container"]}>
                      <ul className={styles.submenu}>
                        <li>
                          <a className={styles["link-url"]} href="">
                            About CCP
                          </a>
                        </li>
                        <li>
                          <a className={styles["link-url"]} href="">
                            Request Webinar
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                 
                  <li className={`pointer ${styles.regionselectordialog}`}>
                    <div className={styles["link-url"]}>
                      <img
                        src={
                          process.env.NEXT_PUBLIC_STATIC_URL +
                          "media/Header/customer-support.webp"
                        }
                        alt=""
                        style={{ width: "27.5px" }}
                      />
                      {/* 
Customer Help Center */}
                    </div>
                    <div className={styles["submenu-container"]}>
                      <div
                        className={`${styles.submenu}, ${styles.GlobalMenu} ${styles.CallSupport}`}
                      >
                        <div className={`w-100`}>
                          <div className={`${styles.CallOption}`}>
                            <span>

                              <img
                                width={20}
                                src={require("./Call_Black.png")}
                              />{" "}
                            </span>
                            <span>
                              <a
                                className="text-decoration-none text-black ps-1"
                                href="tel:+91-9699 800 600"
                              >
                                +91-9699 800 600
                              </a>
                            </span>
                          </div>
                          <div className={`pt-3 ${styles.CallOption}`}>
                            <a
                              className="text-decoration-none custom-color"
                              // className={styles["link-url"]}
                              target="blank"
                              href="https://fintoo.freshdesk.com/support/home"
                            >
                              Customer Help Center
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className={`pointer ${styles.regionselectordialog}`}>
                    <div className={` ${styles["link-url"]} main_header_link_url`}>
                      <img
                        src={
                            process.env.NEXT_PUBLIC_STATIC_URL +
                            "media/Header/global.png"
                          }
                        alt=""
                        style={{ width: "27.5px" }}
                      />
                      {/* Help Center */}
                    </div>
                    <div className={styles["submenu-container"]}>
                      <div
                        className={`${styles.submenu}, ${styles.GlobalMenu}`}
                      >
                        <div className={styles.GlobalLang}>
                          <div className={styles.GlobalText}>
                            Change Region{" "}
                          </div>
                        </div>
                        <div className={`${styles.GloballangMenu}`}>
                          <div className={`${styles.Country}`}>
                            <p>Asia Pacific</p>
                            <div>
                              <a
                                className={`text-decoration-none ${styles.Region} custom-color`}
                                href="https://www.fintoo.in"
                              >
                                India(English)
                              </a>
                            </div>
                          </div>
                          <div className={`${styles.HRline}`}></div>
                          <div className={`${styles.Country}`}>
                            <p>Middle East</p>
                            <div>
                              <a
                                className={`text-decoration-none ${styles.Region} custom-color`}
                                href="https://www.fintoo.ae"
                              >
                                UAE(English)
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                 
                 
                    <li
                      className={` ${styles["link-url"]} main_header_link_url`}
                     
                    >
                     
                      Login
                     
                    </li>
                 
              
                </ul>
              </div>
            </div>
          </div>
        </div>

      
</header>
     );
}