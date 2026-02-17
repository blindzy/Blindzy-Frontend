import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@lib/components/ui/radio-group";

const colorsOptions = {
    phantom: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EO', name: 'breeze', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EP', name: 'lunar', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EQ', name: 'mercury', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ER', name: 'midnight', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ES', name: 'mocha', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ET', name: 'quartz', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EU', name: 'snow', },
    ],
    azure: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EW', name: 'white', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EO', name: 'black', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EP', name: 'cream', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ER', name: 'grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EQ', name: 'dark grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ES', name: 'moon', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ET', name: 'powder', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EU', name: 'sand', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EV', name: 'stone', },
    ],
    zenith: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EA', name: 'white', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EB', name: 'black', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EC', name: 'blush', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ED', name: 'grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EF', name: 'dark grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EG', name: 'charcoal', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EH', name: 'ghost', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EI', name: 'meadow', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EJ', name: 'ocean', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EK', name: 'silk', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EL', name: 'soft', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EM', name: 'whisfer', },
    ],
    nova: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EA', name: 'white', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EB', name: 'black', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EC', name: 'cream', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ED', name: 'sahara', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EF', name: 'sky', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EG', name: 'snow', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EH', name: 'stone', },
    ],
    omega: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EA', name: 'cream', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EB', name: 'frost', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EC', name: 'lvory', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5ED', name: 'mirage', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EF', name: 'raven', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EG', name: 'sage', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EH', name: 'saturn', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EI', name: 'venus', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDQ5EJ', name: 'willow', },
    ],
    screen_blind_fabrics: [
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SA', name: 'black', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SB', name: 'bone', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SC', name: 'caramel', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SD', name: 'charcoal', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SF', name: 'fox', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SG', name: 'fudge', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SH', name: 'ghost', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SI', name: 'grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SJ', name: 'light grey', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SK', name: 'midnight', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SL', name: 'mountain', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SM', name: 'sky', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SN', name: 'snowflake', },
        { id: 'optval_01K6Z6D5B6166KXE3RQNVDF5SO', name: 'stream', },
    ],
};


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
                <h2 className="text-lg">Choose Your {props.title ? props.title : props.data.title}</h2>
                <p className="text-sm">{props.data.description}</p>
            </div>
            <RadioGroup className="flex flex-wrap items-stretch gap-2" value={selected} onValueChange={handleColorChange}>
                {props.data?.values.map((color, index) =>
                    colorsOptions[color.value.toLowerCase().replace(/\s+/g, '_')]?.map((colorItem, i) => {
                        const optionValue = props.tag === '' ? colorItem.name : `${color.value} - ${props.tag} - ${colorItem.name}`;
                        return (
                            <div key={i} className="flex items-center">
                                <RadioGroupItem value={optionValue} id={colorItem.id} className="hidden" />
                                <label htmlFor={colorItem.id}
                                    className={`size-[55px] sm:size-[72px] xl:size-[85px] shrink-0 transition cursor-pointer p-1 sm:p-2 xl:p-2.5 rounded-[16px] sm:rounded-[18px] xl:rounded-[24px] outline
                                        ${selected === optionValue ? 'outline-2 outline-[--primary] ring-2 ring-[--primary]' : 'outline-1 outline-[--lightGrey] ring-0'}
                                    `}
                                >
                                    <img
                                        src={`/images/product-colors-image/blinds-fabric/${color.value.toLowerCase().replace(/\s+/g, '_')}/${colorItem.name}.jpg`}
                                        className="size-full object-cover rounded-[12px] sm:rounded-[14px] xl:rounded-[16px]"
                                        alt={colorItem.name}
                                    />
                                </label>
                            </div>
                        );
                    })
                )}

            </RadioGroup>
        </div>
    );
}

export default SelectColor;