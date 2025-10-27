import styles from "./style.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
function TaxPlanningHeaderSection() {
  const pathname = usePathname();
 const isHomePage =
    pathname === "/" ||
    pathname === "/web" ||
    pathname === `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/web` ||
    pathname === `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`;

  return (
    <>
      <section className={`header-section ${styles["header-section"]}`}>
        <div className={`${styles["header-section-background-overlay"]}`}></div>
        <div className={`${styles["header-section-container"]}`}>
          <div className={`${styles["header-section-content"]}`}>
            <h2 className="header-section-bold-title">
              Trim the Tax <br />
              Boost the Benefits!
            </h2>
            <br />

            {
              isHomePage ? <>
                <Link className="text-decoration-none text-center" href={`${process.env.PUBLIC_URL}/tax-planning-page#TaxPlanningSection`}>
                  <button
                    className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
                  >
                    GET STARTED
                  </button>
                </Link>
              </> :
                <Link href={`${process.env.PUBLIC_URL}/pricing?service=tax-planning`} className="text-decoration-none">
                  <button
                    className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
                  >
                    GET STARTED
                  </button>
                </Link>
            }


          </div>
          <div className={`${styles["header-section-image"]}`}>
            <div
              className={`${styles["header-section-image-container"]} ${styles["animated"]} ${styles["animatedFadeInUp"]} ${styles["fadeInUp"]}  `}
            >
              <img src={process.env.NEXT_PUBLIC_STATIC_URL + 'media/wp/TaxPlan/taxPlanningSectionImg.svg'} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TaxPlanningHeaderSection;
