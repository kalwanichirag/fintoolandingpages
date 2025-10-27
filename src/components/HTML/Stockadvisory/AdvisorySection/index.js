import styles from "./style.module.css";
import SectionHeader from "../../../SectionHeader";

const AdvisorycardSection = () => {
  return (
    <section className={`${styles.AdvisorycardSection}`}>
      <SectionHeader
        className="text-center"
        headerText={"The Strategy To Successful Investing"}
      />
      <div className={`text-center mt-4 ${styles.SectionSubText}`}>
        <p>Long-Term Strategy to Identifying Wealth Compounders.</p>
        <p>
          We aim to identify potential Compounders and generate Alpha. We
          believe if you can manage the downside, the upside will take care of
          itself. Invests in larger, liquid stocks with a max weightage of 10%
          per stock.
        </p>
      </div>
      <div
        className={`mt-ms-5 ${styles["AdvisorycardSection-section-container"]}`}
      >
        <div className={`mt-md-5 mt-0 ${styles.Advisorycard}`}>
          <p>
          <img
           width={30}
           className={`${styles.CardIcon}`}
           alt=""
            src={
              process.env.NEXT_PUBLIC_STATIC_URL +
              "media/wp/Stocks/Defining-the-Universe.png"
            }
          />
          
          </p>
          <p className={`${styles.CardTitle}`}>DEFINING THE UNIVERSE</p>
          <div className={`${styles.CardPara}`}>
            Top 700 publicly traded companies by market cap listed on the
            National Stock Exchange of India
          </div>
        </div>
        <div className={` ms-md-4 mt-md-5 mt-0 ${styles.Advisorycard}`}>
          <p>
          <img
           className={`${styles.CardIcon}`}
           width={30}
           alt=""
            src={
              process.env.NEXT_PUBLIC_STATIC_URL +
              "media/wp/Stocks/Research.png"
            }
          />
          </p>
          <p className={`${styles.CardTitle}`}>RESEARCH</p>
          <p className={`${styles.CardPara}`}>
            The team does in-depth research to decide the criteria to be used
            for constituent screening. Stocks are first eliminated based on
            certain factors.
          </p>
        </div>
        <div className={` mt-md-3 mt-0 ${styles.Advisorycard}`}>
          <p>
          <img
          className={`${styles.CardIcon}`}
          width={30}
           alt=""
            src={
              process.env.NEXT_PUBLIC_STATIC_URL +
              "media/wp/Stocks/Historical-Backtesting.png"
            }
          />
          </p>
          <p className={`${styles.CardTitle}`}>HISTORICAL BACKTESTING</p>
          <p className={`${styles.CardPara}`}>
            Backtested since 2003 across multiple market cycles and time frames.
          </p>
        </div>
        <div className={` ms-md-4 mt-md-3 mt-0 ${styles.Advisorycard}`}>
          <p>
          <img
            className={`${styles.CardIcon}`}
            width={30}
           alt=""
            src={
              process.env.NEXT_PUBLIC_STATIC_URL +
              "media/wp/Stocks/Constituent-Screening.png"
            }
          />
           
          </p>
          <p className={`${styles.CardTitle}`}>CONSTITUENT SCREENING</p>
          <p className={`${styles.CardPara}`}>
            Stocks are picked by a quantitative and qualitative model based on
            multiple factors.
          </p>
        </div>
      </div>
    </section>
  );
};
export default AdvisorycardSection;
