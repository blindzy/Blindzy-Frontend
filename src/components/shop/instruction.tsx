import React, { useEffect , useState } from "react";

function Instruction() {

    const data = [ 
        {
            icon: '/images/icon/box-sm.png',
            alt: 'Box',
            title: 'Free Delivery',
            desc: 'Phasellus lectus sit felis nascetu ante imperdiet semper leo.'
        },
        {
            icon: '/images/icon/guarantee-sm.png',
            alt: 'guarantee',
            title: '10 Years Warranty',
            desc: 'Phasellus lectus sit felis nascetu ante imperdiet semper leo.'
        },
        {
            icon: '/images/icon/australia-sm.png',
            alt: 'australia',
            title: 'Made in Australia',
            desc: 'Phasellus lectus sit felis nascetu ante imperdiet semper leo.'
        },
        {
            icon: '/images/icon/diy-sm.png',
            alt: 'diy',
            title: 'Install Yourself',
            desc: 'Phasellus lectus sit felis nascetu ante imperdiet semper leo.'
        }
    ]

    return (
        data.map((card, idx) => (
            <div key={idx} className="flex items-center gap-6 xl:gap-4 p-6 sm:p-6 xl:p-[1.25vw] border border-[--Black] rounded-48">
                <img src={card.icon} className="sm:w-fit w-[64px] object-cover shrink-0" alt={card.alt} />
                <div className="w-full flex flex-col gap-1">
                    <h6 className="xl:text-[1.094vw] sm:text-[3.516vw] text-[4.5vw] xl:font-bold sm:font-extrabold font-bold font-plus leading-normal">{card.title}</h6>
                    <p className="xl:text-[0.729vw] sm:text-[1.758vw] text-[3.256vw] xl:font-normal sm:font-bold font-normal font-roboto leading-normal">{card.desc}</p>
                </div>
            </div>
        ))
    );
}

export default Instruction;

