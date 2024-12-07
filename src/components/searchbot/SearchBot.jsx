import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    Dialog,
    DialogPanel,
    DialogBackdrop,
} from '@headlessui/react'
import { MagnifyingGlassIcon, SquaresPlusIcon, WrenchScrewdriverIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { useSearchBotContext } from '../contexts/SearchBotContext'
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';
import { useDashboardContext } from '../contexts/DashboardContext';
import LoaderXS from '../LoaderXS';
import LoaderLG from '../LoaderLG';

const SearchBot = () => {
    const { search, searchBotThinking } = useSearchBotContext()
    const { addMetric } = useDashboardContext()
    const [ query, setQuery ] = useState('')
    const [ open, setOpen ] = useState(false)
    const [ result, setResult ] = useState({})
    const [ loader, setLoader ] = useState(false)
    const hasResponded = useRef(false)

    useEffect(()=>{
        !open && setQuery('')
        hasResponded.current = false
    }, [open])

    const onSearch = async () => {
        setResult(null)
        hasResponded.current = false
        const response = await search(query)
        if(response.status === 'success'){
            hasResponded.current = true
            if (response.result){
                const metricInfo = {...response.result, metric: query}
                setResult(metricInfo)
            } else {
                setResult({})
            }
        }
    }

    const onAddMetric = async () => {
        setLoader(true)
        const response = await addMetric(result)
        response && setOpen(false)
        setLoader(false)
    }

    return (
        <div className='mx-3'>
            <div className={`mx-auto mb-24 flex justify-center ${open ? 'invisible': 'visible'}`}>
                <div className='w-full max-w-3xl'>
                    <label htmlFor="email" className="block text-sm/6 font-bold text-gray-900 -mb-5">
                        Hey, do you need another metric?
                    </label>
                    <div className="max-w-3xl w-full h-fit rounded-xl overflow-hidden">
                        <MagnifyingGlassIcon
                            className="pointer-events-none relative left-4 top-8 size-5 text-white"
                            aria-hidden="true"
                        />
                        <input
                            id="dummy"
                            name="dummy"
                            type="text"
                            onChange={e => {
                                setQuery(e.target.value)
                                setOpen(true)
                            }}
                            className="h-12 w-full rounded-xl border-0 bg-blueCI-1 pl-11 pr-4 text-white sm:text-sm focus:ring-0"
                            placeholder="Search..."
                            value={query}
                        />
                    </div>
                </div>
            </div>
            <Dialog
                className="relative z-10"
                open={open}
                onClose={() => {
                    setOpen(false)
                    setQuery('')
                }}
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed flex items-center justify-center inset-0 z-10 w-screen h-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                    <DialogPanel
                        transition
                        className="mx-auto w-full max-w-5xl transform divide-y divide-gray-500/20 overflow-hidden rounded-xl  shadow-2xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className='bg-blueCI-1 w-full'>
                            <Combobox>
                                <div className="relative">
                                    <MagnifyingGlassIcon
                                        className="pointer-events-none absolute left-4 top-3.5 size-5 text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <ComboboxInput
                                        autoFocus
                                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white focus:ring-0 sm:text-sm"
                                        placeholder="Search..."
                                        onChange={(event) => setQuery(event.target.value)}
                                        onBlur={() => setQuery('')}
                                        value={query}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' && query.trim() !== '') {
                                                onSearch(query)
                                            }
                                        }}
                                    />
                                </div>

                                <ComboboxOptions
                                    static
                                    as="ul"
                                    className="scroll-py-2 divide-y divide-gray-500/20 overflow-y-auto max-h-[75vh]"
                                >
                                    <div className="p-2 overflow-x-auto">
                                        <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-200">Search results</h2>
                                        {
                                            searchBotThinking &&
                                            <div 
                                                className={`flex justify-start gap-2 mb-2 mt-4 px-3`}
                                            >
                                                <span className="loading loading-dots loading-md text-gray-200"></span>
                                            </div>
                                        }
                                        
                                        <div className='flex flex-col justify-center my-2 w-fit mx-auto'>
                                            {
                                                result?.graph_data?.data && hasResponded.current &&
                                                <Plot 
                                                    data={result?.graph_data.data} 
                                                    layout={{
                                                        ...result?.graph_data.layout,
                                                        autosize: true,
                                                    }}
                                                    className='mx-auto'
                                                />
                                            }
                                            {
                                                result?.analysis && hasResponded.current &&
                                                <div className="whitespace-pre-wrap px-2 py-5 text-sm text-white">
                                                    {result?.analysis}
                                                </div>
                                            }
                                        </div>
                                        
                                        {
                                            result && hasResponded.current && Object.keys(result?.graph_data).length === 0 &&
                                            (
                                                <div className="px-6 py-14 text-center sm:px-14">
                                                    <WrenchScrewdriverIcon className="mx-auto size-14 text-gray-200" aria-hidden="true" />
                                                    <p className="mt-4 text-2xl font-bold text-gray-200">
                                                        Oops! Sorry, I couldn’t generate a graph for what your are looking for.
                                                    </p>
                                                    <p className='text-base text-white'>
                                                        Maybe try with another input?
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="p-2">
                                        <h2 className="sr-only">Quick actions</h2>
                                        <div className="text-sm text-gray-400">
                                            {
                                                result && Object.keys(result).length !== 0 && hasResponded.current &&
                                                (
                                                    <>
                                                        <button
                                                            className={`w-full flex gap-x-2 items-center rounded-md px-3 py-2 
                                                                        ${!loader ? 'hover:text-orangeCI-1' : 'opacity-50 cursor-not-allowed'} 
                                                                        data-[focus]:outline-none`}
                                                            onClick={onAddMetric}
                                                            disabled={loader}
                                                        >
                                                            <SquaresPlusIcon
                                                                className="size-6 flex-none"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="ml-3 truncate">Add metric to dashboard</span>
                                                            {loader && <LoaderLG />}
                                                        </button>
                                                    </>
                                                )
                                            }
                                            <button 
                                                className="w-full flex rounded-md px-3 py-2 hover:text-orangeCI-1 data-[focus]:outline-none"
                                                onClick={() => setOpen(false)}
                                            >
                                                <XCircleIcon
                                                    className="size-6 flex-none"
                                                    aria-hidden="true"
                                                />
                                                <span className="ml-3 truncate">Cancel search</span>
                                            </button>
                                        </div>
                                    </div>
                                </ComboboxOptions>
                            </Combobox>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default SearchBot