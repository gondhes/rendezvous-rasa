import React from 'react';
import styles from '../../assets/styles/Join.module.css';
import Button from './button/Button';
import join from '../../assets/img/join/join1.jpg'

const JoinSection = () => {
  const ArrowRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
  );
  return (
    <section className="-mt-[840px] md:-mt-[790px]">
      <div className="relative left-0 top-0 flex justify-center -left-150 top-199">
        <svg width="921" height="899" viewBox="0 0 921 899" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_1727_648)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M644.581 452.23C651.744 391.99 741.477 345.63 715.75 290.571C690.398 236.315 605.869 265.604 549.924 249.657C511.189 238.615 477.501 216.354 437.709 211.314C391.662 205.482 336.479 186.879 301.881 218.239C266.729 250.101 292.673 313.459 275.308 358.518C257.756 404.061 199.787 430.751 200.979 480.058C202.164 529.082 249.308 562.276 281.122 599.047C314.032 637.084 340.985 700.359 389.819 698.322C442.829 696.11 452.892 604.204 503.901 589.753C560.987 573.579 634.04 658.911 676.939 616.975C716.654 578.151 637.863 508.725 644.581 452.23Z" fill="#BDCDFF" fill-opacity="0.53" />
          </g>
          <defs>
            <filter id="filter0_f_1727_648" x="0.960938" y="0.510986" width="919.412" height="897.859" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1727_648" />
            </filter>
          </defs>
        </svg>
      </div>

      <center>
        <div className="relative rounded-2xl overflow-hidden group w-5/6 h-[434px]">
          <img
            src={join}
            alt="Assortment of French pastries"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-500"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-12 md:p-20">
            <h2 className="text-3xl md:text-4xl font-bold">Join the Taste of France</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-200">
              Register now and be part of a unique French-Indonesian celebration.
            </p>
            <a href="/register" className="mt-8 px-6 py-3 border-1 bg-linear-to-r from-[#394A73] to-[#842F41] text-white font-bold rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
              REGISTER NOW!
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </center>

    </section>
  );
};

export default JoinSection;