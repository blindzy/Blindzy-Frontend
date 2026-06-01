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
    return (
        <div className="flex items-stretch gap-2">
            {props.data?.values.map((color) => {
                const key = color.value.toLowerCase().replace(/\s+/g, "_")
                const colorList = colorsOptions[key]

                if (!colorList) return null

                return (
                    <div key={key} className="flex items-center gap-2">
                        {/* First 4 colors */}
                        {colorList.slice(0, 4).map((colorItem) => (
                            <div key={colorItem.id} className="flex items-center">
                                <label
                                    htmlFor={colorItem.id}
                                    className="size-[32px] sm:size-[48px] xl:size-[3.125vw] shrink-0 transition cursor-pointer p-1 sm:p-1.5 xl:rounded-[16px] border border-[--lightGrey]"
                                >
                                    <img
                                        src={`/images/product-colors-image/blinds-fabric/${key}/${colorItem.name}.jpg`}
                                        loading="lazy"
                                        decoding="async"
                                        className="size-full object-cover rounded-[11px]"
                                        alt={colorItem.name}
                                    />
                                </label>
                            </div>
                        ))}

                        {/* +More text */}
                        {colorList.length > 4 && (
                            <span className="text-sm text-[--black] self-center">
                                +{colorList.length - 4} More
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default SelectColor;

