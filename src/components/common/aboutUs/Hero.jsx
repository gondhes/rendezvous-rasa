import React from "react";
import heroImage from "../../../assets/aboutUs/hero-image.png";
import Marque from '../marquee/Marquee'
import logo1 from '../../../assets/logo-crp.jpeg'
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

function Hero() {
    
    return (
        <div className="min-h-[110vh] flex items-center justify-center p-4 font-marianne">
          <div className="w-full bg-white rounded-2xl mx-5 md:mx-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text Content */}
              <div className="flex flex-col justify-center text-center lg:text-left md:mt-15 lg:mt-0">
                <p className="text-black-400 font-regular mb-2 text-sm">
                  About Us
                </p>
                <h1 className="text-2xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Celebrating French <br /> Culinary Heritage,
                  {/* The word "Together" has a special gradient styling */}
                  <br />
                  <span className="bg-gradient-to-r from-[#3558A2] via-[#722E69] to-[#AE0330] text-transparent bg-clip-text">
                    Together.
                  </span>
                </h1>
                <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
                  Organized by the French Embassy, Institut français d'Indonésie, and various parties in Indonesia, the event is expected to showcase France's rich culinary heritage. In 2010, UNESCO decided to classify the "gastronomic meal of the French" as part of humanity's intangible cultural heritage.
                </p>
              </div>
    
              {/* Right Column: Image */}
              <div className="flex justify-center items-center -mt-5 md:mt-0">
                <img 
                  src={heroImage} 
                  alt="Chefs in a kitchen during a culinary event" 
                  className="rounded-2xl w-full h-auto object-cover "
                  // Fallback in case the image fails to load
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/4a5568?text=Culinary+Event'; }}
                />
              </div>
    
            </div>
            {/* <Marque img={images} /> */}
          </div>
         
        </div>
      );
}

export default Hero;