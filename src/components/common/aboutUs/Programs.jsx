import React from "react";
import MapImage from '../../../assets/aboutUs/maps.png';

// SVG component for the top-right leaf ornament
const LeafOrnamentTopRight = () => (
    <svg width="100" height="70" viewBox="0 0 108 73" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M106.5 1C106.5 1 84.5 13.5 75 19C65.5 24.5 45.5 28.5 45.5 28.5" stroke="#D1C4E9" strokeWidth="2" />
        <path d="M45.5 28.5C45.5 28.5 57.5 22 64.5 18.5C71.5 15 85 10 85 10" stroke="#D1C4E9" strokeWidth="2" />
        <path d="M1.5 71.5C1.5 71.5 23.5 59 33 53.5C42.5 48 62.5 44 62.5 44" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />
        <path d="M62.5 44C62.5 44 50.5 50.5 43.5 54C36.5 57.5 23 62.5 23 62.5" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// SVG component for the middle-left leaf ornament
const LeafOrnamentMiddleLeft = () => (
    <svg width="100" height="50" viewBox="0 0 119 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M118 1.5C118 1.5 95.5 10.5 82.5 16C69.5 21.5 44 25 44 25" stroke="#D1C4E9" strokeWidth="2" />
        <path d="M44 25C44 25 59 19.5 68 15.5C77 11.5 94.5 6 94.5 6" stroke="#D1C4E9" strokeWidth="2" />
        <path d="M1 51.5C1 51.5 23.5 42.5 36.5 37C49.5 31.5 75 28 75 28" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />
        <path d="M75 28C75 28 60 33.5 51 37.5C42 41.5 24.5 47 24.5 47" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// SVG component for the bottom-right leaf ornament
const LeafOrnamentBottomRight = () => (
    <svg width="100" height="70" viewBox="0 0 121 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 91C1 91 26.5 77 39.5 69.5C52.5 62 79.5 54.5 79.5 54.5" stroke="#D1C4E9" strokeWidth="2" />
        <path d="M79.5 54.5C79.5 54.5 64 61.5 55 66C46 70.5 28.5 77.5 28.5 77.5" stroke="#D1C4E9" strokeWidth="2" />
        <path d="M120 1C120 1 94.5 15 81.5 22.5C68.5 30 41.5 37.5 41.5 37.5" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />
        <path d="M41.5 37.5C41.5 37.5 57 30.5 66 26C75 21.5 92.5 14.5 92.5 14.5" stroke="#D1C4E9" strokeWidth="2" strokeLinecap="round" />
    </svg>
);


// Component for each statistic item
const StatItem = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl md:text-5xl font-bold text-[#4A148C]">{value}</p>
        <p className="text-sm font-semibold text-[#7B1FA2] tracking-widest mt-1">{label}</p>
    </div>
);


function Programs() {
    return (
        // Main container with a subtle gradient background and relative positioning for ornaments
        <div className="bg-gradient-to-br from-blue-20 via-white to-pink-20 mt-10 md:mt-0 md:min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 font-marianne relative overflow-hidden">

            {/* Ornaments positioned absolutely */}
            {/* <div className="absolute top-10 right-5 sm:right-20 opacity-70 hidden md:block">
            <LeafOrnamentTopRight />
          </div>
          <div className="absolute top-1/2 left-5 sm:left-10 -translate-y-1/2 opacity-70 hidden md:block">
            <LeafOrnamentMiddleLeft />
          </div>
           <div className="absolute bottom-10 right-5 sm:right-10 opacity-70 hidden md:block">
            <LeafOrnamentBottomRight />
          </div> */}

            <div className="w-full text-center mx:5 md:mx-40">
                {/* Top introductory text */}
                <p className="text-xl sm:text-2xl md:text-3xl text-indigo-900/90 leading-relaxed mb-8 sm:mb-12">
                    Our latest programs in 2024 have been held over <span className="font-bold">13 days</span>, across <span className="font-bold">20 cities</span> and <span className="font-bold">10 islands</span>, featuring <span className="font-bold">178 active events</span> and <span className="font-bold">138 participating restaurants</span> throughout Indonesia.
                </p>

                {/* Map Image container */}
                <div className="my-8 px-4">
                    <img
                        src={MapImage}
                        alt="Map of Indonesia showing event locations"
                        className="w-full h-auto rounded-2xl  border-gray-200/80"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x400/e2e8f0/4a5568?text=Map+of+Indonesia'; }}
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-y-10 gap-x-4 mt-12 sm:mt-16">
                    <StatItem value="13" label="DAYS" />
                    <StatItem value="20" label="CITIES" />
                    <StatItem value="10" label="ISLANDS" />

                    {/* EVENTS + RESTAURANTS row */}
                    <div className="hidden sm:col-span-3 md:flex justify-center gap-x-0 md:gap-x-50 lg:gap-x-100">
                        <StatItem value="178" label="EVENTS" />
                        <StatItem value="138" label="RESTAURANTS" />
                    </div>

                    <div className="sm:col-start-1 lg:col-start-auto md:hidden">
                        <StatItem value="178" label="EVENTS" />
                    </div>
                    <div className="md:hidden">
                        <StatItem value="138" label="RESTAURANTS" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Programs;