import { useContext, createContext, useState } from "react";
import * as DashboardService from '../../services/dashboard_service'
import { useNotificationContext } from "./NotificationContext";
import { useAuthContext } from "./AuthContext";

const DashboardContext = createContext()
export const useDashboardContext = () => useContext(DashboardContext)

const DashboardContextProvider = ({children}) => {

    const { setNotificationInformation } = useNotificationContext()
    const { user } = useAuthContext()
    const [ metrics, setMetrics ] = useState([])

    const getMetrics = async () => {
        try {
            const response = await DashboardService.getMetrics(user.id_user)
            if (response) {
                if (response.status === 'success'){
                    setMetrics(response.result)
                }
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }


    return(
        <DashboardContext.Provider value={{
            getMetrics,
            metrics,
            setMetrics
        }}>{children}</DashboardContext.Provider>
    )

}

export default DashboardContextProvider