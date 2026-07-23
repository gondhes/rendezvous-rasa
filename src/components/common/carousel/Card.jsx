import React, { useState, useEffect } from 'react';

const Card = ({ imageUrl, category, title }) => {
    return (
        <div className="relative group rounded-2xl overflow-hidden h-[560px] w-full cursor-pointer">
            {/* Background Image */}
            <img src={imageUrl} alt={title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-in-out" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C5B91]/80 to-transparent transition-colors duration-500 ease-in-out group-hover:from-[#0C5B91]/90"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transition-transform duration-500 ease-in-out transform group-hover:-translate-y-4">
                <p className="text-sm font-medium uppercase tracking-wider">{category}</p>
                <h3 className="text-2xl font-bold mt-1">{title}</h3>
                <div className="w-full flex justify-center">
                    <a href={`/exploreSearch?category=EVENT&activity=${category}`} type='button' className="bg-white py-1.5 cursor-pointer px-4 rounded-full mt-4 w-fit text-center text-[#3558A2] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0">
                        See More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Card;