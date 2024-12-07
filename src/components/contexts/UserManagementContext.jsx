import { useContext, createContext, useState, useEffect, useCallback } from "react"
import * as AuthService from '../../services/auth_service'
import { useNotificationContext } from "./NotificationContext"
import * as Storage from "../../services/storage_service"
import * as UserManagementService from '../../services/userManagement_service'
import { useAuthContext } from "./AuthContext"

const UserManagementContext = createContext()
export const useUserManagementContext = () => useContext(UserManagementContext)

const UserManagementContextProvider = ({children}) => {

    const { setNotificationInformation } = useNotificationContext()
    const { user } = useAuthContext()
    const [ userList, setUserList ] = useState([])
    const [ loaderLG, setLoaderLG ] = useState(false)

    const getUserList = async () => {
        try {
            const response = await UserManagementService.getList(user.id_user)
            if (response) {
                if(response.status === 'success'){
                    setUserList(response.result.filter(u => u.id_user !== user.id_user))
                } else {
                    setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
                }
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    const updateUser = async (id_user_change, changes) => {
        console.log(id_user_change, changes)
        try {
            const response = await UserManagementService.updateUser(user.id_user, id_user_change, changes)
            if (response) {
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    const createUser = async (userData) => {
        try {
            const response = await UserManagementService.createUser(user.id_user, userData)
            if (response) {
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    const deleteUser = async (delete_id_user) => {
        try {
            const response = await UserManagementService.deleteUser(user.id_user, delete_id_user)
            if (response) {
                if(response.status === 'success'){
                    setUserList(userList.filter(u => u.id_user !== delete_id_user))
                    setNotificationInformation({"status": "success", "title": "Good bye user!", "message": "You have deleted an user successfully"})
                } else {
                    setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
                }
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    return(
        <UserManagementContext.Provider value={{
            getUserList,
            userList,
            updateUser,
            createUser,
            setLoaderLG,
            loaderLG,
            deleteUser
        }}>{children}</UserManagementContext.Provider>
    )

}

export default UserManagementContextProvider