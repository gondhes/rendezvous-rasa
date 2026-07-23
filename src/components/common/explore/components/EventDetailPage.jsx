import React, { useState, useEffect } from 'react';
import Loader from '../components/loader';
import eventImage from '../../../../assets/img/events/event1.jpg'
import { getEvents } from '../../../../services/HomeService';

const formatPrice = (price) => {
    return `IDR ${new Intl.NumberFormat('id-ID').format(price)}`;
};

// Function to format date and time
const formatDate = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    return `${startDate} - ${endDate}`;
};

const formatTime = (startTime, endTime) => {
    if (!startTime || !endTime) return '';

    // Convert 24-hour format to 12-hour with WIB timezone
    const formatTimeString = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        return `${hours}:${minutes} WIB`;
    };

    return `${formatTimeString(startTime)} - ${formatTimeString(endTime)} (GMT+7)`;
};

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

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M7.5 17L17.5 7M17.5 7H7.5M17.5 7V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

// --- Event Detail Component ---
const EventDetailPage = ({ eventId, onClose }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 500); // Match CSS transition duration
    };

    useEffect(() => {
        if (!eventId) return;

        // Add the restaurant ID to the URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('eventId', eventId);
        window.history.pushState({ eventId }, '', newUrl);

        // Handle the browser's back button
        const handlePopState = (event) => {
            handleClose();
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup function to run when the component unmounts
        return () => {
            window.removeEventListener('popstate', handlePopState);
            // Check if the current URL still has the ID and go back if it does
            if (window.location.search.includes(`eventId=${eventId}`)) {
                const cleanUrl = new URL(window.location.href);
                cleanUrl.searchParams.delete('eventId');
                // Use replaceState to remove the ID without adding a new history entry
                window.history.replaceState(null, '', cleanUrl);
            }
        };
    }, [eventId, handleClose]);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                setLoading(true);
                const response = await getEvents(eventId);

                if (response.success) {
                    const apiData = response.data;

                    // Map API response to mockEventData structure
                    const mappedData = {
                        name: apiData.activityName || '',
                        category: 'EVENT',
                        coverImage: apiData.coverImageUrl,
                        activityType: apiData.activities && apiData.activities.length > 0
                            ? apiData.activities.map(a => a.name).join(', ')
                            : '',
                        date: formatDate(
                            apiData.eventDates?.[0]?.startDate,
                            apiData.eventDates?.[0]?.endDate
                        ),
                        time: formatTime(
                            apiData.eventDates?.[0]?.startTime,
                            apiData.eventDates?.[0]?.endTime
                        ),
                        address: {
                            text: apiData.locations?.[0]?.location_name || 'Location not specified',
                            link: '#'
                        },
                        overview: apiData.description || '',
                        institution: apiData.institutionName || '',
                        website: {
                            text: apiData.registrationLink || '#',
                            link: apiData.registrationLink || '#'
                        },
                        ticket: {
                            price: apiData.ticketPrice ? `${formatPrice(apiData.ticketPrice)}` : 'Free',
                            link: apiData.registrationLink || '#'
                        },
                        instructor: {
                            name: apiData.performers || 'Not specified',
                            imageUrl: apiData.galleryImages
                                ? `${import.meta.env.VITE_STORAGE_BASE_URL}/${apiData.galleryImages}`
                                : 'https://placehold.co/600x400/e5e7eb/4b5563?text=Instructor'
                        }
                    };

                    setEvent(mappedData);
                } else {
                    setError('Failed to fetch event details');
                }
            } catch (err) {
                console.error('Error fetching event details:', err);
                handleClose();
                // setError('An error occurred while fetching event details');
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchEventDetail();
        }
    }, [eventId]);

    const InfoRow = ({ label, children }) => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8">
            <div className="md:col-span-1 font-medium text-gray-500 uppercase tracking-wider">
                <p>{label}</p>
            </div>
            <div className="md:col-span-3 text-gray-800 font-medium">
                {children}
            </div>
        </div>
    );

    if (loading) return <div className="fixed inset-0 bg-white z-50 flex justify-center items-center"><Loader /></div>;
    if (error) return <div className="fixed inset-0 bg-white z-50 flex justify-center items-center text-red-500">{error}</div>;
    if (!event) return null;

    return (
        <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-500 ease-in-out overflow-y-auto ${isVisible && !isClosing ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="relative scrollbar-hide bg-contain bg-center w-full h-full mb-5 md:mb-0" style={{ backgroundImage: `url(${event.coverImage})` }}>

            </div>
            <div className="relative z-99 -mt-10 main rounded-3xl bg-white scrollbar-hide">
                <div className="mx-5 md:mx-20 p-4 sm:p-6 lg:p-8">
                    <header className="flex justify-between items-center md:item-start gap-x-5 md:gap-x-0 mb-10">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">{event.name}</h1>
                            <div className="flex items-center gap-2 pt-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">{event.category}</span>
                            </div>
                        </div>
                        <button onClick={handleClose} className="bg-white shadow-lg hover:bg-gray-200 text-gray-600 rounded-full p-2 transition-colors">
                            <CloseIcon />
                        </button>
                    </header>

                    <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <section className="space-y-4 text-sm">
                                <InfoRow label="Activity Type">{event.activityType}</InfoRow>
                                <InfoRow label="Date">{event.date}</InfoRow>
                                <InfoRow label="Time">{event.time}</InfoRow>
                                <InfoRow label="Address">
                                    <a href={event.address.link} className="text-blue-600 hover:underline">{event.address.text}</a>
                                </InfoRow>
                                <InfoRow label="Overview">
                                    <p className="text-gray-700 leading-relaxed font-normal" dangerouslySetInnerHTML={{
                                        __html: event.overview
                                    }}></p>
                                </InfoRow>
                                <InfoRow label="Institution">{event.institution}</InfoRow>
                                <InfoRow label="Website">
                                    <a href={event.website.link} className="text-blue-600 hover:underline flex items-center gap-1">
                                        <span>{event.website.text}</span>
                                        <LinkIcon />
                                    </a>
                                </InfoRow>
                            </section>
                        </div>

                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl border border-black/10 p-6 sticky top-8">
                                <div className="bg-blue-100/50 rounded-xl flex flex-col gap-y-5 p-4 mb-4">
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-sm text-[#202E4B]">Ticket Price</p>
                                        <p className="text-2xl font-bold text-[#3558A2]">{event.ticket.price}</p>
                                    </div>
                                    <a href={event.ticket.link} className="w-full bg-[#3558A2] text-white font-bold py-3 px-5 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                        <span>Register Now</span>
                                        <ArrowRightIcon />
                                    </a>
                                </div>

                                <div className="mt-6">
                                    <div className="aspect-w-16 aspect-h-10 rounded-lg overflow-hidden mb-4">
                                        <img src={event.instructor.imageUrl} alt={event.instructor.name} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm text-gray-500">Meet your instructor</p>
                                    <h3 className="text-xl font-bold text-gray-900">{event.instructor.name}</h3>
                                </div>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>

        </div>
    );
}

export default EventDetailPage;