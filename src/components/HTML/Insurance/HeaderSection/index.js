import styles from "./style.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
function HeaderSection() {
  const pathname = usePathname();
  const isHomePage =
    pathname.pathname === "/" ||
    pathname.pathname === "/web" ||
    pathname.pathname === `${process.env.PUBLIC_URL}/web` ||
    pathname.pathname === `${process.env.PUBLIC_URL}/`;
  return (
    <>
      <section className={`header-section ${styles["header-section"]} `}>
        <div className={`${styles["header-section-background-overlay"]}`}></div>
        <div className={`${styles["header-section-container"]}`}>
          <div className={`${styles["header-section-content"]}`}>
            <h2 className="header-section-bold-title">
              Expect the Unexpected, <br />
              Protect What’s Yours!
            </h2>
            {/* <h3 className={`${styles["section-sub-title"]}`}>
              Give yourself and all your loved one’s a financially secured and
              stress-free future.
            </h3> */}
            <br />

            {
              isHomePage ? <>
                <Link className="text-decoration-none text-center" href={`${process.env.PUBLIC_URL}/risk-management#WhyInsuranceSection`}>
                  <button
                    className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
                  >
                    GET STARTED
                  </button>
                </Link>
              </> :
                <a href="#book-appointment">
                  <button
                    className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
                  >
                    GET STARTED
                  </button>
                </a>
            }


          </div>
          <div className={`${styles["header-section-image"]}`}>
            <div
              className={`${styles["header-section-image-container"]} ${styles["animated"]} ${styles["animatedFadeInUp"]} ${styles["fadeInUp"]}  `}
            >
              <img
                src={
                  process.env.NEXT_PUBLIC_STATIC_URL +
                  "media/wp/insurance-1.png"
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeaderSection;
