import React, { useEffect, useRef, useState } from "react";
import heroBgImage from "../../assets/hero-bg.png";
import heroIcon from "../../assets/hero-icon.png"; // Assuming you have an icon for the hero section
import heroTitle from "../../assets/hero-title.svg"; // Assuming you have a title image
import styles from "../../assets/styles/Hero.module.css";
import Marque from "./marquee/Marquee";
import mockBuku from "../../assets/mock-buku.png";
import ornament2 from "../../assets/ornament/ornament2.png"; // Assuming you have an ornament image

import logo1 from "../../assets/logo-rendezvous.png";
import logo2 from "../../assets/img/partners/logo2.png";
import logo3 from "../../assets/img/partners/logo3.png";
import logo4 from "../../assets/img/partners/logo4.png";
import logo5 from "../../assets/img/partners/logo5.png";
import logo6 from "../../assets/img/partners/logo6.png";

const images = [logo1, logo2, logo3, logo4, logo5, logo6];

const RestaurantIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      opacity="0.2"
      d="M15.625 5.625L10 11.25L4.375 5.625H15.625Z"
      fill="#202E4B"
    />
    <path
      d="M18.5672 3.56719C18.6547 3.47978 18.7143 3.36837 18.7385 3.24707C18.7626 3.12576 18.7502 3.00002 18.7029 2.88576C18.6555 2.77149 18.5754 2.67384 18.4725 2.60517C18.3696 2.53651 18.2487 2.4999 18.125 2.5H1.875C1.75132 2.4999 1.63038 2.53651 1.52751 2.60517C1.42464 2.67384 1.34446 2.77149 1.29711 2.88576C1.24977 3.00002 1.23739 3.12576 1.26154 3.24707C1.2857 3.36837 1.34531 3.47978 1.43281 3.56719L9.375 11.5086V16.25H6.875C6.70924 16.25 6.55027 16.3158 6.43306 16.4331C6.31585 16.5503 6.25 16.7092 6.25 16.875C6.25 17.0408 6.31585 17.1997 6.43306 17.3169C6.55027 17.4342 6.70924 17.5 6.875 17.5H13.125C13.2908 17.5 13.4497 17.4342 13.5669 17.3169C13.6842 17.1997 13.75 17.0408 13.75 16.875C13.75 16.7092 13.6842 16.5503 13.5669 16.4331C13.4497 16.3158 13.2908 16.25 13.125 16.25H10.625V11.5086L18.5672 3.56719ZM5.88359 6.25H14.1164L10 10.3664L5.88359 6.25ZM16.6164 3.75L15.3664 5H4.63359L3.38359 3.75H16.6164Z"
      fill="#202E4B"
    />
  </svg>
);

const EventIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      opacity="0.2"
      d="M14.0625 9C14.0624 9.51869 14.2415 10.0215 14.5695 10.4233C14.8975 10.8251 15.3543 11.1013 15.8625 11.205C15.9894 11.2309 16.1035 11.2998 16.1855 11.4002C16.2675 11.5005 16.3124 11.626 16.3125 11.7555V13.5C16.3125 13.6492 16.2532 13.7923 16.1477 13.8977C16.0423 14.0032 15.8992 14.0625 15.75 14.0625H6.75V3.9375H15.75C15.8992 3.9375 16.0423 3.99676 16.1477 4.10225C16.2532 4.20774 16.3125 4.35082 16.3125 4.5V6.24445C16.3124 6.37401 16.2675 6.49954 16.1855 6.59985C16.1035 6.70016 15.9894 6.76909 15.8625 6.795C15.3543 6.89874 14.8975 7.17488 14.5695 7.57669C14.2415 7.97851 14.0624 8.48131 14.0625 9Z"
      fill="#202E4B"
    />
    <path
      d="M15.9743 7.34625C16.2284 7.29455 16.4569 7.15664 16.621 6.95587C16.7851 6.75509 16.8749 6.50378 16.875 6.24445V4.5C16.875 4.20163 16.7565 3.91548 16.5455 3.7045C16.3345 3.49353 16.0484 3.375 15.75 3.375H2.25C1.95163 3.375 1.66549 3.49353 1.45451 3.7045C1.24353 3.91548 1.125 4.20163 1.125 4.5V6.24445C1.12514 6.50378 1.21487 6.75509 1.379 6.95587C1.54313 7.15664 1.77159 7.29455 2.02571 7.34625C2.40568 7.42505 2.74688 7.6324 2.99184 7.93337C3.2368 8.23434 3.37054 8.61054 3.37054 8.99859C3.37054 9.38665 3.2368 9.76285 2.99184 10.0638C2.74688 10.3648 2.40568 10.5721 2.02571 10.6509C1.77111 10.7027 1.5423 10.8411 1.37811 11.0424C1.21393 11.2438 1.1245 11.4957 1.125 11.7555V13.5C1.125 13.7984 1.24353 14.0845 1.45451 14.2955C1.66549 14.5065 1.95163 14.625 2.25 14.625H15.75C16.0484 14.625 16.3345 14.5065 16.5455 14.2955C16.7565 14.0845 16.875 13.7984 16.875 13.5V11.7555C16.8749 11.4962 16.7851 11.2449 16.621 11.0441C16.4569 10.8434 16.2284 10.7055 15.9743 10.6538C15.5943 10.575 15.2531 10.3676 15.0082 10.0666C14.7632 9.76566 14.6295 9.38946 14.6295 9.00141C14.6295 8.61335 14.7632 8.23715 15.0082 7.93618C15.2531 7.63521 15.5943 7.42786 15.9743 7.34906V7.34625ZM2.25 11.7562C2.88541 11.6268 3.45657 11.2818 3.86679 10.7796C4.27702 10.2774 4.50109 9.64881 4.50109 9.00035C4.50109 8.35189 4.27702 7.72335 3.86679 7.22114C3.45657 6.71893 2.88541 6.37389 2.25 6.24445V4.5H6.1875V13.5H2.25V11.7562ZM15.75 11.7562V13.5H7.3125V4.5H15.75V6.24375C15.1146 6.37319 14.5434 6.71822 14.1332 7.22044C13.723 7.72265 13.4989 8.35119 13.4989 8.99965C13.4989 9.64811 13.723 10.2766 14.1332 10.7789C14.5434 11.2811 15.1146 11.6261 15.75 11.7555V11.7562Z"
      fill="#202E4B"
    />
  </svg>
);

