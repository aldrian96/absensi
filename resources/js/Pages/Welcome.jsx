import React, { useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Welcome({ auth }) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <>
            <Head title="Welcome to Attendance System">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </Head>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <img
                                src="/images/bhumidata_logo.png"
                                alt="Attendance System Logo"
                                className="h-10 w-auto"
                                data-aos="fade-right"
                            />
                        </div>
                        <nav>
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                                    data-aos="fade-left"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                                        data-aos="fade-left"
                                        data-aos-delay="100"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="ml-4 text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                                        data-aos="fade-left"
                                        data-aos-delay="200"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            Welcome to Bhumidata Integra Attendance System
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Efficiently manage attendance, track time, and
                            streamline your workforce.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div
                                className="pt-6"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                <i className="fas fa-users text-white text-2xl"></i>
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                                            Employee Management
                                        </h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            Easily manage employee profiles,
                                            departments, and roles.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="pt-6"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                <i className="fas fa-clock text-white text-2xl"></i>
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                                            Time Tracking
                                        </h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            Accurate clock-in and clock-out
                                            system with break management.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="pt-6"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                <i className="fas fa-calendar-alt text-white text-2xl"></i>
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                                            Attendance Reports
                                        </h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            Generate detailed attendance reports
                                            and analytics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-white" data-aos="fade-up">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-gray-500 text-sm">
                            &copy; 2024 Bhumidata Integra. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
