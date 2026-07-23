import React, { useState, useRef, useEffect } from 'react';
import TasteCard from './components/TastyCard';
import ActivityCard from './components/ActivityCard';
import ExploreImage from '../../../assets/explore/explore-hero.png';
import TestImage from '../../../assets/explore/menu-test.jpg'
import TestImage2 from '../../../assets/explore/menu-test2.jpg'
import RestaurantDetailPage from './components/RestaurantDetailPage';
import EventDetailPage from './components/EventDetailPage';
import { getRestaurants, getEvents } from '../../../services/HomeService';
import { useSearchParams } from 'react-router-dom';

const formatDate = (dateString) => {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        // Manually construct the format to ensure "Sept" for September
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

        return `${month} ${day}`;
    } catch (error) {
        console.error("Invalid date string:", dateString);
        return dateString; // Return original string if formatting fails
    }
};

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9.58333 18.125C4.875 18.125 1.04167 14.2917 1.04167 9.58332C1.04167 4.87499 4.875 1.04166 9.58333 1.04166C14.2917 1.04166 18.125 4.87499 18.125 9.58332C18.125 14.2917 14.2917 18.125 9.58333 18.125ZM9.58333 2.29166C5.55833 2.29166 2.29167 5.56666 2.29167 9.58332C2.29167 13.6 5.55833 16.875 9.58333 16.875C13.6083 16.875 16.875 13.6 16.875 9.58332C16.875 5.56666 13.6083 2.29166 9.58333 2.29166Z" fill="#292D32" />
        <path d="M18.3333 18.9583C18.175 18.9583 18.0167 18.9 17.8917 18.775L16.225 17.1083C15.9833 16.8667 15.9833 16.4667 16.225 16.225C16.4667 15.9833 16.8667 15.9833 17.1083 16.225L18.775 17.8917C19.0167 18.1333 19.0167 18.5333 18.775 18.775C18.65 18.9 18.4917 18.9583 18.3333 18.9583Z" fill="#292D32" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const DiagonalIcon = ({ color = "#292929" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M7 17.5L17 7.5M17 7.5H7M17 7.5V17.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const GlassIcon = () => (
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

function Hero() {
    const [tasteData, setTasteData] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams] = useSearchParams();
    const [selectedRestaurantId, setSelectedRestaurantId] = useState((searchParams.get('restaurantId')) || null);
    const [selectedEventId, setSelectedEventId] = useState((searchParams.get('eventId')) || null);
    const [type, setType] = useState("RESTAURANT");
    const [openType, setOpenType] = useState(false);

    const isDetailOpen = selectedRestaurantId || !!selectedEventId;

    // Lock background scroll when a detail page is open
    useEffect(() => {
        if (!isDetailOpen) return;

        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, scrollY);
        };

    }, [isDetailOpen]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [restaurantsRes, eventsRes] = await Promise.all([
                    getRestaurants(),
                    getEvents()
                ]);

                // Map restaurant data
                const mappedTasteData = restaurantsRes.data.map(item => ({
                    id: item.id,
                    city: item.restaurant_region || 'Unknown',
                    type: 'Restaurant', // Type can be enhanced if API provides it
                    title: item.restaurant_name,
                    imageUrl: item.restaurant_cover_image || TestImage,
                }));
                setTasteData(mappedTasteData);

                // Map event data
                const mappedActivityData = eventsRes.data.map(item => ({
                    id: item.id,
                    city: item.region || 'Unknown',
                    tags: ['Event', item.activityName].filter(Boolean),
                    date: item.eventDates.length > 0 ? `${formatDate(item.eventDates[0].startDate)} - ${formatDate(item.eventDates[0].endDate)}` : 'Date TBD',
                    title: item.activityName,
                    description: item.description,
                    imageUrl: item.coverImageUrl || TestImage2,
                }));
                setActivityData(mappedActivityData);

                setError(null);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Could not load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- Refs for scrolling containers ---
    const tasteContainerRef = useRef(null);
    const activityContainerRef = useRef(null);
    const typeRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    // --- Scroll handler function ---
    const handleScroll = (direction, ref) => {
        if (ref.current) {
            const scrollAmount = ref.current.offsetWidth * 0.8; // Scroll by 80% of the container width
            ref.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (loading) {
        return <div className="text-center p-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-10">{error}</div>;
    }


    return (
        <div className="bg-gray-50 min-h-screen" style={{ fontFamily: 'Marianne, sans-serif' }}>
            {/* --- Hero Section --- */}
            <div className="relative bg-cover bg-center h-[85vh] md:h-[60vh] mb-5 md:mb-0" style={{ backgroundImage: `url(${ExploreImage})` }}>
                {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-24 md:pb-32">
                    {/* --- Hero Content --- */}
                    <div className="w-full flex flex-col items-center text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-8">What do you fancy today?</h1>

                        {/* --- Search Bar --- */}
                        <div className="flex flex-wrap md:flex-nowrap lg:flex-grow justify-center gap-x-2 gap-y-20 md:gap-y-0 bg-white-1 border border-[#F2F2F2] md:border-0 md:bg-[#DCDCDC] p-5 rounded-4xl md:rounded-full shadow-2xl/20">
                            <div className="flex flex-wrap w-full md:min-w-xl lg:min-w-3xl items-center gap-x-2 gap-y-5 rounded-full bg-white shadow-lg ring-1 ring-gray-900/10 h-15">
                                <div className="relative h-full w-full md:w-fit" ref={typeRef}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenType((o) => !o)}
                                        className="flex items-center border-0 md:border-r md:border-gray-200 px-4 gap-x-2 h-full w-full md:w-fit justify-between"
                                        aria-haspopup="listbox"
                                        aria-expanded={openType}>
                                        {type === "RESTAURANT" ? <GlassIcon /> : <EventIcon />}
                                        <span className="text-sm font-semibold text-gray-700">{type}</span>
                                        <ChevronDownIcon />
                                    </button>
                                    {openType && (
                                        <div className="absolute left-0 top-full z-10 mt-1 w-full md:w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                            <ul role="listbox" className="py-1">
                                                {["RESTAURANT", "EVENT"].map((opt) => (
                                                    <li key={opt}>
                                                        <button
                                                            type="button"
                                                            role="option"
                                                            aria-selected={type === opt}
                                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${type === opt ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-700"}`}
                                                            onClick={() => {
                                                                setType(opt);
                                                                setOpenType(false);
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {/* Input */}
                                <div className="flex flex-grow items-center gap-x-3 bg-white px-4 h-full w-full md:w-fit rounded-full shadow-lg md:shadow-none ring-1 ring-gray-900/10 md:ring-0">
                                    <SearchIcon />
                                    <input
                                        type="text"
                                        placeholder="Enter a restaurant or event.."
                                        className="w-full bg-transparent px-2 py-1 text-gray-900 placeholder:text-gray-400 sm:text-sm outline-none"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <a
                                href={`/exploreSearch?category=${type}${searchTerm ? `&search=${searchTerm}` : ''}`}
                                type="button"
                                className="flex items-center gap-x-1 w-full justify-center md:w-fit border-2 border-white/30 rounded-full bg-[#3558A2] mt-5 md:mt-0 lg:mt-0 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-linear-to-r from-[#3558A2] to-[#633B57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Search
                                <DiagonalIcon color='#ffffff' />
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- Main Content Area --- */}
            {/* Increased negative margin from -mt-16 to -mt-24 */}
            <main className="-mt-24 relative z-5">
                <div className="bg-white p-6 sm:p-8 rounded-3xl">

                    {/* --- Discover Section --- */}
                    <section className="mb-12">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                Discover Taste of France <DiagonalIcon />
                            </h2>
                            <div className="flex space-x-2">
                                <button onClick={() => handleScroll('left', tasteContainerRef)} className="hidden md:inline p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"><ChevronLeftIcon /></button>
                                <button onClick={() => handleScroll('right', tasteContainerRef)} className="hidden md:inline p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"><ChevronRightIcon /></button>
                            </div>
                        </div>
                        {/* Added relative positioning wrapper for the gradient overlay */}
                        <div className="relative">
                            <div ref={tasteContainerRef} className="flex overflow-x-auto -mx-2 pb-4 scrollbar-hide">
                                {tasteData.map((item, index) => <TasteCard key={index} {...item} clickDetail={() => setSelectedRestaurantId(item.id)} />)}
                            </div>
                            {/* Right-side gradient overlay */}
                            <div className="absolute top-0 -right-5 bottom-0 w-34 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                        </div>
                    </section>

                    {/* --- Explore Section --- */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                Explore Something To Do <DiagonalIcon />
                            </h2>
                            <div className="flex space-x-2">
                                <button onClick={() => handleScroll('left', activityContainerRef)} className="hidden md:inline p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"><ChevronLeftIcon /></button>
                                <button onClick={() => handleScroll('right', activityContainerRef)} className="hidden md:inline p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"><ChevronRightIcon /></button>
                            </div>
                        </div>
                        {/* Added relative positioning wrapper for the gradient overlay */}
                        <div className="relative">
                            <div ref={activityContainerRef} className="flex overflow-x-auto -mx-2 pb-4 scrollbar-hide">
                                {activityData.map((item, index) => <ActivityCard key={index} {...item} clickDetail={() => setSelectedEventId(item.id)} />)}
                            </div>
                            {/* Right-side gradient overlay */}
                            <div className="absolute top-0 -right-5 bottom-0 w-34 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                        </div>
                    </section>
                </div>
            </main>
            {selectedRestaurantId && <RestaurantDetailPage restaurantId={selectedRestaurantId} onClose={() => setSelectedRestaurantId(null)} />}
            {selectedEventId && <EventDetailPage eventId={selectedEventId} onClose={() => setSelectedEventId(null)} />}
        </div>
    );
}

export default Hero;