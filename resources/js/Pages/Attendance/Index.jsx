import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AttendanceIndex({ auth, attendances }) {
    const getStatusLabel = (status) => {
        const statusLabels = {
            attend: "Present",
            leave: "Leave",
            sick: "Sick",
            permit: "Permission",
            business_trip: "Business Trip",
            remote: "Remote Work",
        };

        return statusLabels[status] || status; // Mengembalikan label, atau status asli jika tidak ditemukan
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Attendances
                </h2>
            }
        >
            <Head title="Absensi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-gray-600">
                                    Total Attendance:{" "}
                                    <span className="font-semibold">
                                        {attendances.total}
                                    </span>
                                </p>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left border-b">
                                                No
                                            </th>
                                            <th className="py-3 px-6 text-left border-b">
                                                Date & Time
                                            </th>
                                            <th className="py-3 px-6 text-left border-b">
                                                Name
                                            </th>
                                            <th className="py-3 px-6 text-left border-b">
                                                Status
                                            </th>
                                            <th className="py-3 px-6 text-left border-b">
                                                Description
                                            </th>
                                            <th className="py-3 px-6 text-center border-b">
                                                Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm">
                                        {attendances.data.map(
                                            (
                                                {
                                                    id,
                                                    user,
                                                    created_at,
                                                    address,
                                                    status,
                                                    description,
                                                },
                                                index
                                            ) => (
                                                <tr
                                                    key={id}
                                                    className="border-b border-gray-200 hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-6 text-left">
                                                        {index + 1}{" "}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {created_at}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {user.name}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {getStatusLabel(status)}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {description}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {address}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <Pagination links={attendances.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
