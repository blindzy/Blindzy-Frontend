import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import SelectDefaultColor from "./selectdefultColor";
import SelectColor from "./selectColor";
import SelectVarient from "./selectVarient";
import ProductCard from "./ProductCard";
import { Checkbox } from "@lib/components/ui/checkbox";
import { Button } from "@lib/components/ui/button";
import Separate from "@components/separate";
import Measurement from "./measurement";
import { createAddToCart } from '../../services/add-to-cart';
import { interpolate2D } from "./blind-interpolate";
import { addCommaToNumber, getCurrencySymbol } from "./customization-utils";
import { COLOR_OPTIONS } from "./customization-constants";
import type { UserData, CustomizationDataItem } from "./customization-types";

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
        // description: 'Select either Face Fit or Recess Fit. You should have measured your window based on this choice.',
        description: '',
        values: [
            { label: 'Face Fit', image: '/images/custom/blind-fit-left.png' },
            { label: 'Recess Fit', image: '/images/custom/blind-fit-right.png' },
        ]
    },
    {
        id: 1,
        title: 'Roll Direction',
        // description: 'Choose between Front Roll (blind rolls off the front, tube hidden behind fabric) or Back Roll (most popular, minimizes gaps and blocks more light).',
        description: '',
        values: [
            { label: 'Front Roll', image: '/images/custom/roll-direction-1.png' },
            { label: 'Back Roll', image: '/images/custom/roll-direction-2.png' },
        ]
    },
    {
        id: 1,
        title: 'Base Rail Shape',
        // description: 'We offer a flat or oval option for the base rail, which gives weight to the bottom of your blind.',
        description: '',
        values: [
            { label: 'Oval', image: '/images/custom/rail-1.png' },
            { label: 'Square', image: '/images/custom/rail-2.png' },
        ]
    },
]

const colorOptions = COLOR_OPTIONS;


