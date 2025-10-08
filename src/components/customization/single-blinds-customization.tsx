import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import SelectColor from "./selectColor";
import SelectVarient from "./selectVarient";
import ProductCard from "./ProductCard";
import { Checkbox } from "@lib/components/ui/checkbox";
import { Button } from "@lib/components/ui/button";
import Separate from "@components/separate";
import Measurement from "./measurement";
import { Label } from "@lib/components/ui/label";


const productOptions = [
    {
        id: 1,
        title: 'Controls',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'Left', image: '/images/custom/controls-left.png' },
          { label: 'Right', image: '/images/custom/controls-right.png' },
        ]
    },
    {
        id: 1,
        title: 'Select Fit',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Fit', image: '/images/custom/blind-fit-left.png' },
          { label: 'Recess', image: '/images/custom/blind-fit-right.png' },
        ]
    },
    {
        id: 1,
        title: 'Roll Direction',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Front Roll', image: '/images/custom/roll-direction-1.png' },
          { label: 'Back Roll', image: '/images/custom/roll-direction-2.png' },
        ]
    },
    {
        id: 1,
        title: 'Base Rail Shape',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Oval', image: '/images/custom/rail-1.png' },
          { label: 'Square', image: '/images/custom/rail-2.png' },
        ]
    },
]
const colorOptions = [
    {
        id: 'optgrp_01K6Z6D5B6166KXE3RQNVDQ5EN',
        title: 'Chain Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',

        values: [
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EA', name: 'White', color : '#FBFBFB' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EB', name: 'Grey', color : '#0F0F0F' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EC', name: 'Black', color : '#817F7E' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ED', name: 'Oak', color : '#CDCCCB' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EE', name: 'Walnut', color : '#FAF1C5' },
        ]
    },
    {
        id: 'optgrp_01K6Z6D5B6166KXE3RQNVDQ5EF',
        title: 'Bracket Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EG', name: 'White', color : '#FBFBFB' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EH', name: 'Grey', color : '#0F0F0F' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EI', name: 'Black', color : '#817F7E' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EJ', name: 'Oak', color : '#CDCCCB' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EK', name: 'Walnut', color : '#FAF1C5' },
        ]
    },
    {
        id: 'optgrp_01K6Z6D5B6166KXE3RQNVDQ5EL',
        title: 'Base Rail Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EM', name: 'White', color : '#FBFBFB' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EN', name: 'Grey', color : '#0F0F0F' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EO', name: 'Black', color : '#817F7E' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EP', name: 'Oak', color : '#CDCCCB' },
          { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EQ', name: 'Walnut', color : '#FAF1C5' },
        ]
    },
]

