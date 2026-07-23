import React, { useState, useEffect } from 'react';
import PlaceCard from './components/PlaceCard';
import CITYSECTIONJKT from '../../../assets/explore/CITYSECTION-JKT.jpg'
import CITYSECTIONBDG from '../../../assets/explore/CITYSECTION-BDG.jpg'
import CITYSECTIONBLI from '../../../assets/explore/CITYSECTION-BLI.jpg'
import CITYSECTIONSBY from '../../../assets/explore/CITYSECTION-SBY.jpg'
import CITYSECTIONYGY from '../../../assets/explore/CITYSECTION-YGY.jpg'

import TestImage from '../../../assets/explore/menu-test.jpg'
import { getRestaurants } from '../../../services/HomeService';
import RestaurantDetailPage from './components/RestaurantDetailPage';

function Region() {
    const initialCitiesData = {
        Jakarta: {
            description: "In the heart of Indonesia's bustling capital, Rendezvous-Rasa brings the elegance of French cuisine and culture to life. From modern venues to timeless traditions, experience a vibrant blend of Parisian sophistication and Jakarta's dynamic urban energy.",
            backgroundImage: CITYSECTIONJKT,
            places: []
        },
        Bandung: {
            description: "Nestled amidst volcanic mountains, Bandung's cool climate is the perfect setting for enjoying French pastries and coffee. Discover charming bistros and artistic spaces that blend French flair with Sundanese creativity.",
            backgroundImage: CITYSECTIONBDG,
            places: []
        },
        Surabaya: {
            description: "Surabaya's rich history as a port city creates a unique fusion of cultures. Here, French culinary traditions are infused with local spices and ingredients, offering a bold and unforgettable gastronomic adventure.",
            backgroundImage: CITYSECTIONSBY,
            places: []
        },
        Yogyakarta: {
            description: "In the cultural heart of Java, French elegance meets royal tradition. Yogyakarta offers a serene backdrop for enjoying fine French wines and cuisine, with a touch of Javanese grace and hospitality.",
            backgroundImage: CITYSECTIONYGY,
            places: []
        },
        Bali: {
            description: "Experience the magic of French culture on the Island of the Gods. From beachfront brasseries to jungle hideaways, Bali offers a tropical paradise setting for savoring exquisite French food and wine.",
            backgroundImage: CITYSECTIONBLI,
            places: []
        },
    };

    const [citiesData, setCitiesData] = useState(initialCitiesData);
    const [activeCity, setActiveCity] = useState('Jakarta');
    const [loading, setLoading] = useState(true);

    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
    const isDetailOpen = selectedRestaurantId;

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
        const fetchAndProcessRestaurants = async () => {
            try {
                setLoading(true);
                const response = await getRestaurants();
                const restaurants = response.data;
                // Create a deep copy to ensure `places` arrays are new and empty
                const processedData = JSON.parse(JSON.stringify(initialCitiesData));

                restaurants.forEach(restaurant => {
                    const place = {
                        id: restaurant.id,
                        title: restaurant.restaurant_name,
                        description: (restaurant.restaurant_description || '').replace(/<[^>]+>/g, '').substring(0, 70) + '...',
                        imageUrl: restaurant.restaurant_cover_image ? `${import.meta.env.VITE_STORAGE_BASE_URL}/${restaurant.restaurant_cover_image}` : TestImage
                    };

                    const region = (restaurant.restaurant_region || '').toUpperCase();

                    if (region.includes('JAKARTA') && processedData.Jakarta.places.length < 3) {
                        processedData.Jakarta.places.push(place);
                    } else if (region.includes('JAWA BARAT') && processedData.Bandung.places.length < 3) {
                        processedData.Bandung.places.push(place);
                    } else if (region.includes('JAWA TIMUR') && processedData.Surabaya.places.length < 3) {
                        processedData.Surabaya.places.push(place);
                    } else if (region.includes('YOGYAKARTA') && processedData.Yogyakarta.places.length < 3) {
                        processedData.Yogyakarta.places.push(place);
                    } else if (region.includes('BALI') && processedData.Bali.places.length < 3) {
                        processedData.Bali.places.push(place);
                    }
                });

                setCitiesData(processedData);
            } catch (error) {
                console.error("Failed to fetch or process restaurants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndProcessRestaurants();
    }, []);


    const cityNames = Object.keys(citiesData);
    const currentCityData = citiesData[activeCity];
    return (
        <div className="bg-gray-50 min-h-screen mt-10" style={{ fontFamily: 'Marianne, sans-serif' }}>
            <div className="relative w-full min-h-screen overflow-hidden">
                {/* Background Image with Transition */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{ backgroundImage: `url('${currentCityData.backgroundImage}')` }}
                    key={activeCity} // This key is crucial for triggering the transition on change
                ></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
                {/* Content */}
                <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Tab Navigation */}
                    <center>
                        <nav className="bg-white/50 backdrop-blur-sm p-2 border-1 border-[#A2CDEE] rounded-lg md:rounded-full flex flex-wrap justify-center md:justify-between items-center gap-2 shadow-md w-fit md:min-w-2xl mb-20">
                            {cityNames.map(city => (
                                <button
                                    key={city}
                                    onClick={() => setActiveCity(city)}
                                    className={`px-4 sm:px-6 py-2 rounded-full font-regular transition-colors duration-300 text-sm sm:text-base ${activeCity === city
                                        ? 'bg-[#C8E0F5] text-[#3558A2] shadow'
                                        : 'text-gray-600 hover:bg-white/70'
                                        }`}
                                >
                                    {city}
                                </button>
                            ))}
                        </nav>
                    </center>
                    {/* City Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Left Column: Description */}
                        <div className="text-gray-800 mx-5">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#3558A2]">{activeCity}</h1>
                            <p className="text-base md:text-lg leading-relaxed mb-8">
                                {currentCityData.description}
                            </p>
                            <a href={`/exploreSearch?category=restaurant&region=${activeCity}`} className="bg-[#3558A2] w-fit text-white font-extralight py-3 px-6 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg">
                                Explore <span className='font-bold ml-1'> {activeCity}'s Restaurants</span>  <span className="ml-2">↗</span>
                            </a>
                            <br />
                            <a href={`exploreSearch?category=event&region=${activeCity}`} className="bg-[#3558A2] w-fit text-white font-extralight py-3 px-6 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg">
                                Explore <span className='font-bold ml-1'> {activeCity}'s Events</span> <span className="ml-2">↗</span>
                            </a>
                        </div>
                        {/* Right Column: Places List */}
                        <div>
                            {loading ? (
                                <p>Loading restaurants...</p>
                            ) : (

                                currentCityData.places.map((place, index) => (
                                    <PlaceCard key={index} {...place} click={() => setSelectedRestaurantId(place.id)} />
                                ))

                            )}
                        </div>
                    </div>
                    <h2 className="text-xl font-bold underline text-[#3558A2] text-center mt-10 flex items-center justify-center gap-x-2">
                        <a href="/exploreSearch">Discover more regions</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_1847_2245)">
                                <path d="M5.83301 14.1666L14.1663 5.83331M14.1663 5.83331H5.83301M14.1663 5.83331V14.1666" stroke="#3558A2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1847_2245">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </h2>
                </main>
            </div>
            {selectedRestaurantId && (
                <RestaurantDetailPage restaurantId={selectedRestaurantId} onClose={() => setSelectedRestaurantId(null)} />
            )}
        </div>
    );
}

export default Region;