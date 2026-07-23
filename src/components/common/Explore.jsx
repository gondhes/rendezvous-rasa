import { useState, useEffect } from 'react';
import styles from '../../assets/styles/Explore.module.css';
import Button from './button/Button';
import React from 'react';
import Carousel from './carousel/Carousel';

const ExploreSection = () => {
  return (
    <section className="mt-[0px] md:mt-[170px] overflow-x-hidden">
      <div className="header-wrapper mx-8 md:mx-20">
        <div className="title-wrapper flex justify-between items-end">
        <h2 className="text-[#3D3D3D] text-[18px] md:text-5xl font-bold" style={{ fontFamily: 'Marianne' }}>Explore the Taste</h2>
        <a href='/explore' className="bg-transparent md:bg-[#E0EDF9] h-fit md:px-8 md:py-3 rounded-full text-[#3558A2] flex flex-row items-center hover:underline underline-offset-1">
          More
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
          </a>
        </div>
       
        <p className="mt-2 text-[#7C7C7C] ml-1 text-[12px] md:text-[20px] font-light" style={{ fontFamily: 'Marianne' }}>Let your palate travel — from French kitchens to Indonesian tables.</p>
      </div>
      <div className="flex items-center justify-center mt-4">
      <Carousel />
     </div>
    </section>
  );
};

export default ExploreSection;