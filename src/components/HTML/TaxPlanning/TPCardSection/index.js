import styles from "./style.module.css";import { FaBeer, FaDownload } from "react-icons/fa";
const TPCardSection = () => {
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch("financial-planning-sample-report.pdf").then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "financial-planning-sample-report.pdf";
        alink.click();
      });
    });
  };
  return (
    <section className={`${styles.FPCard}`}>
      <div className={`${styles["FPCard-section-container"]}`}>
        <div className={`${styles.FpCardImg}`}>
        <img src={process.env.NEXT_PUBLIC_STATIC_URL + 'media/wp/TaxPlan/headerBg122.png'} alt="" />
        </div>
        <div className={`${styles.FPRightbox}`}>
          <p className={`${styles.FPtitle}`}>
            Effective Tax Planning & Management Solutions For Every Individual,
            Entrepreneur, Professional and Business.
          </p>
          <p className={`${styles.FPSubtext}`}>
            We have an experienced team of chartered accountants and tax
            consultants, specializing in providing holistic and ethical
            regulatory and tax management advisory, catering to advanced tax
            planning, cross-border taxation management, and family office
            management, covering a broad spectrum of services.
          </p>
          <div className="mt-2">
            <ul className="list-unstyled">
              <li>Tax Loss Harvesting </li>
              <li>Inheritance Tax Planning </li>
              <li>NRI Taxation </li>
              <li>Cross Border Transaction</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TPCardSection;
