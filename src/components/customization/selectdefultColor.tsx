import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@lib/components/ui/radio-group";

const colorsOptions = {
    phantom: [
        'breeze', 'lunar', 'mercury', 'midnight', 'mocha', 'quartz', 'snow'
    ],
};


function SelectColor(props) {

    const [selected, setSelected] = useState(props.selectedColor || '');

    const handleColorChange = (value) => {
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
                <h2 className="text-lg">Choose Your {props.data.title}</h2>
                {props.data.description === '' ? null : (
                    <p className="text-sm">{props.data.description}</p>
                )}
            </div>
            <RadioGroup className="flex flex-wrap items-stretch gap-2" value={selected} onValueChange={handleColorChange}>
                {props.data?.values.map((color, index) => (
                    <div key={index} className="flex flex-col gap-2 items-center">
                        <RadioGroupItem value={color.color ? color.name : color.value} id={color.id} className="hidden" />
                        <label
                            htmlFor={color.id}
                            className={`size-[55px] sm:size-[72px] xl:size-[85px] shrink-0 transition cursor-pointer p-1 sm:p-2 xl:p-2.5 rounded-[16px] sm:rounded-[18px] xl:rounded-[24px] outline  
                                ${selected === color.value || selected === color.name ? 'outline-2 outline-[--primary] ring-2 ring-[--primary]' : 'outline-1 outline-[--lightGrey] ring-0'}
                            `}
                        >
                            {color.color ? (
                                <div className=" size-full rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] border border-[--lightGrey] overflow-hidden"
                                    style={{ backgroundColor: color.color ? color.color : 'transparent' }}
                                />
                            ) : (
                                props.colorsType === 'shutter' ? (
                                    <div className=" size-full rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] border border-[--lightGrey] overflow-hidden"
                                        style={{ backgroundColor: color.value ? color.value : 'transparent' }}
                                    />
                                ) : props.productName && (
                                    <img
                                        src={
                                            color.value && (
                                                `/images/product-colors-image/curtains/${props.productName.toLowerCase()}/${color.value.toLowerCase()}.jpg`
                                                // props.productName[color.value.toLowerCase()]
                                            )
                                        }
                                        className="size-full object-cover rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] overflow-hidden"
                                        alt={color.value}
                                    />

                                )
                            )}
                        </label>
                        <span className="text-sm capitalize">{color.value}</span>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default SelectColor;

