import React, { useEffect, useState } from 'react'
import './App.css'
import './index.css'; 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import AuthContextProvider from './components/contexts/AuthContext'
import NotificationContextProvider from './components/contexts/NotificationContext';
import { useAuthContext } from './components/contexts/AuthContext'
import CrewHome from './pages/crew/CrewHome';
import Notification from './components/Notification'
import LoaderModal from './components/LoaderModal';
import LoaderModalContextProvider from './components/contexts/LoaderModalContext';
import Menu from './components/Menu'
import Crewbot from './pages/crew/CrewBot';
import CrewBotContextProvider from './components/contexts/CrewBotContext';
import FlightReport from './pages/crew/FlightReport';
import FlightReportContextProvider from './components/contexts/FlightReportContext';
import NavigationContextProvider, { useNavigationContext } from './components/contexts/NavigationContext';
import DashboardContextProvider from './components/contexts/DashboardContext';
import PageNotEntitlements from './pages/PageNotEntitlements';
import SearchBotContextProvider from './components/contexts/SearchBotContext';
import UserManagementContextProvider from './components/contexts/UserManagementContext';
import UserManagement from './pages/admin/UserManagement';
import UserProfile from './pages/UserProfile';
import UserEditProfile from './pages/UserEditProfile';
import PasswordRecoveryContextProvider from './components/contexts/PasswordRecoveryContext';

const ProtectedRoute = ({ component: Component, roles }) => {
  const { isAuthenticated } = useAuthContext()
  const [ token, setToken ] = useState(null)
  const [ activeUser, setActiveUser ] = useState({})
  // const { handleNavigation, setFlagChangesToSave } = useNavigationContext();

  // // useEffect(()=>{
  // //   const [ token, activeUser ] = isAuthenticated()
  // //   setToken(token)
  // //   setActiveUser(activeUser)
  // // }, [])

  useEffect(()=>{
    (async () => {
      const [ token, activeUser ] = await isAuthenticated();
      setToken(token)
      setActiveUser(activeUser)
    })();
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
            <UserManagementContextProvider>
              <DashboardContextProvider>
                <SearchBotContextProvider>
                  <CrewBotContextProvider>
                    <FlightReportContextProvider>
                      <PasswordRecoveryContextProvider>
                        <LoaderModal/>
                        <Notification/>
                        <BrowserRouter>
                          <NavigationContextProvider>
                            <Routes>
                              <Route path='/login' element={<Login/>}/>
                              <Route path='/' element={<Home/>}/>
                              <Route path='/profile' element={<><Menu/><ProtectedRoute component={UserProfile} roles={['Admin', 'Crew']} /></>}/>
                              <Route path='/edit-profile' element={<><Menu/><ProtectedRoute component={UserEditProfile} roles={['Admin', 'Crew']} /></>}/>
                              <Route path="/dashboard" element= {<><Menu/><ProtectedRoute component={Dashboard} roles={['Admin']} /></>}/>
                              <Route path="/user-management" element= {<><Menu/><ProtectedRoute component={UserManagement} roles={['Admin']} /></>}/>
                              <Route path="/crewhome" element= {<><Menu/><ProtectedRoute component={CrewHome} roles={['Crew']} /></>}/>
                              <Route path="/crewbot" element= {<><Menu/><ProtectedRoute component={Crewbot} roles={['Crew']} /></>}/>
                              <Route path="/flight-report" element= {<><Menu/><ProtectedRoute component={FlightReport} roles={['Crew']} /></>}/>
                              <Route path='/unauthorized' element={<PageNotEntitlements/>}/>
                              <Route path="*" element={<PageNotFound />} />
                            </Routes>
                          </NavigationContextProvider>
                        </BrowserRouter>
                      </PasswordRecoveryContextProvider>
                    </FlightReportContextProvider>
                  </CrewBotContextProvider>
                </SearchBotContextProvider>
              </DashboardContextProvider>
            </UserManagementContextProvider>
          </AuthContextProvider>
        </LoaderModalContextProvider>
      </NotificationContextProvider>
    </div>
  )
}

export default App;
