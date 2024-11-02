import { useFlightReportContext } from "../contexts/FlightReportContext"

const AdditionalComments = ({handleOnChange}) => {

    const { report } = useFlightReportContext()

    return (
        <>
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                    <div className="mt-6 space-y-12">
                        <div>
                            <div className="">
                                <label htmlFor="additional_comments" className="block text-sm font-medium leading-6 text-gray-900">
                                    Please provide any additional comments or feedback
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="additional_comments"
                                        name="additional_comments"
                                        rows={10}
                                        value={report.additional_comments}
                                        onChange={e => handleOnChange(e.target.name, e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdditionalComments