import React, { useState } from 'react'
import InputErrorMessage from '../InputErrorMessage';
import { validateField } from '../../helpers/field_rule_validations';
import { usePasswordRecoveryContext } from '../contexts/PasswordRecoveryContext';
import LoaderLG from '../LoaderLG';

const ModalRequestEmail = () => {

    const { sendOTP, setOtp, setEmail, email, setShowModalRequestEmail, setShowModalOTPValidation } = usePasswordRecoveryContext()
    const [ showLoader, setShowLoader ] = useState(false)
    const [ emailError, setEmailError ] = useState('')

    const handleOnChange = (e) => {
        const value = e.target.value
        const error = validateField('email', value)
        if (error){
            setEmailError(error)
        } else {
            setEmailError('')
        }    
        setEmail(value)
    }

    const recoverPassword = async (e) => {
        e.preventDefault()
        const error = validateField('email', email)
        if (error){
            setEmailError(error)
        } else {
            const newOtp = Math.floor(Math.random() * 9000 + 1000)
            setOtp(newOtp)
            setShowLoader(true)
            const response = await sendOTP(newOtp)
            if(response){
                if(response.status === 'success'){
                    setShowModalRequestEmail(false)
                    setShowModalOTPValidation(true)
                } else {
                    setEmailError(response.errors.email)
                }
            }
            setShowLoader(false)
        }
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h2 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Password Recovery</h2>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">We want to get your access back, please insert your email here.</p>
                                </div>
                                {
                                    !showLoader && 
                                    <form onSubmit={recoverPassword}>
                                        <div>
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-6">
                                                        <div className="col-span-6 sm:col-span-6">
                                                            <label htmlFor="email-recovery" className="sr-only">Email</label>
                                                            <input
                                                                type="email"
                                                                name="email-recovery"
                                                                id="email-recovery"
                                                                onChange={handleOnChange}
                                                                {...(emailError ? {"aria-describedby" : "error-email-recovery"} : {})}
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orangeCI-1 focus:ring-orangeCI-1 sm:text-sm"
                                                            />
                                                            <InputErrorMessage error={emailError} idError="error-email-recovery"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                            <button 
                                                type="submit" 
                                                className="btn inline-flex w-full justify-center rounded-md border border-transparent  py-2 text-base font-medium text-white shadow-sm bg-blueCI-1 hover:bg-orangeCI-1 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm">Send</button>
                                            <button 
                                                type="button" 
                                                className="btn mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm" 
                                                onClick={() => setShowModalRequestEmail(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                }
                                { showLoader && <div className='mt-5'><LoaderLG /></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default ModalRequestEmail