import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Plus  } from 'lucide-react';
import SelectColor from "./selectColor";
import SelectVarient from "./selectVarient";
import ProductCard from "./ProductCard";
import { Checkbox } from "@lib/components/ui/checkbox";
import { Button } from "@lib/components/ui/button";
import Separate from "@components/separate";
import Measurement from "./measurement";



const setupOptions = [
    {
        id: 1,
        title: 'Setup',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'Blockout in Front', image: '/images/custom/blockout-front.png' },
          { label: 'Sheer in Front', image: '/images/custom/sheer-front.png' },
        ]
    },
]
const blockoutOptions = [
    {
        id: 1,
        title: 'Blackout Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'White', image: '/images/colors/01.png' },
          { label: 'Grey', image: '/images/colors/02.png' },
          { label: 'Black', image: '/images/colors/03.png' },
          { label: 'Oak', image: '/images/colors/04.png' },
          { label: 'Walnut', image: '/images/colors/05.png' },
          { label: 'Charcoal', image: '/images/colors/06.png' },
        ]
    },
    {
        id: 1,
        title: 'Blockout Curtain Style',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'S Fold', image: '/images/custom/s-fold.jpg' },
          { label: 'Triple Pinch Pleat', image: '/images/custom/pinch.jpg' },
          { label: 'Pencil Pleat', image: '/images/custom/pencil-pleat.jpg' },
        ]
    },
    {
        id: 1,
        title: 'Blockout Hem',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: '70mm Hem', image: '/images/custom/70mm.png' },
        ]
    },
]
const sheerOptions = [
    {
        id: 1,
        title: 'Sheer Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'White', image: '/images/colors/01.png' },
          { label: 'Grey', image: '/images/colors/02.png' },
          { label: 'Black', image: '/images/colors/03.png' },
          { label: 'Oak', image: '/images/colors/04.png' },
          { label: 'Walnut', image: '/images/colors/05.png' },
          { label: 'Charcoal', image: '/images/colors/06.png' },
        ]
    },
    {
        id: 1,
        title: 'Sheer Curtain Style',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'S Fold', image: '/images/custom/s-fold.jpg' },
          { label: 'Triple Pinch Pleat', image: '/images/custom/pinch.jpg' },
          { label: 'Pencil Pleat', image: '/images/custom/pencil-pleat.jpg' },
        ]
    },
    {
        id: 1,
        title: 'Sheer Hem',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'Lead Weight', image: '/images/custom/lead-weight.png' },
          { label: '70mm Hem', image: '/images/custom/70mm.png' },
        ]
    },
]
const productOptions = [
    {
        id: 1,
        title: 'Fitting Type',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'Left', image: '/images/custom/fitting-left.jpg' },
          { label: 'Right', image: '/images/custom/fitting-right.jpg' },
        ]
    },
    {
        id: 1,
        title: 'Select Fit',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Fit', image: '/images/custom/fit.jpg' },
          { label: 'Recess', image: '/images/custom/racess.jpg' },
        ]
    },
    {
        id: 1,
        title: 'Track Type',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'Designer', image: '/images/custom/designer.png' },
          { label: 'Residential', image: '/images/custom/residential.png' },
        ]
    },
    {
        id: 1,
        title: 'Curtain Stack',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
          { label: 'Left Stack', image: '/images/custom/left-stack.jpg' },
          { label: 'Right Stack', image: '/images/custom/right-stack.jpg' },
          { label: 'Centre Opening', image: '/images/custom/center-opening.jpg' },
        ]
    },
    {
        id: 1,
        title: 'Wand Length',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: '910mm', image: '/images/custom/wand-length.png' },
          { label: '1220mm', image: '/images/custom/wand-length.png' },
          { label: '1520mm', image: '/images/custom/wand-length.png' },
        ]
    },
    {
        id: 1,
        title: 'Track Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
          { label: 'White', image: '/images/custom/track-white.png' },
          { label: 'Black', image: '/images/custom/track-black.png' },
        ]
    },
]