function Single_blinds_customization({ data: propsData, groupData }) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const [measurements, setMeasurements] = useState({ roomName: 'Bedroom', width: Math.min(...(groupData?.Width_values || [])), height: Math.min(...(groupData?.Drop_values || [])) });
    const [selectedColor, setSelectedColor] = useState('');
    const [svgColor, setSvgColor] = useState('#4A4A4A');
    const [chainColour, setChainColour] = useState('');
    const [bracketColour, setBracketColour] = useState('');
    const [baseRailColour, setBaseRailColour] = useState('');
    const [priceGroup, setPriceGroup] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [measurementsChecked, setMeasurementsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isMotorised, setIsMotorised] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [productData, setProductData] = useState(propsData);
    const [data, setData] = useState([
        { 'title': 'Colour', 'value': selectedColor },
        { 'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.roomName} : ${measurements.width}mm x ${measurements.height}mm` : '' },
        { 'title': 'Controls', 'value': '' },
        { 'title': 'Select Fit', 'value': '' },
        { 'title': 'Roll Direction', 'value': '' },
        { 'title': 'Base Rail Shape', 'value': '' },
        { 'title': 'Chain Colour', 'value': chainColour },
        { 'title': 'Bracket Colour', 'value': bracketColour },
        { 'title': 'Base Rail Colour', 'value': baseRailColour },
        { 'title': 'Base Rail Colour', 'value': baseRailColour },
        { 'title': 'Motorised', 'value': isMotorised ? 'Yes' : 'No' },
    ]);
    const lenis = isDesktop ? useLenis() : null;

    const calculatePrice = () => {
        // Validate inputs
        if (!measurements.width || !measurements.height) {
            setError("Please enter both width and drop values")
            //   setCalculatedPrice(null)
            return
        }

        // Clear any previous error since measurements are now valid
        setError("");

        // Measurements are provided in millimetres (MM) from the Measurement inputs.
        // Use values directly as mm for interpolation/validation.
        let widthMm = Math.round(Number(measurements.width));
        let dropMm = Math.round(Number(measurements.height));

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
            setError(`Width must be between ${minWidth} mm and ${maxWidth} mm`)
            setTotalPrice(0)
            return
        }

        if (dropMm < minDrop) {
            dropMm = minDrop;
        } else if (dropMm > maxDrop) {
            setError(`Drop must be between ${minDrop} mm and ${maxDrop} mm`)
            setTotalPrice(0)
            return
        }

        

        let price = interpolate2D(widthMm, dropMm, currentWidthValues, currentDropValues, currentPriceMatrix[priceGroup])

        if(isMotorised && price) price += 200;
        // console.log("Calculated Price:", price);
        if (price === null) {
            setError("Unable to calculate price for these dimensions")
            setTotalPrice(0)
        } else {
            // Only clear measurement/fabric related errors
            if (error.includes("Width") || error.includes("Drop") || error.includes("dimensions")) {
                setError("")
            }
            setTotalPrice(price)
        }
    }

    // Recalculate price whenever measurements change
    useEffect(() => {
        // debounce if needed, but call immediately for now
        calculatePrice();
    }, [measurements.width, measurements.height, priceGroup, isMotorised]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }
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
                var defaultGroup = defaultVariant.price_sets[0].prices[0].amount;
                setPriceGroup(Math.max(0, defaultGroup - 1));
                const code = defaultVariant?.price_sets?.[0]?.prices?.[0]?.currency_code || 'aud';
                setCurrencySymbol(getCurrencySymbol(code));
            }
        }
    }, [productData, priceGroup]);

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

    const calculateBaseGroup = () => {
        if (selectedColor && productData?.variants) {
            const selectedVariant = productData.variants.find(
                variant => variant.title === (selectedColor.split(' - ')[0]) ||
                    variant.options.some(opt => opt.value === (selectedColor.split(' - ')[0]))
            );
            const code = selectedVariant?.price_sets?.[0]?.prices?.[0]?.currency_code || 'aud';
            setCurrencySymbol(getCurrencySymbol(code));
            return selectedVariant?.price_sets?.[0]?.prices?.[0]?.amount || 0;
        }
        return 0;
    };


    // Extract random pixel color from the selected blind color image
    const extractColorFromImage = (imageUrl: string) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(img, 0, 0);
            const cx = Math.floor(img.width * 0.25 + Math.random() * img.width * 0.5);
            const cy = Math.floor(img.height * 0.25 + Math.random() * img.height * 0.5);
            const pixel = ctx.getImageData(cx, cy, 1, 1).data;
            const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
            setSvgColor(hex);
        };
        img.onerror = () => setSvgColor('#4A4A4A');
        img.src = imageUrl;
    };

    // Update color in data array and price group when selection changes
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
                : item.title === 'Size'
                ? { ...item, value: measurements.width && measurements.height ? `${measurements.roomName} : ${measurements.width}mm x ${measurements.height}mm` : '' }
                : item.title === 'Motorised'
                ? { ...item, value: isMotorised ? 'Yes' : 'No' }
                : item
            )
        );
        // Calculate total price based on area
        const group = calculateBaseGroup();
        setPriceGroup(Math.max(0, group - 1));

        // Clear "Please select all customization options" when user changes something
        if (error.includes("select all")) {
            setError("");
        }
    }, [selectedColor, chainColour, bracketColour, baseRailColour, isMotorised, productData?.variants, measurements.roomName, measurements.width, measurements.height]);

    // Extract color for SVG from selected fabric image
    useEffect(() => {
        // selectedColor format: "{fabricName} - {tag} - {colorName}" e.g. "phantom - blockout - breeze"
        if (selectedColor) {
            const parts = selectedColor.split(' - ');
            if (parts.length >= 3) {
                const fabricName = parts[0].trim().toLowerCase().replace(/\s+/g, '_');
                const colorName = parts[2].trim().toLowerCase();
                const imageUrl = `/images/product-colors-image/blinds-fabric/${fabricName}/${colorName}.jpg`;
                extractColorFromImage(imageUrl);
            }
        }
    }, [selectedColor]);

    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        if (!userDataString) return;
        setUserData(JSON.parse(userDataString));
    }, []);



    // Helper function to get the right color setter
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

        const cartItem = {
            id: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            product_id: productData.id,
            quantity: 1,
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
        } else {
            setError('');
            setSuccess('');
        }

        try {
            await createAddToCart.addToCart({
                email: userData.email,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
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
                    <h2 className="text-xl">Blinds Customisations</h2>
                    {/* <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p> */}
                </div>
                <Separate />    
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    {/* <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p> */}
                </div>
                {/* <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={600} widthMax={3000} heightMin={1200} heightMax={3000} /> */}
                <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={100} widthMax={Math.max(...(groupData?.Width_values || []))} heightMin={100} heightMax={Math.max(...(groupData?.Drop_values || []))} />
                {productData?.options?.map((option, index) => (
                    <React.Fragment key={`color-${index}`}>
                        <Separate />
                        <SelectColor
                            data={option}
                            tag={productData.tags?.[0].value || ''}
                            title={'Colour'}
                            colorsType={'blind'}
                            // description={'Pick your preferred colour. Consider ordering free samples to see the fabrics in person.'}
                            description={''}
                            onColorSelect={setSelectedColor}
                            selectedColor={selectedColor}
                        />
                    </React.Fragment>
                ))}
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
                            colorsType={'blind'}
                            // description={'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.'}
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

                    {/* <p className="text-sm">
                        Lorem ipsum
                    </p> */}

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
                svg={true}
                productData={productData}
                customizationData={data}
                totalPrice={`${currencySymbol}${addCommaToNumber(totalPrice)}`}
                svgColor={svgColor}
            />
        </section>
    );
}

export default Single_blinds_customization;

