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
    const [ loaderLG, setLoaderLG ] = useState(false)

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

    const deleteMetric = async (id_metric) => {
        try {
            const response = await DashboardService.deleteMetric(user.id_user, id_metric)
            if (response) {
                if (response.status === 'success'){
                    setNotificationInformation({"status": "success", "title": "Dashboard updated!", "message": "You have deleted a metric successfully."})
                    return true
                }
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    const addMetric = async (metricInfo) => {
        try {
            const response = await DashboardService.addMetric(user.id_user, metricInfo.id_metric, metricInfo.metric)
            if (response) {
                if (response.status === 'success'){
                    delete metricInfo.metric
                    setMetrics([...metrics, metricInfo])
                    setNotificationInformation({"status": "success", "title": "Dashboard updated!", "message": "You have added a metric successfully."})
                    return true
                } else {
                    setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
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
            setMetrics,
            deleteMetric,
            addMetric,
            setLoaderLG,
            loaderLG
        }}>{children}</DashboardContext.Provider>
    )

}

export default DashboardContextProvider