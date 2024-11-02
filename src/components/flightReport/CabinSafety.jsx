import { useFlightReportContext } from "../contexts/FlightReportContext"
import InputErrorMessage from "../InputErrorMessage"

const CabinSafety = ({handleOnChange}) => {

    const { reportErrors, report } = useFlightReportContext()

    return (
        <>
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                    <div className="mt-6 space-y-12">
                        <div>
                            <div className="relative flex gap-x-3 mb-2">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="safety_incident"
                                        name="safety_incident"
                                        type="checkbox"
                                        checked={report.safety_incident}
                                        onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="safety_incident" className="font-medium text-gray-900">
                                        Safety-related incident
                                    </label>
                                    <p className="text-gray-500">Check if there were any safety-related incidents during the flight.</p>
                                </div>
                            </div>
                            {
                                report.safety_incident &&
                                <div className="">
                                    <label htmlFor="safety_incident_explanation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Please explain the situation
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                    <div className="mt-2">
                                        <textarea
                                            id="safety_incident_explanation"
                                            name="safety_incident_explanation"
                                            value={report.safety_incident_explanation}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.safety_incident_explanation && {"aria-describedby" : "error-safety_incident_explanation"})}
                                        />
                                        <InputErrorMessage error={reportErrors.safety_incident_explanation} idError="error-safety_incident_explanation"/>
                                    </div>
                                </div>
                            }
                        </div>

                        <div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="safety_procedure_not_followed"
                                        name="safety_procedure_not_followed"
                                        type="checkbox"
                                        checked={report.safety_procedure_not_followed}
                                        onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="safety_procedure_not_followed" className="font-medium text-gray-900">
                                        Safety procedures not followed
                                    </label>
                                    <p className="text-gray-500">Check if any safety procedures were not followed.</p>
                                </div>
                            </div>
                            {
                                report.safety_procedure_not_followed &&
                                <div className="">
                                    <label htmlFor="safety_procedure_not_followed_explanation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Please explain the situation
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                    <div className="mt-2">
                                        <textarea
                                            id="safety_procedure_not_followed_explanation"
                                            name="safety_procedure_not_followed_explanation"
                                            value={report.safety_procedure_not_followed_explanation}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.safety_procedure_not_followed_explanation && {"aria-describedby" : "error-safety_procedure_not_followed_explanation"})}
                                        />
                                        <InputErrorMessage error={reportErrors.safety_procedure_not_followed_explanation} idError="error-safety_procedure_not_followed_explanation"/>
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="medical_assistance"
                                        name="medical_assistance"
                                        type="checkbox"
                                        checked={report.medical_assistance}
                                        onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="medical_assistance" className="font-medium text-gray-900">
                                        Medical assistance required
                                    </label>
                                    <p className="text-gray-500">Check if any passenger required medical assistance during the flight.</p>
                                </div>
                            </div>
                            {
                                report.medical_assistance &&
                                <div className="">
                                    <label htmlFor="medical_assistance_explanation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Please explain the situation
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                    <div className="mt-2">
                                        <textarea
                                            id="medical_assistance_explanation"
                                            name="medical_assistance_explanation"
                                            value={report.medical_assistance_explanation}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.medical_assistance_explanation && {"aria-describedby" : "error-medical_assistance_explanation"})}
                                        />
                                        <InputErrorMessage error={reportErrors.medical_assistance_explanation} idError="error-medical_assistance_explanation"/>
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="unruly_pax"
                                        name="unruly_pax"
                                        type="checkbox"
                                        checked={report.unruly_pax}
                                        onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="unruly_pax" className="font-medium text-gray-900">
                                        Unruly passenger
                                    </label>
                                    <p className="text-gray-500">Check if there were any incidents involving an unruly passenger.</p>
                                </div>
                            </div>
                            {
                                report.unruly_pax &&
                                <div className="">
                                    <label htmlFor="unruly_pax_explanation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Please explain the situation
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                    <div className="mt-2">
                                        <textarea
                                            id="unruly_pax_explanation"
                                            name="unruly_pax_explanation"
                                            value={report.unruly_pax_explanation}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.unruly_pax_explanation && {"aria-describedby" : "error-unruly_pax_explanation"})}
                                        />
                                        <InputErrorMessage error={reportErrors.unruly_pax_explanation} idError="error-unruly_pax_explanation"/>
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="damage_aircraft_equipment"
                                        name="damage_aircraft_equipment"
                                        type="checkbox"
                                        checked={report.damage_aircraft_equipment}
                                        onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="damage_aircraft_equipment" className="font-medium text-gray-900">
                                        Damage to aircraft/equipment
                                    </label>
                                    <p className="text-gray-500">Check if there was any damage to the aircraft or onboard equipment.</p>
                                </div>
                            </div>
                            {
                                report.damage_aircraft_equipment &&
                                <div className="">
                                    <label htmlFor="damage_aircraft_equipment_explanation" className="block text-sm font-medium leading-6 text-gray-900">
                                        Please explain the situation
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                    <div className="mt-2">
                                        <textarea
                                            id="damage_aircraft_equipment_explanation"
                                            name="damage_aircraft_equipment_explanation"
                                            value={report.damage_aircraft_equipment_explanation}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.damage_aircraft_equipment_explanation && {"aria-describedby" : "error-damage_aircraft_equipment_explanation"})}
                                        />
                                        <InputErrorMessage error={reportErrors.damage_aircraft_equipment_explanation} idError="error-damage_aircraft_equipment_explanation"/>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CabinSafety