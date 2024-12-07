import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../components/contexts/AuthContext'
import {
    ChatBubbleOvalLeftEllipsisIcon,
    ReceiptRefundIcon,
} from '@heroicons/react/24/outline'

const actions = [
{
    title: 'Submit a flight report',
    href: '/flight-report',
    icon: ReceiptRefundIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
    description: 'Submit a flight report to provide essential details and feedback about your flight experience.'
},
{
    title: 'CrewBot',
    href: '/crewbot',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    description: 'Ask the CrewBot any questions regarding flight issues or operational knowledge, based on insights gathered from previous crew reports.'
},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CrewHome = () => {
    const { user } = useAuthContext()

    return (
        <div className='flex items-center justify-center'>
            <div className='App-content'>
                <svg
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                        <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
                </svg>

                <h1 className='text-5xl mb-32 font-bold text-orangeCI-1 text-center'>Welcome, 
                    <span className='block text-2xl font-normal text-black'>{ user.first_name }</span>
                </h1>
                <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 max-w-4xl">
                    {actions.map((action, actionIdx) => (
                        <div
                            key={action.title}
                            className={classNames(
                                actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                                actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                                actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                                actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                                'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orangeCI-1 hover:bg-orange-50',
                            )}
                        >
                            <div>
                                <span
                                    className={classNames(
                                        action.iconBackground,
                                        action.iconForeground,
                                        'inline-flex rounded-lg p-3 ring-4 ring-white',
                                    )}
                                >
                                <action.icon aria-hidden="true" className="h-6 w-6" />
                                </span>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    <Link to={action.href} className="focus:outline-none">
                                        {/* Extend touch target to entire panel */}
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {action.title}
                                    </Link>
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    {action.description}
                                </p>
                            </div>
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                            >
                                <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                </svg>
                            </span>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}

export default CrewHome