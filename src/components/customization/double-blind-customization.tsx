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
import { createAddToCart } from '../../services/add-to-cart';
import { interpolate2D, widthValues, dropValues, priceMatrix } from "./blind_interpolate";


const setupOptions = [
    {
        id: 1,
        title: 'Setup',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
            { label: 'Blockout in Front', image: '/images/custom/blind-blockout-front.png' },
            { label: 'Sunscreen or Light Filtering in Front', image: '/images/custom/sunscreen-front.png' },
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
const LightFilteringFabric = {
    breeze: "/images/product-colors-image/sunscreen/breeze.jpg",
    haven: "/images/product-colors-image/sunscreen/haven.jpg",
    shadow: "/images/product-colors-image/sunscreen/shadow.jpg",
    twilight: "/images/product-colors-image/sunscreen/twilight.jpg",
    seclusion: "/images/product-colors-image/sunscreen/seclusion.jpg",
    ora: "/images/product-colors-image/sunscreen/ora.jpg",
};
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
            { label: 'Front & Back Roll', image: '/images/custom/front-back-roll.png' },
            { label: 'Both Front Roll', image: '/images/custom/both-front-roll.png' },
            { label: 'Back & Front Roll', image: '/images/custom/back-front-roll.png' },
            { label: 'Both Back Roll', image: '/images/custom/both-back-roll.png' },
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
const blackoutColours = {
    nova : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EA', value: 'nova-black', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EB', value: 'nova-cream', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EC', value: 'nova-sahara', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ED', value: 'nova-sky', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EE', value: 'nova-snow', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'nova-stone', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EG', value: 'nova-white', },  
    ],
    azure : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EA', value: 'azure-black', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EB', value: 'azure-cream', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EC', value: 'azure-dark-grey', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ED', value: 'azure-grey', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EE', value: 'azure-moon', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'azure-powder', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EG', value: 'azure-sand', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EH', value: 'azure-stone', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EI', value: 'azure-white', },   
    ],
    phantom : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EC', value: 'phantom-breeze', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ED', value: 'phantom-lunar', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EE', value: 'phantom-mercury', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'phantom-midnight', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EG', value: 'phantom-mocha', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EH', value: 'phantom-quartz', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EI', value: 'phantom-snow', },   
    ],
    omega : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5oC', value: 'omega-cream', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5oD', value: 'omega-sage', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5oE', value: 'omega-willow', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5oF', value: 'omega-lvory', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5oG', value: 'omega-frost', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5oI', value: 'omega-saturn', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5oj', value: 'omega-mirage', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ok', value: 'omega-venus', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ol', value: 'omega-raven', },   
    ],
    zenith : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EC', value: 'zenith-black', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ED', value: 'zenith-blush', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EE', value: 'zenith-charcoal', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'zenith-dark-grey', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EG', value: 'zenith-ghost', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EH', value: 'zenith-grey', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EI', value: 'zenith-meadow', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EK', value: 'zenith-ocean', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EL', value: 'zenith-silk', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EM', value: 'zenith-soft', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EN', value: 'zenith-whisfer', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EO', value: 'zenith-white', },   
    ],
}
const sheerColours = {
    Twilight : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSA', value: 'Dove White', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSB', value: 'Ecru', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSC', value: 'Ice Grey', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSD', value: 'Moon Stone', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSE', value: 'Nougat', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSF', value: 'Quill', },
    ],
    Seclusion : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSA', value: 'Mineral', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSB', value: 'Plaster', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSC', value: 'Slate', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSD', value: 'Suede', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSE', value: 'Truffle', }, 
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSF', value: 'Marble', }, 
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSG', value: 'Limestone', }, 
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSH', value: 'Leva', }, 
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSI', value: 'Fossil', }, 
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSJ', value: 'Ceramic', }, 
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSK', value: 'Baltic', }, 
    ],
    Haven : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSA', value: 'Cloud', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSB', value: 'Grey Gum', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSC', value: 'Rattan', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSD', value: 'Opal', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSE', value: 'Nougat', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSF', value: 'Slate', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSG', value: 'Willow', },   
    ],
    Ora : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSA', value: 'Armour', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSB', value: 'Brich', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSC', value: 'Bourneville', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSD', value: 'Chrome', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSE', value: 'Concrete', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSF', value: 'Dove', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSG', value: 'Jet', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSH', value: 'Pearl', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSI', value: 'Platinum', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSJ', value: 'Putty', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSK', value: 'Pyrite', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSL', value: 'Steel', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSM', value: 'White', },   
    ],
    Breeze : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSA', value: 'Pure White', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSB', value: 'Graphite', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSC', value: 'Pewter', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSD', value: 'Charcoal', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSE', value: 'Ivory', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSF', value: 'Black Pearl', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSG', value: 'Barley', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSH', value: 'Black', },
    ],
    Shadow : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSA', value: 'Black', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSB', value: 'White', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSC', value: 'Black Belge', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSD', value: 'White Silver', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSE', value: 'White Stone', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSF', value: 'Charcoal', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSG', value: 'White Grey', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSH', value: 'Charcoal Grey', }
    ],
}
function Double_blind_customization(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: '', width: 600, height: 2000 });
    const [blackoutFabric, setBlackoutFabric] = useState('');
    const [blackoutColour, setBlackoutColour] = useState('');
    const [sheerFabric, setSheerFabric] = useState('');
    // const [sheerColour, setSheerColour] = useState('');
    const [productData, setProductData] = useState(props.data);
    const [selectedColor, setSelectedColor] = useState('');
    const [chainColour, setChainColour] = useState('');
    const [bracketColour, setBracketColour] = useState('');
    const [baseRailColour, setBaseRailColour] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [measurementsChecked, setMeasurementsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    type UserData = {
        id: string | number;
        email: string;
        first_name: string;
        last_name: string;
    };
    const [userData, setUserData] = useState<UserData | null>(null);
    const selectedBlackoutFabric = productData?.options?.[0]?.values?.find(fabric => fabric.label === blackoutFabric);
    const selectedSheerFabric = productData?.options?.[1]?.values?.find(fabric => fabric.label === sheerFabric);
    const [data, setData] = useState([
        { 'title': 'Setup', 'value': '' },
        { 'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : '' },
        { 'title': 'Blackout Fabric', 'value': blackoutFabric },
        { 'title': 'Blackout Colour', 'value': blackoutColour },
        // { 'title': 'Blockout Curtain Style', 'value': '' },
        // { 'title': 'Blockout Hem', 'value': '' },
        { 'title': 'Sheer Fabric', 'value': sheerFabric },
        // { 'title': 'Sheer Colour', 'value': sheerColour },
        { 'title': 'Controls', 'value': '' },
        { 'title': 'Select Fit', 'value': '' },
        { 'title': 'Roll Direction', 'value': '' },
        { 'title': 'Base Rail Shape', 'value': '' },
        { 'title': 'Chain Colour', 'value': chainColour },
        { 'title': 'Bracket Colour', 'value': bracketColour },
        { 'title': 'Base Rail Colour', 'value': baseRailColour },
    ]);
    const [blockoutColourData, setBlockoutColourData] = useState([{
        id: 'optgrp_01K6Z6D5B6166KXE3RGNVDQ5EN',
        title: 'Blockout Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: []
    }]);
    const [sheerColourData, setSheerColourData] = useState([{
        id: 'optgrp_01K6Z6D5B6166KXE3RGNVDQ5EN',
        title: 'Sunscreen or Light Filtering Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: []
    }]);
    const calculatePrice = () => {
        // Validate inputs
        if (!measurements.width || !measurements.height) {
        setError("Please enter both width and drop values")
        //   setCalculatedPrice(null)
        return
        }

        const widthMm = Math.round(Number(measurements.width));
        const dropMm = Math.round(Number(measurements.height));

        // Check ranges (in mm)
        const minWidth = Math.min(...widthValues);
        const maxWidth = Math.max(...widthValues);
        const minDrop = Math.min(...dropValues);
        const maxDrop = Math.max(...dropValues);

        if (widthMm < minWidth || widthMm > maxWidth) {
            setError(`Width must be between ${minWidth} mm and ${maxWidth} mm`)
            setTotalPrice(0)
            return
        }

        if (dropMm < minDrop || dropMm > maxDrop) {
            setError(`Drop must be between ${minDrop} mm and ${maxDrop} mm`)
            setTotalPrice(0)
            return
        }

        const price = interpolate2D(widthMm, dropMm, widthValues, dropValues, priceMatrix)
        // console.log("Calculated Price:", price);
        if (price === null) {
            setError("Unable to calculate price for these dimensions")
            setTotalPrice(0)
        } else {
            setError("")
            const widthM = measurements.width / 1000;   // e.g. 600 → 0.6m
            const heightM = measurements.height / 1000; // e.g. 1200 → 1.2m

            // Height blocks of 3 metres
            const heightBlocks = Math.ceil(heightM / 3);

            // Client pricing formula
            const curtainPrice = Math.round(
                200 * widthM * heightBlocks
            );
            setTotalPrice((price + curtainPrice));
        }
    }

    useEffect(() => {
        // debounce if needed, but call immediately for now
        calculatePrice();
    }, [measurements.width, measurements.height]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // if (lenis) {
        //     lenis.on('scroll', ScrollTrigger.update);
        // }
    }, [lenis]);

    // Set default color and price when component mounts
    useEffect(() => {
        if (productData?.options?.[0]?.values?.[0]?.value && !selectedColor) {
            const defaultColor = productData.options[0].values[0].value;
            setSelectedColor(defaultColor);

            // Find the variant with the default color and set its price
            const defaultVariant = productData?.variants?.find(
                variant => variant.title === defaultColor ||
                    variant.options.some(opt => opt.value === defaultColor)
            );

            if (defaultVariant?.price_sets?.[0]?.prices?.[0]?.amount) {
                // setTotalPrice(defaultVariant.price_sets[0].prices[0].amount);

            }
        }
    }, [productData]);

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

    const calculateBasePrice = () => {
        if (selectedColor && productData?.variants) {
            const selectedVariant = productData.variants.find(
                variant => variant.title === selectedColor ||
                    variant.options.some(opt => opt.value === selectedColor)
            );
            const code = selectedVariant?.price_sets?.[0]?.prices?.[0]?.currency_code || 'aud';
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
            setCurrencySymbol(symbol);
            return selectedVariant?.price_sets?.[0]?.prices?.[0]?.amount || 0;
        }
        return 0;
    };

    useEffect(() => {
        if (blackoutFabric) {
            if (blackoutColours[blackoutFabric]) {
                setBlockoutColourData([{
                    ...blockoutColourData[0],
                    values: blackoutColours[blackoutFabric]
                }]);
            } else {
                setBlockoutColourData([{
                    ...blockoutColourData[0],
                    values: []
                }]);
            }
            setBlackoutColour('');
        }
    }, [blackoutFabric]);
    useEffect(() => {
        if (sheerFabric) {
            if (sheerColours[sheerFabric]) {
                setSheerColourData([{
                    ...sheerColourData[0],
                    values: sheerColours[sheerFabric]
                }]);
            } else {
                setSheerColourData([{
                    ...sheerColourData[0],
                    values: []
                }]);
            }
            // setSheerColour('');
        }
    }, [sheerFabric]);

    useEffect(() => {
        setData(prev =>
            prev.map(item =>
                item.title === 'Blackout Fabric'
                ? { ...item, value: blackoutFabric }
                : item.title === 'Blackout Colour'
                ? { ...item, value: blackoutColour }
                : item.title === 'Sheer Fabric'
                ? { ...item, value: sheerFabric }
                // : item.title === 'Sheer Colour'
                // ? { ...item, value: sheerColour }
                : item.title === 'Chain Colour'
                ? { ...item, value: chainColour }
                : item.title === 'Bracket Colour'
                ? { ...item, value: bracketColour }
                : item.title === 'Base Rail Colour'
                ? { ...item, value: baseRailColour }
                : item
            )
        );
        // Calculate total price based on area
        const basePrice = calculateBasePrice();
        const area = measurements.width * measurements.height;
        const newTotalPrice = Math.round(basePrice * area);
        // setTotalPrice(newTotalPrice);

    // }, [blackoutFabric, blackoutColour, sheerFabric, sheerColour, chainColour, bracketColour, baseRailColour, productData?.variants, measurements.width, measurements.height]);
    }, [blackoutFabric, blackoutColour, sheerFabric, chainColour, bracketColour, baseRailColour, productData?.variants, measurements.width, measurements.height]);

    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
            console.error("User Data not found in localStorage");
            return;
        }
        const userDataObj = JSON.parse(userDataString);
        setUserData(userDataObj);
    }, [userData]);

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
        if (!userData) {
            setError('Customer not found. Please register first.');
            setSuccess('');
            setLoading(false);
            return;
        } else {
            setError('');
            setSuccess('');
        }

        try {
            const response = await createAddToCart.addToCart({
                email: userData.email,
                product_id: productData.id,
                quantity: 1,
                customizations: {
                    title: productData.title,
                    amount: totalPrice,
                    currency: currencySymbol,
                    thumbnail: productData.thumbnail,
                    customizationData: data,
                },
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
    const addCommaToNumber = (num) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return (
        <section className="w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[64px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-6 xl:pb-[5.833vw]">
                <div className="w-full flex flex-col gap-2 text-[--Black]">
                    <h2 className="text-xl">Double Roller BLINDS Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Separate />
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={600} widthMax={3000} heightMin={1200} heightMax={3000} />
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
                    {productData?.options?.slice(0, 1).map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate />
                            <SelectColor
                                data={option}
                                colorsImage={fabric}
                                onColorSelect={setBlackoutFabric}
                                selectedColor={blackoutFabric}
                            />
                        </React.Fragment>
                    ))}
                    {blackoutFabric !== '' &&blockoutColourData.map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate />
                            <SelectColor
                                data={option}
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
                    {productData?.options?.slice(1, 2).map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate />
                            <SelectColor
                                data={option}
                                // colorsImage={LightFilteringFabric}
                                onColorSelect={setSheerFabric}
                                selectedColor={sheerFabric}
                            />
                        </React.Fragment>
                    ))}
                    {/* {sheerFabric !== '' && sheerColourData.map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate />
                            <SelectColor
                                data={option}
                                onColorSelect={setSheerColour}
                                selectedColor={sheerColour}
                            />
                        </React.Fragment>
                    ))} */}
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
                        <SelectColor
                            data={option}
                            title={'Colour'}
                            description={'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.'}
                            onColorSelect={getColorSetter(option.title)} 
                            selectedColor={getSelectedColor(option.title)}
                        />
                    </React.Fragment>
                ))}
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
                        disabled={!measurementsChecked}
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

