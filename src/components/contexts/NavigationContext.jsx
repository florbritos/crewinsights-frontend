import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";

const NavigationContext = createContext()
export const useNavigationContext = () => useContext(NavigationContext)

const NavigationContextProvider = ({children}) => {

    const navigate = useNavigate ();
    const [flagChangesToSave, setFlagChangesToSave] = useState(false);
    const [ showCloseWarning, setShowCloseWarning ] = useState(false)
    const [ confirmClose, setConfirmClose ] = useState(false)
    const [ path, setPath ] = useState('')

    useEffect(()=>{
        if (confirmClose) {
            navigate(path)
            setFlagChangesToSave(false)
            setConfirmClose(false)
            setShowCloseWarning(false)
            setPath('')
        }
    }, [confirmClose])

    const handleRouteChange = (nextLocation) => {
        if(flagChangesToSave){
            setPath(nextLocation)
            setShowCloseWarning(true)
        } else {
            navigate(nextLocation)
        }
    };
    
    return(
        <NavigationContext.Provider value={{
            handleRouteChange,
            setFlagChangesToSave,
            setShowCloseWarning,
            showCloseWarning,
            setConfirmClose,
            confirmClose
        }}>{children}</NavigationContext.Provider>
    )

}

export default NavigationContextProvider