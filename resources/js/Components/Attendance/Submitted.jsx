import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export default function Submitted() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // You can adjust the animation duration
            once: true, // Whether animation should happen only once - while scrolling down
        });
    }, []);

    return (
        <div
            className="bg-white p-6 rounded-lg border-2 border-gray-300 max-w-md w-full"
            data-aos="fade-up" // Add fade-up animation
            data-aos-delay="100" // Add a slight delay to the animation
        >
            <div className="flex items-center space-x-4">
                <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    data-aos="zoom-in" // Add zoom-in animation to the icon
                    data-aos-delay="500" // Delay this animation a bit more
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h1
                    className="text-xl font-semibold text-gray-800"
                    data-aos="fade-left" // Add fade-left animation to the title
                    data-aos-delay="300" // Delay this animation slightly
                >
                    Attendance submitted successfully
                </h1>
            </div>
            <p
                className="mt-3 text-gray-600"
                data-aos="fade-left" // Add fade-up animation to the paragraph
                data-aos-delay="400" // Delay this animation a bit more
            >
                You have already submitted your attendance for today. Thank you
                for your response.
            </p>
        </div>
    );
}
