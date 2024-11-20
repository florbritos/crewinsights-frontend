import { Link } from "react-router-dom";

const PageNotEntitlements = () => {
    
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-orangeCI-1">403</p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Access denied
                    </h1>
                <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    Sorry, you don’t have permission to access this page. Contact your administrator to request access.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to={"/"}
                        className="rounded-md bg-blueCI-1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orangeCI-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orangeCI-1"
                    >
                    Go back home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PageNotEntitlements