function Double_curtain_customization(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: '', width: 1, height: 1 });
    const [blackoutFabric, setBlackoutFabric] = useState('');
    const [blackoutColour, setBlackoutColour] = useState('');
    const [sheerFabric, setSheerFabric] = useState('');
    const [sheerColour, setSheerColour] = useState('');
    const [dynamicPricing, setDynamicPricing] = useState(false);
    const [productData, setProductData] = useState(props.data);
    
    // Get available colors for selected fabric
    const selectedBlackoutFabric = productData?.options?.[0]?.values?.find(fabric => fabric.label === blackoutFabric);
    const blackoutColorOptions = selectedBlackoutFabric?.colors || blockoutOptions[0].values;
    
    const selectedSheerFabric = productData?.options?.[1]?.values?.find(fabric => fabric.label === sheerFabric);
    const sheerColorOptions = selectedSheerFabric?.colors || sheerOptions[0].values;
    
    const [data, setData] = useState([
        {'title': 'Setup', 'value': ''},
        {'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : ''},
        {'title': 'Blackout Fabric', 'value': blackoutFabric},
        {'title': 'Blackout Colour', 'value': blackoutColour},
        {'title': 'Blockout Curtain Style', 'value': ''},
        {'title': 'Blockout Hem', 'value': ''},
        {'title': 'Sheer Fabric', 'value': sheerFabric},
        {'title': 'Sheer Colour', 'value': sheerColour},
        {'title': 'Sheer Curtain Style', 'value': ''},
        {'title': 'Sheer Hem', 'value': ''},
        {'title': 'Fitting Type', 'value': ''},
        {'title': 'Select Fit', 'value': ''},
        {'title': 'Track Type', 'value': ''},
        {'title': 'Curtain Stack', 'value': ''},
        {'title': 'Wand Length', 'value': ''},
        {'title': 'Track Colour', 'value': ''},
    ]);
    
    
    
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
    
    const selectedColorVariant = productData?.variants?.find(variant => variant.options?.Color === blackoutFabric);
    
    // Calculate total price (base price + variant price difference)
    const basePrice = productData?.price?.amount || 0;
    const variantPrice = selectedColorVariant?.prices?.[0]?.amount || basePrice;
    const totalPrice = variantPrice;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // if (lenis) {
        //     lenis.on('scroll', ScrollTrigger.update);
        // }
    }, [lenis]);

    // Update color in data array when selectedColor changes
    useEffect(() => {
        setData(prev => 
            prev.map(item => 
                item.title === 'Blackout Fabric'
                    ? { ...item, value: blackoutFabric }
                    : item.title === 'Blackout Colour'
                    ? { ...item, value: blackoutColour }
                    : item.title === 'Sheer Fabric'
                    ? { ...item, value: sheerFabric }
                    : item.title === 'Sheer Colour'
                    ? { ...item, value: sheerColour }
                    : item
            )
        );
    }, [blackoutFabric,blackoutColour,sheerFabric,sheerColour]);

    // Reset color selection when fabric changes
    useEffect(() => {
        if (blackoutFabric && blackoutColour) {
            const availableColors = selectedBlackoutFabric?.colors || [];
            const isColorAvailable = availableColors.some(color => color.label === blackoutColour);
            if (!isColorAvailable) {
                setBlackoutColour('');
            }
        }
    }, [blackoutFabric, selectedBlackoutFabric]);

    useEffect(() => {
        if (sheerFabric && sheerColour) {
            const availableColors = selectedSheerFabric?.colors || [];
            const isColorAvailable = availableColors.some(color => color.label === sheerColour);
            if (!isColorAvailable) {
                setSheerColour('');
            }
        }
    }, [sheerFabric, selectedSheerFabric]);

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
                    <h2 className="text-xl">Double Curtains Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Separate/>
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Measurement measurements={measurements} setMeasurements={setMeasurements} />
                {setupOptions.map((option, index) => (
                    <React.Fragment key={`option-${index}`}>
                        <Separate/>
                        <SelectVarient 
                            variantData={option}
                            onSelectionChange={(value) => handleOptionChange(option.title, value)} 
                            selectedValue={data.find(item => item.title === option.title)?.value}
                        />
                    </React.Fragment>
                ))}
                <div className="w-full xl:p-[1.25vw] sm:p-[2.344vw] p-4 flex flex-col xl:gap-[1.25vw] gap-6 border border-[--Black] rounded-48">
                    <h4 className="text-xl text-[--Black]">
                        Blockout Options
                    </h4>
                    {productData?.options?.slice(0, 1).map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate/>
                            <SelectColor 
                                data={option}
                                onColorSelect={setBlackoutFabric} 
                                selectedColor={blackoutFabric}
                            />
                        </React.Fragment>
                    ))}
                    {blockoutOptions.map((option, index) => (
                        <React.Fragment key={`option-${index}`}>
                            <Separate/>
                            {index === 0 ? (
                                <SelectColor 
                                    data={{
                                        title: option.title,
                                        description: option.description,
                                        values: blackoutColorOptions
                                    }}
                                    onColorSelect={setBlackoutColour} 
                                    selectedColor={blackoutColour}
                                />
                            ):(

                                <SelectVarient 
                                    variantData={option}
                                    onSelectionChange={(value) => handleOptionChange(option.title, value)} 
                                    selectedValue={data.find(item => item.title === option.title)?.value}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="w-full xl:p-[1.25vw] sm:p-[2.344vw] p-4 flex flex-col xl:gap-[1.25vw] gap-6 border border-[--Black] rounded-48">
                    <h4 className="text-xl text-[--Black]">
                        Sheer Options
                    </h4>
                    {productData?.options?.slice(1, 2).map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate/>
                            <SelectColor 
                                data={option}
                                onColorSelect={setSheerFabric} 
                                selectedColor={sheerFabric}
                            />
                        </React.Fragment>
                    ))}
                    {sheerOptions.map((option, index) => (
                        <React.Fragment key={`option-${index}`}>
                            <Separate/>
                            {index === 0 ? (
                                <SelectColor 
                                    data={{
                                        title: option.title,
                                        description: option.description,
                                        values: sheerColorOptions
                                    }}
                                    onColorSelect={setSheerColour} 
                                    selectedColor={sheerColour}
                                />
                            ):(

                                <SelectVarient 
                                    variantData={option}
                                    onSelectionChange={(value) => handleOptionChange(option.title, value)} 
                                    selectedValue={data.find(item => item.title === option.title)?.value}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
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

export default Double_curtain_customization;

