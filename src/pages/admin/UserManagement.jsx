import {  PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import SearchUser from "../../components/userManagement/SearchUser"
import { useUserManagementContext } from "../../components/contexts/UserManagementContext"
import LoaderLG from "../../components/LoaderLG"
import UserAddition from "../../components/userManagement/UserAddition"

const UserManagement = () => {
    const { getUserList, loaderLG, setLoaderLG } = useUserManagementContext()
    const [ currentSection, setCurrentSection ] = useState('edit-user')
    const hasFetched = useRef(false)

    useEffect(() => {   
        (async () => {
            if (!hasFetched.current) {
                hasFetched.current = true
                setLoaderLG(true)
                await getUserList()
                setLoaderLG(false)
            }
        })();
    }, []);

    return (
        <div className='w-full App-content h-screen max-h-screen bg-gray-200'>
            <div className="h-full flex flex-col">
                <div className="bg-gray-900 py-12">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">User Management</h2>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                                Edit, update, or delete user information to ensure your team database stays accurate and up-to-date.
                            </p>
                        </div>
                    </div>
                </div>
                { loaderLG && <div className="mt-10"><LoaderLG /></div> }
                {
                    !loaderLG &&
                    <>
                        <div className="relative mt-5">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <button
                                        type="button"
                                        className={`${currentSection === 'edit-user' ? 'ring-blueCI-1 ring-2 text-blueCI-1': 'ring-gray-300 ring-1 text-gray-400 hover:bg-blueCI-1 hover:text-white' } rounded-lg relative inline-flex items-center bg-white px-3 py-2 ring-inset focus:z-10`}
                                        onClick={() => setCurrentSection('edit-user')}
                                    >
                                        <span className="text-sm mr-2">Edit User</span>
                                        <PencilIcon aria-hidden="true" className="size-5" />
                                    </button>
                                    <button
                                        type="button"
                                        className={`${currentSection === 'add-user' ? 'ring-blueCI-1 ring-2 text-blueCI-1': 'ring-gray-300 ring-1 text-gray-400 hover:bg-blueCI-1 hover:text-white' } rounded-lg relative inline-flex items-center bg-white px-3 py-2 ring-inset focus:z-10`}
                                        onClick={() => setCurrentSection('add-user')}
                                    >
                                        <span className="text-sm mr-2">Add User</span>
                                        <PlusCircleIcon aria-hidden="true" className="size-5" />
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="flex-grow bg-gray-200 mt-5">
                            {currentSection === 'edit-user' && <SearchUser />}
                            {currentSection === 'add-user' && <UserAddition />}
                        </div>
                    </>
                }
            </div>
        </div>
        
    )
}

export default UserManagement