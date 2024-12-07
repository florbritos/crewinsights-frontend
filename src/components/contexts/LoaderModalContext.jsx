import { useContext, createContext, useState } from "react";

const LoaderModalContext = createContext()
export const useLoaderModalContext = () => useContext(LoaderModalContext)

const LoaderModalContextProvider = ({children}) => {
    const [open, setOpen] = useState(false)

    return(
            <LoaderModalContext.Provider value={{
                open,
                setOpen
            }}>{children}</LoaderModalContext.Provider>
    )

}

export default LoaderModalContextProvider