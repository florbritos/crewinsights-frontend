import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useLoaderModalContext } from './contexts/LoaderModalContext'

const LoaderModal = () => {
    const { open } = useLoaderModalContext()
    return (
        <Dialog open={open} onClose={() => {}} className="relative z-10">
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-95 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
    
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center items-center">
                    <DialogPanel
                    transition
                    className="flex flex-col justify-center items-center relative transform overflow-hidden rounded-full w-fit h-fit bg-blueCI-1 shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className='flex items-center justify-center text-orangeCI-1'>
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default LoaderModal