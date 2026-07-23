import React from 'react';
import logo1 from '../../../assets/img/partners/logo1.png'
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

const Marquee = ({img}) => {
    // The key to the seamless loop is to duplicate the content.
    // The animation moves the container from its start to the end of the first set of images.
    // Once it reaches the end, it instantly resets to the beginning, and since the second
    // set of images is identical, the transition is invisible to the user.
    const marqueeContent = [...img, ...img];
  
    return (
      <div className="relative w-full overflow-hidden py-8 mt-8">
        <div className="absolute inset-0 z-10" style={{
    
        }}></div>
        <div className="flex animate-marquee">
          {marqueeContent.map((src, index) => (
            <div key={index} className="flex-shrink-0 mx-6 flex items-center justify-center">
              <img 
                src={src} 
                alt={`Logo ${index % images.length + 1}`} 
                className="max-h-15 w-auto object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x100/CCCCCC/FFFFFF?text=Error'; }}
              />
            </div>
          ))}
        </div>
        {/* To add the animation, you need to define it in your tailwind.config.js or a global CSS file.
            Since we can't edit tailwind.config.js here, we'll use a <style> tag.
            In a real project, add this to your `tailwind.config.js` for better practice.
        */}
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
          `}
        </style>
      </div>
    );
  };

  export default Marquee;