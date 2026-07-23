import React, { useState, useEffect, useRef } from 'react';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import CategoryDropdown from './components/CategoryDropdown';
import ExploreImage from '../../../assets/explore/explore-hero.png';
import { getRestaurants, getEvents } from '../../../services/HomeService';
import Loader from './components/loader';
import { useSearchParams } from 'react-router-dom';
import RestaurantDetailPage from './components/RestaurantDetailPage';
import EventDetailPage from './components/EventDetailPage';

const toTitleCase = (str) => {
    if (!str) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5.40039 2.1001H18.6004C19.7004 2.1001 20.6004 3.0001 20.6004 4.1001V6.3001C20.6004 7.1001 20.1004 8.1001 19.6004 8.6001L15.3004 12.4001C14.7004 12.9001 14.3004 13.9001 14.3004 14.7001V19.0001C14.3004 19.6001 13.9004 20.4001 13.4004 20.7001L12.0004 21.6001C10.7004 22.4001 8.90039 21.5001 8.90039 19.9001V14.6001C8.90039 13.9001 8.50039 13.0001 8.10039 12.5001L4.30039 8.5001C3.80039 8.0001 3.40039 7.1001 3.40039 6.5001V4.2001C3.40039 3.0001 4.30039 2.1001 5.40039 2.1001Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10.93 2.1001L6 10.0001" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

const SortIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 12h18M3 16.5h18" />
    </svg>
);

const SortDirectionIcon = ({ order }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        {order === 'asc'
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
        }
    </svg>
);

function Search() {
    const [searchParams] = useSearchParams();
    const [category, setCategory] = useState(toTitleCase(searchParams.get('category')) || 'Restaurant');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState(searchParams.get('activity') ? [searchParams.get('activity')] : []);
    const [sortOrder, setSortOrder] = useState('desc');

    const [allItems, setAllItems] = useState([]);
    const [regions, setRegions] = useState([]);
    const [activityTypes, setActivityTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState((searchParams.get('restaurantId')) || null);
    const [selectedEventId, setSelectedEventId] = useState((searchParams.get('eventId')) || null);

    const isDetailOpen = selectedRestaurantId || !!selectedEventId;

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

                const mappedRestaurants = restaurantsRes.data.map(item => ({
                    id: item.id,
                    title: item.restaurant_name,
                    category: 'Restaurant',
                    region: item.restaurant_region,
                    activity: 'Culinary', // Default for restaurants
                    date: null, // No date from restaurant API
                    imageUrl: import.meta.env.VITE_STORAGE_BASE_URL + '/' + item.restaurant_cover_image
                }));

                const mappedEvents = eventsRes.data.map(item => ({
                    id: item.id,
                    title: item.activityName,
                    category: 'Event',
                    region: item.region,
                    activity: item.activities.length > 0 ? item.activities.map(a => a.name) : ['General'],
                    date: item.eventDates.length > 0 ? item.eventDates[0].startDate : null,
                    imageUrl: item.coverImageUrl
                }));

                const combinedItems = [...mappedRestaurants, ...mappedEvents];
                setAllItems(combinedItems); // Store the full list
                setFilteredItems(combinedItems); // Set initial display

                const uniqueRegions = [...new Set(restaurantsRes.data.map(r => r.restaurant_region).filter(Boolean))];
                setRegions(uniqueRegions);

                const allApiActivities = eventsRes.data.flatMap(e => e.activities.map(a => a.name));
                const uniqueActivities = [...new Set(allApiActivities)];
                setActivityTypes(uniqueActivities);

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

    useEffect(() => {
        let items = [...allItems]; // Start with the full list of items

        // Filter by category first
        items = items.filter(item => item.category === category);

        if (searchTerm) {
            items = items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (selectedRegions.length > 0) {
            items = items.filter(item => selectedRegions.includes(item.region));
        }
        if (selectedActivities.length > 0) {
            items = items.filter(item => {
                if (Array.isArray(item.activity)) {
                    return item.activity.some(activity => selectedActivities.includes(activity));
                }
                return selectedActivities.includes(item.activity);
            });
        }
        // if (selectedActivities.length > 0) {
        //     items = items.filter(item => selectedActivities.includes(item.activity));
        // }
        items.sort((a, b) => {
            if (sortOrder === 'asc') {
            return a.id - b.id;
            } else {
            return b.id - a.id;
            }
        });
        setFilteredItems(items);
    }, [category, searchTerm, selectedRegions, selectedActivities, sortOrder, allItems]);

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    if (loading) return <div className="fixed inset-0 bg-white z-50 flex justify-center items-center"><Loader /></div>;

    return (
        <div className="min-h-screen" style={{ fontFamily: 'Marianne, sans-serif' }}>
            {/* --- Hero Section --- */}
            <div className="relative bg-cover bg-center h-[25vh] mb-5 md:mb-0" style={{ backgroundImage: `url(${ExploreImage})` }}>

            </div>

            {/* --- Main Content Area --- */}
            {/* Increased negative margin from -mt-16 to -mt-24 */}
            <main className="-mt-24 relative z-20">
                <div className="bg-white p-6 sm:p-8 rounded-3xl">
                    <div className="mx-5 md:mx-10 xl:mx-20">
                        <div className="bg-white p-4 rounded-xl mb-6">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-full max-w-2xl">
                                    <CategoryDropdown value={category} onChange={(e) => {
                                                        const newCategory = e.target.value;
                                                        setCategory(newCategory);
                                                        if (newCategory === 'Restaurant') {
                                                            setSelectedActivities([]);
                                                        }
                                                    }}   />
                                    <div className="relative flex-grow w-full sm:w-auto">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <SearchIcon />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter a restaurant or event"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-x-4 gap-y-3">
                                    <div className="border-l border-gray-200 hidden xl:block mx-2"></div>
                                    <button className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                                        <FilterIcon />
                                        <span>Filter</span>
                                    </button>

                                    <MultiSelectDropdown options={regions} selectedOptions={selectedRegions} onChange={setSelectedRegions} placeholder="Region" />
                                    <MultiSelectDropdown options={activityTypes} selectedOptions={selectedActivities} onChange={setSelectedActivities} placeholder="Activity Type" />
                                </div>

                                <div className="flex items-center flex-wrap justify-center gap-4">

                                    <button onClick={toggleSortOrder} className="flex items-center space-x-2 text-sm text-gray-700 font-medium">
                                        <SortIcon />
                                        <span>Sort by: <strong>Latest</strong></span>
                                        <SortDirectionIcon order={sortOrder} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Showing {filteredItems.length} results
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredItems.map(item => (
                                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group" onClick={item.category === "Restaurant" ? () => setSelectedRestaurantId(item.id) : () => setSelectedEventId(item.id)}>
                                        <div className="relative">
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/ef4444/ffffff?text=Error'; }} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                            <div className="absolute top-4 left-4 flex space-x-2">
                                                <span className="bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">{item.region}</span>
                                                <span className="bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">{item.category}</span>
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {filteredItems.length === 0 && (
                                <div className="text-center py-16 col-span-full">
                                    <p className="text-gray-500">No results found. Try adjusting your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
            {selectedRestaurantId && <RestaurantDetailPage restaurantId={selectedRestaurantId} onClose={() => setSelectedRestaurantId(null)} />}
            {selectedEventId && <EventDetailPage eventId={selectedEventId} onClose={() => setSelectedEventId(null)} />}
        </div>
    );

}

export default Search;