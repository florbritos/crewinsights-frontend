import { useFlightReportContext } from "../contexts/FlightReportContext"
import InputErrorMessage from "../InputErrorMessage"

const ServiceQuality = ({handleOnChange}) => {

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
                                        id="service_not_completed"
                                        name="service_not_completed"
                                        type="checkbox"
                                        checked={report.service_not_completed}
                                        onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="service_not_completed" className="font-medium text-gray-900">
                                        Service not fully provided
                                    </label>
                                    <p className="text-gray-500">Check if any part of the passenger service was not fully completed.</p>
                                </div>
                            </div>
                            {
                                report.service_not_completed &&
                                <div className="">
                                    <label htmlFor="service_not_completed_explanation" className="block text-sm font-medium leading-6 text-gray-900">
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
                                            id="service_not_completed_explanation"
                                            name="service_not_completed_explanation"
                                            value={report.service_not_completed_explanation}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.service_not_completed_explanation && {"aria-describedby" : "error-service_not_completed_explanation"})}
                                        />
                                        <InputErrorMessage error={reportErrors.service_not_completed_explanation} idError="error-service_not_completed_explanation"/>
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="pax_complaints"
                                        name="pax_complaints"
                                        type="checkbox"
                                        checked={report.pax_complaints}
                                        onChange={e => handleOnChange(e.target.name, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-orangeCI-1 focus:ring-orangeCI-1"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="pax_complaints" className="font-medium text-gray-900">
                                        Passenger complaints
                                    </label>
                                    <p className="text-gray-500">Check if any passengers made complaints during the flight.</p>
                                </div>
                            </div>
                            {
                                report.pax_complaints &&
                                <div className="">
                                    <label htmlFor="pax_complaints_explanation" className="block text-sm font-medium leading-6 text-gray-900">
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
                                            id="pax_complaints_explanation"
                                            name="pax_complaints_explanation"
                                            value={report.pax_complaints_explanation}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.pax_complaints_explanation && {"aria-describedby" : "error-pax_complaints_explanation"})}
                                        />
                                        <InputErrorMessage error={reportErrors.pax_complaints_explanation} idError="error-pax_complaints_explanation"/>
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

export default ServiceQuality