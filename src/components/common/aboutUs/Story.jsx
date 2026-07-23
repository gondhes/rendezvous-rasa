import React from 'react';

// SVG component for the feather-like ornament
const FeatherOrnament = () => (
    <svg
        width="80"
        height="150"
        viewBox="0 0 83 158"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-red-200/70 hidden md:block"
    >
        <path d="M73.5 1C73.5 1 101.5 72.5 50.5 157" stroke="currentColor" strokeWidth="2" />
        <path d="M57 32C57 32 41 38.5 31.5 43.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M62 58C62 58 45.5 64.5 36 69.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M67 84C67 84 49.5 90.5 40 95.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M71.5 110C71.5 110 53.5 116.5 44 121.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);


// Main component for the "Our Story in Motion" section
export default function Story() {
    return (
        // Main container with a light background and padding
        <div className="bg-white flex items-center justify-center p-4 sm:p-8 font-marianne">
            <div className="w-full relative mx-5 md:mx-20 mt-10">

                {/* Ornament positioned absolutely to the right of the content */}
                {/* <FeatherOrnament /> */}

                {/* Text content */}
                <div className="mb-6 text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Our Story in Motion
                    </h2>
                    <p className="mt-2 text-gray-500">
                        The purpose, the people, and the passion behind the program.
                    </p>
                </div>

                {/* Responsive container for the YouTube video */}
                <div className="aspect-w-16 aspect-h-10 w-full">
                    <iframe
                        className="w-full h-80 md:h-150 rounded-2xl shadow-xl border border-gray-200"
                        width="1319" height="742" src="https://www.youtube.com/embed/wA6_KPbLc4c"
                        title="Pekan Gastronomi Le Goût de France – Cita Rasa Prancis 2024"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    );
}
