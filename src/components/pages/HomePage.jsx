import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import Hero from '../common/Hero';
import Map from '../common/Map';
import Explore from '../common/Explore';
import Culture from '../common/Culture';
import EventsSection from '../common/Event';
import JoinSection from '../common/Join';
import Maps from '../common/maps/maps';

function HomePage() {

  return (
    <MainLayout>
      <Hero />
      <Map/>
      <Explore/>
      <EventsSection/> 
      <JoinSection/>
    </MainLayout>
  );
}

export default HomePage;

{/* <Map/>
      <Explore/>
      <Culture/>
      <EventsSection/> */}