import { useEffect, useRef } from "react";
import { useCrewBotContext } from "../contexts/CrewBotContext"
import { useAuthContext } from "../contexts/AuthContext";

const Conversation = () => {
    const { user } = useAuthContext() 
    const { conversation, crewbotTyping } = useCrewBotContext()
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

return (
    <div className="w-full overflow-y-auto p-2">
        <div className="relative">
            {
                conversation.length === 0 &&
                <div className="mt-90 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-blueCI-1 lg:text-5xl pb-4 lg:pb-0"><span className="text-orangeCI-1">Hey</span>, how can I help you?</h2>
                    <p className="lg:mt-6 text-sm sm:text-base text-blueCI-1 w-3/6 mx-auto">
                        Hi! I'm CrewBot. I can help answer any questions you have about flight issues or provide knowledge based on reports submitted by the crew. 
                    </p>
                </div>
            }
            <ul role="list" className="max-w-5xl mx-auto">
                {
                    conversation.map((m,index)=> 
                        <li 
                            key={index} 
                            className={`flex justify-${m.sender === "crewbot" ? "start" : "end"} gap-2 my-2`}
                        >
                            <div className={`chat-image avatar order-${m.sender === "crewbot" ? "1" : "2"}`}>
                                <div className="w-10 rounded-full">
                                    <img
                                        //alt="Tailwind CSS chat bubble component"
                                        //src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        src={
                                            m.sender === "crewbot" 
                                            ? './../avatars/bot.svg'
                                            : './../avatars/' + user.avatar
                                        } 
                                        alt="User's avatar"
                                    />
                                </div>
                            </div>
                            <div className={`chat-bubble ${m.sender === "crewbot" ? "bg-blueCI-1 order-2" : "bg-orangeCI-1 order-1 text-black"}`}>{m.message}</div>
                        </li>
                    )
                }
                {
                    crewbotTyping &&
                    <li 
                        className={`flex justify-start gap-2`}
                    >
                        <div className={`chat-image avatar order-1`}>
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                                />
                            </div>
                        </div>
                        <div className={`chat-bubble order-2`}>
                            <span className="loading loading-dots loading-md"></span>
                        </div>
                    </li>
                }
                <div ref={messagesEndRef} />
            </ul>
        </div>
    </div>
)

}

export default Conversation