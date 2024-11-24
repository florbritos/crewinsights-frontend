import { useState } from 'react'
import InputErrorMessage from '../InputErrorMessage'
import { useCrewBotContext } from '../contexts/CrewBotContext'
import { useAuthContext } from '../contexts/AuthContext'

const AskCrewBot = () => {
    const { initChat, setConversation, conversation, handleChat, setActiveChatId, activeChatId, setChats, chats } = useCrewBotContext()
    const { user } = useAuthContext()
    const [message, setMessage] = useState("")
    const [messageError, setMessageError] = useState("")

    const onChange = (e) => {
        setMessageError("")
        setMessage(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit(e);
        }
    }

    const onSubmit = async (e) =>{
        e.preventDefault()
        if (message.trim() !== ""){
            const q = {sender: user.id_user, message: message} 
            const a = {sender: 'crewbot', message: ''}
            setConversation([...conversation, q])
            setMessage("")
            if (!activeChatId){
                const res = await initChat({id_user: user.id_user, question: message})
                if (res){
                    if (res.status === 'success'){
                        a["message"] = res.result.answer
                        setConversation([...conversation, q, a])
                        setActiveChatId(res.result.id_chat)
                        addToChatList(res.result)
                    }
                }
            } else {
                const res = await handleChat({id_user: user.id_user, id_chat: activeChatId, question: message})
                if (res){
                    if (res.status === 'success'){
                        a["message"] = res.result.answer
                        setConversation([...conversation, q, a])
                        updateChatList(res.result)
                    }
                }
            }
            
        } else {
            setMessageError("The message is empty")
        }
    }

    const addToChatList = (res) => {
        setChats([...chats, {
            id_chat: res.id_chat, 
            id_user: res.id_user, 
            title: res.title, 
            current: true, 
            conversation: [{'question': res.question, 'answer': res.answer}]
        }]
        )
    }

    const updateChatList = (res) => {
        setChats(prevChats => 
            prevChats.map(c=> {
                if (c.id_chat === res.id_chat){
                    return {
                        ...c, 
                        title : res.title, 
                        conversation: [...c.conversation, { question: res.question, answer: res.answer }]
                    }
                }
                return c
            })
        )
    }

    return (
        <>  
            <div className="flex items-start space-x-4 w-full max-w-5xl my-10 px-2">
                <div className="min-w-0 flex-1">
                    <form onSubmit={onSubmit} className="relative">
                        <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-orangeCI-1">
                            <label htmlFor="comment" className="sr-only">
                                Add your question
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows={1}
                                placeholder="Add your question..."
                                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                onChange={onChange}
                                value={message}
                                {...(messageError && {"aria-describedby" : "error-message"})}
                                onKeyDown={handleKeyPress}
                            />
                            <div aria-hidden="true" className="py-2">
                                <div className="py-px">
                                    <div className="h-9" />
                                </div>
                            </div>
                        </div>
                        <div className={`absolute inset-x-0 bottom-0 flex justify-${messageError ? 'between' : 'end'} py-2 pl-3 pr-2`}>
                            <InputErrorMessage error={messageError} />
                            <div className="flex-shrink-0">
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md bg-blueCI-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AskCrewBot
