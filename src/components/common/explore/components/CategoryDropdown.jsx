import React, { useState, useEffect, useRef } from 'react';

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

const RestaurantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path opacity="0.2" d="M15.625 5.625L10 11.25L4.375 5.625H15.625Z" fill="#202E4B" />
        <path d="M18.5672 3.56719C18.6547 3.47978 18.7143 3.36837 18.7385 3.24707C18.7626 3.12576 18.7502 3.00002 18.7029 2.88576C18.6555 2.77149 18.5754 2.67384 18.4725 2.60517C18.3696 2.53651 18.2487 2.4999 18.125 2.5H1.875C1.75132 2.4999 1.63038 2.53651 1.52751 2.60517C1.42464 2.67384 1.34446 2.77149 1.29711 2.88576C1.24977 3.00002 1.23739 3.12576 1.26154 3.24707C1.2857 3.36837 1.34531 3.47978 1.43281 3.56719L9.375 11.5086V16.25H6.875C6.70924 16.25 6.55027 16.3158 6.43306 16.4331C6.31585 16.5503 6.25 16.7092 6.25 16.875C6.25 17.0408 6.31585 17.1997 6.43306 17.3169C6.55027 17.4342 6.70924 17.5 6.875 17.5H13.125C13.2908 17.5 13.4497 17.4342 13.5669 17.3169C13.6842 17.1997 13.75 17.0408 13.75 16.875C13.75 16.7092 13.6842 16.5503 13.5669 16.4331C13.4497 16.3158 13.2908 16.25 13.125 16.25H10.625V11.5086L18.5672 3.56719ZM5.88359 6.25H14.1164L10 10.3664L5.88359 6.25ZM16.6164 3.75L15.3664 5H4.63359L3.38359 3.75H16.6164Z" fill="#202E4B" />
    </svg>
);

const EventIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path opacity="0.2" d="M14.0625 9C14.0624 9.51869 14.2415 10.0215 14.5695 10.4233C14.8975 10.8251 15.3543 11.1013 15.8625 11.205C15.9894 11.2309 16.1035 11.2998 16.1855 11.4002C16.2675 11.5005 16.3124 11.626 16.3125 11.7555V13.5C16.3125 13.6492 16.2532 13.7923 16.1477 13.8977C16.0423 14.0032 15.8992 14.0625 15.75 14.0625H6.75V3.9375H15.75C15.8992 3.9375 16.0423 3.99676 16.1477 4.10225C16.2532 4.20774 16.3125 4.35082 16.3125 4.5V6.24445C16.3124 6.37401 16.2675 6.49954 16.1855 6.59985C16.1035 6.70016 15.9894 6.76909 15.8625 6.795C15.3543 6.89874 14.8975 7.17488 14.5695 7.57669C14.2415 7.97851 14.0624 8.48131 14.0625 9Z" fill="#202E4B" />
        <path d="M15.9743 7.34625C16.2284 7.29455 16.4569 7.15664 16.621 6.95587C16.7851 6.75509 16.8749 6.50378 16.875 6.24445V4.5C16.875 4.20163 16.7565 3.91548 16.5455 3.7045C16.3345 3.49353 16.0484 3.375 15.75 3.375H2.25C1.95163 3.375 1.66549 3.49353 1.45451 3.7045C1.24353 3.91548 1.125 4.20163 1.125 4.5V6.24445C1.12514 6.50378 1.21487 6.75509 1.379 6.95587C1.54313 7.15664 1.77159 7.29455 2.02571 7.34625C2.40568 7.42505 2.74688 7.6324 2.99184 7.93337C3.2368 8.23434 3.37054 8.61054 3.37054 8.99859C3.37054 9.38665 3.2368 9.76285 2.99184 10.0638C2.74688 10.3648 2.40568 10.5721 2.02571 10.6509C1.77111 10.7027 1.5423 10.8411 1.37811 11.0424C1.21393 11.2438 1.1245 11.4957 1.125 11.7555V13.5C1.125 13.7984 1.24353 14.0845 1.45451 14.2955C1.66549 14.5065 1.95163 14.625 2.25 14.625H15.75C16.0484 14.625 16.3345 14.5065 16.5455 14.2955C16.7565 14.0845 16.875 13.7984 16.875 13.5V11.7555C16.8749 11.4962 16.7851 11.2449 16.621 11.0441C16.4569 10.8434 16.2284 10.7055 15.9743 10.6538C15.5943 10.575 15.2531 10.3676 15.0082 10.0666C14.7632 9.76566 14.6295 9.38946 14.6295 9.00141C14.6295 8.61335 14.7632 8.23715 15.0082 7.93618C15.2531 7.63521 15.5943 7.42786 15.9743 7.34906V7.34625ZM2.25 11.7562C2.88541 11.6268 3.45657 11.2818 3.86679 10.7796C4.27702 10.2774 4.50109 9.64881 4.50109 9.00035C4.50109 8.35189 4.27702 7.72335 3.86679 7.22114C3.45657 6.71893 2.88541 6.37389 2.25 6.24445V4.5H6.1875V13.5H2.25V11.7562ZM15.75 11.7562V13.5H7.3125V4.5H15.75V6.24375C15.1146 6.37319 14.5434 6.71822 14.1332 7.22044C13.723 7.72265 13.4989 8.35119 13.4989 8.99965C13.4989 9.64811 13.723 10.2766 14.1332 10.7789C14.5434 11.2811 15.1146 11.6261 15.75 11.7555V11.7562Z" fill="#202E4B" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const CategoryDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    useOutsideClick(dropdownRef, () => setIsOpen(false));
    const options = ['Restaurant', 'Event'];

    const handleSelect = (option) => {
        onChange({ target: { value: option } });
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full md:w-48 bg-white border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <div className="flex items-center gap-2">
                    {value === 'Restaurant' ? <RestaurantIcon /> : <EventIcon />}
                    <span className="font-semibold uppercase tracking-wider">{value}</span>
                </div>
                <ChevronDownIcon />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-1">
                        {options.map((option) => (
                            <li
                                key={option}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;