const InputErrorMessage = ({error, idError}) => {

    return (
        <div className={`rounded-full bg-red-800 text-white w-fit flex items-center justify-center text-xs px-3 py-0.5 m-1 ${error ? "block" : "hidden"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p id={idError}>
                <span className='sr-only'>Error:</span> {error}
            </p>
        </div>
    )
}

export default InputErrorMessage