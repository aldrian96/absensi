import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Selectbox from "@/Components/Selectbox";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Swal from "sweetalert2";

export default function Submit() {
    const [loader, setLoader] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

    const { data, setData, post, transform, errors, processing } = useForm({
        status: "attend",
        description: "",
        latitude: "",
        longitude: "",
        prepareData: {},
        address: "",
    });

    // Initialize Google Maps Loader
    useEffect(() => {
        const newLoader = new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            version: "weekly",
            libraries: ["places"],
        });
        setLoader(newLoader);
    }, []);

    const getLatLing = (e) => {
        e.preventDefault();

        if (!loader) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Google Maps loader is not initialized.",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                createGeocoder(position.coords);
            },
            function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unable to retrieve location.",
                });
            }
        );
    };

    function createGeocoder(coordinates) {
        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder();

            geocoder
                .geocode({
                    location: {
                        lat: coordinates.latitude,
                        lng: coordinates.longitude,
                    },
                })
                .then((response) => {
                    if (!response.results[0]) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Unable to retrieve location.",
                        });
                        return;
                    }

                    let objLocation = {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        address: response.results[0].formatted_address,
                    };

                    setData("prepareData", objLocation);
                });
        });
    }

    useEffect(() => {
        if (data.prepareData.hasOwnProperty("address")) {
            transform((data) => ({
                ...data.prepareData,
                status: data.status,
                description: data.description,
            }));

            post(route("attendances.submit"), {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Attendance submitted successfully.",
                    });
                },
                onError: (errors) => {
                    console.log(errors);
                },
            });
        }
    }, [data.prepareData]);

    useEffect(() => {
        setTransitioning(data.status !== "attend");
    }, [data.status]);

    return (
        <form onSubmit={getLatLing} className="mt-6 space-y-6">
            <div>
                <InputLabel
                    htmlFor="info"
                    value="Please mark your attendance"
                />

                <Selectbox
                    onChange={(e) => setData("status", e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 w-full"
                    options={[
                        { value: "attend", label: "Present" },
                        { value: "leave", label: "Leave" },
                        { value: "sick", label: "Sick" },
                        { value: "permit", label: "Permission" },
                        { value: "business_trip", label: "Business Trip" },
                        { value: "remote", label: "Remote Work" },
                    ]}
                />

                <InputError className="mt-2" message={errors.status} />
            </div>
            <Transition
                show={transitioning}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </Transition>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    <i className="fas fa-save mr-2"></i>
                    Submit Attendance
                </PrimaryButton>
            </div>
        </form>
    );
}
