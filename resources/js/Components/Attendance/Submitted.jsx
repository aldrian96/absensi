import React from "react";

export default function Submitted() {
    return (
        <div className="bg-white p-6 rounded-lg border-2 border-gray-300 max-w-md w-full">
            <div className="flex items-center space-x-4">
                <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h1 className="text-xl font-semibold text-gray-800">
                    Absensi Berhasil
                </h1>
            </div>
            <p className="mt-3 text-gray-600">
                Anda sudah melakukan absensi hari ini. Terima kasih atas
                kehadiran Anda.
            </p>
        </div>
    );
}
