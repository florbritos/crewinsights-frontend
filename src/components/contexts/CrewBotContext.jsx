import { useContext, createContext, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import * as CrewBotService from '../../services/crewbot_service'
import { useAuthContext } from "./AuthContext";
const CrewBotContext = createContext()
export const useCrewBotContext = () => useContext(CrewBotContext)

const CrewBotContextProvider = ({children}) => {

    const { user } = useAuthContext()
    const { setNotificationInformation } = useNotificationContext()
    const [ conversation, setConversation ] = useState([])
    const [activeChatId, setActiveChatId] = useState("")
    const [crewbotTyping, setCrewbotTyping] = useState(false)
    const [chats, setChats] = useState([])
    const [loader, setLoader ] = useState(false)

    const initChat = async (message) => {
        try {
            setCrewbotTyping(true)
            const response = await CrewBotService.initChat(user.id_user, message)
            if (response) {
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        } finally{
            setCrewbotTyping(false)
        }
    }

    const handleChat = async (message) => {
        try {
            setCrewbotTyping(true)
            const response = await CrewBotService.handleChat(user.id_user, message)
            if (response) {
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        } finally{
            setCrewbotTyping(false)
        }
    }

    const handleChats = (chatList) => {
        const finalChatList = []
        chatList.map(c => finalChatList.push({id_chat: c._id, id_user: c.id_user, title: c.title, current: false, conversation: c.messages }))
        setChats(finalChatList)
    }

    const getAllChatsByUserId = async() => {
        setLoader(true)
        try {
            const response = await CrewBotService.getAllChatsByUserId(user.id_user)
            if (response) {
                if (response.status === 'success'){
                    handleChats(response.result)              
                }
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        } finally {
            setLoader(false)
        }
    }

    const deleteChat = async (id_chat) => {
        setLoader(true)
        try {
            const response = await CrewBotService.deleteChat(user.id_user, id_chat)
            if (response) {
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        } finally {
            setLoader(false)
        }
    }

    return(
        <CrewBotContext.Provider value={{
            initChat,
            setConversation,
            conversation,
            crewbotTyping,
            setCrewbotTyping,
            handleChat,
            setChats,
            chats,
            getAllChatsByUserId,
            loader,
            setActiveChatId,
            activeChatId,
            deleteChat
        }}>{children}</CrewBotContext.Provider>
    )

}

export default CrewBotContextProvider