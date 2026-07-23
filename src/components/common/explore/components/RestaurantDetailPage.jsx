import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import ExploreImage from '../../../../assets/img/explore/explore1.jpg';
import { getRestaurants } from '../../../../services/HomeService';
import testImage from '../../../../assets/testimage2.jpg';

// --- MOCK API DATA ---
// Added more images to demonstrate scrolling
// Helper function to format price
const formatPrice = (price) => {
    return `IDR ${new Intl.NumberFormat('id-ID').format(price)}`;
};

const transformRestaurantData = (apiData) => {
    const {
        restaurant_name,
        restaurant_region,
        restaurant_description,
        restaurant_pic_name,
        restaurant_completed_address,
        restaurant_reservation_link,
        restaurant_website,
        restaurant_cover_image,
        gallery_images,
        menus
    } = apiData;

    // The API does not provide menu categories, so we'll group them all under "Menu"
    // Or you could implement logic to group by `menu_category_id` if you have the category names
    const menuItems = menus.map(item => ({
        name: item.menu_name,
        price: formatPrice(item.menu_price),
        imageUrl: item.menu_image || 'https://placehold.co/600x2000/ef4444/ffffff?text=Menu'
    }));

    return {
        name: restaurant_name,
        category: restaurant_region || 'RESTAURANT',
        overview: restaurant_description?.replace(/<p>|<\/p>/g, '') || '', // Basic HTML tag removal
        chef: restaurant_pic_name,
        address: {
            street: restaurant_completed_address,
            link: restaurant_reservation_link
        },
        website: {
            name: restaurant_website,
            link: restaurant_website || '#'
        },
        coverImage: restaurant_cover_image || ExploreImage,
        gallery: gallery_images.map(img => img.image_url),
        menu: {
            "Menu": menuItems
        }
    };
};

const MenuSection = ({ title, items }) => (
    <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {items.map((item, index) => <MenuItem key={index} item={item} />)}
        </div>
    </div>
);

// --- SVG ICONS ---
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- SUB-COMPONENTS ---
const MenuItem = ({ item }) => (
    <div className="group">
        <div className="aspect-square overflow-hidden rounded-lg">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full aspect-3/2 object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/ef4444/ffffff?text=Menu'; }} />
        </div>
        <h4 className="mt-2 text-base font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-500">{item.price}</p>
    </div>
);

// --- Restaurant Detail Component ---
const RestaurantDetailPage = ({ restaurantId, onClose }) => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!restaurantId) return;

        // Add the restaurant ID to the URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('restaurantId', restaurantId);
        window.history.pushState({ restaurantId }, '', newUrl);

        // Handle the browser's back button
        const handlePopState = (event) => {
            handleClose();
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup function to run when the component unmounts
        return () => {
            window.removeEventListener('popstate', handlePopState);
            // Check if the current URL still has the ID and go back if it does
            if (window.location.search.includes(`restaurantId=${restaurantId}`)) {
                const cleanUrl = new URL(window.location.href);
                cleanUrl.searchParams.delete('restaurantId');
                // Use replaceState to remove the ID without adding a new history entry
                window.history.replaceState(null, '', cleanUrl);
            }
        };
    }, [restaurantId, handleClose]);

    useEffect(() => {

        const fetchRestaurant = async () => {
            if (!restaurantId) return;
            try {
                setLoading(true);
                const response = await getRestaurants(restaurantId);
                if (response.success) {
                    const transformedData = transformRestaurantData(response.data);
                    setRestaurant(transformedData);
                } else {
                    console.error("Failed to get restaurant data:", response.message);
                }
            } catch (error) {
                console.error("An error occurred while fetching restaurant details:", error);
                handleClose();
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, []);

    // useEffect(() => {
    //     if (!restaurantId) return;

    //     const newUrl = new URL(window.location.href);
    //     newUrl.searchParams.set('id', restaurantId);
    //     window.history.pushState({ restaurantId }, '', newUrl);

    // }, [restaurantId]);

    if (loading) {
        return <div className="fixed inset-0 bg-white z-50 flex justify-center items-center"><Loader /></div>;
    }
    if (error) {
        return <div className="fixed inset-0 bg-white z-50 flex justify-center items-center text-red-500">{error}</div>;
    }
    if (!restaurant) {
        return null;
    }

    return (
        <div className={`fixed scrollbar-hide inset-0 bg-white z-50 transform transition-transform duration-500 ease-in-out overflow-y-auto ${isVisible && !isClosing ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="relative scrollbar-hide bg-cover bg-center h-[45vh] mb-5 md:mb-0" style={{ backgroundImage: `url(${restaurant.coverImage})` }}>

            </div>
            <div className="relative z-99 -mt-10 main rounded-3xl bg-white scrollbar-hide">
                <div className="mx-5 md:mx-10 p-4 sm:p-6 lg:p-8">
                    <header className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">{restaurant.name}</h1>
                            <div className="flex items-center gap-2 pt-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    {restaurant.category}
                                </span>
                            </div>
                        </div>
                        <button onClick={handleClose} className="bg-white shadow-xl text-gray-600 rounded-full p-2 transition-colors">
                            <CloseIcon />
                        </button>
                    </header>

                    <main>
                        <section className="space-y-4 text-sm mb-12">
                            {/* Overview Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                                <div className="lg:col-span-3 font-medium text-gray-500 uppercase tracking-wider mb-1 lg:mb-0">
                                    <p>Overview</p>
                                </div>
                                <div className="lg:col-span-9">
                                    <p className="text-gray-700 leading-relaxed">{restaurant.overview}</p>
                                </div>
                            </div>
                            {/* Chef Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                                <div className="lg:col-span-3 font-medium text-gray-500 uppercase tracking-wider mb-1 lg:mb-0">
                                    <p>Chef</p>
                                </div>
                                <div className="lg:col-span-9">
                                    <p className="text-gray-800 font-medium">{restaurant.chef}</p>
                                </div>
                            </div>
                            {/* Address Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                                <div className="lg:col-span-3 font-medium text-gray-500 uppercase tracking-wider mb-1 lg:mb-0">
                                    <p>Address</p>
                                </div>
                                <div className="lg:col-span-9">
                                    <a href={restaurant.address.link} className="text-blue-600 hover:underline">
                                        {restaurant.address.street}
                                    </a>
                                </div>
                            </div>
                            {/* Website Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                                <div className="lg:col-span-3 font-medium text-gray-500 uppercase tracking-wider mb-1 lg:mb-0">
                                    <p>Website</p>
                                </div>
                                <div className="lg:col-span-9">
                                    <a href={restaurant.website.link} className="text-blue-600 hover:underline flex items-center gap-1">
                                        <span>{restaurant.website.name}</span>
                                        <LinkIcon />
                                    </a>
                                </div>
                            </div>
                        </section>

                        {restaurant.address.link &&
                            <section className="mb-12">
                                <a href={restaurant.address.link} className="bg-[#3558A2] w-fit text-white font-bold py-2.5 px-5 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    <span>Reserve Now</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            </section>
                        }

                        <section className="mb-12">
                            <div className="flex overflow-x-auto space-x-4 pb-4">
                                {restaurant.gallery.map((src, index) => (
                                    <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 rounded-lg overflow-hidden">
                                        <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-56 object-cover" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="menu">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Menus</h2>
                            {Object.entries(restaurant.menu).map(([sectionTitle, items]) => (
                                <MenuSection key={sectionTitle} title={sectionTitle} items={items} />
                            ))}
                        </section>
                    </main>
                </div>
            </div>

        </div>
    );
}

export default RestaurantDetailPage;