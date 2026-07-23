import React from "react";

const TasteCard = ({ city, type, title, imageUrl, clickDetail }) => {

    const handleClickDetail = () => {
        clickDetail()
    }

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 p-2 flex-shrink-0" onClick={handleClickDetail}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transform transition-transform duration-300 hover:scale-105 h-full">
                <div className="relative">
                    <img className="w-full h-68 object-cover" src={ `${import.meta.env.VITE_STORAGE_BASE_URL}/${imageUrl}`} alt={title} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e2e8f0/334155?text=Image+Not+Found'; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C5B91]/90 from-8% via-transparent to-transparent"></div>
                    <div className="absolute inset-0 p-4 md:p-4 flex flex-col justify-between text-white duration-500 ease-in-out hover:bg-[#0C5B91]/40">
                        <div className="self-start flex gap-x-2">
                            <span className="bg-white bg-opacity-50 text-black text-xs font-semibold px-3 py-1 rounded-full">{city}</span>
                            <span className="bg-white/20 border border-white bg-opacity-50 text-white text-xs font-semibold px-3 py-1 rounded-full">{type}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white" style={{ fontFamily: 'Marianne, sans-serif' }}>{title}</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TasteCard;