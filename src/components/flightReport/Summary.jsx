import { useFlightReportContext } from "../contexts/FlightReportContext"
import { PaperClipIcon } from '@heroicons/react/20/solid'

const Summary = ({fieldsTabMapping}) => {

    const { report } = useFlightReportContext()

    const nameMapping = {
        "flight_number": "Flight Number",
        "departure_airport": "Departure Airport",
        "arrival_airport": "Arrival Airport",
        "schedule_departure_time": "Scheduled Departure Time",
        "actual_departure_time": "Actual Departure Time",
        "schedule_arrival_time": "Scheduled Arrival Time",
        "actual_arrival_time": "Actual Arrival Time",
        "captain_name": "Captain's Full Name",
        "first_officer_name": "First Officer's Full Name",
        "purser_name": "Purser's Full Name",
        "number_cabin_crew": "Number of Cabin Crew Members",
        "total_number_pax": "Total Number of Passengers on Board5",
        "total_number_infants": "Total Number of Infants on Board",
        "total_number_pax_special_assistance": "Number of Passengers Requiring Special Assistance",
        "delays": 'Flight Delay',
        "reason_delay": "Please explain the reason",
        "diverted_emergency_landing": 'Flight Diversion/Emergency',
        "reason_diverted_emergency_landing": "Please explain the reason",
        "technical_issues_aircraft": 'Technical Issues',
        "reason_technical_issues_aircraft": "Please explain the reason",
        "safety_incident": 'Safety-related incident',
        "safety_incident_explanation": "Please explain the situation",
        "safety_procedure_not_followed": 'Safety procedures not followed',
        "safety_procedure_not_followed_explanation": "Please explain the situation",
        "medical_assistance": 'Medical assistance required',
        "medical_assistance_explanation": "Please explain the situation",
        "unruly_pax": 'Unruly passenger',
        "unruly_pax_explanation": "Please explain the situation",
        "damage_aircraft_equipment": 'Damage to aircraft/equipment',
        "damage_aircraft_equipment_explanation": "Please explain the situation",
        "service_not_completed": 'Service not fully provided',
        "service_not_completed_explanation": "Please explain the situation",
        "pax_complaints": 'Passenger complaints',
        "pax_complaints_explanation": "Please explain the situation",
        "additional_comments": "Please provide any additional comments or feedback"
    }

    const fieldsDescription = {
        'Flight Details' : 'Information about the flight’s schedule, airports, and times',
        'Crew and Passengers Information' : 'Details regarding the crew members, passenger counts, and any special assistance needs',
        'Flight Operations' : 'Key operational data including delays, technical issues, and any incidents during the flight',
        'Cabin Safety': ' Information on safety procedures followed, any incidents, medical assistance provided, and overall cabin security during the flight',
        'Service Quality' : 'Assessment of onboard services, passenger satisfaction, and any disruptions to the planned service',
        'Additional Comments' : 'Any extra remarks or observations related to the flight'
    }    

    return (
        <>
        {
            Object.keys(fieldsTabMapping).map(field => 
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-6 sm:px-6 bg-orange-50">
                        <h3 className="text-base/7 font-semibold text-gray-900">{field}</h3>
                        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">{fieldsDescription[field]}</p>
                    </div>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {fieldsTabMapping[field].map(v => 
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">{nameMapping[v]}</dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{
                                        typeof(report[v]) === 'boolean' 
                                        ? (report[v] ?  'Yes' : 'No')
                                        : (
                                            (v === 'schedule_departure_time' || v === 'actual_departure_time' || v === 'schedule_arrival_time' || v === 'actual_arrival_time') 
                                            ? report[v].replace('T', ' ')
                                            : report[v]
                                        )
                                    }</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Summary