const Hero = () => {
  const [type, setType] = useState("RESTAURANT");
  const [openType, setOpenType] = useState(false);
  const typeRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const onDocClick = (e) => {
      if (typeRef.current && !typeRef.current.contains(e.target))
        setOpenType(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="relative isolate w-full px-6 pt-14 lg:px-8 overflow-hidden h-fit">
      {/* REFINEMENT: z-index on the child is not needed if the parent is already -1 */}
      <div className="absolute flex justify-center -mt-15 z-[-1]">
        <img
          src={heroBgImage}
          alt="Hero Background"
          className="opacity-0 md:opacity-100 max-w-full h-auto"
        />
      </div>

      {/* REFINEMENT: z-index on the child is not needed */}
      {/* <div className="absolute inset-0 flex items-center justify-center md:-mt-50 z-[-1]">
        <img
          src={heroIcon}
          alt="Hero Background"
          className="max-w-xs sm:max-w-sm opacity-100"
        />
      </div> */}

      {/* This is one of the elements causing overflow */}
      <div className="absolute -top-40 -right-40 z-[-1]">
        <svg
          width="738"
          height="699"
          viewBox="0 0 738 699"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_530_119934)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M409.161 245.806C377.42 238.434 356.582 192.947 325.095 201.279C293.701 209.586 298.018 256.964 276.901 280.803C256.346 304.006 215.301 308.612 204.598 337.303C193.764 366.347 208.123 398.795 222.622 426.316C236.662 452.967 256.929 477.86 285.187 490.273C311.874 501.996 342.077 491.376 371.418 491.679C400.846 491.983 433.3 507.571 457.918 492.055C482.548 476.533 479.155 441.019 492.134 415.599C505.467 389.485 531.307 369.623 535.161 340.77C539.552 307.902 541.992 265.789 514.875 245.352C486.569 224.018 444.121 253.924 409.161 245.806Z"
              fill="#BDCDFF"
              fill-opacity="0.69"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_530_119934"
              x="0.803711"
              y="0.26416"
              width="737.076"
              height="698.657"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_530_119934"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* This is the other element causing overflow */}
      <div className="absolute top-50 -left-25 z-[-1]">
        <img src={ornament2} alt="ornament-2" />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl py-24 sm:py-32 lg:py-40">
        <div className="text-center pt-20">
          <center>
            <img className="w-3xl" src={logo1} alt="hero-title" />
          </center>
        </div>

        {/* Search Bar */}
        <div className="mt-16 flex flex-wrap lg:flex-nowrap lg:flex-grow justify-center gap-x-2 gap-y-20 md:gap-y-0 bg-white-1 border border-[#F2F2F2] md:border-0 md:bg-white p-7 rounded-4xl md:rounded-full shadow-2xl/20">
          <div className="flex flex-wrap w-full items-center gap-x-2 gap-y-5 rounded-full bg-white shadow-lg ring-1 ring-gray-900/10 h-15">
            {/* Filter */}
            <div ref={typeRef} className="relative h-full w-full md:w-fit">
              <button
                type="button"
                onClick={() => setOpenType((o) => !o)}
                className="flex items-center border-0 md:border-r md:border-gray-200 px-4 gap-x-2 h-full w-full md:w-fit justify-between"
                aria-haspopup="listbox"
                aria-expanded={openType}
                ref={typeRef}
              >
                {/* Filter Icon and Text */}
                {type === "RESTAURANT" ? <RestaurantIcon /> : <EventIcon />}

                <span className="text-sm font-semibold text-gray-700">
                  {type}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M19.92 8.95001L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.07999 8.95001"
                    stroke="#7C7C7C"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {openType && (
                <div className="absolute left-0 top-full z-20 mt-1 w-full md:w-48 rounded-md border border-gray-200 bg-white shadow-lg">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.58333 18.125C4.875 18.125 1.04167 14.2917 1.04167 9.58332C1.04167 4.87499 4.875 1.04166 9.58333 1.04166C14.2917 1.04166 18.125 4.87499 18.125 9.58332C18.125 14.2917 14.2917 18.125 9.58333 18.125ZM9.58333 2.29166C5.55833 2.29166 2.29167 5.56666 2.29167 9.58332C2.29167 13.6 5.55833 16.875 9.58333 16.875C13.6083 16.875 16.875 13.6 16.875 9.58332C16.875 5.56666 13.6083 2.29166 9.58333 2.29166Z"
                  fill="#292D32"
                />
                <path
                  d="M18.3333 18.9583C18.175 18.9583 18.0167 18.9 17.8917 18.775L16.225 17.1083C15.9833 16.8667 15.9833 16.4667 16.225 16.225C16.4667 15.9833 16.8667 15.9833 17.1083 16.225L18.775 17.8917C19.0167 18.1333 19.0167 18.5333 18.775 18.775C18.65 18.9 18.4917 18.9583 18.3333 18.9583Z"
                  fill="#292D32"
                />
              </svg>
              {/* REFINEMENT: Replaced inline style with a class */}
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
            href={`/exploreSearch?category=${type}${searchTerm ? `&search=${searchTerm}` : ""}`}
            type="button"
            className="flex items-center gap-x-1 w-full justify-center md:w-fit border-2 border-white/30 rounded-full bg-[#3558A2] mt-5 md:mt-0 lg:mt-0 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-linear-to-r from-[#3558A2] to-[#633B57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Search
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_1847_2245)">
                <path
                  d="M5.83301 14.1666L14.1663 5.83331M14.1663 5.83331H5.83301M14.1663 5.83331V14.1666"
                  stroke="#F9FAFB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1847_2245">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
      {/* <Marque img={images} /> */}
      {/* <div className="flex justify-center h-[163px] mt-[176px] mx-[100px] rounded-2xl mb-5 bg-linear-to-r from-[#0C5B9100] to-[#0C5B91] items-center shadow-md" style={imgBackground(mockBuku)} >
        <div className="text-wrapper text-center ">
          <p className="text-[20px] text-[#F1F7FD]" style={{ fontFamily: 'Marianne' }}>Get the latest news on our</p>
          <p className="text-[40px]" style={{
            color: '#F1F7FD',
            fontFamily: "DM Serif Text",
            fontStyle: 'italic'
          }}>Program Book!</p>
          <center>
            <button className="btn-wrapper flex flex-row bg-white w-min mt-2 rounded-full px-5 py-2">
              <p>
                Download
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
            </button>
          </center>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
