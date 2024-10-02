import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
        >
            <div className="flex flex-1 justify-between sm:justify-end">
                {links.map((link, index) => {
                    if (link.url === null) {
                        return (
                            <span
                                key={index}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-not-allowed leading-5 rounded-md"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md
                                ${
                                    link.active
                                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                } ${
                                index === 0
                                    ? "mr-2"
                                    : index === links.length - 1
                                    ? "ml-2"
                                    : "mx-1"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </nav>
    );
}
