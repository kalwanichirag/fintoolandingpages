import styles from "./style.module.css";
import commonStyles from "../../../Layouts/Fullpage/style.module.css";
import SectionHeader from "../../../SectionHeader";
import { FaUserShield } from "react-icons/fa";
import { HiOutlineShieldCheck } from "react-icons/hi";

function WhyInsuranceSection() {
  return (
    <>
      <section
        className={`${styles["why-tax-planning-section"]} ${commonStyles["padding-class"]}`}
      >
        <h2 className={`${styles["why-tax-planning-section-title"]}`}>
          Smart Way To Minimise Risk And Maximise Confidence
        </h2>

        <p className={`${styles.SubHead}`}>
          Overcome every situation without financial stress with effective risk
          management tools for every emergency. Table with Health Insurance,
          Life Insurance, Term Insurance, and Home Insurance
        </p>
        <div className={`${styles["why-tax-planning-section-container"]}`}>
          <div className={`${styles["why-tax-planning-section-item"]}`}>
            <div
              className={`${styles["why-tax-planning-section-item-heading"]}`}
            >
              <span>Health Insurance</span>
            </div>
            <div
              className={`${styles["why-tax-planning-section-item-content"]}`}
            >
             <ul className="list-unstyled">
                <li>Get the best treatment without worrying about medical expenses.</li>
                <li>Protect your savings from health emergencies. </li>
                <li>Get tax exemption.</li>
              </ul>
            </div>
          </div>
          <div
            className={`${styles["why-tax-planning-section-item"]} ${styles["borderxy"]}`}
          >
            <div
              className={`${styles["why-tax-planning-section-item-heading"]}`}
            >
              <span>Life Insurance</span>
            </div>
            <div
              className={`${styles["why-tax-planning-section-item-content"]}`}
            >
             <ul className="list-unstyled">
                <li>Financially secure your and your family’s future</li>
                <li>Achieve long-term saving goals</li>
                <li>Secure your retirement</li>
                <li>Save income tax</li>
             </ul>
            </div>
          </div>
          <div
            className={`${styles["why-tax-planning-section-item"]} ${styles["border-x-y"]}`}
          >
            <div
              className={`${styles["why-tax-planning-section-item-heading"]}`}
            >
              <span>Term Insurance</span>
            </div>
            <div
              className={`${styles["why-tax-planning-section-item-content"]}`}
            >
                        <ul className="list-unstyled">

                <li>Financially secure your family’s future</li>
                <li>Protect your savings from Critical and Terminal Illness Coverage</li>
                <li>Tax Benefits</li>
             </ul>
            </div>
          </div>
          <div
            className={`${styles["why-tax-planning-section-item"]} ${styles["borderx-y"]}`}
          >
             <div
              className={`${styles["why-tax-planning-section-item-heading"]}`}
            >
              <span>Home Insurance</span>
            </div>
            <div
              className={`${styles["why-tax-planning-section-item-content"]}`}
            >
                         <ul className="list-unstyled">

                <li>Protect your savings from accidents, thefts, and natural calamities</li>
                <li>Secure all expensive personal belongings</li>
                <li>Protect yourself from any third-party liability</li>
             </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyInsuranceSection;
