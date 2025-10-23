"use client";

import styles from "./style.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default function Footer({ hideFooter = false }) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  if (hideFooter) return null;

  return (
    <footer id="FooterView">
      <div className={`${styles.Footer} main-footer`}>
        <div className={styles.FooterSection}>
          <div className={`row ${styles.FooterSectionContent}`}>
            {/* Left Column */}
            <div className={`col-md-3 col-12 ${styles.Footerwidget}`}>
              <div className={styles.FooterwidgetImg}>
                <img
                  width={200}
                  src={
                    process.env.NEXT_PUBLIC_STATIC_URL +
                    "media/wp/Fintoowhitelogo_.svg"
                  }
                  alt="Fintoo Logo"
                />
              </div>
              <div className={styles.Footerwidgetcontact}>
                <a href="tel:+919699800600">+91-9699 800 600</a>
              </div>
              <div className={styles.Footerwidgetcontact}>
                <a href="mailto:online@fintoo.in">online@fintoo.in</a>
              </div>
              <div className={styles.FooterwidgetSocial}>
                <a
                  className={styles.FooterwidgetSocialIcons}
                  href="https://x.com/FintooApp"
                >
                  <FaXTwitter />
                </a>
                <a
                  className={styles.FooterwidgetSocialIcons}
                  href="https://www.facebook.com/fintooapp/"
                >
                  <FaFacebookF />
                </a>
                <a
                  className={styles.FooterwidgetSocialIcons}
                  href="https://www.linkedin.com/company/1769616/"
                >
                  <FaLinkedin />
                </a>
                <a
                  className={styles.FooterwidgetSocialIcons}
                  href="https://www.instagram.com/fintoo.app/"
                >
                  <FaInstagram />
                </a>
                <a
                  className={styles.FooterwidgetSocialIcons}
                  href="https://www.youtube.com/channel/UC00AMcwwfUKrV-XD5n6hWyQ/videos"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className={`col-md-9 col-12 ${styles.FooterSectionContent}`}>
              <div className={`row ${styles.FooterSectionLinks}`}>
                {/* Advisory */}
                <div className="col">
                  <h2 className={styles.footerheading}>Advisory</h2>
                  <ul className={styles.footernavigation}>
                    <li>
                      <Link href="/financial-planning-page">Financial Planning</Link>
                    </li>
                    <li>
                      <Link href="/retirement-planning-page">Retirement Planning</Link>
                    </li>
                    <li>
                      <Link href="/investment-planning-page">Investment Planning</Link>
                    </li>
                    <li>
                      <Link href="/tax-planning-page">Tax Planning</Link>
                    </li>
                    <li>
                      <Link href="/risk-management">Risk Management</Link>
                    </li>
                  </ul>
                </div>

                {/* Invest */}
                <div className="col ms-md-0 ms-4">
                  <h2 className={styles.footerheading}>Invest</h2>
                  <ul className={styles.footernavigation}>
                    <li>
                      <Link href="/direct-mutual-funds">Mutual Fund</Link>
                    </li>
                    <li>
                      <Link href="/bond-investment">Bond</Link>
                    </li>
                    <li>
                      <Link href="/stock-advisory">Domestic Equity</Link>
                    </li>
                    <li>
                      <Link href="/international-equity">International Equity</Link>
                    </li>
                    <li>
                      <Link href="/ipo">IPO</Link>
                    </li>
                  </ul>
                </div>

                {/* Tax */}
                <div className="col ms-md-0 ms-3">
                  <h2 className={styles.footerheading}>Tax</h2>
                  <ul className={styles.footernavigation}>
                    <li>
                      <Link href="/nri-taxation">NRI Taxation</Link>
                    </li>
                    <li>
                      <Link href="/notices">Notices</Link>
                    </li>
                    <li>
                      <Link href="/tax-calculators">Tax Calculators</Link>
                    </li>
                  </ul>
                </div>

                {/* About Us */}
                <div className="col">
                  <h2 className={styles.footerheading}>About Us</h2>
                  <ul className={styles.footernavigation}>
                    <li>
                      <a
                        href={
                          process.env.NEXT_PUBLIC_PYTHON_URL +
                          "blog/how-fintoo-ensures-your-safety-and-security/"
                        }
                      >
                        Safety Shield (Data Privacy)
                      </a>
                    </li>
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                  
                    <li>
                      <Link href="https://apps.apple.com/in/app/fintoo/id1339092462" className="relative">
                        <Image fill src={ `${process.env.NEXT_PUBLIC_STATIC_URL}/media/footer/minty-app-store.png`} className={styles.footernavigationimg}/>
                      </Link>
                    </li>
                     <li>
                      <Link href="https://play.google.com/store/apps/details?id=com.financialhospital.admin.finh" className="relative">
                        <Image fill src={ `${process.env.NEXT_PUBLIC_STATIC_URL}/media/footer/minty-android-app.webp`} className={styles.footernavigationimg}/>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Others */}
                <div className="col ms-4">
                  <h2 className={styles.footerheading}>Others</h2>
                  <ul className={styles.footernavigation}>
                    <li>
                      <Link href="/contact/">Partner With Us</Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="/terms-conditions">Terms and Conditions</Link>
 
                    </li>
                    <li>
                      <Link href="/terms-conditions">Grievance Mechanism</Link>
                    </li>
                      <li>
                      <Link href="/terms-conditions">Complaints Status</Link>
                    </li>
                      <li>
                      <Link href="/terms-conditions">Access Online Dispute Resolution (ODR) Portal
</Link>
                    </li>
                      <li>
                      <Link href="/terms-conditions">Investor Charter</Link>
                    </li>
                    <li>
                      <Link href="/terms-conditions">Compliance Audit Status</Link>
                    </li>
                      <li>
                      <Link href="/terms-conditions">Help Center</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className={styles.FooterSectionText}>
            <div className={styles.FooterSectionPara}>
              <p>
                Fintoo Wealth Private Limited (Brand Name - Fintoo.in, Fintoo app, Fintoo) makes no warranties or representations, express or implied, on products and services offered through the platform. It accepts no liability for any damages or losses, however, caused in connection with the use of, or on the reliance of its advisory or related services. Past performance is not indicative of future returns. Please consider your specific investment requirements, risk tolerance, goal, time frame, risk and reward balance and the cost associated with the investment before choosing a fund, or designing a portfolio that suits your needs. Performance and returns of any investment portfolio can neither be predicted nor guaranteed. Investments made on advisory are subject to market risks, read all scheme related documents carefully.
              </p>
              <p>
                © Fintoo Wealth Private Limited [SEBI RIA Registration No: INA000020031] [BASL Membership ID: 2252] [Type of Registration: Non-Individual] [Validity of registration: March 26,2025-Perpetual] [Address: Fintoo Wealth Private Limited, B/309, Dynasty Business park, Opp Sangam Cinema, Andheri (East), J B Nagar, Mumbai, Maharashtra 400059]  [CIN - U66301MH2023PTC414206] [GST No : 27AAFCF7114E1ZV] [Principal Officer details : Mr. Mihir Shah (mihir.shah@fintoo.in)] [Compliance Officer details : Mrs. Nisha Harchekar (nisha.harchekar@fintoo.in)]
              </p>
            </div>
            <div className={`text-center ${styles.FooterSectionCopyRightText}`}>
              Copyright © {year} Fintoo. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
