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

const productOptions = [
    {
        id: 1,
        title: 'Controls',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'Left Hand Stack', image: '/images/custom/left-stack.png' },
          { label: 'Right Hand Stack', image: '/images/custom/right-stack.png' },
          { label: 'Centre Opening', image: '/images/custom/center-stack.png' },
        ]
    },
    {
        id: 1,
        title: 'Select Fit',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Fit', image: '/images/custom/vertical-fit.png' },
          { label: 'Recess', image: '/images/custom/vertical-recess.png' },
        ]
    },
    {
        id: 1,
        title: 'Track Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Anodised Silver', image: '/images/custom/silver.png' },
          { label: 'White', image: '/images/custom/white.png' },
          { label: 'Black', image: '/images/custom/black.png' },
          { label: 'Birch White', image: '/images/custom/birch-white.png' },
        ]
    },
    {
        id: 1,
        title: 'Weight Type',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Chained Weights', image: '/images/custom/Chained.png' },
          { label: 'Chain Less Weights', image: '/images/custom/chainLess.png' },
        ]
    },
]

function Vertical_blinds_customization(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: '', width: 1, height: 1 });
    const [selectedColor, setSelectedColor] = useState('');
    const [data, setData] = useState([
        {'title': 'Colour', 'value': selectedColor},
        {'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : ''},
        {'title': 'Controls', 'value': ''},
        {'title': 'Select Fit', 'value': ''},
        {'title': 'Track Colour', 'value': ''},
        {'title': 'Weight Type', 'value': ''},
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
    useEffect(() => {
            setData(prev => 
                prev.map(item => 
                    item.title === 'Colour' 
                        ? { ...item, value: selectedColor }
                        : item
                )
            );
        }, [selectedColor]);
    
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




    // Auto-calculate price when measurements change
    useEffect(() => {
        if (measurements.width && measurements.height) {
            const widthInMeters = measurements.width;
            const heightInMeters = measurements.height;

            if (widthInMeters > 0 && heightInMeters > 0) {
                const area = widthInMeters * heightInMeters;
                const pricePerSqM = basePrice;
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
        <section className="w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[64px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-6 xl:pb-[5.833vw]">
                <div className="w-full flex flex-col gap-2 text-[--Black]">
                    <h2 className="text-xl">Vertical Blinds Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Separate/>
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Measurement measurements={measurements} setMeasurements={setMeasurements} />
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
                <Separate/>
                <div className="flex items-center justify-between">
                    <h5 className="text-lg">TOTAL PRICE</h5>
                    <h5 className="text-lg">
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
                    </h5>
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

export default Vertical_blinds_customization;

