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
    const [productData, setProductData] = useState(props.data);
    const [data, setData] = useState([
        {'title': 'Colour', 'value': selectedColor},
        {'title': 'Size', 'value': measurements.width && measurements.height ? `${measurements.width}m x ${measurements.height}m` : ''},
        {'title': 'Controls', 'value': ''},
        {'title': 'Select Fit', 'value': ''},
        {'title': 'Track Colour', 'value': ''},
        {'title': 'Weight Type', 'value': ''},
    ]);
    
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
        setData(prev => 
            prev.map(item => 
                item.title === 'Colour' 
                    ? { ...item, value: selectedColor }
                    : item
            )
        );
    }, [selectedColor]);

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
        const basePrice = calculateBasePrice();
        const area = measurements.width * measurements.height;
        const newTotalPrice = Math.round(basePrice * area);
        setTotalPrice(newTotalPrice);
            
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
        }else{
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
        }else{
            setError('');
            setSuccess('');
        }
        if (!userData) {
            setError('Customer not found. Please register first.');
            setSuccess('');
            setLoading(false);
            return;
        }else{
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

export default Vertical_blinds_customization;

