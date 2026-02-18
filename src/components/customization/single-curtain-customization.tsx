import React, { useEffect, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import SelectDefaultColor from "./selectdefultColor";
import SelectVarient from "./selectVarient";
import ProductCard from "./ProductCard";
import { Checkbox } from "@lib/components/ui/checkbox";
import { Button } from "@lib/components/ui/button";
import Separate from "@components/separate";
import Measurement from "./measurement";
import { createAddToCart } from '../../services/add-to-cart';
import { interpolate2D, widthValues, dropValues, priceMatrix } from "./curtain_interpolate";
import { addCommaToNumber, getCurrencySymbol } from "./customization-utils";
import type { UserData, CustomizationDataItem } from "./customization-types";


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
        title: 'Curtain Style',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
            { label: 'S Fold', image: '/images/custom/s-fold.jpg' },
            { label: 'Triple Pinch Pleat', image: '/images/custom/pinch.jpg' },
            { label: 'Pencil Pleat', image: '/images/custom/pencil-pleat.jpg' },
        ]
    },
    {
        id: 1,
        title: 'Curtain Hem',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
            { label: 'Lead Weight', image: '/images/custom/lead-weight.png' },
            { label: '70mm Hem', image: '/images/custom/70mm.png' },
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
    {
        id: 1,
        title: 'Bracket Style',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. ',
        values: [
            { label: 'Standard', image: '/images/custom/standard.png' },
            { label: 'Extension', image: '/images/custom/extension.png' },
        ]
    },
]

function Single_curtain_customization(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: '', width: 2000, height: 3800 });
    const [selectedColor, setSelectedColor] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [priceGroup, setPriceGroup] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [measurementsChecked, setMeasurementsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [productData, setProductData] = useState(props.data);
    const [data, setData] = useState([
        { 'title': 'Colour', 'value': selectedColor },
        { 'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : '' },
        { 'title': 'Fitting Type', 'value': '' },
        { 'title': 'Select Fit', 'value': '' },
        { 'title': 'Curtain Stack', 'value': '' },
        { 'title': 'Curtain Style', 'value': '' },
        { 'title': 'Curtain Hem', 'value': '' },
        { 'title': 'Track Type', 'value': '' },
        { 'title': 'Wand Length', 'value': '' },
        { 'title': 'Track Colour', 'value': '' },
        { 'title': 'Bracket Style', 'value': '' },
    ]);


    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     if (lenis) {
    //         lenis.on('scroll', ScrollTrigger.update);
    //     }
    // }, [lenis]);

    const calculatePrice = () => {
        // Validate inputs
        if (!measurements.width || !measurements.height) {
            setError("Please enter both width and drop values")
            //   setCalculatedPrice(null)
            return
        }

        // Measurements are provided in millimetres (MM) from the Measurement inputs.
        // Use values directly as mm for interpolation/validation.
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

        const price = interpolate2D(widthMm, dropMm, widthValues, dropValues, priceMatrix[priceGroup])
        console.log("Calculated Price:", price, priceGroup);
        if (price === null) {
            setError("Unable to calculate price for these dimensions")
            setTotalPrice(0)
        } else {
            setError("")
            setTotalPrice(price)
        }
    }

    // Recalculate price whenever measurements change
    useEffect(() => {
        // debounce if needed, but call immediately for now
        calculatePrice();
    }, [measurements.width, measurements.height, priceGroup]);

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
                // if(defaultGroup >= 1){
                //     defaultGroup = defaultGroup - 1;
                // }
                setPriceGroup(Math.max(0, defaultGroup));

            }
        }
    }, [productData, priceGroup]);

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
                variant => variant.title === selectedColor ||
                    variant.options.some(opt => opt.value === selectedColor)
            );
            const code = selectedVariant?.price_sets?.[0]?.prices?.[0]?.currency_code || 'aud';
            setCurrencySymbol(getCurrencySymbol(code));
            return selectedVariant?.price_sets?.[0]?.prices?.[0]?.amount || 0;
        }
        return 0;
    };

    useEffect(() => {
        // Update color in data array
        setData(prev =>
            prev.map(item =>
                item.title === 'Colour'
                    ? { ...item, value: selectedColor }
                    : item
            )
        );

        // Calculate total price based on area
        const group = calculateBaseGroup();
        setPriceGroup(Math.max(0, group - 1));

    }, [selectedColor, productData?.variants, measurements.width, measurements.height]);

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
                    <h2 className="text-xl">{props.type ? props.type : 'Curtain'} Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Separate />
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={Math.min(...widthValues)} widthMax={Math.max(...widthValues)} heightMin={Math.min(...dropValues)} heightMax={Math.max(...dropValues)} />
                {productData?.options?.map((option, index) => (
                    <React.Fragment key={`color-${index}`}>
                        <Separate />
                        <SelectDefaultColor
                            data={option}
                            title={'Colour'}
                            productName={productData.title}
                            description={'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.'}
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
                    {/* <Button variant={'light'} size={'large'} className="w-full flex-1"
                        disabled={!measurementsChecked}
                    >
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

export default Single_curtain_customization;

