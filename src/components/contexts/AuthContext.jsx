import { useContext, createContext, useState, useEffect, useCallback } from "react";
import * as AuthService from '../../services/auth_service'
import { useNotificationContext } from "./NotificationContext";
import * as Storage from "../../services/storage_service";

const AuthContext = createContext()
export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({children}) => {

    const { setNotificationInformation } = useNotificationContext()
    const [user, setUser] = useState({})

    const isAuthenticated = () => {
        console.log("ñaña")
        const activeUser = Storage.get('user')
        const token = Storage.getToken('token') ?? ""
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
            setNotificationInformation({"status": "failes", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    return(
        <AuthContext.Provider value={{
            login,
            user,
            setUser,
            isAuthenticated,
        }}>{children}</AuthContext.Provider>
    )

}

export default AuthContextProvider