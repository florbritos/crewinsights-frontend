import { useCrewBotContext } from "../../components/contexts/CrewBotContext"
import AskCrewBot from "../../components/crewbot/AskCrewBot"
import Conversation from "../../components/crewbot/Conversation"
import { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    PlusIcon,
    XCircleIcon
} from '@heroicons/react/24/outline'
import LoaderXS from "../../components/LoaderXS"
import PopUpModal from "../../components/PopUpModal"
import { Link } from "react-router-dom"

const navigation = [
    { name: 'New chat', icon: PlusIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Crewbot = () => {
    const { setConversation, chats, setChats, getAllChatsByUserId, loader, setActiveChatId, activeChatId, deleteChat } = useCrewBotContext()
    const [ sidebarOpen, setSidebarOpen ] = useState(false)
    const [ chatIdToDelete, setChatIdToDelete ] = useState(false)
    const [ showDeleteAlert, setShowDeleteAlert ] = useState(false)
    const hasFetched = useRef(false)

    useEffect(()=>{
        if (!hasFetched.current) {
            hasFetched.current = true;
            getAllChatsByUserId()
            setNewChat()
        }
    }, [])

    useEffect(()=>{
        manageCurrentChatStatus()
    }, [activeChatId])

    const manageCurrentChatStatus = async () => {
        setChats(prevChats => 
            prevChats.map(c=> {
                if (c.id_chat === activeChatId){
                    return {...c, current : true}
                }
                if (c.current === true && c.id_chat !== activeChatId ){
                    return {...c, current : false}
                }
                return c
            })
        )
    }

    const setNewChat = () => {
        setActiveChatId("")
        setConversation([])
    }

    const getSelectedChat = (id_chat) => {
        const conver = []
        const chatSelected = chats.filter(c => c.id_chat === id_chat)
        chatSelected[0].conversation.map(c => conver.push({sender: chatSelected[0].id_user, message: c.question}, {sender: 'crewbot', message: c.answer}))
        setConversation(conver)
        setActiveChatId(id_chat)
        setChats(prevChats => 
            prevChats.map(c=> {
                if (c.id_chat === id_chat){
                    return {...c, current : true}
                }
                if (c.current === true && c.id_chat !== id_chat ){
                    return {...c, current : false}
                }
                return c
            })
        )
    }

    const handleDeleteChat = (id_chat) =>{
        setShowDeleteAlert(true)
        setChatIdToDelete(id_chat)
    }

    const eraseChat = async () => {
        setShowDeleteAlert(false)
        const response = await deleteChat(chatIdToDelete)
        if (response.status === 'success'){
            console.log(response)
            activeChatId && activeChatId === chatIdToDelete && setNewChat()
            setChats(prevChats => prevChats.filter(c=> c.id_chat !== activeChatId))
        }
    }

    return (
        <>
            <div className="pt-[140px] sm:pt-[80px] w-full h-screen border">
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative lg:hidden z-50">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0 "
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full "
                        >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XCircleIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>z
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                            <div className="flex h-16 shrink-0 items-center">
                                <Link 
                                    to={"/"} 
                                    className="-m-1.5 p-1.5 font1 text-1xl font-bold text-blueCI-1"
                                >
                                    Crew<span className="text-orangeCI-1">Insights</span>
                                </Link>
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                            <li key={item.name}>
                                                <button
                                                    className={classNames(
                                                        item.current
                                                        ? 'bg-gray-50 text-blueCI-1'
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-orangeCI-1',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                        item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                        'h-6 w-6 shrink-0',
                                                        )}
                                                    />
                                                {item.name}
                                                </button>
                                            </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="text-xs font-semibold leading-6 text-gray-400">Your chats</div>
                                        { loader && <LoaderXS /> }
                                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                                            {chats.map((chat) => (
                                            <li key={chat.id_chat}>
                                                <button
                                                    onClick={() => getSelectedChat(chat.id_chat)}
                                                    className={classNames(
                                                        chat.current
                                                        ? 'bg-gray-50 text-orangeCI-1'
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-orangeCI-1',
                                                        'group flex gap-x-3 rounded-md p-2 text-xs font-semibold leading-6',
                                                    )}
                                                >
                                                    <button
                                                        onClick={() => handleDeleteChat(chat.id_chat)}
                                                        className='text-gray-400 hover:text-orangeCI-1 flex h-6 w-6 shrink-0 items-center justify-center bg-white text-[0.625rem] font-medium'
                                                    >
                                                        <XCircleIcon aria-hidden="true" className="h-6 w-6" />
                                                    </button>
                                                    <span className="truncate">{chat.title}</span>
                                                </button>
                                            </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        </DialogPanel>
                    </div>
                </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <Link 
                            to={"/"} 
                            className="-m-1.5 p-1.5 font1 text-1xl font-bold text-blueCI-1"
                        >
                            Crew<span className="text-orangeCI-1">Insights</span>
                        </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <button
                                    className={'text-gray-700 hover:bg-gray-50 hover:text-orangeCI-1 group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full'}
                                    onClick={setNewChat}
                                >
                                <PlusIcon
                                    aria-hidden="true"
                                    className={'text-gray-400 group-hover:text-orangeCI-1 h-6 w-6 shrink-0'}
                                />
                                    New Chat
                                </button>
                            </li>
                            <li>
                                <div className="text-xs font-semibold leading-6 text-gray-400">Your chats</div>
                                { loader && <LoaderXS /> } 
                                <ul role="list" className="-mx-2 mt-2 space-y-1 flex flex-col justify-start overflow-y-auto">
                                    {chats.map((chat) => (
                                    <li key={chat.id_chat} className="tooltip flex items-center justify-between" data-tip={chat.title}>
                                        <button
                                            onClick={() => getSelectedChat(chat.id_chat)}
                                            className={classNames(
                                                chat.current
                                                ? 'bg-gray-50 text-orangeCI-1'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-orangeCI-1',
                                                'group flex gap-x-3 rounded-md p-2 text-xs font-semibold leading-6',
                                            )}
                                        >
                                            <button
                                                onClick={() => handleDeleteChat(chat.id_chat)}
                                                className='text-gray-400 hover:text-orangeCI-1 flex h-6 w-6 shrink-0 items-center justify-center bg-white text-[0.625rem] font-medium'
                                            >
                                                <XCircleIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                            <span className="truncate">{chat.title}</span>
                                        </button>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72 h-full max-h-full">
                <div className="fixed top-[80px] w-full flex h-16 shrink-0 items-center gap-x-4 border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 lg:hidden bg-blueCI-1 z-10">
                    <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 lg:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </button>
                </div>
                <main className="flex flex-col items-center h-full max-h-full justify-between">
                    <div className="flex flex-col w-full items-center h-full justify-end">
                        <Conversation />
                        <AskCrewBot />
                    </div>
                </main>
            </div>
        </div>
        <PopUpModal 
            open={showDeleteAlert} 
            setOpen={setShowDeleteAlert} 
            title={'You are about to delete a chat'}
            message={'Are you sure you want to continue?'}
            action={eraseChat}
        />
        </>
    )
}

export default Crewbot