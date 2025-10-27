import styles from "./style.module.css";
import commonStyles from "../../../Layouts/Fullpage/style.module.css";
import Slider from "react-slick";
import SectionHeader from "../../../SectionHeader";

const IpoFeaturedIn = () => {
    const images = [
        { image: "images/assets/f2.png" },
        { image: "images/assets/f3.png" },
        { image: "images/assets/f4.png"},
        { image: "images/assets/f5.png" },
        { image: "images/assets/f6.png" },
        { image: "images/assets/f7.jpg" },
        { image: "images/assets/f8.jpg" },
        { image: "images/assets/f9.jpg" },
        { image: "images/assets/f10.jpg" },
        { image: "images/assets/f11.jpg" },
        { image: "images/assets/f12.jpg" },
        { image: "images/assets/f13.jpg" },
        { image: "images/assets/f14.jpg" },
        { image: "images/assets/f15.jpg" },
        { image: "images/assets/f16.jpg" },
        { image: "images/assets/f17.jpg" },
        { image: "images/assets/f18.jpg" },
        { image: "images/assets/f19.jpg" },
        { image: "images/assets/f20.jpg" },
        { image: "images/assets/f1.jpg" }
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <section className={`${styles.investsection}  ${commonStyles['padding-class']}`}>
            <SectionHeader
                className="text-center"
                headerText={"Corporate Companies We Are Proud To Be Associated With."}
            />
            <div className={`container ${styles.container}`}>
                <br />
                <div
                    className={`${styles['featured-in-xuiisis8']} pt-2 ${styles["featured-in-xu"]}`}
                >
                    <Slider {...settings} className={`${styles['sliderWrapper']}`}>
                        {images.map((v, i) => (
                            <div key={`feacturedin-img-${i}`} className={styles["card-item"]}>
                                <img src={v.image} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};
export default IpoFeaturedIn;
