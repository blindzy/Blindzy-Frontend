import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import SelectColor from "./selectColor";
import SelectGroupColor from "./selectgroupColor";
import SelectDefaultColor from "./selectdefultColor";
import SelectVarient from "./selectVarient";
import ProductCard from "./ProductCard";
import { Checkbox } from "@lib/components/ui/checkbox";
import { Button } from "@lib/components/ui/button";
import Separate from "@components/separate";
import Measurement from "./measurement";
import { createAddToCart } from '../../services/add-to-cart';
import { interpolate2D } from "./interpolate";
import { addCommaToNumber, getCurrencySymbol } from "./customization-utils";
import { COLOR_OPTIONS } from "./customization-constants";
import type { UserData, CustomizationDataItem } from "./customization-types";


const setupOptions = [
    {
        id: 1,
        title: 'Setup',
        description: '',
        values: [
            { label: 'Blockout in Front', image: '/images/custom/blind-blockout-front.png' },
            { label: 'Sunscreen or Light Filtering in Back', image: '/images/custom/sunscreen-front.png' },
        ]
    },
]
const fabric = {
    azure: "/images/product-colors-image/fabric/haven.jpg",
    nova: "/images/product-colors-image/fabric/ora.jpg",
    omega: "/images/product-colors-image/fabric/seclusion.jpg",
    phantom: "/images/product-colors-image/fabric/seclusion.jpg",
    zenith: "/images/product-colors-image/fabric/tranquil.jpg",
};

const productOptions = [
    {
        id: 1,
        title: 'Controls',
        description: '',
        values: [
            { label: 'Left', image: '/images/custom/controls-left.png' },
            { label: 'Right', image: '/images/custom/controls-right.png' },
        ]
    },
    {
        id: 1,
        title: 'Select Fit',
        description: '',
        values: [
            { label: 'Face Fit', image: '/images/custom/blind-fit-left.png' },
            { label: 'Recess Fit', image: '/images/custom/blind-fit-right.png' },
        ]
    },
    {
        id: 1,
        title: 'Roll Direction',
        description: '',
        values: [
            { label: 'Front & Back Roll', image: '/images/custom/front-back-roll.png' },
            { label: 'Both Front Roll', image: '/images/custom/both-front-roll.png' },
            { label: 'Back & Front Roll', image: '/images/custom/back-front-roll.png' },
            { label: 'Both Back Roll', image: '/images/custom/both-back-roll.png' },
        ]
    },
    {
        id: 1,
        title: 'Base Rail Shape',
        description: '',
        values: [
            { label: 'Oval', image: '/images/custom/rail-1.png' },
            { label: 'Square', image: '/images/custom/rail-2.png' },
        ]
    },
]

const colorOptions = COLOR_OPTIONS;

const blackoutColours = {
    phantom: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EO', value: 'breeze', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EP', value: 'lunar', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EQ', value: 'mercury', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ER', value: 'midnight', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ES', value: 'mocha', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ET', value: 'quartz', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EU', value: 'snow', },
    ],
    azure: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EW', value: 'white', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EO', value: 'black', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EP', value: 'cream', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ER', value: 'grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EQ', value: 'dark grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ES', value: 'moon', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ET', value: 'powder', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EU', value: 'sand', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EV', value: 'stone', },
    ],
    zenith: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EA', value: 'white', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EB', value: 'black', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EC', value: 'blush', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ED', value: 'grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EF', value: 'dark grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EG', value: 'charcoal', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EH', value: 'ghost', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EI', value: 'meadow', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EJ', value: 'ocean', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EK', value: 'silk', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EL', value: 'soft', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EM', value: 'whisfer', },
    ],
    nova: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EA', value: 'white', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EB', value: 'black', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EC', value: 'cream', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ED', value: 'sahara', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EF', value: 'sky', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EG', value: 'snow', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EH', value: 'stone', },
    ],
    omega: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EA', value: 'cream', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EB', value: 'frost', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EC', value: 'lvory', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ED', value: 'mirage', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EF', value: 'raven', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EG', value: 'sage', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EH', value: 'saturn', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EI', value: 'venus', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EJ', value: 'willow', },
    ],
}

