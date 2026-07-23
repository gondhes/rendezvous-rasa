import React from 'react';
import Card from '../../common/carousel/Card';

import culture1 from '../../../assets/img/culture/culture1.jpg';
import culture2 from '../../../assets/img/culture/culture2.jpg';
import culture3 from '../../../assets/img/culture/culture3.jpg';

import Marquee from '../marquee/Marquee'
import logo1 from '../../../assets/logo-rendezvous.png'
import logo2 from '../../../assets/img/partners/logo2.png'
import logo3 from '../../../assets/img/partners/logo3.png'
import logo4 from '../../../assets/img/partners/logo4.png'
import logo5 from '../../../assets/img/partners/logo5.png'
import logo6 from '../../../assets/img/partners/logo6.png'

const images = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6
];

function Recommended() {
    // --- Card Data ---
    const cardData = [
        {
            imageUrl: culture1,
            category: "Discussions",
            title: "Cultural Programs",
        },
        {
            imageUrl: culture2,
            category: "Cooking Demo",
            title: "Culinary Workshop",
        },
        {
            imageUrl: culture3,
            category: "Workshops",
            title: "Hands-On Experience",
        }
    ];

    return (
        <section className="overflow-hidden mt-20">
            <div className="header-wrapper mx-5 md:mx-20 z-10">
                <div className="title-wrapper flex justify-between z-10">
                    <h2 className="text-[#3D3D3D] text-2xl md:text-[40px] font-bold z-10" style={{ fontFamily: 'Marianne' }}>Recommended for you</h2>
                    <a href='/exploreSearch?category=EVENT' className="bg-[#E0EDF9] px-4 md:px-8 py-0 rounded-full text-[#3558A2] flex flex-row items-center hover:underline underline-offset-1 z-10">
                        More
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
                <p className="relative mt-2 ml-1 text-[#7C7C7C] text-[15px] md:text-[20px] font-light z-10" style={{ fontFamily: 'Marianne' }}>A cultural and culinary exploration of French food artistry within Indonesia.</p>
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

            {/* <div className="marquee-wrapper mt-[170px]">
                <h2 className="text-2xl text-[#3D3D3D] font-bold text-center">Sponsored By</h2>
                <Marquee img={images} className="mt-[170px]" />
                <center>
                    <div className="line h-0.5 w-5/6 bg-[#525252] mt-[170px] mb-10"></div>
                </center>
            </div> */}
        </section>
    );
}


export default Recommended;