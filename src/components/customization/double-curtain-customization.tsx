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
const fabric = {
    calm: "/images/product-colors-image/sheer/calm.jpg",
    dream: "/images/product-colors-image/sheer/dream.jpg",
    cosmos: "/images/product-colors-image/sheer/cosmos.jpg",
    eclipse: "/images/product-colors-image/sheer/eclipse.jpg",
};

const fabricSheer = {
    sierra: "/images/product-colors-image/fabricSheer/sierra.jpg",
    cetalina: "/images/product-colors-image/fabricSheer/catalina.jpg",
    bora: "/images/product-colors-image/fabricSheer/bora.jpg",
    mojave: "/images/product-colors-image/fabricSheer/mojave.jpg",
    oakbanklien: "/images/product-colors-image/fabricSheer/oakbankLinen.jpg",
};

const blockoutOptions = [
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
const blackoutColours = {
    Calm : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EA', value: 'White', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EB', value: 'Ivory', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'Match to Sheer', },
    ],
    Dream : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EA', value: 'Silver', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EB', value: 'Midnight', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EC', value: 'Dusk', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ED', value: 'Daybreak', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EE', value: 'Dawn', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'Match to Sheer', },
    ],
    Cosmos : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EA', value: 'Ecru', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EB', value: 'Coal', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EC', value: 'Fossil', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ED', value: 'Frost', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EE', value: 'Harbour', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'Hickory', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EG', value: 'Slate', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EH', value: 'Snow', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EI', value: 'Tahini', },  
    ],
    Eclipse : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EC', value: 'Saturn', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5ED', value: 'Aurora', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EE', value: 'Comet', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EF', value: 'Dusk', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EG', value: 'Erth', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EH', value: 'Halley', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EI', value: 'Luna', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EK', value: 'Mars', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EL', value: 'Mercury', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EM', value: 'Nebula', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EN', value: 'Neutron', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EO', value: 'Pluto', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5EP', value: 'Twilight', },   
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQ5Eq', value: 'Venus', },   
    ],
}
const sheerColours = {
    Sierra : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSG', value: 'Alabaster', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSH', value: 'Birch', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSI', value: 'Ebony', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSJ', value: 'Granite', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSK', value: 'Linen', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSL', value: 'Marble', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSM', value: 'Porcelain', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSN', value: 'Quarry', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSO', value: 'Storm', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSP', value: 'White', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSQ', value: 'Mink', },

    ],
    Cetalina : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSR', value: 'Ash', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSS', value: 'Black', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQST', value: 'Chalk', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSU', value: 'Cloud', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSV', value: 'Donkey', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSW', value: 'Drift Wood', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSX', value: 'Flax', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSY', value: 'Gardenia', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSZ', value: 'Pearl', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTA', value: 'Smoke', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTB', value: 'Snow', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTC', value: 'Taupe', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTD', value: 'Thunder', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTE', value: 'Storm', },
    ],
    Bora : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSH', value: 'Basalt' },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSI', value: 'Coral' },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSJ', value: 'Grain' },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSK', value: 'Sand' },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSL', value: 'Stone' },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSM', value: 'Tin Raft' },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSN', value: 'White Heaven' },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQSO', value: 'Feather' },
    ],
    Mojave : [
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTF', value: 'Asphalt', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTG', value: 'Flax', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTH', value: 'Mist', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTI', value: 'Moonlight', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTJ', value: 'Mushroom', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTK', value: 'Quartz', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTL', value: 'Sable', },
        { id: 'optval_01K6Z6D5B6166KXG3RQNVDQTM', value: 'Smoke', },
    ],
    OakbankLien : [
        { "id": "optval_01K6Z6D5B6166KXG3RQNVDQSP", "value": "Coast" },
        { "id": "optval_01K6Z6D5B6166KXG3RQNVDQSQ", "value": "Cosy" },
        { "id": "optval_01K6Z6D5B6166KXG3RQNVDQSR", "value": "Earth" },
        { "id": "optval_01K6Z6D5B6166KXG3RQNVDQSS", "value": "Santai" },
        { "id": "optval_01K6Z6D5B6166KXG3RQNVDQST", "value": "Wabi-Sabi" }
    ],
}

