import styles from "./style.module.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { usePathname } from "next/navigation";
import Link from "next/link";
const HeaderSection = () => {
    const pathname = usePathname();

  const isHomePage =
    pathname === "/" ||
    pathname === "/web" ||
    pathname === `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/web` ||
    pathname === `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/`;

  return (
    <section
      className={`header-section ${styles["header-section"]} ${styles["padding-class"]}`}
    >
      <div className={`${styles["header-section-background-overlay"]}`}></div>
      <div className={`${styles["header-section-container"]}`}>
        <div className={`${styles["header-section-content"]}`}>
          <LeftSection />
          {/* <br /> */}
          {
            isHomePage ? <>
              <Link className="text-decoration-none text-center" href={`${process.env.PUBLIC_URL}/investment-planning-page#AdvisorycardSection`}>
                <button
                  className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
                >
                  GET STARTED
                </button>
              </Link>
            </> :
              <a className="text-decoration-none" href="#book-appointment">
                <button
                  className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]}`}
                >
                  GET STARTED
                </button>
              </a>
          }

        </div>
        <div className={`${styles["header-section-image"]}`}>
          <RightSection />
        </div>
      </div>
    </section>
  );
};
export default HeaderSection;
