import React, { useState, useRef, useEffect } from 'react';

// --- Helper Components & Hooks ---
const ChevronDownIcon = () => (
    <svg className="w-5 h-5 ml-2 -mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};


const MultiSelectDropdown = ({ options, selectedOptions, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => {
        setIsOpen(false);
        setSearchTerm(''); // Reset search on close
    });

    const handleCheckboxChange = (option) => {
        const newSelectedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];
        onChange(newSelectedOptions);
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full md:w-44 bg-white border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <span className="truncate">
                    {selectedOptions.length > 0 ? `${selectedOptions.length} ${placeholder} selected` : placeholder}
                </span>
                <ChevronDownIcon />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <ul className="py-1 max-h-52 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li key={option} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            checked={selectedOptions.includes(option)}
                                            onChange={() => handleCheckboxChange(option)}
                                        />
                                        <span className="text-sm text-gray-800">{option}</span>
                                    </label>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default MultiSelectDropdown;