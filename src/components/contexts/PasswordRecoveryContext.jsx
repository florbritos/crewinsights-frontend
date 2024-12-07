import { useContext, createContext, useState } from "react"
import { useNotificationContext } from "./NotificationContext"
import * as PasswordRecoveryService from "../../services/passwordRecovery_service"

const PasswordRecoveryContext = createContext()
export const usePasswordRecoveryContext = () => useContext(PasswordRecoveryContext)

const PasswordRecoveryContextProvider = ({children}) => {

    const { setNotificationInformation } = useNotificationContext()
    const [ showModalRequestEmail, setShowModalRequestEmail ] = useState(false)
    const [ showModalOTPValidation, setShowModalOTPValidation ] = useState(false)
    const [ showModalNewPassword, setShowModalNewPassword ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ otp, setOtp ] = useState('')

    const sendOTP = async (otp) => {
        try{
            const response = await PasswordRecoveryService.sendOTP(email, otp)
            if (response){
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    const resetPassword = async (password) => {
        try{
            const response = await PasswordRecoveryService.resetPassword(email, password)
            if (response){
                if(response.status === 'success'){
                    setShowModalNewPassword(false)
                    setNotificationInformation({"status": "success", "title": "Your password was recovered", "message": "You successfully changed your password"})
                } else {
                    setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
                }
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    return(
        <PasswordRecoveryContext.Provider value={{
            sendOTP,
            setEmail,
            email,
            setOtp,
            otp,
            showModalRequestEmail,
            setShowModalRequestEmail,
            showModalOTPValidation,
            setShowModalOTPValidation,
            showModalNewPassword,
            setShowModalNewPassword,
            resetPassword
        }}>{children}</PasswordRecoveryContext.Provider>
    )

}

export default PasswordRecoveryContextProvider