import styles from "./style.module.css";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import FintooLogo from "./FintooLogo.png";
import { useEffect, useState } from "react";
function UAEFooter() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  const [pageurl, setPageurl] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if ("pathname" in location) {
      setPageurl(location.pathname);
    }
  }, [location]);

  return (
    <footer>
      <div className={`${styles.Footer}`}>
        <div className={`${styles.FooterSection}`}>
          <div className={`row ${styles.FooterSectionContent}`}>
            <div
              className={`col-md-3 col-12 text-left ${styles.FooterNRIwidget}`}
            >
              <div className={`${styles.FooterwidgetImg}`}>
                <img width={200}   src={process.env.NEXT_PUBLIC_STATIC_URL + "media/wp/Fintoowhitelogo_.svg"} />
              </div>
            </div>
            <div className={`col-md-9 col-12 ${styles.FooterNRIwidget}`}>
              <div className={`${styles.Footerwidgetcontact}`}>
                {window.location.host.includes("fintoo.in") ? (
                  <a href="tel:+919699800600">+91-9699 800 600</a>
                ) : (
                  <a href="tel:+971545126647">+971 54 512 6647</a>
                )}
              </div>
              <div className={`${styles.Footerwidgetcontact}`}>
                {window.location.host.indexOf("fintoo.ae") > -1 ? (
                  <a href="mailto:support@fintoo.ae">support@fintoo.ae</a>
                ) : pageurl !== "/web/financial-health-checkup" ? (
                  <a href="mailto:online@fintoo.in">online@fintoo.in</a>
                ) : (
                  <div
                    style={{
                      color: "rgb(255, 255, 255)",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    online@fintoo.in
                  </div>
                )}
              </div>
              <div
                className={`${styles.FooterwidgetSocialNRI} ${
                  pageurl === "/web/financial-health-checkup/" ||  pageurl === "/web/financial-health-checkup"
                    ? "d-none"
                    : "d-block"
                }`}
              >
                <a
                  className={`${styles.FooterwidgetSocialIcons}`}
                  href={
                    window.location.host.includes("fintoo.in")
                      ? "https://x.com/FintooApp"
                      : "https://twitter.com/fintoouae"
                  }
                >
                  <FaTwitter />
                </a>

                <a
                  target="_blank"
                  className={`${styles.FooterwidgetSocialIcons}`}
                  href={
                    window.location.host.includes("fintoo.in")
                      ? "https://www.facebook.com/fintooapp/"
                      : "https://www.facebook.com/fintoouae"
                  }
                >
                  <FaFacebookF />
                </a>

                <a
                  target="_blank"
                  className={`${styles.FooterwidgetSocialIcons}`}
                  href={
                    window.location.host.includes("fintoo.in")
                      ? "https://www.linkedin.com/company/fintoobuildingtrustandtechnologyinwealth/"
                      : "https://www.linkedin.com/showcase/fintooae/"
                  }
                >
                  <FaLinkedin />
                </a>

                <a
                  target="_blank"
                  className={`${styles.FooterwidgetSocialIcons}`}
                  href={
                    window.location.host.includes("fintoo.in")
                      ? "https://www.instagram.com/fintoo.app/"
                      : "https://www.instagram.com/fintoouae"
                  }
                >
                  <FaInstagram />
                </a>

                <a
                  target="_blank"
                  className={`${styles.FooterwidgetSocialIcons}`}
                  href="https://www.youtube.com/channel/UC00AMcwwfUKrV-XD5n6hWyQ/videos"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
          {/* <div className={`${styles.FooterSection}`}></div> */}
        </div>
        <div className={`mt-2 ${styles.FooterSectionText}`}>
          <div className={`${styles.FooterSectionPara}`}>
            {window.location.host.includes("fintoo.ae") || window.location.host.includes("fintoo.ai") ? (
              <p
                style={{
                  textAlign: "justify",
                }}
              >
                DISCLAIMER All investments are subject to market risks.
                Investors are advised to read all relevant information carefully
                before making any investment. The value of any investment may
                rise or fall as a result of market changes. Past performance is
                not indicative of future results. By accessing this website, you
                agree to be bound by the following terms of use of this site and
                use of any materials or services contained herein. This site is
                provided by Wealth Trust Advisors L.L.C-FZ, License Number
                2306282.01 (Brand name: Fintoo) for the purposes of information
                to its clients, financial literacy, and educational purposes
                only. The information provided on this website does not comprise
                an offer by Wealth Trust Advisors L.L.C-FZ to provide any
                product or service described herein. Products and services
                described herein are not available to all persons in all
                geographical locations. Wealth Trust Advisors L.L.C-FZ has used
                all reasonable care and skill in compiling the content of this
                website but does not guarantee the accuracy or completeness of
                any information on this website and does not accept liability
                for any errors or omissions. The information provided on this
                website should not be made the basis for any personal decisions.
                The information contained on this website does not form a
                substitute for professional advice. Wealth Trust Advisors
                L.L.C-FZ shall not be liable to any person for any loss or
                damage which may arise from the use of any of the information
                contained on this website. No liability whatsoever is accepted
                for any direct or consequential loss arising from the use of the
                information contained on this site. Wealth Trust Advisors
                L.L.C-FZ does not guarantee that any functions at this site will
                operate without interruptions or errors and accepts no
                responsibility for any such interruptions or errors. This
                website may also provide links to other websites operated by
                third parties. Wealth Trust Advisors L.L.C-FZ is not responsible
                for such websites and their compliance with all relevant laws
                and regulations. To the full extent permissible by law, Wealth
                Trust Advisors L.L.C-FZ disclaims all responsibility for any
                error, omission, or inaccuracy in such material.
              </p>
            ) : pageurl !== "/web/financial-health-checkup" ? (
              <p
                style={{
                  textAlign: "justify",
                }}
              >
                Fintoo Wealth Private Limited (Brand Name - Fintoo.in, Fintoo
                app, Fintoo) makes no warranties or representations, express or
                implied, on products and services offered through the platform.
                It accepts no liability for any damages or losses, however,
                caused in connection with the use of, or on the reliance of its
                advisory or related services.
                <br />
                Past performance is not indicative of future returns. Please
                consider your specific investment requirements, risk tolerance,
                goal, time frame, risk and reward balance and the cost
                associated with the investment before choosing a fund, or
                designing a portfolio that suits your needs. Performance and
                returns of any investment portfolio can neither be predicted nor
                guaranteed. Investments made on advisory are subject to market
                risks, read all scheme related documents carefully. Marketing
                and distribution of various financial products such as Mutual
                Funds,Loans,Insurance,Bonds, Domestic Equity and International
                Equity are powered by Mihika Financial Services Private Limited
                (FintooInvest.in, FintooInvest app, FintooInvest).
                <br />© Fintoo Wealth Private Limited [SEBI RIA Registration
                No: INA000020031] [Type of Registration: Non-Individual]
                [Validity of registration: February 17, 2020-Perpetual]
                [Address: Fintoo Wealth Private Limited, B/309, Dynasty Business park, Opp Sangam Cinema, Andheri (East), J B Nagar, Mumbai, Maharashtra
                400059] [ARN - 21209] [CIN - U66301MH2023PTC414206] [GST No : 27AAFCF7114E1ZV]
              </p>
            ) : (
              <p style={{ textAlign: "justify" }}>
                Fintoo Wealth Private Limited (Brand Name - Fintoo.in, Fintoo
                app, Fintoo) makes no warranties or representations, express or
                implied, on products and services offered through the platform.
                It accepts no liability for any damages or losses, however,
                caused in connection with the use of, or on the reliance of its
                advisory or related services. Past performance is not indicative
                of future returns. Please consider your specific investment
                requirements, risk tolerance, goal, time frame, risk and reward
                balance and the cost associated with the investment before
                choosing a fund, or designing a portfolio that suits your needs.
                Performance and returns of any investment portfolio can neither
                be predicted nor guaranteed. Investments made on advisory are
                subject to market risks, read all scheme related documents
                carefully.
                <br />
                <br />© Fintoo Wealth Private Limited [SEBI RIA Registration
                No: INA000020031] [BASL Membership ID: 2252] [Type of
                Registration: Non-Individual] [Validity of registration:
                March 26,2025-Perpetual] [Address: Fintoo Wealth Private Limited] [CIN - U66301MH2023PTC414206] [GST No : 27AAFCF7114E1ZV]
                [Principal Officer details : Mr. Mihir Shah (mihir.shah@fintoo.in)]
                [Compliance Officer details : Mrs. Nisha Harchekar 
                (nisha.harchekar@fintoo.in)] [Corresponding SEBI regional/local
                office: Plot No. C 4-A , G Block, Near Bank of India, Bandra
                Kurla Complex,Bandra East, Mumbai, Maharashtra 400051]
                <br />
              </p>
            )}
          </div>
          <div className={`text-center ${styles.FooterSectionCopyRightText}`}>
            Copyright © {year} Fintoo,. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default UAEFooter;
