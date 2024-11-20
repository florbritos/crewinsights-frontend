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

const ProtectedRoute = ({ component: Component, roles }) => {
  const { isAuthenticated } = useAuthContext()
  const [ token, setToken ] = useState(null)
  const [ activeUser, setActiveUser ] = useState({})
  const { handleNavigation, setFlagChangesToSave } = useNavigationContext();

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
            <DashboardContextProvider>
              <CrewBotContextProvider>
                <FlightReportContextProvider>
                  <LoaderModal/>
                  <Notification/>
                  <BrowserRouter>
                    <NavigationContextProvider>
                      <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/' element={<Home/>}/>
                        <Route path="/dashboard" element= {<><Menu/><ProtectedRoute component={Dashboard} roles={['admin']} /></>}/>
                        <Route path="/crewhome" element= {<><Menu/><ProtectedRoute component={CrewHome} roles={['crew']} /></>}/>
                        <Route path="/crewbot" element= {<><Menu/><ProtectedRoute component={Crewbot} roles={['crew']} /></>}/>
                        <Route path="/flight-report" element= {<><Menu/><ProtectedRoute component={FlightReport} roles={['crew']} /></>}/>
                        <Route path='/unauthorized' element={<PageNotEntitlements/>}/>
                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                    </NavigationContextProvider>
                  </BrowserRouter>
                </FlightReportContextProvider>
              </CrewBotContextProvider>
            </DashboardContextProvider>
          </AuthContextProvider>
        </LoaderModalContextProvider>
      </NotificationContextProvider>
    </div>
  )
}

export default App;
