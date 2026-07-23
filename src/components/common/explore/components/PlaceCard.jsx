import React from "react";

const PlaceCard = ({ title, description, imageUrl, click }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden flex items-center p-4 mb-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer" onClick={click}>
      <img 
        className="w-24 h-24 md:w-44 md:h-44 aspect-square object-cover rounded-xl" 
        src={imageUrl} 
        alt={title} 
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/e2e8f0/334155?text=...'; }} 
      />
      <div className="pl-4 flex-grow">
        <h3 className="font-bold text-lg text-gray-800" style={{ fontFamily: 'Marianne, sans-serif' }}>{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
      <a href="/exploreSearch" className="text-blue-600 font-bold text-sm ml-4 p-2 rounded-full hover:bg-blue-100 transition-colors">
        More ↗
      </a>
    </div>
  );

export default PlaceCard;