import React from "react";

const ActivityCard = ({ city, tags, date, title, description, imageUrl, clickDetail }) => {

    const handleClickDetail = () => {
        clickDetail()
    }

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 p-2 flex-shrink-0" onClick={handleClickDetail}>
            {/* Added flex, flex-col, and h-full to ensure cards have the same height */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform transition-transform duration-300 hover:scale-105 h-full flex flex-col">
                <div className="relative">
                    <img className="w-full h-68 object-cover" src={imageUrl} alt={title} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e2e8f0/334155?text=Image+Not+Found'; }} />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C5B91]/90 from-8% via-transparent to-transparent"></div>
                    <div className="absolute inset-0 p-4 md:p-4 flex flex-col justify-between text-white duration-500 ease-in-out hover:bg-[#0C5B91]/40">
                        <div className="self-start flex gap-x-2">
                            <span className="bg-white hidden lg:flex bg-opacity-50 text-black text-xs font-semibold px-3 py-1 rounded-full">{city}</span>
                            {tags.map((tag, index) => (
                                <span key={index} className="hidden xl:flex bg-white/20 border border-white bg-opacity-50 text-white text-xs font-semibold px-3 py-1 rounded-full">{tag.length > 5 && index === 1 ? tag.substring(0, 5) + "..." : tag}</span>
                            ))}
                            <span className="bg-blue-500/35 border border-white text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {date}
                            </span>
                        </div>
                        <div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Marianne, sans-serif' }}>{title}</h3>
                                <p className="text-white/75 font-light text-sm mt-1 flex-grow" dangerouslySetInnerHTML={{
                                    __html: description.length > 100
                                        ? description.substring(0, 100) + "..."
                                        : description
                                }}></p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Added flex-grow to make this div take up available space */}

            </div>
        </div>
    );
};


export default ActivityCard;