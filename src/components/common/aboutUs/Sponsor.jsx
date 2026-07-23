import React from "react";
import Marquee from "../marquee/Marquee";

import logo1 from '../../../assets/img/partners/logo7.png'
import logo2 from '../../../assets/img/partners/logo8.png'
import logo3 from '../../../assets/img/partners/logo9.png'
import logo4 from '../../../assets/img/partners/logo10.png'
import logo5 from '../../../assets/img/partners/logo7.png'
import logo6 from '../../../assets/img/partners/logo8.png'

const images = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6
];

export default function Sponsor({ isHidden }) {
    return (
        <div className="marquee-wrapper mt-10 mb-50 md:mb-0 ">
            <h2 className={isHidden ? "hidden" : "text-2xl text-[#3D3D3D] font-bold text-center"}>
            Sponsored By
            </h2>
            <Marquee img={images} className="mt-10" />
        </div>
    );
}