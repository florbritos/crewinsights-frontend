import { useEffect, useRef, useState } from "react"
import { useDashboardContext } from "../../components/contexts/DashboardContext"
import Plotly from 'plotly.js-dist';
import { TrashIcon } from '@heroicons/react/20/solid'
import PopUpModal from "../../components/PopUpModal";
import LoaderLG from "../../components/LoaderLG"
import LoaderXS from "../../components/LoaderXS"
import { report } from "../../helpers/field_rule_validations";

const Dashboard = () => {

    const { getMetrics, metrics, setMetrics, deleteMetric } = useDashboardContext()
    const [loaderXS, setLoaderXS ] = useState(false)
    const [loaderLG, setLoaderLG ] = useState(false)
    const [ metricToDelete, setMetricToDelete ] = useState(null)
    const [ showCloseWarning, setShowCloseWarning ] = useState(false)
    const chartRefs = useRef([]);

    useEffect(()=>{
        fetchMetrics()
        //setMetrics(report)
    }, [])

    const fetchMetrics = async () =>{
        setLoaderLG(true)
        await getMetrics()
        setLoaderLG(false)
    }

    useEffect(() => {
        metrics.forEach((metric, index) => {
            Plotly.newPlot(chartRefs.current[index], metric.graph_data.data, metric.graph_data.layout)
        })
    }, [metrics])

    // const fetchMetrics = async () => {
    //     setOpen(true)
    //     const res = await getMetrics()
    //     res && handleResponse(res)
    //     setOpen(false)
    // }

    // const handleResponse = (res) => {
    //     if (res.status === 'success'){
    //         console.log(res.result)
    //         setMetrics(res.result)
    //     }
    // }

    const onSubmit = (e, index_metric) => {
        e.preventDefault()
        setMetricToDelete(index_metric)
        setShowCloseWarning(true)
    }

    const onDeleteMetric = async () => {
        setShowCloseWarning(false)
        setLoaderXS(true)
        await deleteMetric(metricToDelete)
        setLoaderXS(false)
    }

    return (
        <div className='flex items-center justify-center bg-blueCI-1 w-full'>
            <div className='App-content mb-10 mx-2'>
                <div className="mb-24 mt-5">
                    <h1 className='text-5xl font-bold text-orangeCI-1 text-center'>Your Metrics</h1>
                    <p className="lg:mt-6 text-sm sm:text-base text-gray-300 text-center mx-auto">
                        Explore detailed analytics and insights from post-flight reports, offering a comprehensive view of key performance metrics and common issues encountered during operations.
                    </p>
                </div>
                { loaderLG && <LoaderLG /> }
                {
                    !loaderLG &&
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {metrics.map((metric, index) => (
                                <div className="flex flex-col gap-10 justify-between items-center bg-white shadow-md rounded-lg p-4 max-w-screen-sm">
                                    <div className="flex flex-col gap-5 justify-center items-center">
                                        <div
                                            key={index}
                                            ref={el => chartRefs.current[index] = el}
                                            className="flex flex-col md:flex-row justify-center items-center" 
                                        >
                                        </div>
                                        <p>
                                            {metric.insight}
                                        </p>
                                    </div>
                                    <div className="flex gap-x-2">
                                        <form onSubmit={e => onSubmit(e, index)}>
                                            <button
                                                type="submit"

                                                className="w-fit inline-flex items-center gap-x-1.5 rounded-md bg-blueCI-1 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                                            >
                                                Delete
                                                <TrashIcon aria-hidden="true" className="-mr-0.5 h-5 w-5" />
                                            </button>
                                        </form>
                                        { loaderXS && <LoaderXS /> }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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