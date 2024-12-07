import { useFlightReportContext } from "../contexts/FlightReportContext"
import InputErrorMessage from "../InputErrorMessage"
import { currentDateTime } from "../../helpers/field_rule_validations"

const FlightDetails = ({handleOnChange}) => {

    const { reportErrors, report } = useFlightReportContext()

    return (
        <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-4">
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-4">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                            <div className="sm:col-span-1">
                                <label htmlFor="flight_number" className="block text-sm font-medium leading-6 text-gray-900">
                                    Flight Number
                                </label>
                                <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                    <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                        <circle r={3} cx={3} cy={3} />
                                    </svg>
                                    required
                                </span>
                                <div className="mt-2">
                                    <input
                                        id="flight_number"
                                        name="flight_number"
                                        type="text"
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        value={report.flight_number}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.flight_number && {"aria-describedby" : "error-flight_number"})}
                                    />
                                    <InputErrorMessage error={reportErrors.flight_number} idError="error-flight_number"/>
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="departure_airport" className="block text-sm font-medium leading-6 text-gray-900">
                                    Departure Airport
                                </label>
                                <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                    <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                        <circle r={3} cx={3} cy={3} />
                                    </svg>
                                    required
                                </span>
                                <div className="mt-2">
                                    <input
                                        id="departure_airport"
                                        name="departure_airport"
                                        type="text"
                                        value={report.departure_airport}
                                        onChange={e => handleOnChange(e.target.name, e.target.value.toUpperCase())}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.departure_airport && {"aria-describedby" : "error-departure_airport"})}
                                    />
                                    <InputErrorMessage error={reportErrors.departure_airport} idError="error-departure_airport"/>
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="arrival_airport" className="block text-sm font-medium leading-6 text-gray-900">
                                    Arrival Airport
                                </label>
                                <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                    <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                        <circle r={3} cx={3} cy={3} />
                                    </svg>
                                    required
                                </span>
                                <div className="mt-2">
                                    <input
                                        id="arrival_airport"
                                        name="arrival_airport"
                                        type="text"
                                        value={report.arrival_airport}
                                        onChange={e => handleOnChange(e.target.name, e.target.value.toUpperCase())}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.arrival_airport && {"aria-describedby" : "error-arrival_airport"})}
                                    />
                                    <InputErrorMessage error={reportErrors.arrival_airport} idError="error-arrival_airport"/>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="schedule_departure_time" className="block text-sm font-medium leading-6 text-gray-900">
                                            Scheduled Departure Time (*)
                                        </label>
                                        <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                            <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                                <circle r={3} cx={3} cy={3} />
                                            </svg>
                                            required
                                        </span>
                                        <div className="mt-2">
                                            <input
                                                id="schedule_departure_time"
                                                name="schedule_departure_time"
                                                type="datetime-local"
                                                max={currentDateTime()}
                                                value={report.schedule_departure_time}
                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                                {...(reportErrors.schedule_departure_time && {"aria-describedby" : "error-schedule_departure_time"})}
                                            />
                                            <InputErrorMessage error={reportErrors.schedule_departure_time} idError="error-schedule_departure_time"/>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="actual_departure_time" className="block text-sm font-medium leading-6 text-gray-900">
                                            Actual Departure Time (*)
                                        </label>
                                        <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                            <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                                <circle r={3} cx={3} cy={3} />
                                            </svg>
                                            required
                                        </span>
                                        <div className="mt-2">
                                            <input
                                                id="actual_departure_time"
                                                name="actual_departure_time"
                                                type="datetime-local"
                                                value={report.actual_departure_time}
                                                max={currentDateTime()}
                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                                {...(reportErrors.actual_departure_time && {"aria-describedby" : "error-actual_departure_time"})}
                                            />
                                            <InputErrorMessage error={reportErrors.actual_departure_time} idError="error-actual_departure_time"/>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="schedule_arrival_time" className="block text-sm font-medium leading-6 text-gray-900">
                                            Scheduled Arrival Time (*)
                                        </label>
                                        <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                            <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                                <circle r={3} cx={3} cy={3} />
                                            </svg>
                                            required
                                        </span>
                                        <div className="mt-2">
                                            <input
                                                id="schedule_arrival_time"
                                                name="schedule_arrival_time"
                                                type="datetime-local"
                                                max={currentDateTime()}
                                                value={report.schedule_arrival_time}
                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                                {...(reportErrors.schedule_arrival_time && {"aria-describedby" : "error-schedule_arrival_time"})}
                                            />
                                            <InputErrorMessage error={reportErrors.schedule_arrival_time} idError="error-schedule_arrival_time"/>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="actual_arrival_time" className="block text-sm font-medium leading-6 text-gray-900">
                                            Actual Arrival Time (*)
                                        </label>
                                        <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                            <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                                <circle r={3} cx={3} cy={3} />
                                            </svg>
                                            required
                                        </span>
                                        <div className="mt-2">
                                            <input
                                                id="actual_arrival_time"
                                                name="actual_arrival_time"
                                                type="datetime-local"
                                                max={currentDateTime()}
                                                value={report.actual_arrival_time}
                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                                {...(reportErrors.actual_arrival_time && {"aria-describedby" : "error-actual_arrival_time"})}
                                            />
                                            <InputErrorMessage error={reportErrors.actual_arrival_time} idError="error-actual_arrival_time"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="italic text-white mt-2 text-left">(*) UTC Time</p>
        </>
    )
}

export default FlightDetails