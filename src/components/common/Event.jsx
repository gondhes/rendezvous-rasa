import React, { use, useEffect, useState } from 'react';
import styles from '../../assets/styles/Event.module.css';
import WorkshopCard from '../common/carousel/WorkshopCard';
import Marquee from './marquee/Marquee';
import { getEvents } from '../../services/HomeService';
import eventLogo from '../../assets/img/events/event1.jpg';
import EventDetailPage from './explore/components/EventDetailPage';
import { useSearchParams } from 'react-router-dom';

import logo1 from '../../assets/img/partners/logo7.png'
import logo2 from '../../assets/img/partners/logo8.png'
import logo3 from '../../assets/img/partners/logo9.png'
import logo4 from '../../assets/img/partners/logo10.png'
import logo5 from '../../assets/img/partners/logo7.png'
import logo6 from '../../assets/img/partners/logo8.png'

const images = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6
];

const EventsSection = () => {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const [selectedEventId, setSelectedEventId] = useState((searchParams.get('eventId')) || null);
  const isDetailOpen = selectedEventId;

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
    // Fetch events data from the server
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();

        const formattedEvents = response.data.map(event => ({
          id: event.id,
          imageUrl: event.coverImageUrl || eventLogo, // Fallback image
          title: event.activityName || "Untitled Event",
          date: event.eventDates[0].startDate || "No date available",

        }));
        setError(null);
        setEvents(formattedEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-10">{error}</div>;
  }

  return (
    <section className="-mt-[640px] md:-mt-[500px] overflow-x-hidden">
      <div className="sticky left-10 top-225">
        <svg width="738" height="699" viewBox="0 0 738 699" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_1727_654)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M329.018 453.128C360.781 460.416 381.747 505.848 413.211 497.434C444.582 489.044 440.13 441.678 461.179 417.784C481.668 394.526 522.7 389.814 533.321 361.095C544.073 332.021 529.621 299.611 515.045 272.128C500.929 245.514 480.591 220.675 452.299 208.336C425.578 196.683 395.405 207.382 366.064 207.156C336.635 206.93 304.137 191.427 279.563 207.007C254.977 222.594 258.471 258.099 245.564 283.553C232.305 309.701 206.521 329.632 202.749 358.494C198.452 391.373 196.132 433.493 223.306 453.859C251.672 475.119 294.035 445.101 329.018 453.128Z" fill="#BDCDFF" />
          </g>
          <defs>
            <filter id="filter0_f_1727_654" x="0.129883" y="0.071167" width="736.924" height="698.398" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1727_654" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative header-wrapper mx-8 md:mx-20 z-10" >
        <h2 className="text-[#3D3D3D] text-[18px] md:text-5xl md:text-5xl font-bold z-10" style={{ fontFamily: 'Marianne' }}>Upcoming Events</h2>
        <p className="mt-2 text-[#7C7C7C] ml-1 text-[12px] md:text-[20px] font-light" style={{ fontFamily: 'Marianne' }}>Save the date and join the celebration.</p>

        {events.length === 0 && (
          <center><div className="text-center p-10">No Events to display.</div></center>
        )}

        <div className="w-full mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((card, index) => (
              <WorkshopCard key={index} imageUrl={card.imageUrl} title={card.title} date={card.date} onClick={() => setSelectedEventId(card.id)}/>
            ))}
          </div>
        </div>

      </div>

      <div className="marquee-wrapper mt-[170px]">
        {/* <Marquee img={images} className="mt-[170px]" /> */}

        <center>
          {/* <div className="line h-0.5 w-5/6 bg-[#525252] mt-[170px] mb-10"></div> */}
        </center>


      </div>
        {selectedEventId && (
            <EventDetailPage eventId={selectedEventId} onClose={() => setSelectedEventId(null)} />
        )}
    </section>
  );
};

export default EventsSection;