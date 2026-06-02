import React, { useEffect, useMemo, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@lib/components/ui/radio-group";



function SelectColor(props) {
    const [selected, setSelected] = useState('');

    // Map each colour value (variant title or option value) to the first
    // matching variant, so swatch rendering is O(values) instead of
    // O(values × variants) on every render.
    const variantByColor = useMemo(() => {
        const map = new Map();
        (props.data || []).forEach((variant) => {
            const keys = [variant.title, ...(variant.options?.map((opt) => opt.value) || [])];
            keys.forEach((key) => {
                if (key != null && !map.has(key)) map.set(key, variant);
            });
        });
        return map;
    }, [props.data]);

    const handleColorChange = (value) => {
        const parts = value.split(' - ');
        let fabricName = '';
        let colorName = '';
        if (parts.length >= 2) {
            fabricName = parts[0].trim().toLowerCase();
            colorName = parts[1].trim().toLowerCase();
        }
        const matchedVariant = variantByColor.get(fabricName);
        const thumbnail = matchedVariant?.thumbnail;
        if (props.onImageSelect ) {
            props.onImageSelect(thumbnail);
        }
        setSelected(value);
        if (props.onColorSelect) {
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
            <RadioGroup className="flex flex-wrap items-stretch gap-2" value={selected} onValueChange={handleColorChange}>
                {props.option?.values.map((color, index) =>{

                    const matchedVariant = variantByColor.get(color.value);
                    const thumbnail = matchedVariant?.thumbnail;
                    const optionValue = props.tag  === '' ? color.value : `${color.value} - ${props.tag}`;
                    // const optionValue = color.value;
                    return (
                        <div key={index} className="flex flex-col gap-2 items-center">
                            <RadioGroupItem value={optionValue} id={color.id} className="hidden" />
                            <label htmlFor={color.id}
                                className={`size-[55px] sm:size-[72px] xl:size-[85px] shrink-0 transition cursor-pointer p-1 sm:p-2 xl:p-2.5 rounded-[16px] sm:rounded-[18px] xl:rounded-[24px] outline
                                    ${selected === optionValue ? 'outline-2 outline-[--primary] ring-2 ring-[--primary]' : 'outline-1 outline-[--lightGrey] ring-0'}
                                `}
                            >
                                <img
                                    src={thumbnail}
                                    className="size-full object-cover rounded-[12px] sm:rounded-[14px] xl:rounded-[16px]"
                                    alt={color.value}
                                />
                            </label>
                            <span className="text-sm capitalize">{color.value}</span>
                        </div>
                    );
                }
                )}

            </RadioGroup>
        </div>
    );
}

export default React.memo(SelectColor);