import { useContext, createContext, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import * as SearchBotService from '../../services/searchbot_service'
import { useAuthContext } from "./AuthContext";

const SearchBotContext = createContext()
export const useSearchBotContext = () => useContext(SearchBotContext)

const SearchBotContextProvider = ({children}) => {

    const { user } = useAuthContext()
    const { setNotificationInformation } = useNotificationContext()
    const [searchBotThinking, setSearchBotThinking] = useState(false)

    const search = async (query) => {
        try {
            setSearchBotThinking(true)
            const res = await SearchBotService.search(user.id_user, query)
            if (res) {
                return res
            } else {
                setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
            }
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        } finally{
            setSearchBotThinking(false)
        }
    }

    return(
        <SearchBotContext.Provider value={{
            search,
            searchBotThinking
        }}>{children}</SearchBotContext.Provider>
    )

}

export default SearchBotContextProvider