import styles from "./style.module.css";
import Link from "next/link";

function BondInvestmentHeaderSection() {
  const appMode = process.env.NEXT_PUBLIC_APP_MODE;
  const isLive = appMode === "live";
  return (
    <>
      <section className={`${styles["header-section"]} `}>
        <div className={`${styles["header-section-container"]}`}>
          <div className={`${styles["header-section-content"]}`}>
            <h2 className={`${styles["header-section-title"]}`}>
              Fixed Income Securities & Capital Preservation.
            </h2>
            {/* <h3 className={`${styles["section-sub-title"]}`}>
            Invest in the best of bonds offering comparatively lower volatility and highly predictable income at regular intervals.
            </h3> */}
            <br />
          <Link
      href={isLive ? "#" : "/bonds/all"}
      style={{ cursor: isLive ? "default" : "pointer" }}
      onClick={(e) => {
        if (isLive) e.preventDefault(); // disable click when "live"
      }}
    >
      <button
        className={`${styles["header-section-content-btn"]} ${styles["animatedBouncInUp"]} ${styles["bounceInUp"]} ${
          isLive ? "disabled" : ""
        }`}
      >
        {isLive ? "Coming Soon" : "Get Started"}
      </button>
    </Link>
          </div>
          <div className={`${styles["header-section-image"]}`}>
            <div
              className={`${styles["header-section-image-container"]} ${styles["animated"]} ${styles["animatedFadeInUp"]} ${styles["fadeInUp"]}  `}
            >
              {/* /var/www/fintoo-frontend/public/static/media/wp/BondInvestment/bondInvestmentHeaderImg.png */}
              <img style={{ width: '100%' }} src={process.env.NEXT_PUBLIC_STATIC_URL + 'media/wp/BondInvestment/bondInvestmentHeaderImg.png'} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BondInvestmentHeaderSection;