function Double_curtain_customization(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: '', width: 1, height: 1 });
    const [blackoutFabric, setBlackoutFabric] = useState('');
    const [blackoutColour, setBlackoutColour] = useState('');
    const [sheerFabric, setSheerFabric] = useState('');
    const [sheerColour, setSheerColour] = useState('');
    const [productData, setProductData] = useState(props.data);
    // console.log('productData', productData);
    const [selectedColor, setSelectedColor] = useState('');
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
    
    // Get available colors for selected fabric
    // const selectedBlackoutFabric = productData?.options?.[0]?.values?.find(fabric => fabric.label === blackoutFabric);
    // const blackoutColorOptions = selectedBlackoutFabric?.colors || blockoutOptions[0].values;
    
    // const selectedSheerFabric = productData?.options?.[1]?.values?.find(fabric => fabric.label === sheerFabric);
    // const sheerColorOptions = selectedSheerFabric?.colors || sheerOptions[0].values;
    
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
    const [blockoutColourData, setBlockoutColourData] = useState([{
        id: 'optgrp_01K6Z6D5B6166KXE3RGNVDQ5EN',
        title: 'Blockout Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: []
    }]);
    const [sheerColourData, setSheerColourData] = useState([{
        id: 'optgrp_01K6Z6D5B6166KXE3RGNVDQ5EN',
        title: 'Sheer Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: []
    }]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // if (lenis) {
        //     lenis.on('scroll', ScrollTrigger.update);
        // }
    }, [lenis]);

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
                setTotalPrice(defaultVariant.price_sets[0].prices[0].amount);

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
            const code = selectedVariant?.price_sets?.[0]?.prices?.[0]?.currency_code || 'USD';
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
            if (sheerColours[sheerFabric.replace(/\s+/g, '')]) {
                setSheerColourData([{
                    ...sheerColourData[0],
                    values: sheerColours[sheerFabric.replace(/\s+/g, '')]
                }]);
            } else {
                setSheerColourData([{
                    ...sheerColourData[0],
                    values: []
                }]);
            }
            setSheerColour('');
        }
    }, [sheerFabric]);

    

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
        // Calculate total price based on area
        const basePrice = calculateBasePrice();
        const area = measurements.width * measurements.height;
        const newTotalPrice = Math.round(basePrice * area);
        setTotalPrice(newTotalPrice);
    }, [blackoutFabric,blackoutColour,sheerFabric,sheerColour, productData?.variants, measurements.width, measurements.height]);


    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
            console.error("User Data not found in localStorage");
            return;
        }
        const userDataObj = JSON.parse(userDataString);
        setUserData(userDataObj);
    }, [userData]);

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
                    <h2 className="text-xl">Double Curtains Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Separate/>
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={600} widthMax={3000} heightMin={1200} heightMax={3000} />
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
                                onColorSelect={setBlackoutColour}
                                selectedColor={blackoutColour}
                            />
                        </React.Fragment>
                    ))}
                    {blockoutOptions.map((option, index) => (
                        <React.Fragment key={`option-${index}`}>
                            <Separate />
                            <SelectVarient 
                                variantData={option}
                                onSelectionChange={(value) => handleOptionChange(option.title, value)} 
                                selectedValue={data.find(item => item.title === option.title)?.value}
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
                                colorsImage={fabricSheer}
                                onColorSelect={setSheerFabric}
                                selectedColor={sheerFabric}
                            />
                        </React.Fragment>
                    ))}
                    
                    {sheerFabric !== '' && sheerColourData.map((option, index) => (
                        <React.Fragment key={`color-${index}`}>
                            <Separate />
                            <SelectColor
                                data={option}
                                onColorSelect={setSheerColour}
                                selectedColor={sheerColour}
                            />
                        </React.Fragment>
                    ))}
                    
                    {sheerOptions.map((option, index) => (
                        <React.Fragment key={`option-${index}`}>
                            <Separate />
                            <SelectVarient 
                                variantData={option}
                                onSelectionChange={(value) => handleOptionChange(option.title, value)} 
                                selectedValue={data.find(item => item.title === option.title)?.value}
                            />
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

export default Double_curtain_customization;

