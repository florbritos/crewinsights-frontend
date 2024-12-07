import { useAuthContext } from "../components/contexts/AuthContext";

const UserProfile = () => {
    const { user } = useAuthContext()
    return (
        <div className="App-content w-full mb-20">
            <div className="flex flex-col p-8">
                <img src={'./../avatars/' + user.avatar} alt="User's avatar"  className="mx-auto size-32 shrink-0 rounded-full" />
                <h3 className="mt-6 text-sm font-medium text-gray-900 text-center">{user.first_name}</h3>
                <dl className="mt-1 flex flex-col items-center justify-center">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-gray-500">{user.job_title}</dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-orangeCI-1 px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-green-600/20">
                            {user.role}
                        </span>
                    </dd>
                </dl>
            </div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-5xl mx-auto">
                <div className="px-4 py-6 sm:px-6 bg-slate-800 text-white font-bold">
                    <h3 className="text-lg font-bolder">User Information</h3>
                    <p className="mt-1 max-w-2xl text-sm/6">Personal details.</p>
                </div>
                <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.first_name} {user.last_name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                            <dt className="text-sm font-medium text-gray-900">Date of Birth</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.dob}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">Address</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.address}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                            <dt className="text-sm font-medium text-gray-900">Contact Number</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.contact_number}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">Nationality</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.nationality}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                            <dt className="text-sm font-medium text-gray-900">Passport Number</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.passport}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">Email</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
                            <dt className="text-sm font-medium text-gray-900">Password</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">*****</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default UserProfile