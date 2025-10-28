"use client";
import Image from "next/image";

export default function CalendlySection() {

    return (
<section>


            {/* Calendly Section */}
            <div className="tw-bg-[#00132E]  tw-py-16 tw-text-white">
                <div className="tw-container tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-items-center tw-gap-8 tw-px-6">
                    {/* Left Text */}
                    <div className="tw-text-left tw-max-w-xl tw-mx-auto">
                        <h2 className="tw-text-lg tw-text-center md:tw-text-4xl tw-leading-relaxed">
                            Book an introductory{" "}
                            <span className="tw-text-[#00B6F0] tw-font-semibold">
                                Complimentary 15 Minutes Call
                            </span>{" "}
                            with our Financial Experts to know more about our offerings and advice.
                        </h2>
                    </div>

                    {/* Right Calendly Embed */}
                    <div className="tw-bg-white tw-rounded-xl tw-overflow-hidden tw-p-4 tw-max-w-2xl tw-mx-auto">
                        <iframe
                            src="https://calendly.com/dummy-link"
                            className="tw-w-[500px] tw-h-[500px] tw-border-none"
                            title="Calendly Form"
                        ></iframe>
                    </div>
                </div>

                <div className="disclaimer container tw-text-left tw-m-auto tw-text-sm tw-pt-16">
                    <p>
                        <b>      Disclaimer:</b>
                        <br/>

                        The information is only for the consumption by the client and such material should not be redistributed.
                    </p>
                    <p>
                        Investment in the security market is subject to market risks. Read all the related documents carefully. Registration granted by SEBI, membership of BASL (in case of IAs), and certification from the NISM in no way affect the performance of intermediary or provide any assurance of returns to investors.

                    </p>
                    <p>

                        By accessing this website, you agree to be bound by the following terms of use of this site and use of any materials or services contained herein. This site is provided by Financial Hospital Advisor LLP (LLPIN – AAE- 1913) [SEBI RIA Registration No: INA000015756] [BASL Membership ID: 1874] [Type of Registration: Non-Individual] [Validity of registration: February 17, 2021-Perpetual] [Address: Financial Hospital Advisor LLP B/308, Dynasty Business park, Opp Sangam Cinema, Andheri (East), J B Nagar, Mumbai, Maharashtra 400059] (Brand name :Fintoo) for the purposes of information to its clients, financial literacy, and educational purposes only. The information provided on this website does not comprise an offer by Financial Hospital Advisor LLP to provide any product or service described herein. Products and services described herein are not available to all persons in all geographical locations. Financial Hospital Advisor LLP has used all reasonable care and skill in compiling the content of this website but does not guarantee the accuracy or completeness of any information on this website and does not accept liability for any errors or omissions. The information provided on this website should not be the basis for any personal decisions. The information contained on this website does not form a substitute for professional advice. Financial Hospital Advisor LLP shall not be liable to any person for any loss or damage which may arise from the use of any of the information contained on this website. No liability whatsoever is accepted for any direct or consequential loss arising from the use of the information contained on this site. Financial Hospital Advisor LLP does not guarantee that any functions at this site will operate without interruptions or errors and accepts no responsibility for any such interruptions or errors. This website may also provide links to other websites operated by third parties. Financial Hospital Advisor LLP is not responsible for such websites and their compliance with all relevant laws and regulations. To the full extent permissible by law, Financial Hospital Advisor LLP disclaims all responsibility for any error, omission, or inaccuracy in such material.</p>

                </div>
            </div>


        </section>
    );
}
