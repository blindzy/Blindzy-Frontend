 import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Plus  } from 'lucide-react';
import { Label } from "@lib/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@lib/components/ui/radio-group";


function SelectVarient(props) {

    // Get specific option type from props (passed from parent loop)
    const optionType = props.optionType;
    const optionData = props.data?.options?.find(opt => opt.title === optionType);
    const options = optionData?.values || [];
    const optionTitle = optionData?.title || 'Select Option';
    const optionDescription = optionData?.description || 'Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.';
    
    const [selected, setSelected] = useState(props.selectedValue || options[0]?.label || 'option-one');

    // Update parent component when selection changes
    const handleSelectionChange = (value) => {
        setSelected(value);
        if (props.onSelectionChange) {
            props.onSelectionChange(value);
        }
    };

    // Initialize with first option when component mounts
    useEffect(() => {
        if (options.length > 0 && !props.selectedValue && props.onSelectionChange) {
            props.onSelectionChange(options[0].label);
        }
    }, [options, props.selectedValue, props.onSelectionChange]);

    // Update local state when props.selectedValue changes
    useEffect(() => {
        if (props.selectedValue) {
            setSelected(props.selectedValue);
        }
    }, [props.selectedValue]);

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
                <h2 className="text-lg">{optionTitle}</h2>
                <p className="text-sm">{optionDescription}</p>
            </div>
            <RadioGroup className="w-full flex items-stretch gap-2" value={props.selectedValue || selected} onValueChange={handleSelectionChange}>
                {options.map((option, index) => (
                    <div key={index} className="w-full flex items-center">
                        <RadioGroupItem value={option.label} id={`${option.label}-${index}`} className="hidden" />
                        <label
                            htmlFor={`${option.label}-${index}`}
                            className={`w-full flex flex-col gap-2 cursor-pointer`}
                        >
                            <div className={`w-full h-[350px] bg-[--mediumGrey] rounded-24 outline overflow-hidden transition  ${(props.selectedValue || selected) === option.label ? 'outline-2 outline-[--primary] ring-2 ring-[--primary]' : 'outline-1 outline-[--lightGrey] ring-0'}`}>
                                <img
                                    src={option.image}
                                    className="size-full object-cover rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] overflow-hidden"
                                    alt={option.label}
                                />
                            </div>
                            <p className="text-md text-[--Black]">{option.label}</p>
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default SelectVarient;

