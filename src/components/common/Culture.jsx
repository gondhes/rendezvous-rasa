import React from 'react';
import styles from '../../assets/styles/Culture.module.css'; // Ensure this file exists and contains the necessary styles
import Card from './carousel/Card';
import culture1 from '../../assets/img/culture/culture1.jpg';
import culture2 from '../../assets/img/culture/culture2.jpg';
import culture3 from '../../assets/img/culture/culture3.jpg';

const CultureSection = () => {

  // --- Card Data ---
  const cardData = [
    {
      imageUrl: culture1,
      category: "Talks",
      title: "Cultural Programs",
    },
    {
      imageUrl: culture2,
      category: "Demo",
      title: "Culinary Workshop",
    },
    {
      imageUrl: culture3,
      category: "Workshop",
      title: "Hands-On Experience",
    }
  ];

  return (
    <section className="-mt-[270px] overflow-hidden">
      <div className="relative size-120 -left-10 top-20">
        <svg width="560" height="945" viewBox="0 0 560 945" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_1727_664)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M53.2528 641.597C110.914 660.464 138.748 757.56 197.786 743.16C255.965 728.969 243.847 640.332 270.471 588.614C288.905 552.806 317.349 524.152 330.105 486.127C344.867 442.126 373.945 391.677 349.991 351.589C325.652 310.859 258.433 323.84 217.662 297.955C176.453 271.793 161.667 209.707 113.087 201.182C64.7848 192.706 22.9785 232.404 -19.3245 256.368C-63.0843 281.157 -130.42 295.144 -138.013 343.426C-146.256 395.836 -58.1159 423.771 -53.9631 476.626C-49.3157 535.777 -147.333 590.628 -114.639 640.935C-84.3706 687.507 -0.82213 623.904 53.2528 641.597Z" fill="#CCD7F9" />
          </g>
          <defs>
            <filter id="filter0_f_1727_664" x="-338.557" y="0.0156555" width="897.68" height="944.595" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1727_664" />
            </filter>
          </defs>
        </svg>

      </div>

      <div className="header-wrapper mx-20 z-10">
        <div className="title-wrapper flex justify-between z-10">
          <h2 className="text-[#3D3D3D] text-5xl font-bold z-10" style={{ fontFamily: 'Marianne' }}>Experience the Culture</h2>
          <button className="bg-[#E0EDF9] px-8 py-0 rounded-full text-[#3558A2] flex flex-row items-center hover:underline underline-offset-1 z-10">
            More
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <p className="relative mt-2 ml-1 text-[#7C7C7C] text-[20px] font-light z-10" style={{ fontFamily: 'Marianne'}}>A cultural and culinary exploration of French food artistry within Indonesia.</p>
      </div>
      <center>
        <div className="w-5/6 mt-5 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <Card key={index} imageUrl={card.imageUrl} category={card.category} title={card.title} />
            ))}
          </div>
        </div>
      </center>
    </section>
  );
};

export default CultureSection;