function Single_blinds_customization(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: '', width: 1, height: 1 });
    const [selectedColor, setSelectedColor] = useState('');
    const [chainColour, setChainColour] = useState('');
    const [bracketColour, setBracketColour] = useState('');
    const [baseRailColour, setBaseRailColour] = useState('');
    const [data, setData] = useState([
        {'title': 'Colour', 'value': selectedColor},
        {'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : ''},
        {'title': 'Controls', 'value': ''},
        {'title': 'Select Fit', 'value': ''},
        {'title': 'Roll Direction', 'value': ''},
        {'title': 'Base Rail Shape', 'value': ''},
        {'title': 'Chain Colour', 'value': chainColour},
        {'title': 'Bracket Colour', 'value': bracketColour},
        {'title': 'Base Rail Colour', 'value': baseRailColour}, 
    ]);
    
    const [dynamicPricing, setDynamicPricing] = useState(false);
    const [productData, setProductData] = useState(props.data);
    
    // Handle option selection updates
    const handleOptionChange = (optionTitle, value) => {
        setData(prev => 
            prev.map(item => 
                item.title === optionTitle 
                    ? { ...item, value: value }
                    : item
            )
        );
    };
    
    const selectedColorVariant = productData?.variants?.find(variant => variant.options?.Color === selectedColor);
    
    // Calculate total price (base price + variant price difference)
    const basePrice = productData?.price?.amount || 0;
    const variantPrice = selectedColorVariant?.prices?.[0]?.amount || basePrice;
    const totalPrice = variantPrice;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }
    }, [lenis]);

    // Update color in data array when selectedColor changes
    useEffect(() => {
        setData(prev => 
            prev.map(item => 
                item.title === 'Colour' 
                    ? { ...item, value: selectedColor }
                    : item.title === 'Chain Colour'
                    ? { ...item, value: chainColour }
                    : item.title === 'Bracket Colour'
                    ? { ...item, value: bracketColour }
                    : item.title === 'Base Rail Colour'
                    ? { ...item, value: baseRailColour }
                    : item
            )
        );
    }, [selectedColor, chainColour, bracketColour, baseRailColour]);

    // Update size in data array when measurements change
    useEffect(() => {
        setData(prev => 
            prev.map(item => 
                item.title === 'Size'
                    ? { ...item, value: measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : '' }
                    : item
            )
        );
    }, [measurements.width, measurements.height]);

    // Helper function to get the right color setter
    const getColorSetter = (optionTitle) => {
        switch(optionTitle) {
            case 'Chain Colour': return setChainColour;
            case 'Bracket Colour': return setBracketColour;
            case 'Base Rail Colour': return setBaseRailColour;
            default: return setSelectedColor;
        }
    };

    // Helper function to get the selected color value
    const getSelectedColor = (optionTitle) => {
        switch(optionTitle) {
            case 'Chain Colour': return chainColour;
            case 'Bracket Colour': return bracketColour;
            case 'Base Rail Colour': return baseRailColour;
            default: return selectedColor;
        }
    };

    // Auto-calculate price when measurements change
    // useEffect(() => {
    //     if (measurements.width && measurements.height) {
    //         const widthInMeters = measurements.width;
    //         const heightInMeters = measurements.height;

    //         if (widthInMeters > 0 && heightInMeters > 0) {
    //             const area = widthInMeters * heightInMeters;
    //             const pricePerSqM = basePrice;
    //             const newAmount = Math.round(area * pricePerSqM);
                
    //             // Update product data with new pricing
    //             const updatedProductData = {
    //                 ...productData,
    //                 price: {
    //                     ...productData.price,
    //                     amount: newAmount
    //                 },
    //                 variants: productData.variants.map(variant => ({
    //                     ...variant,
    //                     prices: [{
    //                         amount: newAmount,
    //                         currency_code: productData.price.currency_code
    //                     }]
    //                 }))
    //             };

    //             setProductData(updatedProductData);
    //             setDynamicPricing(true);
    //         }
    //     }
    // }, [measurements.width, measurements.height]);


    return (
        <section className="w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[64px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-6 xl:pb-[5.833vw]">
                <div className="w-full flex flex-col gap-2 text-[--Black]">
                    <h2 className="text-xl">BLINDS Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Separate/>
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <div className="grid grid-cols-12 sm:gap-4 gap-x-2 gap-y-4">
                    <div className="sm:col-span-4 col-span-12 flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="roomName" className="text-sm normal shrink-0">Room Name:</Label>
                        <input 
                            type="text" 
                            id="roomName" 
                            value={measurements.roomName}
                            onChange={(e) => setMeasurements(prev => ({...prev, roomName: e.target.value}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                    <div className="sm:col-span-4 col-span-6 flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="width" className="text-sm normal shrink-0">Width: <span className="text-xs">(m)</span></Label>
                        <input 
                            type="number" 
                            id="width" 
                            value={measurements.width}
                            onChange={(e) => setMeasurements(prev => ({...prev, width: Number(e.target.value)}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                    <div className="sm:col-span-4 col-span-6 flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="height" className="text-sm normal shrink-0">Height: <span className="text-xs">(m)</span></Label>
                        <input 
                            type="number" 
                            id="height" 
                            value={measurements.height}
                            onChange={(e) => setMeasurements(prev => ({...prev, height: Number(e.target.value)}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                </div>
                {productData?.options?.map((option, index) => (
                    <React.Fragment key={`color-${index}`}>
                        <Separate/>
                        <SelectColor 
                            data={option} 
                            title={'Colour'}
                            description={'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.'}
                            onColorSelect={setSelectedColor} 
                            selectedColor={selectedColor}
                        />
                    </React.Fragment>
                ))}
                {productOptions.map((option, index) => (
                    <React.Fragment key={`option-${index}`}>
                        <Separate/>
                        <SelectVarient 
                            variantData={option}
                            onSelectionChange={(value) => handleOptionChange(option.title, value)} 
                            selectedValue={data.find(item => item.title === option.title)?.value}
                        />
                    </React.Fragment>
                ))}
                {colorOptions.map((option, index) => (
                    <React.Fragment key={`color-${index}`}>
                        <Separate/>
                        <SelectColor 
                            data={option} 
                            title={'Colour'}
                            description={'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.'}
                            onColorSelect={getColorSetter(option.title)} 
                            selectedColor={getSelectedColor(option.title)}
                        />
                    </React.Fragment>
                ))}
                <Separate/>
                <div className="flex items-center justify-between">
                    <h5 className="text-lg">TOTAL PRICE</h5>
                    {/* <h5 className="text-lg">
                        {(() => {
                        const code = productData.price.currency_code?.toLowerCase();
                        let symbol = '';
                        switch (code) {
                            case 'usd': symbol = '$'; break;
                            case 'aud': symbol = 'A$'; break;
                            case 'gbp': symbol = '£'; break;
                            case 'eur': symbol = '€'; break;
                            case 'inr': symbol = '₹'; break;
                            case 'nzd': symbol = 'NZ$'; break;
                            default: symbol = code ? code.toUpperCase() + ' ' : '';
                        }
                        return symbol + totalPrice;
                    })()}
                    </h5> */}
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="measurements-checked"/>
                    <label htmlFor="measurements-checked" className="text-sm normal">I have double checked my measurements and customisations</label>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant={'primary'} size={'large'} className="w-full flex-1">
                        Add to Cart
                    </Button>
                    <Button variant={'light'} size={'large'} className="w-full flex-1">
                        Buy Now
                    </Button>
                </div>
            </div>
            <ProductCard 
                productData={productData}
                customizationData={data}
                totalPrice={totalPrice}
            />
        </section>
    );
}

export default Single_blinds_customization;

