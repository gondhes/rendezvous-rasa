import React from "react";
import bakeryImg from "../../../assets/img/join/join1.jpg";
import eventImg from "../../../assets/img/culture/culture3.jpg"
import downloadImage from "../../../assets/download_assets.png"

const cardData = [
    {
        id: 1,
        title: "Menu à la française",
        tags: ["Restaurant", "Bakery", "Cafe", "Hotel", "Bar"],
        // Using a placeholder that resembles the original image's content
        imageUrl: bakeryImg,
        nav: "/register/menu",
    },
    {
        id: 2,
        title: "Events",
        tags: ["Cooking Demo", "Workshops", "Exhibition", "Discussions"],
        // Using a placeholder that resembles the original image's content
        imageUrl: eventImg,
        nav: "/register/events",
    },
];

// SVG component for the arrow icon in the button
const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
);


// Card component
const InfoCard = ({ title, tags, imageUrl, nav }) => {
    return (
        // Main card container with styling
        <a href={nav}>
            <div className="bg-white border border-gray-200/80 cursor-pointer rounded-3xl shadow-lg shadow-gray-300/30 overflow-hidden w-full max-w-lg mx-auto transition-all duration-300 hover:shadow-2xl">
                {/* Image section with a gradient overlay */}
                <div className="relative h-56 p-3 rounded-xl">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover rounded-3xl"
                        // Fallback in case the image fails to load
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x400/cccccc/ffffff?text=Image+Not+Found'; }}
                    />
                    {/* This div creates the fade-to-white effect at the bottom of the image */}
                    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {/* Content section */}
                <div className="p-6 -mt-12 relative z-10 ">
                    <h2 className="font-bold text-[#2D487B] text-[28px] mb-5 text-start mt-3">{title}</h2>

                    {/* Bottom row containing tags and the arrow button */}
                    <div className="flex items-end justify-between gap-2">
                        {/* Tags container */}
                        <div className="flex items-center flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex-shrink-0">For</span>
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    className="px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-shrink-0"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <button className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3558A2] text-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            </div>
        </a>

    );
};

const Index = () => {
    return (
        <section id="register">
            <h1 className="font-bold text-2xl text-black text-center mt-40">Join the Experience</h1>
            <p className="font-regular text-regular text-center text-[#7C7C7C]">Select the program you’d like to participate below:</p>
            <div className="flex flex-row justify-center gap-15 mt-10 text-center p-5">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {cardData.map((card) => (
                        <InfoCard
                            key={card.id}
                            title={card.title}
                            tags={card.tags}
                            imageUrl={card.imageUrl}
                            nav={card.nav}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-center mt-20 mx-5 md:mx-20 bg-gray-200 rounded-lg items-center p-5">
                <a href="https://drive.google.com/drive/folders/1lpn_LcljEHUu4LCms4ErikosjCXkScgz" target="_BLANK" className="font-bold text-4xl text-[#3558A2] underline mt-10 text-center">Download Our Communication Kit</a>
                <h4 className="font-medium text-[#7C7C7C] mt-5 text-center">If you’d like to use the same design for your own publication purposes.</h4>
                <img src={downloadImage} alt="download-img" className="mt-10" />
            </div>
        </section>

    )
}

export default Index

