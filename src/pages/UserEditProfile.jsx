import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../components/contexts/AuthContext";
import InputErrorMessage from "../components/InputErrorMessage";
import { useState } from "react";
import { currentDateTime, getDifferences, validateField, validateObjectFields } from "../helpers/field_rule_validations";
import { useNotificationContext } from "../components/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useUserManagementContext } from "../components/contexts/UserManagementContext";
import PopUpModal from "../components/PopUpModal";
import LoaderLG from "../components/LoaderLG";
import * as Storage from "../services/storage_service"

const avatars = ['avatar1.svg', 'avatar2.svg', 'avatar3.svg', 'avatar4.svg', 'avatar5.svg'] 

const UserEditProfile = () => {
    const { user, setUser } = useAuthContext()
    const { updateUser } = useUserManagementContext()
    const { setNotificationInformation } = useNotificationContext()
    const [ userData, setUserData ] = useState(user)
    const [ formErrors, setFormErrors ] = useState({})
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showSubmitChangesAlert, setShowSubmitChangesAlert ] = useState(false)
    const [ showLoader, setShowLoader ] = useState(false)
    const navigate = useNavigate()

    const handleOnChange = (key, value) => {
        const error = validateField(key, value) 
        if (error){
            setFormErrors({...formErrors, [key] : error})
        } else {
            const { [key]: _, ...updatedUserErrors } = formErrors;
            setFormErrors(updatedUserErrors);
        }
        setUserData({...userData, [key] : value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const differences = getDifferences(user, userData)
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
        const differences = getDifferences(user, userData)
        const response = await updateUser(user.id_user, differences)
        if (response){
            if(response.status === 'success'){
                navigate("/profile")
                setNotificationInformation({"status": "success", "title": "Profile updated!", "message": "Your changes were successfully saved."})
                updateUserObj()
            } else {
                setFormErrors(response.errors)
                setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
            }
        }
        setShowLoader(false)
    }

    const updateUserObj = () => {
        const newUserData = {...userData}
        delete newUserData.password
        setUser(newUserData)
        Storage.save('user', newUserData)
    }

    return (
        <div className="App-content w-full mb-20">
            {
                showLoader &&
                <div className="flex flex-col items-center h-full justify-center">
                    <LoaderLG/>
                    <p className="font-normal uppercase tracking-widest mt-5">Updating profile</p>
                </div>
            }
            {
                !showLoader &&
                <>
                    <form onSubmit={handleSubmit} >
                        <fieldset>
                            <legend className="text-base font-medium text-gray-900 sr-only">Select an avatar</legend>
                            <div className="mt-4 grid gap-y-6 gap-x-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-5xl w-fit mx-auto">
                                {
                                    avatars.map(a =>
                                        <label className={`relative flex flex-col cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none w-fit hover:bg-orange-100 ${userData.avatar == a && 'bg-orange-100'}`}>
                                            {
                                                userData.avatar == a && 
                                                <svg className="absolute h-5 w-5 text-slate-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            <input
                                                type="radio"
                                                name="avatar"
                                                value={a}
                                                className="sr-only"
                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <img className="inline-block h-24 w-24 rounded-full" src={'./../avatars/' + a} alt="Porfile picture"/>
                                                </span>
                                            </span>
                                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                                        </label>
                                    )
                                }
                            </div>
                        </fieldset>
                        <h3 className="mt-6 text-sm font-medium text-gray-900 text-center">{userData.first_name}</h3>
                        <dl className="mt-1 flex flex-col items-center justify-center">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-sm text-gray-500">{user.job_title}</dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {user.role}
                                </span>
                            </dd>
                        </dl>
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 mt-5 max-w-7xl mx-auto">
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
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                    <PopUpModal 
                        open={showSubmitChangesAlert} 
                        setOpen={setShowSubmitChangesAlert} 
                        title={'You are about to update your profile'}
                        message={'Are you sure you want to continue?'}
                        action={handleSaveChanges}
                    />
                </>
            }
        </div>
    );
};

export default UserEditProfile