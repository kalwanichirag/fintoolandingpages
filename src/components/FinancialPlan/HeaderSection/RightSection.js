import styles from "./style.module.css";

const RightSection = (props) => {
  return (
    <>
      <div
        className={`${styles["header-section-image-container"]} ${styles.animated} ${styles.animatedFadeInUp} ${styles.fadeInUp} `}
      >
        <img
              src={
                process.env.NEXT_PUBLIC_STATIC_URL +
                "media/wp/FPPlan/FPPlan.png"
              }
              alt="Financial Planning"
            />
        {/* <img  src={process.env.NEXT_PUBLIC_STATIC_URL + 'media/wp/FPPlan/AI.png'} alt="" /> */}
      </div>
    </>
  );
};
export default RightSection;
