import React, { useState } from 'react'
import { validateField } from '../../helpers/field_rule_validations'
import LoaderLG from '../LoaderLG'
import InputErrorMessage from '../InputErrorMessage'
import { usePasswordRecoveryContext } from '../contexts/PasswordRecoveryContext'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const ModalNewPassword = () => {

    const { resetPassword, setShowModalNewPassword } = usePasswordRecoveryContext()
    const [ password, setPassword ] = useState('')
    const [ passwordError, setPasswordError ] = useState('')
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showLoader, setShowLoader ] = useState(false)

    const handleOnChange = (e) => {
        const error = validateField('password', e.target.value)
        if (error){   
            setPasswordError(error)
        } else {
            setPasswordError('')
        }
        setPassword(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const error = validateField('password', password)
        if (error){   
            setPasswordError(error)
        } else {
            setShowLoader(true)
            await resetPassword(password)
            setShowLoader(false)
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
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h2 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Reset your Password</h2>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">The OTP code was correct! Generate a new password</p>
                                    </div>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <div className="my-10">
                                        <label htmlFor="password-recovery" className="sr-only">Password</label>
                                        <div className="mt-1">
                                            <div className='flex items-center'>
                                                <input
                                                    id="password-recovery"
                                                    name="password-recovery"
                                                    type={showPassword ? "text" : "password"}
                                                    onChange={handleOnChange}
                                                    {...(passwordError ? {"aria-describedby" : "error-password-recovery"} : {})}
                                                    className="w-full appearance-none normal-case rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                                />
                                                {
                                                    !showPassword ?
                                                    <EyeIcon 
                                                    aria-hidden="true" 
                                                    className="h-6 w-6 ms-2 hover:text-orangeCI-1"
                                                    onClick={() => setShowPassword(true)}
                                                    />
                                                    :
                                                    <EyeSlashIcon 
                                                    aria-hidden="true" 
                                                    className="h-6 w-6 ms-2 hover:text-orangeCI-1"
                                                    onClick={() => setShowPassword(false)}
                                                    />
                                                }
                                            </div>
                                            <InputErrorMessage error={passwordError} idError="error-password-recovery"/>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button type="submit" className="btn inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm bg-blueCI-1 hover:bg-orangeCI-1 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm">Save</button>
                                        <button
                                            type="button" 
                                            className="btn mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm" 
                                            onClick={() => setShowModalNewPassword(false)}
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

export default ModalNewPassword