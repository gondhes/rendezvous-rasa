import React, { useState, useEffect } from 'react';
import exploreImage from '../../../assets/img/explore/explore1.jpg'; // Ensure this image exists in your project
import { getRestaurants } from '../../../services/HomeService';
import RestaurantDetailPage from '../explore/components/RestaurantDetailPage';
import { useSearchParams } from 'react-router-dom';

// --- SVG Icon Components ---
const ChevronLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// --- Carousel Component ---
const Carousel = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState((searchParams.get('restaurantId')) || null);
  const isDetailOpen = selectedRestaurantId;

  // State for swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Minimum distance for a swipe to be registered

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
    const fetchCarouselData = async () => {
      try {
        setLoading(true);
        const response = await getRestaurants();
        const formattedSlides = response.data.slice(0,3).map(restaurant => ({
          id: restaurant.id,
          imageUrl: restaurant.restaurant_cover_image || exploreImage, // Fallback image
          tag: restaurant.restaurant_region || "Unknown Location",
          title: restaurant.restaurant_name || "Untitled Restaurant",
          description: restaurant.restaurant_description || "No description available.",
          subDescription: restaurant.subDescription || ""
        }));
        setSlides(formattedSlides);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch restaurants:", err);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // --- Swipe Handlers ---
  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };


  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  if (slides.length === 0) {
    return <div className="text-center p-10">No restaurants to display.</div>;
  }

  return (
    <div className="w-5/6 mx-auto p-2 md:p-4">
      <div
        className="relative group rounded-2xl overflow-hidden z-9"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Carousel Image and Gradient */}
        <div
          style={{
            backgroundImage: `url(${
              slides[currentIndex].imageUrl.startsWith('http')
                ? slides[currentIndex].imageUrl
                : `${import.meta.env.VITE_STORAGE_BASE_URL}/${slides[currentIndex].imageUrl}`
            })`,
          }}
          className="w-full h-[300px] md:h-[450px] lg:h-[538px] bg-center bg-cover duration-500 ease-in-out transform"
        >
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C5B91]/90 from-8% via-transparent to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white duration-500 ease-in-out transform hover:bg-[#0C5B91]/40 cursor-pointer"  onClick={() => setSelectedRestaurantId(slides[currentIndex].id)}>
          {/* Top Tag */}
          <div className="self-start">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/50">
              {slides[currentIndex].tag}
            </span>
          </div>

            {/* Bottom Text */}
            <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-1">{slides[currentIndex].title}</h2>
            <p className="hidden md:block text-sm md:text-base" dangerouslySetInnerHTML={{
                __html: slides[currentIndex].description.length > 300
                ? slides[currentIndex].description.substring(0, 300) + "..."
                : slides[currentIndex].description
              }}></p>
            <p className="block md:hidden text-sm md:text-base" dangerouslySetInnerHTML={{
                __html: slides[currentIndex].description.length > 50
                ? slides[currentIndex].description.substring(0, 50) + "..."
                : slides[currentIndex].description
              }}></p>
            <p className="text-xs md:text-sm text-gray-300">{slides[currentIndex].subDescription}</p>
            </div>
          </div>

          {/* Left Arrow */}
          <div className="hidden md:group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ChevronLeftIcon onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className="hidden md:group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ChevronRightIcon onClick={nextSlide} size={30} />
          </div>

          {/* Dot Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`cursor-pointer h-2 w-2 rounded-full ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'}`}
            ></div>
          ))}
        </div>
      </div>
      {selectedRestaurantId && (
        <RestaurantDetailPage restaurantId={selectedRestaurantId} onClose={() => setSelectedRestaurantId(null)} />
     )}
    </div>
  );
};

export default Carousel;