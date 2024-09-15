import { useContext, createContext, useState, useEffect } from "react";

const NotificationContext = createContext()
export const useNotificationContext = () => useContext(NotificationContext)

const NotificationContextProvider = ({children}) => {
    const [show, setShow] = useState(false)
    const [notificationInformation, setNotificationInformation] = useState({
        "status": "",
        "title": "",
        "message": "",
    })
    
    useEffect(()=>{
        notificationInformation.message ? setShow(true) : setShow(false)
    }, [notificationInformation]) 


    return(
        <NotificationContext.Provider value={{
            show,
            setShow,
            notificationInformation,
            setNotificationInformation
        }}>{children}</NotificationContext.Provider>
    )

}

export default NotificationContextProvider