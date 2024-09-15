import React, { useEffect, useState } from 'react'
import './App.css'
import './index.css'; 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import AuthContextProvider from './components/contexts/AuthContext'
import NotificationContextProvider from './components/contexts/NotificationContext';
import { useAuthContext } from './components/contexts/AuthContext'
import CrewHome from './pages/crewHome/CrewHome';
import Notification from './components/Notification'
import LoaderModal from './components/LoaderModal';
import LoaderModalContextProvider from './components/contexts/LoaderModalContext';

const ProtectedRoute = ({ component: Component, roles }) => {
  const { isAuthenticated } = useAuthContext()
  const [ token, setToken ] = useState(null)
  const [ activeUser, setActiveUser ] = useState({})
  

  useEffect(()=>{
    const [ token, activeUser ] = isAuthenticated()
    setToken(token)
    setActiveUser(activeUser)
  }, [])

  if (token === null){
    return null
  }

  return (
    token === "" 
    ? <Navigate to="/login" /> 
    : ( roles.includes(activeUser?.role) ? (
          <Component/>
        ) : (
          <Navigate to="/unauthorized" />
        )
    )
  )
};

function App() {

  return (
    <div className="App">
      <NotificationContextProvider>
        <LoaderModalContextProvider>
          <AuthContextProvider>
            <LoaderModal/>
            <Notification/>
            <BrowserRouter>
              <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path="/dashboard" element= {<ProtectedRoute component={Dashboard} roles={['admin']} />}/>
                <Route path="/crewhome" element= {<ProtectedRoute component={CrewHome} roles={['crew']} />}/>
                <Route path='/unauthorized' element={<PageNotFound/>}/>
              </Routes>
            </BrowserRouter>
          </AuthContextProvider>
        </LoaderModalContextProvider>
      </NotificationContextProvider>
    </div>
  )
}

export default App;
