import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions
} from '@headlessui/react'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useUserManagementContext } from '../contexts/UserManagementContext'
import UserEdition from './UserEdition'
import PopUpModal from '../PopUpModal'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SearchUser = () => {
    const { userList, deleteUser, setLoaderLG} = useUserManagementContext()
    const [query, setQuery] = useState('')
    const [ recent, setRecent ] = useState([])
    const [ showUserEdition, setShowUserEdition ] = useState(false)
    const [ selectedPerson, setSelectedPerson ] = useState(null)
    const [ filteredUsers, setFilteredUsers ] = useState([])
    const [ showUserDeletionAlert, setShowUserDeletionAlert ] = useState(false)

    useEffect(()=>{
        setFilteredUsers(query === ''
            ? []
            : userList.filter((person) => {
                return (
                    person.first_name.toLowerCase().includes(query.toLowerCase()) ||
                    person.last_name.toLowerCase().includes(query.toLowerCase()) ||
                    person.email.toLowerCase().includes(query.toLowerCase())
                );
            })
        )
    }, [query, userList])

    useEffect(()=>{
        const selected = userList.filter(u => u.id_user === selectedPerson?.id_user)
        if(selected.length !== 0){
            setSelectedPerson(selected[0])
        }
    }, [userList])

    const handleDeleteUser = async () => {
        setLoaderLG(true)
        setShowUserDeletionAlert(false)
        await deleteUser(selectedPerson.id_user)
        setLoaderLG(false)
    }

    return (
        <>
            <div className='mx-2 rounded-md max-w-7xl mx-auto'>
                <Combobox
                    onChange={setSelectedPerson}
                >
                    <div className="relative flex justify-center">
                        <div className='max-w-5xl w-full'>
                            <MagnifyingGlassIcon
                                className="pointer-events-none relative left-4 top-8 size-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <ComboboxInput
                                autoFocus
                                className="w-full rounded-xl h-12 bg-blueCI-1 pl-11 pr-4 text-white placeholder:text-gray-400 focus:ring-0 focus:border-blueCI-1 focus:outline-none sm:text-sm"
                                placeholder="Search user by name..."
                                onChange={(event) => {
                                    setQuery(event.target.value)
                                    setSelectedPerson(null)
                                }}
                            />
                        </div>
                    </div>

                    {(query === '' || filteredUsers.length > 0) && (
                    <ComboboxOptions as="div" static hold className="flex transform-gpu divide-x divide-gray-100">
                        <div
                            className={classNames(
                                'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                                selectedPerson && 'sm:h-96',
                            )}
                        >
                            {query !== '' && (
                                <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">Search Results</h2>
                            )}
                            <div className="-mx-2 text-sm text-gray-700">
                                {(query === '' ? recent : filteredUsers).map((person) => (
                                <ComboboxOption
                                    as="div"
                                    key={person.id_user}
                                    value={person}
                                    className="group flex cursor-default select-none items-center rounded-md p-2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    onChange={setSelectedPerson}
                                >
                                    <img src={'./../avatars/' + person?.avatar} alt="User's avatar" className="size-6 flex-none rounded-full" />
                                    <span className="ml-3 flex-auto truncate">{person.first_name} {person.last_name}</span>
                                    <ChevronRightIcon
                                        className="ml-3 hidden size-5 flex-none text-gray-400 group-data-[focus]:block"
                                        aria-hidden="true"
                                    />
                                </ComboboxOption>
                                ))}
                            </div>
                        </div>
                        <div className="hidden h-full w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                            {
                                selectedPerson && (
                                    <>
                                        <div className="flex-none p-6 text-center">
                                            <img src={'./../avatars/' + selectedPerson.avatar} alt="User's avatar" className="mx-auto size-16 rounded-full" />
                                            <h2 className="mt-3 font-semibold text-gray-900">{selectedPerson.first_name} {selectedPerson.last_name}</h2>
                                            <p className="text-sm/6 text-gray-500">{selectedPerson?.role.toUpperCase()}</p>
                                        </div>
                                        <div className="flex flex-auto flex-col justify-between p-6">
                                            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                                <dt className="col-end-1 font-semibold text-gray-900">Date of Birth</dt>
                                                <dd>{selectedPerson.dob}</dd>
                                                <dt className="col-end-1 font-semibold text-gray-900">Passport Number</dt>
                                                <dd>{selectedPerson.passport}</dd>
                                                <dt className="col-end-1 font-semibold text-gray-900">Nationality</dt>
                                                <dd>{selectedPerson.nationality}</dd>
                                                <dt className="col-end-1 font-semibold text-gray-900">Phone</dt>
                                                <dd>{selectedPerson.contact_number}</dd>
                                                <dt className="col-end-1 font-semibold text-gray-900">Address</dt>
                                                <dd className="truncate">{selectedPerson.address} </dd>
                                                <dt className="col-end-1 font-semibold text-gray-900">Email</dt>
                                                <dd className="truncate">{selectedPerson.email}</dd>
                                                <dt className="col-end-1 font-semibold text-gray-900">Job Title</dt>
                                                <dd>{selectedPerson.job_title}</dd>
                                            </dl>
                                            <div className='flex gap-2'>
                                                <button
                                                    type="button"
                                                    className="mt-6 w-full rounded-md bg-blueCI-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={() => setShowUserEdition(true)}
                                                >
                                                    Edit User
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-6 w-full rounded-md bg-blueCI-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    onClick={() => setShowUserDeletionAlert(true)}
                                                >
                                                    Delete User
                                                </button>
                                            </div>
                                        </div>
                                </>
                            )}
                        </div>
                    </ComboboxOptions>
                    )}

                    {query !== '' && filteredUsers.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <UsersIcon className="mx-auto size-6 text-gray-400" aria-hidden="true" />
                        <p className="mt-4 font-semibold text-gray-900">No people found</p>
                        <p className="mt-2 text-gray-500">We couldn’t find any user with that name. Please try again.</p>
                    </div>
                    )}
                </Combobox>
            </div>
            {showUserEdition && selectedPerson && (
                <UserEdition 
                    showUserEdition={showUserEdition} 
                    setShowUserEdition={setShowUserEdition} 
                    selectedPerson={selectedPerson} 
                />
            )}
            <PopUpModal 
                open={showUserDeletionAlert} 
                setOpen={setShowUserDeletionAlert} 
                title={'You are about to delete an user'}
                message={'Are you sure you want to continue?'}
                action={handleDeleteUser}
            />
        </>
    )
}

export default SearchUser