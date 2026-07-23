import React from "react";
import heroImage from "../../../assets/aboutUs/aboutus2.png";

const LeafOrnament = () => (
    <svg
        width="120"
        height="110"
        viewBox="0 0 138 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-8 left-8 opacity-50 hidden lg:block"
    >
        <path d="M136.501 1.75184C134.001 5.75184 113.834 17.4185 104.001 21.7518C94.1673 26.0852 70.5009 25.7518 70.5009 25.7518C70.5009 25.7518 53.1673 26.4185 41.0009 31.2518C28.8342 36.0852 1.50089 52.2518 1.50089 52.2518" stroke="#3558A2" strokeWidth="2" strokeLinecap="round" />
        <path d="M70.4991 25.7518C70.4991 25.7518 76.6658 19.9185 82.9991 16.2518C89.3324 12.5852 100.499 8.25184 100.499 8.25184" stroke="#3558A2" strokeWidth="2" strokeLinecap="round" />
        <path d="M41.001 31.2518C41.001 31.2518 48.1677 25.5852 53.501 22.2518C58.8343 18.9185 69.001 14.7518 69.001 14.7518" stroke="#3558A2" strokeWidth="2" strokeLinecap="round" />
        <path d="M41.001 31.2518C41.001 31.2518 36.3343 25.2518 32.001 21.7518C27.6677 18.2518 19.501 13.7518 19.501 13.7518" stroke="#3558A2" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

function About() {
    return (
        // Main container with a subtle gradient background
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen rounded-4xl backdrop-blur-xl flex items-center justify-center p-4 font-marianne relative overflow-hidden">

            {/* Leaf Ornament positioned absolutely */}
            {/* <LeafOrnament /> */}

            {/* Content card with blur effect */}
            <div className="w-full rounded-2xl p-8 md:p-12 mx:5 md:mx-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Image */}
                    <div className="flex justify-center items-center">
                        <img
                            src={heroImage}
                            alt="Chefs in a kitchen during a culinary event"
                            className="rounded-2xl w-full h-auto object-cover"
                            // Fallback in case the image fails to load
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=Culinary+Event'; }}
                        />
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="flex flex-col justify-center text-left">
                        <h1 className="text-[#3558A2] text-xl md:text-2xl font-bold leading-relaxed">
                            About Us
                        </h1>
                        <p className="mt-4 text-gray-700 text-base leading-relaxed text-justify">
                        <span className="text-[#3558A2]">Le goût de France – Cita Rasa Prancis</span> is a celebration of French gastronomy in Indonesia held from <span className="font-black">October 1st to 11th, 2025.</span> Organized by the French Embassy in Indonesia, Institut français d’Indonésie, Alliances françaises Indonésie and in collaboration with Business France and Disciples d’Escoffier Indonésie, the event aims to open up opportunities for cooperation and promote France’s culinary diversity and the values it conveys (conviviality, pleasure, sharing). It will also be an opportunity to showcase French entrepreneurship based in Indonesia, working in the gastronomy and art of living sectors, and to encourage exchanges with Indonesian chefs and restaurants, even young talented culinary students.
                        </p>
                        <p className="mt-4 text-gray-700 text-base leading-relaxed text-justify">
                            For the third times, culinary enthusiasts and connoisseurs can enjoy a variety of French specialties, experience the authentic flavors of France, and immerse themselves in France’s vibrant culinary culture.
                        </p>
                        <p className="mt-4 text-gray-700 text-base leading-relaxed text-justify">
                            Present in various cities in Indonesia, the event also features various activities such as workshops, cooking demonstrations, movie screenings, discussions, and many more. Join us for a gastronomic journey like no other!
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default About;