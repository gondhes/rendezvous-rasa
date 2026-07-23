import React from 'react';
import MainLayout from '../layout/MainLayout';
import Hero from '../common/aboutUs/Hero';
import About from '../common/aboutUs/About';
import Programs from '../common/aboutUs/Programs';
import Story from '../common/aboutUs/Story';
import JoinSection from '../common/Join';
import Sponsor from '../common/aboutUs/Sponsor';
import Gallery from '../common/aboutUs/Gallery';

function AboutUs() {
    return (
        <MainLayout>
            <Hero />
            <About />
            <Programs />
            <Story />
            <Gallery />
            {/* <Sponsor isHidden={false}/> */}
            <JoinSection />
            {/* <Sponsor isHidden={true}/> */}
        </MainLayout>
    )
}

export default AboutUs;