import { useContext, createContext, useState } from "react"
import * as AuthService from '../../services/auth_service'
import { useNotificationContext } from "./NotificationContext"
import * as Storage from "../../services/storage_service"
import * as TokenService from '../../services/token_service'

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({children}) => {

    const { setNotificationInformation } = useNotificationContext()
    const [user, setUser] = useState({})

    const isAuthenticated = async () => {
        const activeUser = Storage.get('user')
        const token = await TokenService.getToken() ?? ''
        token && setUser(activeUser)
        return [token, activeUser]
    }

    const login = async (login_info) => {
        try {
            const response = await AuthService.login(login_info)
            if (response) {
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    const logOut = async () => {
        try{
            const response = await AuthService.logout(user.id_user)
            if (response){
                setUser({})
                Storage.erase('user')
                TokenService.deleteToken()
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
        
    }

    return(
        <AuthContext.Provider value={{
            login,
            user,
            setUser,
            isAuthenticated,
            logOut
        }}>{children}</AuthContext.Provider>
    )

}

export default AuthContextProvider