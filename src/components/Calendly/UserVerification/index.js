import { useState } from 'react';
import Styles from '../style.module.css'
import Details from './Details';
import OtpView from './OtpView';
import { BASE_API_URL } from '../../../app/constants';
import { apiCall } from '../../../app/common_utilities';
import * as toastr from "toastr";
import "toastr/build/toastr.css";


const initialContactFormData = {
    fullname: "",
    mobile: "",
    email: ""
};

function UserVerification({ setCurrAppointmentView }) {

    const [currView, setCurrView] = useState('DETAILS');
    const [formState, SetFormState] = useState(initialContactFormData);

    const sendOtp = async () => {
        try {
                console.log("📤 Sending OTP to:", formState.mobile);

            const result = await apiCall(
                BASE_API_URL + "restapi/sendotpapi/",
                {
                    mobile_number: formState.mobile + ""
                },
                false,
                false
            );
                console.log("📩 OTP API Response:", result);


            console.log('sendOtpsendOtp', result);
             if (!result) {
      toastr.error("No response from server. Please try again.");
      return;
    }

            if (result.error_code != 100) {
                toastr.options.positionClass = "toast-bottom-left";
                toastr.error(result.message);
            }
        } catch (error) {
    console.error("🚨 OTP API failed:", error);

        }

    }

    return (
        <div className={Styles.detailContainer} style={{ position: 'relative' }}>
            <div className={Styles.logoContainer}>
                <img
                    alt="logo"
                    src={process.env.NEXT_PUBLIC_STATIC_URL + "media/wp/Fintoologo_.svg"}
                    style={{ width: '200px', margin: '0 auto' }}
                />
            </div>
            {
                currView === 'DETAILS' && <Details setCurrView={setCurrView} formState={formState} SetFormState={SetFormState} sendOtp={sendOtp} />
            }
            {
                currView === 'OTP' && <OtpView setCurrView={setCurrView} setCurrAppointmentView={setCurrAppointmentView} formState={formState} sendOtp={sendOtp} />
            }

        </div>
    );
}

export default UserVerification;
