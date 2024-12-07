import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    PencilSquareIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoaderModalContext } from './contexts/LoaderModalContext';
import { useAuthContext } from './contexts/AuthContext';
import { useNotificationContext } from './contexts/NotificationContext';
import { useNavigationContext } from './contexts/NavigationContext';
import PopUpModal from './PopUpModal';

const options = [
    {
        name: 'View Profile',
        description: 'View your profile information, including personal details and account settings.',
        href: '/profile',
        icon: UserCircleIcon,
    },
    {
        name: 'Edit Profile',
        description: 'Edit your profile information and update account settings.',
        href: '/edit-profile',
        icon: PencilSquareIcon,
    }
]

function CurrentPage() {
    const location = useLocation();
    const currentPath = location.pathname;

    const section = {
        "crewhome": "Home",
        "crewbot" : "CrewBot",
        "flight-report": "Flight-Report",
        "dashboard": "Home",
        "user-management": "Users",
        "profile": "Profile",
        "edit-profile": "Edit Profile"
    }
    const lastPart = currentPath.split('/').filter(Boolean).pop();

    return (
        <div className='ps-2 text-2xl uppercase'>
            <p>/ {section[lastPart]}</p>
        </div>
    );
}

export default function Menu() {
    const { setOpen } = useLoaderModalContext()
    const { logOut, user } = useAuthContext()
    const { setNotificationInformation } = useNotificationContext()
    const { handleRouteChange } = useNavigationContext()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [ showSignOutAlert, setShowSignOutAlert ] = useState(false)

    const signOut = async (e) => {
        e.preventDefault()
        setOpen(true)
        setShowSignOutAlert(false)
        const res= await logOut()
        if(res){
            if (res.status === "success"){
                navigate("/login")
                setNotificationInformation({"status": "success", "title": "Good bye!", "message": "You have logged out successfully"})
            }
        }
        setOpen(false)
    }

    return (
    <>
        <header className="fixed top-0 w-full isolate z-10 bg-slate-50 h-20">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1 items-end">
                    <Link 
                        to={"/"} 
                        onClick={e => { e.preventDefault(); handleRouteChange("/")}}
                        className="-m-1.5 p-1.5 font1 text-1xl font-bold text-blueCI-1"
                    >
                        Crew<span className="text-orangeCI-1">Insights</span>
                    </Link>
                    <CurrentPage/>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link 
                        to={"/"}
                        onClick={e => { e.preventDefault(); handleRouteChange("/")}}
                        className={`text-sm font-semibold leading-6 text-gray-900 hover:text-orangeCI-1`}
                    >
                        Home
                    </Link>
                    <Popover>
                        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-orangeCI-1">
                            Profile
                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute inset-x-0 top-0 -z-10 bg-white pt-14 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                                {options.map((item) => (
                                <div key={item.name} className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-50">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-orangeCI-1" />
                                    </div>
                                    <Link 
                                        to={item.href}
                                        onClick={e => { e.preventDefault(); handleRouteChange(item.href)}}
                                        className="mt-6 block font-semibold text-gray-900 text-start"
                                    >
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </Link>
                                    <p className="mt-1 text-gray-600 text-start">{item.description}</p>
                                </div>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover>
                    <Link 
                        to={"/crewbot"}
                        onClick={e => { e.preventDefault(); handleRouteChange("/crewbot")}}
                        className={`text-sm font-semibold leading-6 text-gray-900 hover:text-orangeCI-1 ${user.role === "Crew" ? "block" : "hidden"}`}
                    >
                        CrewBot
                    </Link>
                    <Link 
                        to={"/flight-report"} 
                        onClick={e => { e.preventDefault(); handleRouteChange("/flight-report")}}
                        className={`text-sm font-semibold leading-6 text-gray-900 hover:text-orangeCI-1 ${user.role === "Crew" ? "block" : "hidden"}`}
                    >
                        Flight Report
                    </Link>
                    <Link 
                        to={"/user-management"} 
                        onClick={e => { e.preventDefault(); handleRouteChange("/user-management")}}
                        className={`text-sm font-semibold leading-6 text-gray-900 hover:text-orangeCI-1 ${user.role === "Admin" ? "block" : "hidden"}`}
                    >
                        User Management
                    </Link>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button 
                        type="button" 
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-orangeCI-1"
                        onClick={() => setShowSignOutAlert(true)}
                    >
                        Log out <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-slate-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <Link 
                        to={'/'} 
                        onClick={e => { e.preventDefault(); handleRouteChange("/"); setMobileMenuOpen(false)}}
                        className="-m-1.5 p-1.5 font1 font-bold text-blueCI-1"
                    >
                        Crew<span className="text-orangeCI-1">Insights</span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            <Link
                                to={"/"}
                                onClick={e => { e.preventDefault(); handleRouteChange("/"); setMobileMenuOpen(false)}}
                                className={`-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}
                            >
                            Home
                            </Link>
                            <Disclosure as="div" className="-mx-3">
                                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Profile
                                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 space-y-2">
                                    {[...options].map((item) => (
                                    <Link
                                        to={item.href}
                                        onClick={e => { e.preventDefault(); handleRouteChange(item.href); setMobileMenuOpen(false)}}
                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                    ))}
                                </DisclosurePanel>
                            </Disclosure>
                            <Link
                                to={"/crewbot"}
                                onClick={e => { e.preventDefault(); handleRouteChange("/crewbot"); setMobileMenuOpen(false)}}
                                className={`-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${user.role === "Crew" ? "block" : "hidden"}`}
                            >
                            CrewBot
                            </Link>
                            <Link
                                to={"/flight-report"}
                                onClick={e => { e.preventDefault(); handleRouteChange("/flight-report"); setMobileMenuOpen(false)}}
                                className={`-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${user.role === "Crew" ? "block" : "hidden"}`}
                            >
                            Flight Report
                            </Link>
                            <Link
                                to={"/user-management"}
                                onClick={e => { e.preventDefault(); handleRouteChange("/user-management"); setMobileMenuOpen(false)}}
                                className={`-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${user.role === "Admin" ? "block" : "hidden"}`}
                            >
                            User Management
                            </Link>
                        </div>
                        <div className="py-6">
                            <button
                                    type='button'
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setShowSignOutAlert(true)}
                                >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
                </DialogPanel>
            </Dialog>
        </header>
        <PopUpModal 
            open={showSignOutAlert} 
            setOpen={setShowSignOutAlert} 
            title={'You are about to sign out'}
            message={'Are you sure you want to continue?'}
            action={signOut}
        />
    </>
    )
}
