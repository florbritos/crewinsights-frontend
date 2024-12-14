import { useAuthContext } from '../../components/contexts/AuthContext'
import { useEffect, useState } from 'react'
import CrewPaxInformation from '../../components/flightReport/CrewPaxInformation'
import FlightDetails from '../../components/flightReport/FlightDetails'
import FlightOperations from '../../components/flightReport/FlightOperations'
import CabinSafety from '../../components/flightReport/CabinSafety'
import ServiceQuality from '../../components/flightReport/ServiceQuality'
import AdditionalComments from '../../components/flightReport/AdditionalComments'
import PopUpModal from '../../components/PopUpModal'
import { validateField, validateObjectFields } from '../../helpers/field_rule_validations'
import { useFlightReportContext } from '../../components/contexts/FlightReportContext'
import isEqual from 'lodash/isEqual';
import { useNavigationContext } from '../../components/contexts/NavigationContext'
import { useNotificationContext } from '../../components/contexts/NotificationContext'
import {
    ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { useLoaderModalContext } from '../../components/contexts/LoaderModalContext'
import Summary from '../../components/flightReport/Summary'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const FlightReport = () => {
    const { user } = useAuthContext()
    const { setNotificationInformation } = useNotificationContext()
    const { setOpen } = useLoaderModalContext()
    const { report, setReport, reportErrors, setReportErrors, restartReport, initialReport, saveReport} = useFlightReportContext()
    const { setFlagChangesToSave, setShowCloseWarning, showCloseWarning, setConfirmClose } = useNavigationContext()
    const [ tabs, setTabs ] = useState([
        { name: 'Flight Details', current: true, error: false },
        { name: 'Crew and Passengers Information', current: false, error: false },
        { name: 'Flight Operations', current: false, error: false },
        { name: 'Cabin Safety', current: false, error: false },
        { name: 'Service Quality', current: false, error: false },
        { name: 'Additional Comments', current: false, error: false },
    ])
    const [ currentTab, setCurrentTab ] = useState('Flight Details')
    const [ showSubmitReportAlert, setShowSubmitReportAlert ] = useState(false)
    const [ reportStatus, setReportStatus ] = useState('New')

    const checkboxFields = {
        'delays': 'reason_delay',
        'diverted_emergency_landing': 'reason_diverted_emergency_landing',
        'technical_issues_aircraft': 'reason_technical_issues_aircraft',
        'safety_incident': 'safety_incident_explanation',
        'safety_procedure_not_followed': 'safety_procedure_not_followed_explanation',
        'medical_assistance': 'medical_assistance_explanation',
        'unruly_pax': 'unruly_pax_explanation',
        'damage_aircraft_equipment': 'damage_aircraft_equipment_explanation',
        'service_not_completed': 'service_not_completed_explanation',
        'pax_complaints': 'pax_complaints_explanation'
    }

    const fieldsTabMapping = {
        'Flight Details' : ['flight_number', 'departure_airport', 'arrival_airport', 'schedule_departure_time', 'actual_departure_time', 'schedule_arrival_time', 'actual_arrival_time'],
        'Crew and Passengers Information' : ['captain_name', 'first_officer_name','purser_name','number_cabin_crew','total_number_pax','total_number_infants','total_number_pax_special_assistance' ],
        'Flight Operations' : ['delays','reason_delay','diverted_emergency_landing','reason_diverted_emergency_landing','technical_issues_aircraft','reason_technical_issues_aircraft',],
        'Cabin Safety' : ['safety_incident','safety_incident_explanation','safety_procedure_not_followed','safety_procedure_not_followed_explanation','medical_assistance','medical_assistance_explanation','unruly_pax','unruly_pax_explanation','damage_aircraft_equipment','damage_aircraft_equipment_explanation'],
        'Service Quality' : ['service_not_completed','service_not_completed_explanation', 'pax_complaints','pax_complaints_explanation'],
        'Additional Comments' : ['additional_comments']
    }

    useEffect(()=>{
        restartReport()
    }, [])

    useEffect(()=>{
        if (Object.keys(report).length !== 0 && !isEqual(report, initialReport)){
            setReportStatus('In Progress')
            setFlagChangesToSave(true)
        } else {
            setReportStatus('New')
            setFlagChangesToSave(false)
        }
    }, [report])

    useEffect(()=>{
        const keys = Object.keys(reportErrors)
        setTabs(prevTabs =>
            prevTabs.map(t=>{
                const tabWithError = keys.find(k => fieldsTabMapping[t.name].includes(k))

                if (tabWithError){
                    return {...t, error : true}
                } else {
                    return {...t, error : false}
                }
            })
        )
    }, [reportErrors])

    const onTabChange = (tabName) => {
        setCurrentTab(tabName)
        setTabs(prevTabs =>
            prevTabs.map(t=>{
                if (t.name === tabName){
                    return {...t, current : true}
                }
                if (t.current === true && t.name !== tabName ){
                    return {...t, current : false}
                }
                return t
            })
        )
    }

    const handleOnChange = (key, value) => {
        const error = validateField(key, value, report) 
        if (error){
            setReportErrors({...reportErrors, [key] : error})
            setReport({...report, [key] : value})
        } else {
            if (Object.keys(checkboxFields).includes(key) && !value){
                updateFieldsIfCheckBoxIsFalse(key, value)
            } else {
                const { [key]: _, ...updatedErrors } = reportErrors;
                setReportErrors(updatedErrors);
                setReport({...report, [key] : value})
            }
        }
    }

    const updateFieldsIfCheckBoxIsFalse = (key, value) => {
        const { [key]: _, ...updatedErrors } = reportErrors;
        const { [checkboxFields[key]]: __, ...newUpdatedErrors } = updatedErrors;
        setReportErrors(newUpdatedErrors);
        setReport({...report, [key] : value, [checkboxFields[key]]: ""})
    }

    const handleSubmit = async () => {
        const errors = validateObjectFields(report)
        setShowSubmitReportAlert(false)
        if (Object.keys(errors).length !== 0) {
            setReportErrors(errors)
        } else {
            setOpen(true)
            const res = await saveReport()
            setOpen(false)
            res && handleResponse(res)
        }
    }

    const handleResponse = (res) => {
        if (res.status === 'success'){
            setNotificationInformation({"status": "success", "title": "Thank you!", "message": "You have submitted a flight report successfully"})
            setReportStatus('Submitted')
            setFlagChangesToSave(false)
            return
        } else {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    return (
        <div className='bg-blueCI-1 w-full'>
            <div className="App-content mt-10 space-y-10 w-full lg:w-9/12 mx-auto px-5 mb-10">
                <div className='mb-10'>
                    <h1 className='text-5xl font-bold text-orangeCI-1 text-center'>Hey {user.first_name},
                        <span className='text-2xl font-bold text-white ps-3 block sm:inline'>you landed back!</span>
                    </h1>
                    <p className='mt-2 text-gray-300 text-center'>Please complete the flight report below to ensure all necessary information about the flight is accurately recorded.</p>
                </div>
                <div className='w-full flex flex-col sm:flex-row justify-between items-center'>
                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                            <circle r={3} cx={3} cy={3} />
                        </svg>
                        {reportStatus}
                    </span>
                    <div className={`w-full sm:w-fit mt-10 sm:mt-0 flex items-center md:items-center md:justify-between ${reportStatus === 'Submitted' ?  'invisible': 'visible'}`}>
                        <div className="w-full mt-3 flex md:right-0 md:top-3 md:mt-0">
                            <button
                                type="submit"
                                onClick={() => setShowSubmitReportAlert(true)}
                                className="w-full flex sm:ml-3 text-center justify-center items-center rounded-md  px-3 py-2 text-sm font-semibold text-black shadow-sm bg-orange-300 hover:bg-orangeCI-1 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div 
                    className={`relative border-b border-gray-200 pb-5 sm:pb-0 ${reportStatus === 'Submitted' ?  'hidden': 'block'}`}
                >
                    <div className="mt-4">
                        <div className="sm:hidden">
                            <label htmlFor="current-tab" className="sr-only">
                                Select a tab
                            </label>
                            <select
                                id="current-tab"
                                name="current-tab"
                                defaultValue={tabs.find((tab) => tab.current).name}
                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1"
                                onChange={e => onTabChange(e.target.value)}
                            >
                                {tabs.map((tab) => (
                                    <option key={tab.name} value={tab.name}>
                                        {tab.name} {tab.error ? "❌" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <nav className="-mb-px flex space-x-8 justify-center flex-wrap">
                                {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    aria-current={tab.current ? 'page' : undefined}
                                    onClick={() => onTabChange(tab.name)}
                                    className={classNames(
                                    tab.current
                                        ? 'border-orangeCI-1 text-orangeCI-1'
                                        : (
                                            tab.error 
                                            ? 'border-transparent text-red-500'
                                            : 'border-transparent text-gray-500 hover:border-white hover:text-white'
                                        ),
                                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium mt-3',
                                    )}
                                >
                                    <div className='flex gap-x-1'>
                                        {tab.name}
                                        {   
                                            tab.error &&
                                            <ExclamationCircleIcon aria-hidden="true" className="h-6 w-6" />
                                        }
                                    </div>
                                </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                
                {
                    reportStatus !== 'Submitted' &&
                    <form>
                        {currentTab === 'Flight Details' && <FlightDetails handleOnChange={handleOnChange}/>}
                        {currentTab === 'Crew and Passengers Information' && <CrewPaxInformation handleOnChange={handleOnChange}/>}
                        {currentTab === 'Flight Operations' && <FlightOperations handleOnChange={handleOnChange}/>}
                        {currentTab === 'Cabin Safety' && <CabinSafety handleOnChange={handleOnChange}/>}
                        {currentTab === 'Service Quality' && <ServiceQuality handleOnChange={handleOnChange}/>}
                        {currentTab === 'Additional Comments' && <AdditionalComments handleOnChange={handleOnChange}/>}
                        </form>
                }
                {
                    reportStatus === 'Submitted' &&
                    <Summary fieldsTabMapping={fieldsTabMapping}/>
                }
                <PopUpModal 
                    open={showSubmitReportAlert} 
                    setOpen={setShowSubmitReportAlert} 
                    title={'You are about to submit a flight report'}
                    message={'Are you sure you want to continue?'}
                    action={handleSubmit}
                />
                <PopUpModal 
                    open={showCloseWarning} 
                    setOpen={setShowCloseWarning} 
                    title={'You are about to lose your changes'}
                    message={'Are you sure you want to continue?'}
                    action={() => setConfirmClose(true)}
                />
            </div>
        </div>
    )
}

export default FlightReport