import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Plus  } from 'lucide-react';
import { Label } from "@lib/components/ui/label";
import { Checkbox } from "@lib/components/ui/checkbox";
import SelectColor from "./selectColor";
import SelectVarient from "./selectVarient";
import ProductCard from "./ProductCard";
import { Button } from "@lib/components/ui/button";


function Customization(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    
    // State for tracking selected customizations
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({});
    const [measurements, setMeasurements] = useState({ roomName: '', width: '', height: '' });
    const [dynamicPricing, setDynamicPricing] = useState(false);
    const [productData, setProductData] = useState(props.data);
    
    // Handle option selection updates
    const handleOptionChange = (optionTitle, value) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionTitle]: value
        }));
    };
    
    // Get color options and find selected color variant
    const colorOptions = productData?.options?.find(opt => opt.title === 'Color')?.values || [];
    const selectedColorVariant = productData?.variants?.find(variant => variant.options?.Color === selectedColor);
    
    // Calculate total price (base price + variant price difference)
    const basePrice = productData?.price?.amount || 0;
    const variantPrice = selectedColorVariant?.prices?.[0]?.amount || basePrice;
    const totalPrice = variantPrice;

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
    }, [lenis]);

    // Auto-calculate price when measurements change
    useEffect(() => {
        if (measurements.width && measurements.height) {
            const widthInMeters = parseFloat(measurements.width);
            const heightInMeters = parseFloat(measurements.height);
            
            if (widthInMeters > 0 && heightInMeters > 0) {
                const area = widthInMeters * heightInMeters;
                const pricePerSqM = 150;
                const newAmount = Math.round(area * pricePerSqM);
                
                // Update product data with new pricing
                const updatedProductData = {
                    ...productData,
                    price: {
                        ...productData.price,
                        amount: newAmount
                    },
                    variants: productData.variants.map(variant => ({
                        ...variant,
                        prices: [{
                            amount: newAmount,
                            currency_code: productData.price.currency_code
                        }]
                    }))
                };

                setProductData(updatedProductData);
                setDynamicPricing(true);
            }
        }
    }, [measurements.width, measurements.height]);


	return (
        <section className="w-screen flex xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[80px] py-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
            <div className="w-full flex flex-col gap-6 pb-[112px]">
                <div className="w-full flex flex-col gap-2 text-[--Black]">
                    <h2 className="text-xl">Curtain Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <div className="flex items-stretch gap-4">
                    <div className="w-full flex items-center gap-2 py-4 px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="roomName" className="text-sm normal shrink-0">Room Name </Label>
                        <input 
                            type="text" 
                            id="roomName" 
                            value={measurements.roomName}
                            onChange={(e) => setMeasurements(prev => ({...prev, roomName: e.target.value}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                    <div className="w-full flex items-center gap-2 py-4 px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="width" className="text-sm normal shrink-0">Width: <span className="text-xs">(m)</span></Label>
                        <input 
                            type="number" 
                            id="width" 
                            value={measurements.width}
                            onChange={(e) => setMeasurements(prev => ({...prev, width: e.target.value}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                    <div className="w-full flex items-center gap-2 py-4 px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="height" className="text-sm normal shrink-0">Height: <span className="text-xs">(m)</span></Label>
                        <input 
                            type="number" 
                            id="height" 
                            value={measurements.height}
                            onChange={(e) => setMeasurements(prev => ({...prev, height: e.target.value}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                </div>
                <SelectColor data={productData} onColorSelect={setSelectedColor} selectedColor={selectedColor}/>
                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>
                
                {productData?.options?.filter(option => option.title !== 'Color').map((option, index) => (
                    <React.Fragment key={option.id}>
                        <SelectVarient 
                            data={productData} 
                            optionType={option.title}
                            onSelectionChange={(value) => handleOptionChange(option.title, value)} 
                            selectedValue={selectedOptions[option.title] || ''}
                        />
                        {index < productData.options.filter(opt => opt.title !== 'Color').length - 1 && (
                            <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                                <Plus className="size-[18px]" />
                                <div className="w-full border-b border-[--mediumGrey]"></div>
                                <Plus className="size-[18px]" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <ProductCard 
                productData={productData}
                selectedColor={selectedColor}
                measurements={measurements}
                selectedOptions={selectedOptions}
                totalPrice={totalPrice}
            />
        </section>
    );
}

export default Customization;

