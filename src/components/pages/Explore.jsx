import React from 'react';
import MainLayout from '../layout/MainLayout';
import Hero from '../common/explore/hero';
import Region from '../common/explore/Region';
import Recommended from '../common/explore/Recommended';
import JoinSection from '../common/Join';

function Explore() {
    return (
        <MainLayout>
            <Hero/>
            <Region/>
            <Recommended/>
            <JoinSection/>
        </MainLayout>
    );
}

export default Explore;