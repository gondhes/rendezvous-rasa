import React from 'react';

const WorkshopCard = ({ imageUrl, title, date, onClick }) => {

    const ArrowRightIcon = (props) => (
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
    );

    return (
        <div className="container bg-transparent rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group" onClick={onClick}>
            <div className="overflow-hidden">
                <img src={imageUrl} alt={title} className="w-full h-full aspect-3/2 object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl" />
            </div>
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{date}</p>
                <a href="/explore" className="text-sm text-blue-600 hover:text-blue-800 font-semibold mt-4 flex items-center gap-2">
                    More
                    <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>
        </div>
    );
};

export default WorkshopCard;