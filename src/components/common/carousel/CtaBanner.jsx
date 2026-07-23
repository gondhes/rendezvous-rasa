import React, { useState, useEffect } from 'react';

const CtaBanner = () => {
    const ArrowRightIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
     );
    return (
        <div className="relative rounded-2xl overflow-hidden group">
            {/* Background Image */}
            <img 
                src="https://placehold.co/1200x400/4a2c1a/ffffff?text=Pastries" 
                alt="Assortment of French pastries" 
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-12 md:p-20">
                <h2 className="text-3xl md:text-4xl font-bold">Join the Taste of France</h2>
                <p className="mt-4 max-w-2xl text-lg text-gray-200">
                    Register now and be part of a unique French-Indonesian celebration.
                </p>
                <button className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                    REGISTER NOW!
                    <ArrowRightIcon />
                </button>
            </div>
        </div>
    );
};

export default CtaBanner;