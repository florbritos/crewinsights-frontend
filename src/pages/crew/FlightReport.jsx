import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useAuthContext } from '../../components/contexts/AuthContext'
import { useState } from 'react'
import CrewInformation from '../../components/flightReport/CrewInformation'
import FlightDetails from '../../components/flightReport/FlightDetails'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const FlightReport = () => {
    const { user } = useAuthContext()
    const [ tabs, setTabs ] = useState([
        { name: 'Flight Details', current: true },
        { name: 'Crew Information', current: false },
        { name: 'Passenger Information', current: false },
        { name: 'Flight Operations', current: false },
        { name: 'Cabin Safety', current: false },
    ])
    const [ currentTab, setCurrentTab ] = useState('Flight Details')

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

    return (
        <div className='bg-blueCI-1 w-full'>
            <div className="App-content mt-10 space-y-10 w-full lg:w-9/12 mx-auto px-5 mb-10">
                <div className='mb-32'>
                    <h1 className='text-5xl font-bold text-orangeCI-1'>Hey {user.first_name},
                        <span className='text-2xl font-bold text-white ps-3'>you landed back!</span>
                    </h1>
                    <p className='mt-2 text-gray-300'>Please complete the flight report below to ensure all necessary information about the flight is accurately recorded.</p>
                </div>
                <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-orangeCI-1 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
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
                                    <option key={tab.name} value={tab.name}>{tab.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    aria-current={tab.current ? 'page' : undefined}
                                    onClick={() => onTabChange(tab.name)}
                                    className={classNames(
                                    tab.current
                                        ? 'border-orangeCI-1 text-orangeCI-1'
                                        : 'border-transparent text-gray-500 hover:border-white hover:text-white',
                                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium',
                                    )}
                                >
                                    {tab.name}
                                </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <form>              
                    {currentTab === 'Flight Details' && <FlightDetails />}
                    {currentTab === 'Crew Information' && <CrewInformation />}
                </form>
                {/* {currentTab === 'Passenger Information' && <PassengerInformation />}
                {currentTab === 'Flight Operations' && <FlightOperations />}
                {currentTab === 'Cabin Safety' && <CabinSafety />} */}
            </div>
        </div>
    )
}

export default FlightReport