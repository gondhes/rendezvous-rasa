import React from 'react';

// SVG icon for the arrow inside the primary button
const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_1847_2245)">
      <path d="M5.83301 14.1666L14.1663 5.83331M14.1663 5.83331H5.83301M14.1663 5.83331V14.1666" stroke="#F9FAFB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_1847_2245">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// SVG icon for the decorative leaf illustration
const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M7.49992 9.96004L4.23992 6.70004C3.85492 6.31504 3.85492 5.68504 4.23992 5.30004L7.49992 2.04004" stroke="#3558A2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);


function Confirmation() {
  return (
    // Main container: full screen, flex center, with a subtle gradient background
    <div className="relative w-full min-h-100 flex items-center justify-center font-sans p-4 overflow-hidden mt-50">
      
      {/* Content wrapper */}
      <div className="w-full max-w-xl text-center z-10">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 leading-tight text-[#3D3D3D]">
          Thank You for <br />
          <span className="font-semibold text-[#3D3D3D]" style={{ fontFamily: 'Marianne' }}>Your Submission!</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-5 text-[#7C7C7C] max-w-md mx-auto" style={{ fontFamily: 'Marianne' }}>
          We have received your restaurant details and will be in touch shortly. Stay tuned for updates and next steps.
        </p>

        {/* Action Buttons Container */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <a href="/register" className="group flex items-center justify-center w-full sm:w-auto bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out">
            Submit another <ArrowIcon />
          </a>
        </div>
        
        {/* Secondary Link */}
        <div className="mt-6 flex justify-center items-center gap-1">
        <LeafIcon />
            <a href="/" className="text-[#3558A2] font-medium hover:underline text-sm underline">
             Back to home
            </a>
        </div>

      </div>

      {/* Decorative Leaf Illustration (positioned absolutely) */}
      {/* <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 opacity-80 hidden sm:block transform -rotate-12">
        <LeafIcon />
      </div> */}

    </div>
  );
}

export default Confirmation;
