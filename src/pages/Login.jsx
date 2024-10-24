import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/contexts/AuthContext';
import { useNotificationContext } from '../components/contexts/NotificationContext';
import { useLoaderModalContext } from '../components/contexts/LoaderModalContext';
import * as Storage from "../services/storage_service";
import { validateField, validateObjectFields } from '../helpers/field_rule_validations'; 
import InputErrorMessage from '../components/InputErrorMessage';

const Login = () => {
  const navigate = useNavigate()
  const { setOpen } = useLoaderModalContext()
  const { login, user, setUser, isAuthenticated } = useAuthContext()
  const { setNotificationInformation } = useNotificationContext()
  const [authInfo, setAuthInfo] = useState({
    email: null,
    password: null
  })
  const [authError, setAuthError] = useState({
    email: "",
    password: ""
  })

  const [token, activeUser] = isAuthenticated()
  if(token){
    navigate('/')
    return null
  }

  const handleOnChange = (e) => {
    const field = e.target.name
    const value = e.target.value
    const error = validateField(field, value)
    if (error){
      setAuthError({...authError, [field]: error})
    } else {
      setAuthError({...authError, [field]: ""})
    }
    
    setAuthInfo({ ...authInfo, [field]: value })
  }

  const setUserSession = (user_info) => {
    setUser(user_info)
    Storage.saveToken('token', user_info.token, 7)
    delete user_info.token
    Storage.save('user', user_info)
  }

  const handleResponse = (res) => {
    if (res.status === 'success'){
      setUserSession(res.user)
      navigate('/')
      setNotificationInformation({"status": "success", "title": "Welcome!", "message": "You have logged in successfully"})
      return
    }
    setAuthError(res.errors)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setOpen(true)
    const errors = validateObjectFields(authInfo)
    if (Object.keys(errors).length !== 0) {
      setAuthError(errors)
    } else {
      const res = await login(authInfo)
      res && handleResponse(res)
    }
    setOpen(false)
  }

  return (
  
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-blueCI-1 tracking-wider font1">
            Crew<span className="text-orangeCI-1">Insights</span>
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form novalidate onSubmit={onSubmit} className="space-y-6" >
            <div>
              <div className="flex">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                  {...(authError.email && {"aria-describedby" : "error-email"})}
                />
                <InputErrorMessage error={authError.email} idError="error-email"/>
              </div>
            </div>
            <div>
              <div className="flex  justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blueCI-1 hover:text-orangeCI-1">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleOnChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                  {...(authError.password && {"aria-describedby" : "error-password"})}
                />
                <InputErrorMessage error={authError.password} idError="error-password"/>
              </div>
            </div>

            <div>
              <button
                type="submit"
                formNoValidate
                className="flex w-full justify-center rounded-md bg-blueCI-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default Login