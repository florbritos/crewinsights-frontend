
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import InputErrorMessage from '../InputErrorMessage'
import { currentDateTime, validateField, validateObjectFields } from '../../helpers/field_rule_validations'
import PopUpModal from '../PopUpModal'
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

const data = {
    'first_name':'',
    'last_name':'',
    'dob':'',
    'address':'',
    'nationality':'',
    'passport':'',
    'contact_number':'',
    'job_title':'Captain',
    'avatar':'',
    'role':'Crew',
    'email': '',
    'password': '',
    'avatar': 'avatar5.svg'
}

const UserAddition = () => {
    const { createUser, getUserList } = useUserManagementContext()
    const { setNotificationInformation } = useNotificationContext()
    const [ formErrors, setFormErrors ] = useState({})
    const [ userData, setUserData ] = useState(data)
    const [ showCreateUserAlert, setShowCreateUserAlert ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showLoader, setShowLoader ] = useState(false)
    

    const handleOnChange = (key, value) => {
        const error = validateField(key, value) 
        if (error){
            setFormErrors({...formErrors, [key] : error})
        } else {
            const { [key]: _, ...updatedUserErrors } = formErrors;
            setFormErrors(updatedUserErrors);
        }

        const newUserData = {...userData}
        if(key === 'role' && value === 'Admin'){
            newUserData['job_title'] = 'Admin'
        }

        if(key === 'role' && value === 'Crew'){
            newUserData['job_title'] = 'Captain'
        }

        setUserData({...newUserData, [key] : value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateObjectFields(userData)
        if (Object.keys(errors).length !== 0) {
            setFormErrors(errors)
            return
        } 
        setShowCreateUserAlert(true)
    }

    const handleCreateUser = async () => {
        setShowLoader(true)
        setShowCreateUserAlert(false)
        const response = await createUser(userData)
        if (response){
            if(response.status === 'success'){
                setUserData(data)
                await getUserList()
                setNotificationInformation({"status": "success", "title": "New addition!", "message": "You have created a new user successfully"})
            } else {
                setFormErrors(response.errors)
                setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
            }
        
        }
        setShowLoader(false)
    }


    return (
        <div className='mb-10'>
            <div className='mb-5'>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-orange-50">
                    <UserPlusIcon aria-hidden="true" className="size-6" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                    <h1 as="h3" className="text-base font-semibold text-gray-900">
                        User Addition
                    </h1>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Create new user profiles effortlessly. Fill in the required fields and save to add a new user to the system.
                        </p>
                    </div>
                </div>
            </div>
            {
                showLoader && <LoaderLG/>
            }
            {
                !showLoader &&
                <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 mt-5 max-w-7xl mx-auto">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-7xl gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-6">
                            <div className="col-span-1 sm:col-span-2">
                                <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        value={userData.first_name}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                        {...(formErrors.first_name && {"aria-describedby" : "error-first_name"})}
                                    />
                                    <InputErrorMessage error={formErrors.first_name} idError="error-first_name"/>
                                </div>
                            </div>

                            <div className="col-span-1 sm:col-span-2">
                                <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        value={userData.last_name}
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
                                        value={userData.dob}
                                        max={currentDateTime().slice(0, 10)}
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
                                        value={userData.nationality}
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
                                        value={userData.passport}
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
                                        value={userData.email}
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
                                        value={userData.contact_number}
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
                                        value={userData.address}
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
                                        value={userData.job_title || ''}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm/6"
                                    >
                                        {
                                            getJobTitles(userData.role).map((title) => (
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
                                        value={userData.role || ''}
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

                            <div className="col-span-1 sm:col-span-4">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <div className='flex items-center justify-center'>
                                        <input
                                            id="password"
                                            name="password"
                                            type={`${!showPassword ? 'password': 'text'}`}
                                            value={userData.password || ''}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6"
                                            {...(formErrors.password && {"aria-describedby" : "error-password"})}
                                        />
                                        {
                                            !showPassword ?
                                            <EyeIcon 
                                            aria-hidden="true" 
                                            className="h-6 w-6 ms-2 hover:text-orangeCI-1"
                                            onClick={() => setShowPassword(true)}
                                            />
                                            :
                                            <EyeSlashIcon 
                                            aria-hidden="true" 
                                            className="h-6 w-6 ms-2 hover:text-orangeCI-1"
                                            onClick={() => setShowPassword(false)}
                                            />
                                        }
                                    </div>
                                    <InputErrorMessage error={formErrors.password} idError="error-password"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button
                            type="submit"
                            className="rounded-md bg-blueCI-1 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                        >
                            Create
                        </button>
                    </div>
                </form>
            }
            <PopUpModal 
                open={showCreateUserAlert} 
                setOpen={setShowCreateUserAlert} 
                title={'You are about to create a new user'}
                message={'Are you sure you want to continue?'}
                action={handleCreateUser}
            />
        </div>
    )
}

export default UserAddition