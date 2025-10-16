import SimpleReactValidator from 'simple-react-validator';
import Styles from '../style.module.css';
import { useRef, useState } from 'react';
import { getPublicMediaURL } from '../../../app/common_utilities';
import Link from 'next/link';

const Whatsapp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path>
            <path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
            <path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
        </svg>
    )
}

function Details({ setCurrView, formState, SetFormState, sendOtp }) {

    const [subscribeChecked, setSubscribeChecked] = useState(true);
    const [subscribenotificationsChecked, setSubscribeNotificationsChecked] = useState(true);
    const [subscribeError, setSubscribeErrorMsg] = useState('');
    const [, forceUpdateContact] = useState();

    const contactFormValidator = useRef(
        new SimpleReactValidator({
            validators: {
                phone: {
                    required: true,
                    message: "Invalid phone number.",
                    rule: (val, _, validator) => {
                        if (`${val}`.charAt(0) === '0') return false;
                        if (!validator.helpers.testRegex(val, /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)) return false;
                        return parseInt(val) > 5000000000 && parseInt(val) < 9999999999;
                    },
                },
                Email: {
                    required: true,
                    message: "Please enter valid email address.",
                    rule: (val, _, validator) => {
                        return validator.helpers.testRegex(val, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
                    },
                },
            },
        })
    );

    const onContinue = async () => {
        if (contactFormValidator.current.allValid() && subscribeChecked) {
            sendOtp();
            setCurrView('OTP');
            localStorage.setItem('subscribenotificationsChecked', JSON.stringify(subscribenotificationsChecked));
        } else {
            contactFormValidator.current.showMessages();
            forceUpdateContact(1);
            if (!subscribeChecked) {
                setSubscribeErrorMsg('You must agree to the Terms & Conditions and Privacy Policy to proceed.');
            }
        }
    };

    const onFormDataChange = (e) => {
        e.preventDefault();
        SetFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className={Styles.inputDetailsContainer}>
                <div className={Styles.inputElemTitle}>Enter Details</div>
                <div className={Styles.inputElemContainer}>
                    <div className={Styles.inputElemLabel}>Name *</div>
                    <input
                        type="text"
                        name="fullname"
                        value={formState.fullname}
                        className={Styles.inputElem}
                        onChange={(e) => onFormDataChange(e)}
                    />
                    <span>
                        {contactFormValidator.current.message("Name", formState.fullname, "required|alpha_space")}
                    </span>
                </div>

                <div className={Styles.inputElemContainer}>
                    <div className={Styles.inputElemLabel}>Mobile Number *</div>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            name="mobile"
                            value={formState.mobile}
                            className={Styles.inputElem}
                            onChange={(e) => onFormDataChange(e)}
                            style={{ paddingLeft: '50px' }}
                        />
                        <img
                            src={getPublicMediaURL("static/media/flagIndia.svg")}
                            alt="DOB"
                            style={{
                                width: '30px',
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        />
                    </div>
                    <span>
                        {contactFormValidator.current.message("Mobile_Number", formState.mobile, "phone")}
                    </span>
                </div>

                <div className={Styles.inputElemContainer}>
                    <div className={Styles.inputElemLabel}>Email *</div>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        className={Styles.inputElem}
                        onChange={(e) => onFormDataChange(e)}
                    />
                    <span>
                        {contactFormValidator.current.message("Email", formState.email, "required|email")}
                    </span>
                </div>

                <div className={`${Styles.termsSection}`}>
                    <div className={`${Styles.input} ${Styles.checkbox} d-flex align-items-center`}>
                        <input
                            type="checkbox"
                            id="accept"
                            onChange={(e) => {
                                setSubscribeChecked(!subscribeChecked);
                                if (!e.target.checked) {
                                    setSubscribeErrorMsg('You must agree to the Terms & Conditions and Privacy Policy to proceed.');
                                } else {
                                    setSubscribeErrorMsg('');
                                }
                            }}
                            checked={subscribeChecked}
                        />
                        <label className="ms-2" htmlFor="accept" style={{ fontSize: '1rem' }}>
                            I agree to the <Link href="https:www.fintoo.in/terms-conditions" target="_blank"><span style={{ fontWeight: "500", textDecoration: "underline" }}>Terms & Conditions</span></Link> and <Link href="https:www.fintoo.in/privacy-policy" target="_blank"><span style={{ fontWeight: "500", textDecoration: "underline" }}>Privacy Policy</span></Link>
                        </label>
                    </div>
                    {subscribeError && <p style={{ fontSize: '12px', color: 'red' }}>{subscribeError}</p>}
                </div>

                <div className={`${Styles.termsSectionTxt} mb-3`} style={{ color: "#9e9e9e", fontSize: '1rem' }}>
                    <div className={`${Styles.input} ${Styles.checkbox} d-flex align-items-center`}>
                        <input
                            type="checkbox"
                            id="notifications"
                            checked={subscribenotificationsChecked}
                            onChange={(e) => setSubscribeNotificationsChecked(!subscribenotificationsChecked)}
                        />
                        <label className="ms-2" htmlFor="notifications" style={{ fontSize: '1rem', cursor: "pointer" }}>
                            Subscribe me for <Whatsapp /> notifications
                        </label>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: "1rem" }}>
                <button className={Styles.btnElem} onClick={onContinue}>Continue</button>
            </div>
        </div>
    );
}

export default Details;
