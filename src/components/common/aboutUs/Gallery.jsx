import React from "react";
import { useState } from "react";
import galleryImage1 from "../../../assets/gallery/gallery1.jpg";
import galleryImage2 from "../../../assets/gallery/gallery2.jpg";
import galleryImage3 from "../../../assets/gallery/gallery3.jpg";
import galleryImage4 from "../../../assets/gallery/gallery4.jpg";
import galleryImage5 from "../../../assets/gallery/gallery5.jpg";
import galleryImage6 from "../../../assets/gallery/gallery6.jpg";
import galleryImage7 from "../../../assets/gallery/gallery7.jpg";
import Modal from "./components/Modal";
import galleryImg from "./model/GalleryItems";

// SVG component for the leaf ornament
const LeafOrnament = () => (
  <svg
    width="100"
    height="70"
    viewBox="0 0 121 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute bottom-0 right-0 text-red-200/60 hidden md:block"
  >
    <path d="M1 91C1 91 26.5 77 39.5 69.5C52.5 62 79.5 54.5 79.5 54.5" stroke="currentColor" strokeWidth="2" />
    <path d="M79.5 54.5C79.5 54.5 64 61.5 55 66C46 70.5 28.5 77.5 28.5 77.5" stroke="currentColor" strokeWidth="2" />
    <path d="M120 1C120 1 94.5 15 81.5 22.5C68.5 30 41.5 37.5 41.5 37.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M41.5 37.5C41.5 37.5 57 30.5 66 26C75 21.5 92.5 14.5 92.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Component for a single gallery image
const GalleryImage = ({ src, alt, className = "" }) => (
  <div className={`w-full h-full overflow-hidden rounded-2xl shadow-lg ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=Image'; }}
    />
  </div>
);

export default function Gallery() {
  const galleryItems = [
    { src: galleryImage6, alt: 'Chefs cooking in a professional kitchen', className: 'md:row-span-1' },
    { src: galleryImage2, alt: 'Chef giving a cooking demonstration', className: 'md:row-span-2' },
    { src: galleryImage3, alt: 'Students learning to prepare food', className: 'md:row-span-1' },
    { src: galleryImage4, alt: 'Large audience at an event', className: 'md:row-span-1' },
    { src: galleryImage5, alt: 'Man giving a presentation on stage', className: 'md:row-span-1' },
    { src: galleryImage1, alt: 'Conference hall with seated guests', className: 'md:col-span-2' },
    { src: galleryImage7, alt: 'Panel discussion on stage', className: 'md:col-span-1' }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialImages = galleryItems.slice(0, 5);

  return (
    // Main container with a light gradient background
    <>
      <div className="bg-gradient-to-br from-blue-20 to-purple-20 min-h-screen w-full flex items-center justify-center p-4 sm:p-8 font-marianne relative overflow-hidden">
        <div className="w-full mx-5 md:mx-20">

          {/* Header Text */}
          <div className="mb-8 md:mb-12 text-left relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Gallery
            </h2>
            <p className="mt-2 text-gray-500">
              A glimpse into the beauty of our past editions.
            </p>
          </div>

          {/* Responsive Image Grid */}
          <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item, index) => (
              <GalleryImage key={index} src={item.src} alt={item.alt} className={item.className} />
            ))}
            <LeafOrnament />
          </div>

          {/* Show All Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-transparent mb-2 hover:mb-3 hover:ease-in-out border-2 border-black hover:border-0 px-4 py-2.5 text-sm font-semibold text-black hover:text-white shadow-sm hover:bg-[#3558A2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Load All Images
            </button>
          </div>
        </div>
      </div>

      {/* Modal for all images */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
          Full Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImg.map((item, index) => (
            <GalleryImage key={index} src={item.src} alt={item.alt} />
          ))}
        </div>
      </Modal>
    </>

  );
}