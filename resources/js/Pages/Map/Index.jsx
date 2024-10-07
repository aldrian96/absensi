import Map from "@/Components/Map";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Index({ auth }) {
    console.log("User Data:", auth.user); // Debugging untuk memeriksa data user

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Maps
                </h2>
            }
        >
            <Head title="User" />
            <div>
                <Map
                    userId={auth.user.id}
                    isAdmin={auth.user.role === "admin"}
                />
            </div>
        </AuthenticatedLayout>
    );
}