function Double_blind_customization({ data: propsData, groupData }) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: 'Bedroom', width: Math.min(...(groupData?.Width_values || [])), height: Math.min(...(groupData?.Drop_values || [])) });
    const [screenMeasurements, setScreenMeasurements] = useState({ roomName: 'Bedroom', width: Math.min(...(groupData?.Width_values || [])), height: Math.min(...(groupData?.Drop_values || [])) });
    const [blackoutFabric, setBlackoutFabric] = useState('');
    const [blackoutColour, setBlackoutColour] = useState('');
    const [screenBlindFabric, setSheerFabric] = useState('');
    // const [sheerColour, setSheerColour] = useState('');
    const [productData, setProductData] = useState(propsData);
    const [selectedColor, setSelectedColor] = useState('');
    const [chainColour, setChainColour] = useState('');
    const [bracketColour, setBracketColour] = useState('');
    const [baseRailColour, setBaseRailColour] = useState('');
    const [blackoutGroup, setBlackoutGroup] = useState(null);
    const [screenGroup, setScreenGroup] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [measurementsChecked, setMeasurementsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isMotorised, setIsMotorised] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [data, setData] = useState([
        { 'title': 'Setup', 'value': '' },
        { 'title': 'Blackout Fabric Size', 'value': measurements.width && measurements.height ? `${measurements.roomName} : ${measurements.width}m x ${measurements.height}m` : '' },
        { 'title': 'Blackout Fabric', 'value': blackoutFabric },
        { 'title': 'Blackout Colour', 'value': blackoutColour },
        { 'title': 'Screen Blind Fabrics Size', 'value': screenMeasurements.width && screenMeasurements.height ? `${screenMeasurements.roomName} : ${screenMeasurements.width}m x ${screenMeasurements.height}m` : '' },
        { 'title': 'Screen Blind Fabrics', 'value': screenBlindFabric },
        { 'title': 'Controls', 'value': '' },
        { 'title': 'Select Fit', 'value': '' },
        { 'title': 'Roll Direction', 'value': '' },
        { 'title': 'Base Rail Shape', 'value': '' },
        { 'title': 'Chain Colour', 'value': chainColour },
        { 'title': 'Bracket Colour', 'value': bracketColour },
        { 'title': 'Base Rail Colour', 'value': baseRailColour },
        { 'title': 'Motorised', 'value': isMotorised ? 'Yes' : 'No' },
    ]);
    const [blockoutColourData, setBlockoutColourData] = useState([{
        id: 'optgrp_01K6Z6D5B6166KXE3RGNVDQ5EN',
        title: 'Blockout Colour',
        description: '',
        values: []
    }]);

    const calculatePrice = (group, width, height, label): number => {
        // Validate inputs
        if (!width || !height) {
            setError(`Please enter both width and drop values for ${label}`)
            return 0;
        }
        // Clear any previous error since measurements are now valid
        setError("");

        let widthMm = Math.round(Number(width));
        let dropMm = Math.round(Number(height));

        // Check ranges (in mm)
        const currentWidthValues = groupData?.Width_values || [];
        const currentDropValues = groupData?.Drop_values || [];
        const currentPriceMatrix = groupData?.Price_groups || [];

        const minWidth = Math.min(...currentWidthValues);
        const maxWidth = Math.max(...currentWidthValues);
        const minDrop = Math.min(...currentDropValues);
        const maxDrop = Math.max(...currentDropValues);

        // Clamp values to valid range instead of rejecting
        if (widthMm < minWidth) {
            widthMm = minWidth;
        } else if (widthMm > maxWidth) {
            setError(`${label} width must be between ${minWidth} mm and ${maxWidth} mm`)
            return 0;
        }

        if (dropMm < minDrop) {
            dropMm = minDrop;
        } else if (dropMm > maxDrop) {
            setError(`${label} drop must be between ${minDrop} mm and ${maxDrop} mm`)
            return 0;
        }
        if (group === null || group === undefined || group === '') {
            setError(`Please select fabric for ${label}`)
            return 0;
        }
        const price = interpolate2D(widthMm, dropMm, currentWidthValues, currentDropValues, currentPriceMatrix[group])
        if (price === null) {
            setError(`Unable to calculate ${label} price for these dimensions`)
            return 0;
        } else {
            return price;
        }
    }

    useEffect(() => {
        const blockoutPrice = calculatePrice(blackoutGroup, measurements.width, measurements.height, "Blockout");
        if (blockoutPrice === 0) {
            setTotalPrice(0);
            return;
        }

        const screenPrice = calculatePrice(screenGroup, screenMeasurements.width, screenMeasurements.height, "Sheer");
        if (screenPrice === 0) {
            setTotalPrice(0);
            return;
        }

        // Clear measurement, fabric, or "select all" errors when everything is valid
        if (error.includes("width") || error.includes("drop") || error.includes("fabric") || error.includes("dimensions") || error.includes("select all")) {
            setError("");
        }
        let price = blockoutPrice + screenPrice;

        const rollDirection = data.find(item => item.title === 'Roll Direction')?.value;
        if (rollDirection) {
            price += 30;
        }

        if (isMotorised) price += 200;

        setTotalPrice(price);
    }, [measurements.width, screenMeasurements.width, measurements.height, screenMeasurements.height, blackoutGroup, screenGroup, data, isMotorised]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }
    }, [lenis]);

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

    const calculateBaseGroup = (base) => {
        if (!productData?.variants) return 0;
        if (!base) return '';

        const blackoutVariant = productData.variants.find(
            variant =>
                variant.title === base ||
                variant.options?.some(opt => opt.value === base)
        );
        const currencyCode =
            blackoutVariant?.price_sets?.[0]?.prices?.[0]?.currency_code ||
            "aud";

        setCurrencySymbol(getCurrencySymbol(currencyCode));

        const blackoutPrice =
            blackoutVariant?.price_sets?.[0]?.prices?.[0]?.amount || 0;
        return blackoutPrice;
    };

    useEffect(() => {
        if (!blackoutFabric) return;
        setBlockoutColourData(prev => [{
            ...prev[0],
            values: []
        }]);
        const newValues = blackoutColours[blackoutFabric] || [];
        setBlockoutColourData(prev => [{
            ...prev[0],
            values: newValues
        }]);
        setBlackoutColour("");
    }, [blackoutFabric]);

    useEffect(() => {
        setData(prev =>
            prev.map(item =>
                item.title === 'Blackout Fabric'
                    ? { ...item, value: blackoutFabric }
                    : item.title === 'Blackout Colour'
                        ? { ...item, value: blackoutColour }
                        : item.title === 'Screen Blind Fabrics'
                            ? { ...item, value: screenBlindFabric }
                            : item.title === 'Chain Colour'
                                ? { ...item, value: chainColour }
                                : item.title === 'Bracket Colour'
                                    ? { ...item, value: bracketColour }
                                    : item.title === 'Base Rail Colour'
                                        ? { ...item, value: baseRailColour }
                                        : item.title === 'Blackout Fabric Size'
                                            ? { ...item, value: measurements.width && measurements.height ? `${measurements.roomName} : ${measurements.width}mm x ${measurements.height}mm` : '' }
                                            : item.title === 'Screen Blind Fabrics Size'
                                                ? { ...item, value: screenMeasurements.width && screenMeasurements.height ? `${screenMeasurements.roomName} : ${screenMeasurements.width}mm x ${screenMeasurements.height}mm` : '' }
                                                : item.title === 'Motorised'
                                                    ? { ...item, value: isMotorised ? 'Yes' : 'No' }
                                                    : item
            )
        );
        // Calculate total price based on area
        var blackoutGroup = calculateBaseGroup(blackoutFabric);
        var screenGroup = calculateBaseGroup(screenBlindFabric);
        if (blackoutGroup > 0) {
            blackoutGroup = blackoutGroup - 1;
        };
        if (screenGroup > 0) {
            screenGroup = screenGroup - 1;
        };
        setBlackoutGroup(blackoutGroup);
        setScreenGroup(screenGroup);

    }, [blackoutFabric, blackoutColour, screenBlindFabric, chainColour, bracketColour, isMotorised, baseRailColour, productData?.variants, measurements.width, measurements.roomName, screenMeasurements.roomName, measurements.height, blackoutGroup, screenGroup]);

    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) return;
        setUserData(JSON.parse(userDataString));
    }, []);

    const getColorSetter = (optionTitle) => {
        switch (optionTitle) {
            case 'Chain Colour': return setChainColour;
            case 'Bracket Colour': return setBracketColour;
            case 'Base Rail Colour': return setBaseRailColour;
            default: return setSelectedColor;
        }
    };

    // Helper function to get the selected color value
    const getSelectedColor = (optionTitle) => {
        switch (optionTitle) {
            case 'Chain Colour': return chainColour;
            case 'Bracket Colour': return bracketColour;
            case 'Base Rail Colour': return baseRailColour;
            default: return selectedColor;
        }
    };

    const handleAddToCart = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        if (!measurementsChecked) {
            setError('Please confirm that you have checked your measurements');
            setSuccess('');
            setLoading(false);
            return;
        } else {
            setError('');
            setSuccess('');
        }
        // if (!measurements.roomName) {
        //     setError('Please enter room name');
        //     return;
        // }
        if (data.some(item => !item.value)) {
            setError('Please select all customization options');
            setSuccess('');
            setLoading(false);
            return;
        } else {
            setError('');
            setSuccess('');
        }

        const selectedVariant = productData.variants.find(
            variant => variant.title === selectedColor ||
                variant.options.some(opt => opt.value === selectedColor)
        )

        const cartItem = {
            id: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            product_id: productData.id,
            quantity: 1,
            variant_id: selectedVariant.id ?? null,
            customizations: {
                title: productData.title,
                amount: totalPrice,
                currency: currencySymbol,
                thumbnail: productData.thumbnail,
                customizationData: data,
            },
        };


        if (!userData) {
            try {
                const existing = JSON.parse(localStorage.getItem('guest_cart') || '[]');
                existing.push(cartItem);
                localStorage.setItem('guest_cart', JSON.stringify(existing));
                setSuccess('Added to cart!');
            } catch {
                setError('Failed to save item to cart.');
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            await createAddToCart.addToCart({
                email: userData.email,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                variant_id: cartItem.variant_id,
                customizations: cartItem.customizations,
            });

            setSuccess("Add to Cart created successfully!");

        } catch (err: any) {
            console.error("Add to Cart error:", err);
            setError(err.message || "Something went wrong during Add to Cart.");
        } finally {
            setLoading(false);
        }

        // setError('');
        // // Add your add to cart logic here
    }

    return (
        <section className="w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[64px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-6 xl:pb-[5.833vw]">
                <div className="w-full flex flex-col gap-2 text-[--Black]">
                    <h2 className="text-xl">Double Roller BLINDS Customisations</h2>
                    {/* <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p> */}
                </div>

                {setupOptions.map((option, index) => (
                    <React.Fragment key={`option-${index}`}>
                        <Separate />
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
                    <Separate />
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-lg">Enter Measurements</h2>
                        {/* <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p> */}
                    </div>
                    {/* <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={600} widthMax={3000} heightMin={1200} heightMax={3000} /> */}
                    <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={100} widthMax={Math.max(...(groupData?.Width_values || []))} heightMin={100} heightMax={Math.max(...(groupData?.Drop_values || []))} />
                    {productData?.options?.map((option, index) => {
                        const filteredOption = {
                            ...option,
                            values: option.values?.slice(0, -1),
                        };

                        return (
                            <React.Fragment key={`color-${index}`}>
                                <Separate />
                                <SelectGroupColor
                                    data={filteredOption}
                                    colorsImage={fabric}
                                    onColorSelect={setBlackoutFabric}
                                    selectedColor={blackoutFabric}
                                />
                            </React.Fragment>
                        );
                    })}

                    {blackoutFabric !== '' && blockoutColourData.map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate />
                            <SelectGroupColor
                                data={option}
                                selectedFabric={blackoutFabric}
                                colorsType={'blind'}
                                onColorSelect={setBlackoutColour}
                                selectedColor={blackoutColour}
                            />
                        </React.Fragment>
                    ))}
                </div>
                <div className="w-full xl:p-[1.25vw] sm:p-[2.344vw] p-4 flex flex-col xl:gap-[1.25vw] gap-6 border border-[--Black] rounded-48">
                    <h4 className="text-xl text-[--Black]">
                        Sheer Options
                    </h4>
                    <Separate />
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-lg">Enter Measurements</h2>
                        {/* <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p> */}
                    </div>
                    {/* <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={600} widthMax={3000} heightMin={1200} heightMax={3000} /> */}
                    <Measurement measurements={screenMeasurements} setMeasurements={setScreenMeasurements} widthMin={100} widthMax={Math.max(...(groupData?.Width_values || []))} heightMin={100} heightMax={Math.max(...(groupData?.Drop_values || []))} />
                    {productData?.options?.map((option, index) => {
                        const lastValue = option.values?.[option.values.length - 1];

                        const filteredOption = {
                            ...option,
                            values: lastValue ? [lastValue] : [],
                        };

                        return (
                            <React.Fragment key={`color-${index}`}>
                                <Separate />
                                <SelectColor
                                    data={filteredOption}
                                    title={'Screen blind fabrics'}
                                    tag={''}
                                    onColorSelect={setSheerFabric}
                                    selectedColor={screenBlindFabric}
                                />
                            </React.Fragment>
                        );
                    })}

                </div>
                {productOptions.map((option, index) => (
                    <React.Fragment key={`option-${index}`}>
                        <Separate />
                        <SelectVarient
                            variantData={option}
                            onSelectionChange={(value) => handleOptionChange(option.title, value)}
                            selectedValue={data.find(item => item.title === option.title)?.value}
                        />
                    </React.Fragment>
                ))}
                {colorOptions.map((option, index) => (
                    <React.Fragment key={`color-${index}`}>
                        <Separate />
                        <SelectDefaultColor
                            data={option}
                            title={'Colour'}
                            description={''}
                            onColorSelect={getColorSetter(option.title)}
                            selectedColor={getSelectedColor(option.title)}
                        />
                    </React.Fragment>
                ))}
                <Separate />
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <h5 className="text-lg">
                        Do you want to make it motorised
                    </h5>

                    <div className="flex h-16 p-2 items-start gap-6 self-stretch rounded-full border border-[#0F0F0F]">
                        <div className="flex flex-1 self-stretch gap-6">
                            <button
                                onClick={() => setIsMotorised(true)}
                                className={`flex flex-1 items-center justify-center gap-2 self-stretch px-8 py-4 rounded-[48px] transition-colors ${isMotorised ? 'bg-[#CFB9FF]' : ''
                                    }`}
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setIsMotorised(false)}
                                className={`flex flex-1 items-center justify-center gap-2 self-stretch px-8 py-4 rounded-[48px] transition-colors ${!isMotorised ? 'bg-[#CFB9FF]' : ''
                                    }`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
                <Separate />
                <div className="flex items-center justify-between">
                    <h5 className="text-lg">TOTAL PRICE</h5>
                    <h5 className="text-lg">
                        {currencySymbol}{addCommaToNumber(totalPrice)}
                    </h5>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="measurements-checked"
                        checked={measurementsChecked}
                        onCheckedChange={(checked) => setMeasurementsChecked(checked === true)}
                    />
                    <label htmlFor="measurements-checked" className="text-sm normal cursor-pointer">I have double checked my measurements and customisations</label>
                </div>
                {error && (
                    <p className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</p>
                )}
                {success && (
                    <p className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">{success}</p>
                )}
                <div className="flex items-center gap-4">
                    <Button
                        variant={'primary'}
                        size={'large'}
                        className="w-full flex-1"
                        disabled={!measurementsChecked || !!error || totalPrice === 0}
                        onClick={handleAddToCart}
                    >
                        {loading ? 'Adding...' : 'Add to Cart'}
                    </Button>
                    {/* <Button variant={'light'} size={'large'} className="w-full flex-1">
                        Buy Now
                    </Button> */}
                </div>
            </div>
            <ProductCard
                productData={productData}
                customizationData={data}
                totalPrice={`${currencySymbol}${addCommaToNumber(totalPrice)}`}
            />
        </section>
    );
}

export default Double_blind_customization;

