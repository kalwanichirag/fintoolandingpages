import styles from "./style.module.css";
const RightSection = (props) => {
  return (
    <>
      <div
        className={`${styles["header-section-image-container"]} ${styles.animated} ${styles.animatedFadeInUp} ${styles.fadeInUp} `}
      >
         <img alt="" width={500}
                src={
                  process.env.NEXT_PUBLIC_STATIC_URL + "media/wp/InvestPlan/InvestHeader.png"
                }
                
              />
      </div>
    </>
  );
};
export default RightSection;
