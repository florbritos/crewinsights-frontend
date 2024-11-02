import { useFlightReportContext } from "../contexts/FlightReportContext"
import InputErrorMessage from "../InputErrorMessage"

const FlightOperations = ({handleOnChange}) => {

    const { reportErrors, report } = useFlightReportContext()

    return (
        <>
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                    <fieldset>
                        <div className="mt-6 space-y-12">
                            <div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="delays"
                                            name="delays"
                                            type="checkbox"
                                            checked={report.delays}
                                            onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="delays" className="font-medium text-gray-900">
                                            Flight Delay
                                        </label>
                                        <p className="text-gray-500">Check if the flight experienced any delays.</p>
                                    </div>
                                </div>
                                    {
                                        report.delays &&
                                        <div className="">
                                            <label htmlFor="reason_delay" className="block text-sm font-medium leading-6 text-gray-900">
                                                Please explain the reason
                                            </label>
                                            <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                                <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                                    <circle r={3} cx={3} cy={3} />
                                                </svg>
                                                required
                                            </span>
                                            <div className="mt-2">
                                                <textarea
                                                    id="reason_delay"
                                                    name="reason_delay"
                                                    value={report.reason_delay}
                                                    onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                                    {...(reportErrors.reason_delay && {"aria-describedby" : "error-reason_delay"})}
                                                />
                                                <InputErrorMessage error={reportErrors.reason_delay} idError="error-reason_delay"/>
                                            </div>
                                        </div>
                                    }
                            </div>

                            <div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="diverted_emergency_landing"
                                            name="diverted_emergency_landing"
                                            type="checkbox"
                                            checked={report.diverted_emergency_landing}
                                            onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="diverted_emergency_landing" className="font-medium text-gray-900">
                                            Flight Diversion/Emergency
                                        </label>
                                        <p className="text-gray-500">Check if the flight was diverted or had an emergency.</p>
                                    </div>
                                </div>
                                {
                                    report.diverted_emergency_landing &&
                                    <div className="">
                                        <label htmlFor="reason_diverted_emergency_landing" className="block text-sm font-medium leading-6 text-gray-900">
                                            Please explain the reason
                                        </label>
                                        <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                            <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                                <circle r={3} cx={3} cy={3} />
                                            </svg>
                                            required
                                        </span>
                                        <div className="mt-2">
                                            <textarea
                                                id="reason_diverted_emergency_landing"
                                                name="reason_diverted_emergency_landing"
                                                value={report.reason_diverted_emergency_landing}
                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                                {...(reportErrors.reason_diverted_emergency_landing && {"aria-describedby" : "error-reason_diverted_emergency_landing"})}
                                            />
                                            <InputErrorMessage error={reportErrors.reason_diverted_emergency_landing} idError="error-reason_diverted_emergency_landing"/>
                                        </div>
                                    </div>
                                }
                            </div>

                            <div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="technical_issues_aircraft"
                                            name="technical_issues_aircraft"
                                            type="checkbox"
                                            checked={report.technical_issues_aircraft}
                                            onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="technical_issues_aircraft" className="font-medium text-gray-900">
                                            Technical Issues
                                        </label>
                                        <p className="text-gray-500">Check if there were any technical issues with the aircraft.</p>
                                    </div>
                                </div>
                                {
                                    report.technical_issues_aircraft &&
                                    <div className="">
                                        <label htmlFor="reason_technical_issues_aircraft" className="block text-sm font-medium leading-6 text-gray-900">
                                            Please explain the reason
                                        </label>
                                        <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                            <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                                <circle r={3} cx={3} cy={3} />
                                            </svg>
                                            required
                                        </span>
                                        <div className="mt-2">
                                            <textarea
                                                id="reason_technical_issues_aircraft"
                                                name="reason_technical_issues_aircraft"
                                                value={report.reason_technical_issues_aircraft}
                                                onChange={e => handleOnChange(e.target.name, e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                                {...(reportErrors.reason_technical_issues_aircraft && {"aria-describedby" : "error-reason_technical_issues_aircraft"})}
                                            />
                                            <InputErrorMessage error={reportErrors.reason_technical_issues_aircraft} idError="error-reason_technical_issues_aircraft"/>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </>
    )
}

export default FlightOperations