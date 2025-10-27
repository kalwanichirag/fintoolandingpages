import styles from "./style.module.css";
import commonStyles from "../../../Layouts/Fullpage/style.module.css";
import SectionHeader from "../../../SectionHeader";

function IpoWhyTrustUsSection() {

    return (
        <>
            <section className={`${styles['why-trust-us-section']} ${commonStyles['padding-class']}`}>
                <SectionHeader headerText={'Why Invest In IPOs With Fintoo'} />
                <br /><br />
                <div className={`${styles['why-trust-us-section-items-container']}`}>
                    <div className={`${styles['why-trust-us-section-item']} ${styles['flex-item-left']}`}>
                        <div className={`${styles['why-trust-us-section-item-icon']}`}>
                            <div style={{ width: '50px' }}>
                                <img style={{ width: '100%' }} src={process.env.NEXT_PUBLIC_STATIC_URL + 'media/wp/IPO/cardImg1.png'} alt="" />
                            </div>
                        </div>
                        <div className="ms-4">
                            <div className={`${styles['why-trust-us-section-item-heading']}`}>
                                ASBA APPLICATION PROCESS
                            </div>
                            <div className={`${styles['why-trust-us-section-item-content']}`}>
                                ASBA, i.e. Application Supported by Blocked Amount, is an investor-friendly way to apply for IPO. It ensures that your funds leave your bank account only when you are allotted the IPO.
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['why-trust-us-section-item']} ${styles['flex-item-right']}`}>
                        <div>
                            <div className={`${styles['why-trust-us-section-item-heading']}`}>
                                ONLINE & PAPERLESS PROCESS
                            </div>
                            <div className={`${styles['why-trust-us-section-item-content']}`}>
                                View, analyze, shortlist and apply for any IPO with just a few clicks on your phone or PC without the requirement of any kind of paperwork.
                            </div>
                        </div>
                        <div className={`${styles['why-trust-us-section-item-icon']}`}>
                            <div style={{ width: '50px' }}>
                                <img style={{ width: '100%' }} src={process.env.NEXT_PUBLIC_STATIC_URL + 'media/wp/IPO/cardImg2.png'} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles['why-trust-us-section-item']} ${styles['flex-item-left']}`}>
                        <div className={`${styles['why-trust-us-section-item-icon']}`}>
                            <div style={{ width: '50px' }}>
                                <img style={{ width: '100%' }} src={process.env.NEXT_PUBLIC_STATIC_URL + 'media/wp/IPO/cardImg3.png'} alt="" />

                            </div>
                        </div>
                        <div className="ms-4">
                            <div className={`${styles['why-trust-us-section-item-heading']}`}>
                                QUICK & AUTOMATED REFUND
                            </div>
                            <div className={`${styles['why-trust-us-section-item-content']}`}>
                                In case you are not allotted the IPO, your money automatically gets refunded in your bank account.
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
            </section>
        </>

    )
}

export default IpoWhyTrustUsSection
