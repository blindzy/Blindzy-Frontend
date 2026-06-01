import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@lib/components/ui/radio-group";

function SelectColor(props) {

    const [selected, setSelected] = useState(props.selectedColor || '');

    const handleColorChange = (value) => {
        // find swatch image for the selected value from props.data
        const matchedVariant = props.data?.find(
            variant => variant.title === value || variant.options?.some(opt => opt.value === value)
        );
        const swatchImage =
            matchedVariant?.images?.find(img => img.url !== matchedVariant.thumbnail)?.url
            || matchedVariant?.thumbnail;
        setSelected(value);
        if (props.onImageSelect ) {
            props.onImageSelect(swatchImage);
        }
        if (props.onColorSelect ) {
            props.onColorSelect(value);
        }
    };
    useEffect(() => {
        setSelected(props.selectedColor || '');
    }, [props.selectedColor]);

    return (
        <div className="w-full flex flex-col gap-6 xl:gap-[1.25vw]">
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-lg">Choose Your {props.option?.title}</h2>
                {props.option?.description === '' ? null : (
                    <p className="text-sm">{props.option?.description}</p>
                )}
            </div>
            <RadioGroup className="flex flex-wrap items-stretch gap-2" value={selected} onValueChange={(value) => handleColorChange(value)}>
                {props.option?.values.map((color, index) => {
                    // Find the variant whose option value matches this color, then use its thumbnail.
                    const matchedVariant = props.data.find(
                        variant => variant.title === color.value ||
                            variant.options?.some(opt => opt.value === color.value)
                    );
                    const thumbnail = matchedVariant?.thumbnail;
                    // Use the variant image that is NOT the thumbnail (the thumbnail
                    // duplicates the first image, so pick the other one).
                    const swatchImage =
                    matchedVariant?.images?.find(img => img.url !== matchedVariant.thumbnail)?.url
                    || matchedVariant?.thumbnail;

                    return (
                        <div key={index} className="flex flex-col gap-2 items-center">
                            <RadioGroupItem value={color.color ? color.name : color.value} id={color.id} className="hidden" />
                            <label
                                htmlFor={color.id}
                                className={`size-[55px] sm:size-[72px] xl:size-[85px] shrink-0 transition cursor-pointer p-1 sm:p-2 xl:p-2.5 rounded-[16px] sm:rounded-[18px] xl:rounded-[24px] outline
                                    ${selected === color.value || selected === color.name ? 'outline-2 outline-[--primary] ring-2 ring-[--primary]' : 'outline-1 outline-[--lightGrey] ring-0'}
                                `}
                            >
                                {thumbnail ? (
                                    <img
                                        src={thumbnail}
                                        loading="lazy"
                                        decoding="async"
                                        className="size-full object-cover rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] overflow-hidden"
                                        alt={color.value}
                                    />
                                ) : (
                                    <div className="size-full rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] border border-[--lightGrey] overflow-hidden"
                                        style={{ backgroundColor: color.color ? color.color : 'transparent' }}
                                    />
                                )}
                            </label>
                            <span className="text-sm capitalize">{color.value}</span>
                        </div>
                    );
                })}
            </RadioGroup>
        </div>
    );
}

export default SelectColor;

