import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import SelectDefultColor from "./selectdefultColor";
import SelectVarient from "./selectVarient";
import ProductCard from "./ProductCard";
import { Checkbox } from "@lib/components/ui/checkbox";
import { Button } from "@lib/components/ui/button";
import Separate from "@components/separate";
import Measurement from "./measurement";
import { createAddToCart } from '../../services/add-to-cart';
import { interpolate2D } from "./interpolate";
import { addCommaToNumber, getCurrencySymbol } from "./customization-utils";


const productOptions = [

    {
        id: 1,
        title: 'Select Fit',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
            { label: 'Face Fit', image: '/images/custom/blind-fit-left.png' },
            { label: 'Recess Fit', image: '/images/custom/blind-fit-right.png' },
        ]
    },
    {
        id: 1,
        title: 'Hinge Colour',
        description: 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.',
        values: [
            { label: 'White', image: '/images/custom/hinge-white.png' },
            { label: 'Beige', image: '/images/custom/hinge-beige.png' },
            { label: 'Chrome', image: '/images/custom/hinge-chrome.png' },
            { label: 'Anodised Silver', image: '/images/custom/hinge-anodised-silver.png' },
        ]
    },
]

function Shutters_customization({ data: propsData, groupData }) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [measurements, setMeasurements] = useState({ roomName: '', width: Math.min(...(groupData?.Width_values || [])), height: Math.min(...(groupData?.Drop_values || [])) });
    const [selectedColor, setSelectedColor] = useState('');
    const [priceGroup, setPriceGroup] = useState(0);
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
    const [productData, setProductData] = useState(propsData);
    const [data, setData] = useState([
        { 'title': 'Colour', 'value': selectedColor },
        { 'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : '' },
        { 'title': 'Select Fit', 'value': '' },
        { 'title': 'Hinge Colour', 'value': '' },
    ]);

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
        const currentWidthValues = groupData?.Width_values || [];
        const currentDropValues = groupData?.Drop_values || [];
        const currentPriceMatrix = groupData?.Price_groups || [];

        const minWidth = Math.min(...currentWidthValues);
        const maxWidth = Math.max(...currentWidthValues);
        const minDrop = Math.min(...currentDropValues);
        const maxDrop = Math.max(...currentDropValues);

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

        const price = interpolate2D(widthMm, dropMm, currentWidthValues, currentDropValues, currentPriceMatrix[priceGroup])
        console.log("Calculated Price:", price);
        if (price === null) {
            setError("Unable to calculate price for these dimensions")
            setTotalPrice(0)
        } else {
            setError("")
            setTotalPrice(price)
        }
    }

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
                setPriceGroup(Math.max(0, defaultGroup));
            }
        }
    }, [productData]);

    // Recalculate price whenever measurements change
    useEffect(() => {
        // debounce if needed, but call immediately for now
        calculatePrice();
    }, [measurements.width, measurements.height, priceGroup]);

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

    useEffect(() => {
        // Update color in data array
        setData(prev =>
            prev.map(item =>
                item.title === 'Colour'
                    ? { ...item, value: selectedColor }
                    : item
            )
        );

        var group = calculateBaseGroup();
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

        const cartItem = {
            id: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
            product_id: productData.id,
            quantity: 1,
            variants: productData.product.variants,
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
                variants: cartItem.variants,
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
                    <h2 className="text-xl">Shutters Customisations</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Separate />
                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-lg">Enter Measurements</h2>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                </div>
                <Measurement measurements={measurements} setMeasurements={setMeasurements} widthMin={Math.min(...(groupData?.Width_values || []))} widthMax={Math.max(...(groupData?.Width_values || []))} heightMin={Math.min(...(groupData?.Drop_values || []))} heightMax={Math.max(...(groupData?.Drop_values || []))} />
                {productData?.options?.map((option, index) => (
                    <React.Fragment key={`color-${index}`}>
                        <Separate />
                        <SelectDefultColor
                            data={option}
                            title={'Colour'}
                            colorsType={'shutter'}
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

export default Shutters_customization;

