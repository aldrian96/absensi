import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function UserIndex({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-gray-600">
                                    Total Users:{" "}
                                    <span className="font-semibold">
                                        {users.total}
                                    </span>
                                </p>
                                <Link
                                    href={route("users.create")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    <i className="fa-solid fa-plus pr-3"></i>
                                    Create
                                </Link>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left border-b">
                                                No
                                            </th>
                                            {/* <th className="py-3 px-6 text-left border-b">
                                                Id
                                            </th> */}
                                            <th className="py-3 px-6 text-left border-b">
                                                Name
                                            </th>
                                            <th className="py-3 px-6 text-left border-b">
                                                Email
                                            </th>
                                            <th className="py-3 px-6 text-left border-b">
                                                Role
                                            </th>
                                            <th className="py-3 px-6 text-center border-b">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm">
                                        {users.data.map(
                                            (
                                                { id, name, email, role },
                                                index
                                            ) => (
                                                <tr
                                                    key={id}
                                                    className="border-b border-gray-200 hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-6 text-left">
                                                        {index + 1}{" "}
                                                    </td>
                                                    {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        {id}
                                                    </td> */}
                                                    <td className="py-3 px-6 text-left">
                                                        {name}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {email}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {role}
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <Link
                                                                href={route(
                                                                    "users.edit",
                                                                    id
                                                                )}
                                                                className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            >
                                                                {/* <i className="fa-solid fa-pen mr-2"></i>{" "} */}
                                                                <i class="fa-regular fa-pen-to-square mr-2"></i>{" "}
                                                                Edit
                                                            </Link>
                                                            {/* <button
                                                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                            >
                                                                <i className="fa-solid fa-trash mr-2"></i>{" "}
                                                                Delete
                                                            </button> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <Pagination links={users.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
