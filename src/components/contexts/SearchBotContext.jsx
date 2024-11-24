import { useContext, createContext, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import * as SearchBotService from '../../services/searchbot_service'
import { useAuthContext } from "./AuthContext";
import { response } from "../../helpers/field_rule_validations";

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
            // const res = await new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve({
            //             status: "success",
            //             message: "SearchBot replied successfully",
            //             result: response
            //         })
            //     }, 5000)
            // });

            if (res) {
                return res
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