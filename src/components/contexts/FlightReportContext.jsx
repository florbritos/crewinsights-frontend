import { useContext, createContext, useState } from "react";
import * as FlightReportService from '../../services/flightReport_service'
import { useNotificationContext } from "./NotificationContext";
import { parseISO, format, addDays, isBefore } from 'date-fns';

const FlightReportContext = createContext()
export const useFlightReportContext = () => useContext(FlightReportContext)

const FlightReportContextProvider = ({children}) => {

    const { setNotificationInformation } = useNotificationContext()
    const [ reportErrors, setReportErrors ] = useState({})
    const [ report, setReport ] = useState({})
    

    const initialReport = {
        flight_number: "",
        departure_airport: "",
        arrival_airport: "",
        schedule_departure_time: "",
        actual_departure_time: "",
        schedule_arrival_time: "",
        actual_arrival_time: "",
        captain_name: "",
        first_officer_name: "",
        purser_name: "",
        number_cabin_crew: "",
        total_number_pax:"",
        total_number_infants: "",
        total_number_pax_special_assistance:"",
        delays: false,
        reason_delay:"",
        diverted_emergency_landing: false,
        reason_diverted_emergency_landing:"",
        technical_issues_aircraft: false,
        reason_technical_issues_aircraft:"",
        safety_incident: false,
        safety_incident_explanation:"",
        safety_procedure_not_followed: false,
        safety_procedure_not_followed_explanation:"",
        medical_assistance: false,
        medical_assistance_explanation:"",
        unruly_pax: false,
        unruly_pax_explanation:"",
        damage_aircraft_equipment: false,
        damage_aircraft_equipment_explanation:"",
        service_not_completed: false,
        service_not_completed_explanation:"",
        pax_complaints: false,
        pax_complaints_explanation:"",
        additional_comments:"",
    }

    const restartReport = () => {
        setReport(initialReport)
        setReportErrors({})
    }

    const saveReport = async () => {
        try {
            const response = await FlightReportService.save(report)
            if (response) {
                return response
            } 
        } catch {
            setNotificationInformation({"status": "failed", "title": "Oops! Something went wrong", "message": "Please try again later"})
        }
    }

    return(
        <FlightReportContext.Provider value={{
            report,
            setReport,
            reportErrors,
            setReportErrors,
            restartReport,
            initialReport,
            saveReport
        }}>{children}</FlightReportContext.Provider>
    )

}

export default FlightReportContextProvider