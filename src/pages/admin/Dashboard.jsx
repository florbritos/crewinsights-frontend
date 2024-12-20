import { useEffect, useRef, useState } from "react"
import { useDashboardContext } from "../../components/contexts/DashboardContext"
import { TrashIcon, WrenchScrewdriverIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import PopUpModal from "../../components/PopUpModal";
import LoaderLG from "../../components/LoaderLG"
import SearchBot from "../../components/searchbot/SearchBot";
import Plot from 'react-plotly.js';

const Dashboard = () => {

    const { getMetrics, metrics, setMetrics, deleteMetric, loaderLG, setLoaderLG } = useDashboardContext()
    const [ metricToDelete, setMetricToDelete ] = useState("")
    const [ showCloseWarning, setShowCloseWarning ] = useState(false)
    const hasFetched = useRef(false)

    useEffect(()=>{
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchMetrics();
        }
    }, [])

    const fetchMetrics = async () =>{
        setLoaderLG(true)
        await getMetrics()
        setLoaderLG(false)
    }

    const refreshData = () => {
        fetchMetrics()
    }

    const onSubmit = (e, index_metric) => {
        e.preventDefault()
        setMetricToDelete(index_metric)
        setShowCloseWarning(true)
    }

    const onDeleteMetric = async () => {
        setShowCloseWarning(false)
        setLoaderLG(true)
        const response = await deleteMetric(metricToDelete)
        response && updateDashboard()
        setLoaderLG(false)
    }

    const updateDashboard = () => {
        setMetrics((prevMetrics) => prevMetrics.filter((m) => m.id_metric !== metricToDelete))
        setMetricToDelete("")
    }

    return (
        <div className='flex items-center justify-center bg-gray-200 w-full overflow-hidden'>
            <div className='App-content mb-10 mx-2'>
                <div className="mb-20 mt-5">
                    <h1 className='text-5xl font-bold text-blueCI-1 text-center'>Your Metrics</h1>
                    <p className="mt-6 text-sm sm:text-base text-slate-600 text-center mx-auto max-w-[600px]">
                        Explore detailed analytics and insights from post-flight reports, offering a comprehensive view of key performance metrics and common issues encountered during operations.
                    </p>
                </div>
                { loaderLG && <LoaderLG /> }
                {
                    !loaderLG &&
                    <>
                        <SearchBot/>
                        <div className="w-full mb-10 flex items-center justify-center 2xl:justify-start">
                            <button
                                className="w-fit inline-flex items-center gap-x-1.5 rounded-md bg-blueCI-1 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                                onClick={refreshData}
                            >
                                Refresh Data
                                <ArrowPathIcon aria-hidden="true" className="h-5 w-5 block" />
                            </button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 mx-auto">
                            {
                                metrics.length === 0 &&
                                <p>No metrics saved in your dashboard.</p>
                            }
                            {metrics.map((metric, index) => (
                                <div
                                    key={index}
                                    className="px-1 w-fit rounded-lg border border-gray-300 shadow-lg transition-transform transform md:hover:scale-105 h-fit"
                                >
                                    <div className="overflow-x-auto w-screen sm:w-fit">
                                        {
                                            metric.graph_data?.data && 
                                            Array.isArray(metric.graph_data.data) && 
                                            metric.graph_data.data.length > 0 &&
                                            <div className="w-fit">
                                                <Plot 
                                                    data={metric?.graph_data?.data} 
                                                    layout={metric?.graph_data?.layout}
                                                />
                                                <div className="whitespace-pre-wrap max-w-[500px] px-2 py-5 text-sm bg-white">
                                                    {metric.analysis}
                                                </div>
                                            </div>
                                            
                                        }
                                        {
                                            (!metric.graph_data || Object.keys(metric.graph_data).length === 0) && (
                                                <div className="flex flex-col justify-center items-center text-center bg-white text-sm font-medium p-4 max-w-[500px]">
                                                    <p>Sorry, we couldn’t load this metric. Please try refreshing the page or check back later.</p>
                                                    <WrenchScrewdriverIcon aria-hidden="true" className="my-10 h-16 w-16 block" />
                                                </div>
                                            )

                                        }
                                        {/* {
                                            metric.graph_data &&
                                            <div className="w-fit">
                                                <Plot 
                                                    data={metric?.graph_data?.data} 
                                                    layout={metric?.graph_data?.layout}
                                                />
                                                <div className="whitespace-pre-wrap max-w-[500px] px-2 py-5 text-sm bg-white">
                                                    {metric.analysis}
                                                </div>
                                            </div>
                                            
                                        }
                                        {
                                            !metric.graph_data && (
                                                <div className="flex flex-col justify-center items-center text-center bg-white text-sm font-medium p-4 max-w-[500px]">
                                                    <p>Sorry, we couldn’t load this metric. Please try refreshing the page or check back later.</p>
                                                    <WrenchScrewdriverIcon aria-hidden="true" className="my-10 h-16 w-16 block" />
                                                </div>
                                            )

                                        } */}
                                    </div>
                                    <div className="bg-gray-50 p-4 max-w-[500px]">
                                        <div className="flex gap-x-2 items-center">
                                            <form onSubmit={e => onSubmit(e, metric.id_metric)}>
                                                <button
                                                    type="submit"
                                                    className="w-fit inline-flex items-center gap-x-1.5 rounded-md bg-blueCI-1 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                                                >
                                                    Delete
                                                    <TrashIcon aria-hidden="true" className="-mr-0.5 h-5 w-5" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                }
            </div>
            <PopUpModal 
                open={showCloseWarning} 
                setOpen={setShowCloseWarning} 
                title={'You are about to delete a metric'}
                message={'Are you sure you want to continue?'}
                action={onDeleteMetric}
            />
        </div>
    )
}

export default Dashboard