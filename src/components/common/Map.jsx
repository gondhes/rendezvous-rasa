import React, { useState, useEffect, useRef } from 'react';
import styles from '../../assets/styles/Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ornament1 from '../../assets/ornament/ornamenfrench4-1.png';
import L from 'leaflet';
import { getRestaurants } from '../../services/HomeService';
import TasteCard from './explore/components/TastyCard';
import RestaurantDetailPage from './explore/components/RestaurantDetailPage';

const HoverMarker = ({ position, children, ...props }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    mouseover: () => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    },
    // The popup will automatically close on mouseout unless the user hovers over the popup itself.
    // Leaflet handles this behavior by default when a popup is opened programmatically.
  };

  return (
    <Marker ref={markerRef} position={position} eventHandlers={eventHandlers} {...props}>
      {children}
    </Marker>
  );
};

const MapSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const position = [-2.5489, 118.0149];
  const zoomLevel = 5;

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
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await getRestaurants();
        setRestaurants(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <section className="relative z-1 overflow-hidden mb-10 md:mb-0">
      <div className="flex justify-center -mt-28" style={{
        zIndex: 0, // Move this div behind other content
      }}>
        <img
          src={ornament1} // Replace with the correct image path
          alt="Hero Background"
          className="max-w-xs sm:max-w-sm opacity-100 bg-cover bg-center bg-no-repeat"
          style={{
            zIndex: 0, // Place it behind the text
          }}
        />

      </div>
      <div className="header-wrapper mx-5 md:mx-20 -mt-20 z-1">
        <h2 className="text-[#3D3D3D] text-[18px] md:text-5xl font-bold" style={{ fontFamily: 'Marianne' }}>Discover French Flavors</h2>
        <p className="mt-2 text-[#7C7C7C] ml-1 text-[12px] md:text-[20px] font-light" style={{ fontFamily: 'Marianne' }}>Use the interactive map to locate French restaurants and cafes near you.</p>
      </div>
      <div className="mt-8 h-[580px]">
        <MapContainer
          className='relative z-1'
          center={position}
          zoom={zoomLevel}
          style={{ height: '580px', width: '100%' }}
          scrollWheelZoom={false} // Disable zoom on scroll
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {Array.isArray(restaurants) && restaurants.length > 0 ? (
            restaurants.map(restaurant => (
              restaurant.locations.map(location => {
                const latitude = parseFloat(location.latitude);
                const longitude = parseFloat(location.longitude);

                // Only render the marker if both latitude and longitude are valid
                if (!latitude || !longitude) {
                  return null;
                }

                return (
                  <HoverMarker
                    key={`${restaurant.id}-${location.id}`}
                    position={[latitude, longitude]}
                  >
                    <Popup>
                      {/* The content of your popup remains the same */}
                      <div className="w-64 cursor-pointer" onClick={() => setSelectedRestaurantId(restaurant.id)}>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full cursor-pointer">
                          <div className="relative">
                            <img className="w-full h-32 object-cover" src={`${import.meta.env.VITE_STORAGE_BASE_URL}/${restaurant.restaurant_cover_image}`} alt={restaurant.restaurant_name} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e2e8f0/334155?text=Image+Not+Found'; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0C5B91]/90 from-8% via-transparent to-transparent"></div>
                            <div className="absolute inset-0 p-2 flex flex-col justify-between text-white">
                              <div className="self-start flex gap-x-1">
                                <span className="bg-white bg-opacity-50 text-black text-[8px] font-medium px-2 py-0.5 rounded-full">{restaurant.restaurant_region}</span>
                                <span className="bg-white/20 border border-white bg-opacity-50 text-white text-[8px] font-medium px-2 py-0.5 rounded-full">Restaurant</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-[14px] text-white" style={{ fontFamily: 'Marianne, sans-serif' }}>{restaurant.restaurant_name}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </HoverMarker>
                );
              })
            ))
          ) : (
            !loading && (
              <div className="text-center text-gray-500">
                {error || "No restaurants available to display."}
              </div>
            )
          )}
        </MapContainer>
      </div>
      {selectedRestaurantId && (
        <RestaurantDetailPage restaurantId={selectedRestaurantId} onClose={() => setSelectedRestaurantId(null)} />
      )}
    </section>
  );
};

export default MapSection;