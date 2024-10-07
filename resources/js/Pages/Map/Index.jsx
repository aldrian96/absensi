import Map from "@/Components/Map";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Index({ auth }) {
    // Ambil userId dari objek auth
    const userId = auth.user ? auth.user.id : null; // Pastikan userId tersedia

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
                {/* Pastikan untuk meneruskan userId ke komponen Map */}
                <Map userId={auth.user.id} />
            </div>
        </AuthenticatedLayout>
    );
}
