import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import $ from 'jquery';

import { api } from '../../services/api';

import './css/style.css';
import ProductCard from './ProductCard';

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
    const lenis = useLenis();
    const [customisations, setCustomisations] = useState({
        width: '',
        height: '',
        color: '07',
        fitType: 'fit-1',
        control: 'left',
    });

    // Load dimensions from URL if coming from shop page
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const shopWidth = urlParams.get('shopWidth');
            const shopHeight = urlParams.get('shopHeight');
            
            if (shopWidth && shopHeight) {
                setCustomisations(prev => ({
                    ...prev,
                    width: shopWidth,
                    height: shopHeight,
                }));
            }
        }
    }, []);

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
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomisations(prev => ({ ...prev, width: value }));
    };
    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomisations(prev => ({ ...prev, height: value }));
    };

    const handleAddToCart = () => {
        // api.addToCart('1'); // Commented out - needs proper implementation
        console.log('Add to cart functionality needs to be implemented');
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
                    <input 
                        type="text" 
                        className="formInput" 
                        id="roomName" 
                        placeholder="Room Name" 
                    />
                    <input 
                        type="number" 
                        className="formInput" 
                        id="width" 
                        placeholder="Width (meters)" 
                        value={customisations.width || ''}
                        onChange={handleWidthChange}
                        onInput={handleWidthChange}
                    />
                    <input 
                        type="number" 
                        className="formInput" 
                        id="height" 
                        placeholder="Height (meters)" 
                        value={customisations.height || ''}
                        onChange={handleHeightChange}
                        onInput={handleHeightChange}
                    />
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
                                <div className="w-fit shrink-0 selector" key={`color-${paddedNum}}`}>
                                    <input
                                        type="radio"
                                        name="color"
                                        id={`color-${paddedNum}`}
                                        value={paddedNum}
                                        checked={customisations.color === paddedNum}
                                        onChange={handleColorChange}
                                    />
                                    <label htmlFor={`color-${paddedNum}`} className="p-2.5 rounded-xl">
                                        <img src={`/images/colors/${paddedNum}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`color-${paddedNum}`} />
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg mt-4">Controls</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex items-stretch gap-2">
                    {["left", "right"].map((side, idx) => (
                        <div className="w-full selector flex flex-col items-start" key={`control-${side}`}> 
                            <input
                                type="radio"
                                name="control"
                                id={`control-${side}`}
                                value={side}
                                checked={customisations.control === side}
                                onChange={handleControlChange}
                                className="hidden"
                            />
                            <label
                                htmlFor={`control-${side}`}
                                className="block rounded-2xl bg-transparent hover:bg-transparent transition-all w-full"
                            >
                                <img
                                    src={`/images/custom/${side}.png`}
                                    className="w-full object-cover object-center rounded-2xl border border-[--lightGrey]"
                                    alt={`${side} control`}
                                />
                                <div className="image-after"></div>
                            </label>
                            <span className="text-base font-bold mt-2 self-start text-left capitalize font-plus">{side}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg mt-4">Select Fit</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex items-stretch gap-2">
                    {[1, 2].map(num => (
                        <div className="w-full selector flex flex-col items-start" key={`fit-${num}`}> 
                            <input
                                type="radio"
                                name="fitType"
                                id={`fit-${num}`}
                                value={`fit-${num}`}
                                checked={customisations.fitType === `fit-${num}`}
                                onChange={handleFitChange}
                                className="hidden"
                            />
                            <label
                                htmlFor={`fit-${num}`}
                                className="block rounded-2xl bg-transparent hover:bg-transparent transition-all w-full"
                            >
                                <img
                                    src={`/images/product/fit-${num}.png`}
                                    className="w-full object-cover object-center rounded-2xl border border-[--lightGrey]"
                                    alt={`fit-${num}`}
                                />
                                <div className="image-after"></div>
                            </label>
                            <span className="text-base font-bold mt-2 self-start text-left capitalize font-plus">{`fit-${num}`}</span>
                        </div>
                    ))}
                </div>
            </div>
            <ProductCard
                    customisations={{
                        width: customisations.width,
                        height: customisations.height,
                        fabricColor: customisations.color,
                        fitType: customisations.fitType,
                        controls: customisations.control
                    }}
                    fields={['width', 'height', 'fabricColor', 'fitType', 'controls']}
                    imageSrc="/images/product/product-datail.png"
                    productName="Zebra Roller Blinds"
                    productDescription="Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. "
                    price="-"
                />
            
        </section>
    );
}

export default Blind;