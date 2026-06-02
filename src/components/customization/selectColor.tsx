import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@lib/components/ui/radio-group";

function SelectColor(props) {
    const [selected, setSelected] = useState('');

    const handleColorChange = (value) => {
        setSelected(value);
        if (props.onColorSelect) {
            props.onColorSelect(value);
        }
    };
    return (
        <div className="w-full flex flex-col gap-6 xl:gap-[1.25vw]">
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-lg">Choose Your {props.data && props.data.title}</h2>
                {props.data.description === '' ? null : <p className="text-sm">{props.data.description}</p>}
            </div>
            <RadioGroup className="flex flex-wrap items-stretch gap-2" value={selected} onValueChange={handleColorChange}>
                {props.data?.values.map((color, index) =>(
                    <div key={index} className="flex flex-col gap-2 items-center">
                        <RadioGroupItem value={color.name} id={color.id} className="hidden" />
                        <label htmlFor={color.id}
                            className={`size-[55px] sm:size-[72px] xl:size-[85px] shrink-0 transition cursor-pointer p-1 sm:p-2 xl:p-2.5 rounded-[16px] sm:rounded-[18px] xl:rounded-[24px] outline
                                ${selected === color.name ? 'outline-2 outline-[--primary] ring-2 ring-[--primary]' : 'outline-1 outline-[--lightGrey] ring-0'}
                            `}
                        >
                            <div className="size-full rounded-[12px] sm:rounded-[14px] xl:rounded-[16px]" style={{ backgroundColor: color.color }}></div>
                        </label>
                        <span className="text-sm capitalize">{color.name}</span>
                    </div>
                ))}

            </RadioGroup>
        </div>
    );
}

export default React.memo(SelectColor);