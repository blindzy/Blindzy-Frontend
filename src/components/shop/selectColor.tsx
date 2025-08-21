import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@lib/components/ui/radio-group";


function SelectColor(props) {

    // Get color options directly from props data (which is now the option object)
    const colorOptions = props.data?.values || [];
    const [selected, setSelected] = useState(props.selectedColor || colorOptions[0]?.label || 'option-one');

    // Update parent component when color changes
    const handleColorChange = (value) => {
        setSelected(value);
        if (props.onColorSelect) {
            props.onColorSelect(value);
        }
    };

    // Initialize with first color when component mounts
    useEffect(() => {
        if (colorOptions.length > 0 && !props.selectedColor && props.onColorSelect) {
            props.onColorSelect(colorOptions[0].label);
        }
    }, [colorOptions, props.selectedColor, props.onColorSelect]);

    return (
        <div className="w-full flex flex-col gap-6 xl:gap-[1.25vw]">
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-lg">{props.data?.title}</h2>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
            </div>
            <RadioGroup className="flex items-stretch gap-2" value={selected} onValueChange={handleColorChange}>
                {colorOptions.map((color, index) => (
                    <div key={index} className="flex items-center">
                        <RadioGroupItem value={color.label} id={`${props.data?.title}-${color.label}-${index}`} className="hidden" />
                        <label
                            htmlFor={`${props.data?.title}-${color.label}-${index}`}
                            className={`size-[55px] sm:size-[72px] xl:size-[85px] shrink-0 transition cursor-pointer p-1 sm:p-2 xl:p-2.5 rounded-[16px] sm:rounded-[18px] xl:rounded-[24px] outline  ${selected === color.label ? 'outline-2 outline-[--primary] ring-2 ring-[--primary]' : 'outline-1 outline-[--lightGrey] ring-0'}`}
                        >
                            <img
                                src={color.image}
                                className="size-full object-cover rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] overflow-hidden"
                                alt={color.label}
                            />
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default SelectColor;

