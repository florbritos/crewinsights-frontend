const FlightDetails = () => {

    return (
        <>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-4">
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-4">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                            <div className="sm:col-span-1">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                    Flight Number
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orangeCI-1 sm:max-w-md">
                                        <input
                                            id="flight_number"
                                            name="flight_number"
                                            type="text"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Departure Airport
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="departure_airport"
                                        name="departure_airport"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Arrival Airport
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="arrival_airport"
                                        name="arrival_airport"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
                                    <div className="sm:col-span-1">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Date of Flight
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="date_flight"
                                                name="date_flight"
                                                type="date"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Scheduled Departure Time (*)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="schedule_departure_time"
                                                name="schedule_departure_time"
                                                type="time"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Actual Departure Time (*)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="actual_departure_time"
                                                name="actual_departure_time"
                                                type="time"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Scheduled Arrival Time (*)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="schedule_arrival_time"
                                                name="schedule_arrival_time"
                                                type="time"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                            Actual Arrival Time (*)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="actual_arrival_time"
                                                name="actual_arrival_time"
                                                type="time"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orangeCI-1 sm:text-sm sm:leading-6"
                                            />
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