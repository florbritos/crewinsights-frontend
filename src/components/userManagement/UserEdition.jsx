
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, PencilIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import InputErrorMessage from '../InputErrorMessage'
import { currentDateTime, validateField, validateObjectFields } from '../../helpers/field_rule_validations'
import { useNotificationContext } from '../contexts/NotificationContext'
import { useUserManagementContext } from '../contexts/UserManagementContext'
import LoaderLG from '../LoaderLG'

const getJobTitles = (role) => {
    if (role === 'Crew') {
        return [
            'Captain',
            'Senior First Officer',
            'First Officer',
            'Second Officer',
            'Purser',
            'Cabin Senior',
            'Cabin Crew',
        ];
    } else if (role === 'Admin') {
        return ['Admin']
    }
    return []
}

const UserEdition = ({showUserEdition, setShowUserEdition, selectedPerson}) => {
    const { updateUser, getUserList } = useUserManagementContext()
    const { setNotificationInformation } = useNotificationContext()
    const [ formErrors, setFormErrors ] = useState({})
    const [changes, setChanges] = useState({ ...selectedPerson })
    const [ showSubmitChangesAlert, setShowSubmitChangesAlert ] = useState(false)
    const [ showLoader, setShowLoader ] = useState(false)


    const handleOnChange = (key, value) => {
        const error = validateField(key, value) 
        if (error){
            setFormErrors({...formErrors, [key] : error})
        } else {
            const { [key]: _, ...updatedUserErrors } = formErrors;
            setFormErrors(updatedUserErrors);
        }

        const newChanges = {...changes}
        if(key === 'role' && value === 'Admin'){
            newChanges['job_title'] = 'Admin'
        }

        if(key === 'role' && value === 'Crew'){
            newChanges['job_title'] = 'Captain'
        }

        setChanges({...newChanges, [key] : value})
    }

    function getDifferences(obj1, obj2) {
        const differences = {};
        for (const key in obj2) {
            if (obj2[key] !== obj1[key]) {
                differences[key] = obj2[key];
            }
        }
        return differences;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const differences = getDifferences(selectedPerson, changes)
        if(Object.keys(differences).length === 0){
            setNotificationInformation({"status": "warning", "title": "We could not update", "message": "There was no changes detected."})
            return
        }

        const errors = validateObjectFields(differences)
        if (Object.keys(errors).length !== 0) {
            setFormErrors(errors)
            return
        } 

        setShowSubmitChangesAlert(true)
    }

    const handleSaveChanges = async () => {
        setShowLoader(true)
        setShowSubmitChangesAlert(false)
        const differences = getDifferences(selectedPerson, changes)
        const response = await updateUser(selectedPerson.id_user, differences)
        if (response){
            debugger
            if(response.status === 'success'){
                await getUserList()
                setShowUserEdition(false)
            } else {
                setFormErrors(response.errors)
            }
            
        }
        setShowLoader(false)
    }


    return (
        <>
            <Dialog open={showUserEdition} onClose={() => {}} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-5xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                {
                                    showLoader &&
                                    <>
                                        <LoaderLG/>
                                        Updating user
                                    </>
                                }
                                {
                                    !showSubmitChangesAlert && !showLoader &&
                                    <>
                                        <div>
                                            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-orange-50">
                                                <PencilIcon aria-hidden="true" className="size-6" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                    User Edition
                                                </DialogTitle>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Update user information easily. Edit the necessary fields and save changes to keep the data up-to-date.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 mt-5 w-fit mx-auto">
                                            <div className="px-4 py-6 sm:p-8">
                                                <div className="grid max-w-2xl gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                                                    <div className="col-span-1 sm:col-span-3">
                                                        <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-900">
                                                            First name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="first_name"
                                                                name="first_name"
                                                                type="text"
                                                                value={changes.first_name}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.first_name && {"aria-describedby" : "error-first_name"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.first_name} idError="error-first_name"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-3">
                                                        <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-900">
                                                            Last name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="last_name"
                                                                name="last_name"
                                                                type="text"
                                                                value={changes.last_name}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.last_name && {"aria-describedby" : "error-last_name"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.last_name} idError="error-last_name"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-2">
                                                        <label htmlFor="dob" className="block text-sm/6 font-medium text-gray-900">
                                                            Date Of Birth
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="dob"
                                                                name="dob"
                                                                type="date"
                                                                max={currentDateTime().slice(0, 10)}
                                                                value={changes.dob}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.dob && {"aria-describedby" : "error-dob"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.dob} idError="error-dob"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-start-1 sm:col-span-3">
                                                        <label htmlFor="nationality" className="block text-sm/6 font-medium text-gray-900">
                                                            Nationality
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="nationality"
                                                                name="nationality"
                                                                type="text"
                                                                value={changes.nationality}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.nationality && {"aria-describedby" : "error-nationality"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.nationality} idError="error-nationality"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-3">
                                                        <label htmlFor="passport" className="block text-sm/6 font-medium text-gray-900">
                                                            Passport
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="passport"
                                                                name="passport"
                                                                type="text"
                                                                value={changes.passport}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.passport && {"aria-describedby" : "error-passport"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.passport} idError="error-passport"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-4">
                                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                                            Email address
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                value={changes.email}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.email && {"aria-describedby" : "error-email"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.email} idError="error-email"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-2">
                                                        <label htmlFor="contact_number" className="block text-sm/6 font-medium text-gray-900">
                                                            Contact Number
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="contact_number"
                                                                name="contact_number"
                                                                type="text"
                                                                value={changes.contact_number}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.contact_number && {"aria-describedby" : "error-contact_number"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.contact_number} idError="error-contact_number"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-6">
                                                        <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                                            Address
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="address"
                                                                name="address"
                                                                type="text"
                                                                value={changes.address}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                                                {...(formErrors.address && {"aria-describedby" : "error-address"})}
                                                            />
                                                            <InputErrorMessage error={formErrors.address} idError="error-address"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-3">
                                                        <label htmlFor="job_title" className="block text-sm/6 font-medium text-gray-900">
                                                            Job title
                                                        </label>
                                                        <div className="mt-2 grid grid-cols-1">
                                                            <select
                                                                id="job_title"
                                                                name="job_title"
                                                                value={changes.job_title || ''}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm/6"
                                                            >
                                                                {
                                                                    getJobTitles(changes.role).map((title) => (
                                                                        <option key={title} value={title}>
                                                                            {title}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        <ChevronDownIcon
                                                            aria-hidden="true"
                                                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                        />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1 sm:col-span-3">
                                                        <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                                                            CrewInsights Role
                                                        </label>
                                                        <div className="mt-2 grid grid-cols-1">
                                                            <select
                                                                id="role"
                                                                name="role"
                                                                value={changes.role || ''}
                                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                                className="col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm/6"
                                                            >
                                                                <option value='Admin'>Admin</option>
                                                                <option value='Crew'>Crew</option>
                                                            </select>
                                                            <ChevronDownIcon
                                                                aria-hidden="true"
                                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                                <button 
                                                    type="button" 
                                                    className="text-sm/6 font-semibold text-gray-900 hover:text-orangeCI-1"
                                                    onClick={() => setShowUserEdition(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-blueCI-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                }
                                {
                                    !showLoader && showSubmitChangesAlert &&
                                    <>
                                            <div className="bg-white pb-4 pt-5 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                                    </div>
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                            You are about to update user information
                                                        </DialogTitle>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                Are you sure you want to continue?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 sm:flex sm:flex-row-reverse mt-5">
                                                <button
                                                    type="button"
                                                    onClick={handleSaveChanges}
                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    type="button"
                                                    data-autofocus
                                                    onClick={() => setShowSubmitChangesAlert(false)}
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                    </>
                                }
                                    
                                
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </>
    )
}

export default UserEdition