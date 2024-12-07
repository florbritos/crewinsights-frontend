import React, { useEffect, useState } from 'react'
import LoaderLG from '../LoaderLG';
import { usePasswordRecoveryContext } from '../contexts/PasswordRecoveryContext';
import { useNotificationContext } from '../contexts/NotificationContext';

const ModalOTP = () => {

    const { sendOTP, email, otp, setShowModalOTPValidation, setShowModalNewPassword } = usePasswordRecoveryContext()
    const { notificationSetUp } = useNotificationContext()
    const [timerCount, setTimer ] = useState(60)
    const [ OTPinput, setOTPinput ] = useState([0, 0, 0, 0])
    const [ disable, setDisable ] = useState(true)
    const [ errorOTP, setErrorOTP ] = useState(false)
    const [ showLoader, setShowLoader ] = useState(false)

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                if (lastTimerCount <= 1){
                    clearInterval(interval)
                    setDisable(false)
                } 
                if (lastTimerCount <= 0){
                    return lastTimerCount
                }
                return lastTimerCount - 1
            });
        }, 1000); 
        
        return () => clearInterval(interval);
    }, [disable]);

    const resendOTP =  async () => {
        if(!disable){
            setShowLoader(true)
            await sendOTP(otp)
            setShowLoader(false)
            setDisable(true)
            setTimer(60)

        }
    }
    
    function verfiyOTP(e) {
        e.preventDefault()
        if(parseInt(OTPinput.join("")) === otp) {
            setShowModalOTPValidation(false)
            setShowModalNewPassword(true)
        } else {
            setErrorOTP(true)
        }
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        {
                            showLoader &&
                            <LoaderLG />
                        }
                        {
                            !showLoader &&
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h2 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Email sent successfully</h2>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">We have sent a code to your email {email}</p>
                                    </div>
                                </div>
                                <form className='mt-14' onSubmit={verfiyOTP}>
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                            <div className="w-16 h-16 ">
                                                <label htmlFor='numberOne' className='sr-only'>Number One</label>
                                                <input
                                                    maxLength="1"
                                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-lg bg-white"
                                                    type="text"
                                                    name="numberOne"
                                                    id="numberOne"
                                                    onChange={(e) =>{
                                                        setErrorOTP(false)
                                                        setOTPinput([
                                                            e.target.value,
                                                            OTPinput[1],
                                                            OTPinput[2],
                                                            OTPinput[3],
                                                        ])}
                                                    }
                                                />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <label htmlFor='numberTwo' className='sr-only'>Number Two</label>
                                                <input
                                                    maxLength="1"
                                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-lg bg-white"
                                                    type="text"
                                                    name="numberTwo"
                                                    id="numberTwo"
                                                    onChange={(e) =>{
                                                        setErrorOTP(false)
                                                        setOTPinput([
                                                            OTPinput[0],
                                                            e.target.value,
                                                            OTPinput[2],
                                                            OTPinput[3],
                                                        ])}
                                                    }
                                                />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <label htmlFor='numberThree' className='sr-only'>Number Three</label>
                                                <input
                                                    maxLength="1"
                                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-lg bg-white"
                                                    type="text"
                                                    name="numberThree"
                                                    id="numberThree"
                                                    onChange={(e) =>{
                                                        setErrorOTP(false)
                                                        setOTPinput([
                                                            OTPinput[0],
                                                            OTPinput[1],
                                                            e.target.value,
                                                            OTPinput[3],
                                                        ])}
                                                    }
                                                />
                                            </div>
                                            <div className="w-16 h-16 ">
                                                <label htmlFor='numberFour' className='sr-only'>Number Four</label>
                                                <input
                                                    maxLength="1"
                                                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border text-lg bg-white"
                                                    type="text"
                                                    name="numberFour"
                                                    id="numberFour"
                                                    onChange={(e) =>{
                                                        setErrorOTP(false)
                                                        setOTPinput([
                                                            OTPinput[0],
                                                            OTPinput[1],
                                                            OTPinput[2],
                                                            e.target.value,
                                                        ])
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {(errorOTP && !showLoader) && <p className=" text-center text-red-800 font-bold text-sm mt-2">The code you have entered is not correct, try again or re-send the link</p>}
                                        
                                        <div className="flex flex-col space-y-5">
                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn't receive a code?</p>{" "}
                                                <button type="button" className="flex flex-row items-center"
                                                    style={{
                                                        color: disable ? "gray" : "#e07a5f",
                                                        cursor: disable ? "none" : "pointer",
                                                        textDecorationLine: disable ? "none" : "underline",
                                                    }}
                                                    onClick={() => resendOTP()}
                                                >
                                                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                                                </button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button 
                                            type="submit" 
                                            className="btn inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm bg-blueCI-1 hover:bg-orangeCI-1 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                        >
                                            Verify Account
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm" 
                                            onClick={() => setShowModalOTPValidation(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalOTP