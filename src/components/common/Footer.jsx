import React from 'react';
import styles from '../../assets/styles/Footer.module.css';

import logo1 from '../../assets/logo-crp.jpeg'
import logo2 from '../../assets/img/partners/logo2.png'
import logo3 from '../../assets/img/partners/logo3.png'
import logo4 from '../../assets/img/partners/logo4.png'
import logo5 from '../../assets/img/partners/logo5.png'
import logo6 from '../../assets/img/partners/logo6.png'


const Footer = () => {
  const footerLinks = {
    Navigation: [
        { name: "Home", href: "/" },
        { name: "Explore", href: "/explore" },
        { name: "Restaurant", href: "/exploreSearch?category=RESTAURANT" },
    ],
    About: [
        { name: "Programs", href: "#" },
        { name: "Discover", href: "#" },
        { name: "Join Now", href: "/register" },
    ],
    "Follow Us": [
        { name: "Instagram", href: "https://www.instagram.com/ifi_indonesia/" },
        { name: "Facebook", href: "https://www.facebook.com/IFI.Indonesia/" },
        { name: "Contact Us", href: "#" },
    ],
};

const logos = [
    { alt: "Logo 1", src: logo1 },
    { alt: "Logo 2", src: logo2 },
    { alt: "Logo 3", src: logo3 },
    { alt: "Logo 4", src: logo4 },
];

return (
    <footer className="w-full bg-white mt-[170px] inset-shadow-sm rounded-4xl border-t-4 border-[#E0EDF9] overflow-x-hidden">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between gap-8">
                {/* Logos Section */}
                <div className="w-full lg:w-1/2 flex flex-wrap items-center gap-6">
                   {logos.map((logo, index) => (
                       <img key={index} src={logo.src} alt={logo.alt} className="h-10 object-contain"/>
                   ))}
                </div>

                {/* Links Section */}
                <div className="w-full lg:w-auto flex flex-wrap justify-between lg:justify-end gap-8 sm:gap-16 z-1">
                    {Object.keys(footerLinks).map((key) => (
                        <div key={key}>
                            <h3 className="text-sm font-bold text-[#3558A2] tracking-wider text-[20px]">{key}</h3>
                            <ul className="mt-4 space-y-2">
                                {footerLinks[key].map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="text-base font-regular text-[#3558A2] text-[16px] cursor-pointer">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-25 pt-8 border-gray-200 text-center">
                <p className="text-sm text-[#3558A2]">
                    Institut français d'Indonésie, Jl. M.H. Thamrin No.20, Jakarta 10350, Copyright © 2025 Citarasaprancis.com
                </p>
            </div>
        </div>
    </footer>
);
};

export default Footer;