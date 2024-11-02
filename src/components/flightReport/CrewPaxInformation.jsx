import { useFlightReportContext } from "../contexts/FlightReportContext"
import InputErrorMessage from "../InputErrorMessage"

const CrewPaxInformation = ({handleOnChange}) => {

    const { reportErrors, report } = useFlightReportContext()

    return (
        <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-1 md:grid-cols-3 ">
                <div className="md:col-span-3">
                    <h2 className="text-base font-semibold leading-7 text-white text-center">Crew Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-200 text-center">
                        Accurate crew information is essential for operational tracking and safety records.
                    </p>
                </div>
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                            <div className="sm:col-span-2">
                                <label htmlFor="captain_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Captain's Full Name
                                </label>
                                <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                    <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                        <circle r={3} cx={3} cy={3} />
                                    </svg>
                                    required
                                </span>
                                <div className="mt-2">
                                    <input
                                        id="captain_name"
                                        name="captain_name"
                                        type="text"
                                        value={report.captain_name}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.captain_name && {"aria-describedby" : "error-captain_name"})}
                                    />
                                    <InputErrorMessage error={reportErrors.captain_name} idError="error-captain_name"/>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="first_officer_name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Officer's Full Name
                                </label>
                                <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                    <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                        <circle r={3} cx={3} cy={3} />
                                    </svg>
                                    required
                                </span>
                                <div className="mt-2">
                                    <input
                                        id="first_officer_name"
                                        name="first_officer_name"
                                        type="text"
                                        value={report.first_officer_name}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.first_officer_name && {"aria-describedby" : "error-first_officer_name"})}
                                    />
                                    <InputErrorMessage error={reportErrors.first_officer_name} idError="error-first_officer_name"/>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 sm:col-span-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="purser_name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Purser's Full Name
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                    <div className="mt-2">
                                        <input
                                            id="purser_name"
                                            name="purser_name"
                                            type="text"
                                            value={report.purser_name}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.purser_name && {"aria-describedby" : "error-purser_name"})}
                                        />
                                        <InputErrorMessage error={reportErrors.purser_name} idError="error-purser_name"/>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="number_cabin_crew" className="block text-sm font-medium leading-6 text-gray-900">
                                        Number of Cabin Crew Members
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                    <div className="mt-2">
                                        <input
                                            id="number_cabin_crew"
                                            name="number_cabin_crew"
                                            type="number"
                                            value={report.number_cabin_crew}
                                            onChange={e => handleOnChange(e.target.name, e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            {...(reportErrors.number_cabin_crew && {"aria-describedby" : "error-number_cabin_crew"})}
                                        />
                                        <InputErrorMessage error={reportErrors.number_cabin_crew} idError="error-number_cabin_crew"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="md:col-span-3"/>
                <div className="md:col-span-3">
                    <h2 className="text-base font-semibold leading-7 text-white text-center">Passenger Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-200 text-center">
                        Accurate passenger information is critical for reporting, safety analysis, and ensuring the quality of service provided during the flight.
                    </p>
                </div>
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                            <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
                                <div>
                                    <label htmlFor="total_number_pax" className="block text-sm font-medium leading-6 text-gray-900">
                                        Total Number of Passengers on Board (*)
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="total_number_pax"
                                        name="total_number_pax"
                                        type="number"
                                        value={report.total_number_pax}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.total_number_pax && {"aria-describedby" : "error-total_number_pax"})}
                                    />
                                    <InputErrorMessage error={reportErrors.total_number_pax} idError="error-total_number_pax"/>
                                </div>
                            </div>

                            <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
                                <div>
                                    <label htmlFor="total_number_infants" className="block text-sm font-medium leading-6 text-gray-900">
                                        Total Number of Infants on Board
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="total_number_infants"
                                        name="total_number_infants"
                                        type="number"
                                        value={report.total_number_infants}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.total_number_infants && {"aria-describedby" : "error-total_number_infants"})}
                                    />
                                    <InputErrorMessage error={reportErrors.total_number_infants} idError="error-total_number_infants"/>
                                </div>
                            </div>

                            <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
                                <div>
                                    <label htmlFor="total_number_pax_special_assistance" className="block text-sm font-medium leading-6 text-gray-900">
                                        Number of Passengers Requiring Special Assistance
                                    </label>
                                    <span className={`inline-flex items-center gap-x-1.5 h-fit rounded-md bg-gray-100 text-gray-600 px-1.5 py-0.5 text-xs font-medium`}>
                                        <svg viewBox="0 0 6 6" aria-hidden="true" className={`h-1.5 w-1.5 fill-gray-400`}>
                                            <circle r={3} cx={3} cy={3} />
                                        </svg>
                                        required
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="total_number_pax_special_assistance"
                                        name="total_number_pax_special_assistance"
                                        type="number"
                                        value={report.total_number_pax_special_assistance}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                        {...(reportErrors.total_number_pax_special_assistance && {"aria-describedby" : "error-total_number_pax_special_assistance"})}
                                    />
                                    <InputErrorMessage error={reportErrors.total_number_pax_special_assistance} idError="error-total_number_pax_special_assistance"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="italic text-white mt-2 text-left">(*) Including Infants</p>
        </>
    )
}

export default CrewPaxInformation