const CrewInformation = () => {

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-1 md:grid-cols-3">
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-3">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Captain's Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="captain_name"
                                    name="captain_name"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First Officer's Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first_officer_name"
                                    name="first_officer_name"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Purser's Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="purser_name"
                                    name="purser_name"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Number of Cabin Crew Members
                            </label>
                            <div className="mt-2">
                                <input
                                    id="number_cabin_crew"
                                    name="number_cabin_crew"
                                    type="number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrewInformation