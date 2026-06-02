import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@lib/components/ui/button";
import { Plus } from 'lucide-react';
import SelectDefultColor from "@components/shop/selectdefultColor";
import { interpolate2D } from "@components/customization/interpolate";
import { addCommaToNumber, getCurrencySymbol } from "@components/customization/customization-utils";




function ProductComponent({ data, groupData, measurements, customizePage }) {


    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [priceGroup, setPriceGroup] = useState(0);
    const [error, setError] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [screenBlindPriceGroup, setScreenBlindPriceGroup] = useState(0);

    // Derive range bounds once per groupData instead of re-spreading on every price calc.
    const bounds = useMemo(() => {
        const { Width_values = [], Drop_values = [] } = groupData || {};
        return {
            minWidth: Math.min(...Width_values),
            maxWidth: Math.max(...Width_values),
            minDrop: Math.min(...Drop_values),
            maxDrop: Math.max(...Drop_values),
        };
    }, [groupData]);

    const calculatePrice = React.useCallback((group, width, height) => {
        if (!width || !height) {
            setError("Please enter both width and drop values");
            return 0;
        }

        const widthMm = Math.round(Number(width));
        const dropMm = Math.round(Number(height));

        const { Width_values = [], Drop_values = [], Price_groups = [] } = groupData || {};

        const { minWidth, maxWidth, minDrop, maxDrop } = bounds;

        if (widthMm < minWidth || widthMm > maxWidth) {
            setError(`Width must be between ${minWidth} mm and ${maxWidth} mm`);
            return 0;
        }

        if (dropMm < minDrop || dropMm > maxDrop) {
            setError(`Drop must be between ${minDrop} mm and ${maxDrop} mm`);
            return 0;
        }

        const price = interpolate2D(widthMm, dropMm, Width_values, Drop_values, Price_groups[group]);
        if (price === null) {
            setError("Unable to calculate price for these dimensions");
            return 0;
        }

        setError("");
        return price;
    }, [groupData, bounds]);


    useEffect(() => {
        const width = measurements?.width ?? 0;
        const height = measurements?.height ?? 0;

        const price = calculatePrice(priceGroup, width, height) || 0;
        let screenBlindPrice = 0;

        if (customizePage === "blinds/double") {
            screenBlindPrice = calculatePrice(screenBlindPriceGroup, width, height) || 0;
        }

        setTotalPrice(price + screenBlindPrice);
    }, [measurements?.width, measurements?.height, priceGroup, screenBlindPriceGroup, calculatePrice, customizePage]);

    useEffect(() => {
        if (!data?.options?.[0]?.values?.[0]?.value || selectedColor) return;

        const defaultColor = data.options[0].values[0].value;
        setSelectedColor(defaultColor);

        const defaultVariant = data.variants?.find(v =>
            v.title === defaultColor || v.options.some(opt => opt.value === defaultColor)
        );

        if (defaultVariant?.price_sets?.[0]?.prices?.[defaultVariant?.price_sets?.[0]?.prices?.length - 1]) {
            const { amount, currency_code = 'aud' } = defaultVariant.price_sets[0].prices[defaultVariant?.price_sets?.[0]?.prices?.length - 1];
            setCurrencySymbol(getCurrencySymbol(currency_code));
            setPriceGroup(Math.max(0, amount - 1));
        }

        if (customizePage === "blinds/double") {
            const screenBlindColor = data.options[data.options.length - 1].values[0].value;
            const screenBlindVariant = data.variants?.find(v =>
                v.title === screenBlindColor || v.options.some(opt => opt.value === screenBlindColor)
            );

            if (screenBlindVariant?.price_sets?.[data.options.length - 1]?.prices?.[screenBlindVariant?.price_sets?.[data.options.length - 1]?.prices?.length - 1]) {
                const screenBlindAmount = screenBlindVariant.price_sets[data.options.length - 1].prices[screenBlindVariant?.price_sets?.[data.options.length - 1]?.prices?.length - 1].amount;
                setScreenBlindPriceGroup(Math.max(0, screenBlindAmount - 1));
            }
        }
    }, [data, customizePage, selectedColor]);

    const renderPriceAndTitle = () => (
        <div className="flex items-start justify-between gap-2">
            <h5 className="text-lg line-clamp-1">{data.title}</h5>
            <h5 className="text-lg text-primary shrink-0">
                {currencySymbol + addCommaToNumber(totalPrice)}
            </h5>
        </div>
    );

    const renderColors = () => {
        if (!data.options) return null;

        // if (customizePage === 'blinds/roller-blinds') {
        //     return data.options.map((option, index) => (
        //         <SelectColor key={index} data={option} colorsType='roller-blinds' />
        //     ));
        // }

        if (customizePage === "curtains" || customizePage === "shutters" || customizePage === "blinds/roller-blinds" || customizePage === "blinds/double") {
            return data.variants && (
                <SelectDefultColor data={data.variants}/>
            );
        }

        // if (customizePage === "blinds/double") {
        //     return data.options.map((option, i) => {
        //         const values = option.values?.slice(0, -1) || [];
        //         return (
        //             <div key={i} className="flex flex-wrap items-stretch gap-2">
        //                 {values.slice(0, 4).map((color, idx) => (
        //                     <div key={idx} className="size-[32px] sm:size-[48px] xl:size-[60px] shrink-0 transition cursor-pointer p-1 sm:p-1.5 xl:rounded-[16px] border border-[--lightGrey]">
        //                         <img
        //                             src={color.value ? fabric[color.value.toLowerCase()] : ''}
        //                             loading="lazy"
        //                             decoding="async"
        //                             className="size-full object-cover rounded-[11px] overflow-hidden"
        //                             alt={color.value}
        //                         />
        //                     </div>
        //                 ))}
        //                 {values.length > 4 && (
        //                     <span className="text-sm text-[--black] self-center">
        //                         +{values.length - 4} More
        //                     </span>
        //                 )}
        //             </div>
        //         );
        //     });
        // }
        return null;
    };

    return (
        <a href={`/${customizePage}/${data.id}`} target="_blank" rel="noopener noreferrer" className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col justify-between gap-4 xl:gap-[0.833vw] p-4 xl:p-[0.833vw] border border-[--Black] rounded-48">
            <div className="relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[13.021vw]">
                <img
                    src={data.thumbnail == null || data.thumbnail === '' ? '/images/placeholder.jpg' : data.thumbnail}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-fill"
                    alt={data.title}
                />
                {data.tags?.[0] && (
                    <p className="text-sm absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[1]">
                        {data.tags[0].value}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-4 xl:gap-[0.833vw]">
                {renderPriceAndTitle()}
                <p className="text-sm line-clamp-2">{data.description}</p>

                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>

                <h6 className="text-md">Available Colors</h6>
                <div className="flex items-stretch gap-2 overflow-hidden">
                    {renderColors()}
                </div>

                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>

                <Button variant='primary' size='small'>
                    Customise
                </Button>
            </div>
        </a>
    );
}

// Memoized: products only consume `appliedMeasurements` (changes on Calculate),
// so they must not re-render while the user types in the measurement inputs.
export default React.memo(ProductComponent);

