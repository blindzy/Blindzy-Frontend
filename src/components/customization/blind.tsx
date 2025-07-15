import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import $ from 'jquery';

import { api } from '../../services/api';

import './css/style.css';

interface ProductDetailsProps { }

interface ProductCustomisations {
    color: string;
    size: string;
    fitType: string;
    rollDirection: string;
    chainColour: string;
    bracketColour: string;
    baseRailShape: string;
    baseRailColour: string;
    price: number;
}

function CustomCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setChecked(!checked)}>
            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition ${checked ? 'bg-primary border-primary' : 'border-gray-400 bg-white'}`}>
                {checked && <Icon icon="tabler:check" className="text-white text-sm" />}
            </div>
            <label className="text-sm">I have double checked my measurements and customisations</label>
        </div>
    );
}

function Blind(props: ProductDetailsProps) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [customisations, setCustomisations] = useState({
        color: '07',
        fitType: 'fit-1',
        control: 'left',
    });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.normalizeScroll(true);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }

        const deviceWidth = window.innerWidth;
        if (deviceWidth > 768) {
            ScrollTrigger.normalizeScroll(false);
        }
        $('.detail-sidebar').on('mouseenter', () => ScrollTrigger.normalizeScroll(false));
        $('.detail-sidebar').on('mouseleave', () => ScrollTrigger.normalizeScroll(true));
    }, [lenis]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomisations(prev => ({ ...prev, color: e.target.value }));
    };
    const handleFitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomisations(prev => ({ ...prev, fitType: e.target.value }));
    };
    const handleControlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomisations(prev => ({ ...prev, control: e.target.value }));
    };

    const handleAddToCart = () => {
        api.addToCart('1');
    };

    return (
        <section className="product-detail w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[80px] py-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
            <div className="detail-sidebar xl:w-[1223px] w-full flex flex-col gap-4 p-4 text-black overflow-auto scroll-hidden rounded-48">
                <h4 className="text-xl">BLIND CUSTOMISATION</h4>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg mt-4">Enter Measurements</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="w-full flex items-center gap-4">
                    <input type="text" className="formInput" id="roomName" placeholder="Room Name" />
                    <input type="text" className="formInput" id="width" placeholder="Width" />
                    <input type="text" className="formInput" id="height" placeholder="Height" />
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Choose Color</h5>
                    <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                    <div className="flex flex-wrap items-stretch  gap-2">
                        {Array.from({ length: 11 }, (_, i) => i + 1).slice(-5).map((num) => {
                            const paddedNum = num < 10 ? `0${num}` : `${num}`;
                            return (
                                <div className="w-fit shrink-0 selector" key={`color-${paddedNum}`}>
                                    <input
                                        type="radio"
                                        name="color"
                                        id={`color-${paddedNum}`}
                                        value={paddedNum}
                                        checked={customisations.color === paddedNum}
                                        onChange={handleColorChange}
                                        className="hidden"
                                    />
                                    <label htmlFor={`color-${paddedNum}`} className="block w-8 h-8 rounded-full border-2 cursor-pointer" style={{ backgroundImage: `url(/images/colors/${paddedNum}.png)` }}></label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="product-details xl:w-[1223px] w-full flex flex-col gap-4 p-4 text-black overflow-auto scroll-hidden rounded-48">
                {/* Product details content */}
            </div>
        </section>
    );
}

export default Blind;