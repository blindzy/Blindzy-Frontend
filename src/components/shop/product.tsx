import React, { useEffect, useState } from "react";
import { Button } from "@lib/components/ui/button";
import { Plus } from 'lucide-react';
// import SelectColor from "@components/customization/selectColor";
import SelectColor from "@components/shop/selectColor";
import SelectDefultColor from "@components/shop/selectdefultColor";
import { RadioGroup } from "@radix-ui/react-radio-group";
const fabric = {
    azure: "/images/product-colors-image/fabric/haven.jpg",
    nova: "/images/product-colors-image/fabric/ora.jpg",
    omega: "/images/product-colors-image/fabric/seclusion.jpg",
    phantom: "/images/product-colors-image/fabric/seclusion.jpg",
    zenith: "/images/product-colors-image/fabric/tranquil.jpg",
};
function ProductComponent(props) {

    // const colorOption = props.data.options?.find(opt => typeof opt.title === 'string' && ['color', 'colour', 'fabric'].includes(opt.title.toLowerCase().trim()));

    return (
        <div key={props.data.id} className={`col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col justify-between gap-4 xl:gap-[0.833vw] p-4 xl:p-[0.833vw] border border-[--Black] rounded-48`}>
            <div className="relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[13.021vw]">
                {/* <img src={props.data.thumbnail} className="w-full h-full object-cover" alt={props.data.title} /> */}
                <img
                    src={props.data.thumbnail?.replace("http://localhost:9000", "https://api.blindzy.com")}
                    className="w-full h-full object-cover"
                    alt={props.data.title}
                />

                {props.data.tags.length > 0 && (
                    <p className="text-sm absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[1]">
                        {props.data.tags[0].value}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-4 xl:gap-[0.833vw]">
                <div className="flex items-center justify-between gap-2">
                    <h5 className="text-lg line-clamp-1">{props.data.title}</h5>
                    {/* {props.data } */}
                    <h5 className="text-lg text-primary shrink-0 ">

                    </h5>
                </div>
                <p className="text-sm line-clamp-2">{props.data.description}</p>
                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <h6 className="text-md">Available Colors</h6>
                <div className="flex  items-stretch gap-2 overflow-hidden">

                    {props.customizePage === 'roller-blinds' ? (
                        props.data.options?.map((option, index) => (
                            <SelectColor
                                data={option}
                                colorsType={'roller-blinds'}
                            />
                        ))
                    ) : props.customizePage === "curtains" ? (
                        props.data.options?.map((option, index) => (
                            <SelectDefultColor
                                data={option}
                                productName={props.data.title}
                                colorsType={'curtains'}
                            />
                        ))
                    ) : props.customizePage === "shutters" ? (
                        props.data.options?.map((option, index) => (
                            <SelectDefultColor
                                data={option}
                                productName={props.data.title}
                                colorsType={'shutter'}
                            />
                        ))
                    ) : props.customizePage === "blinds/double" && (
                        props.data.options?.map((option, i) => {
                            const filteredOption = {
                                ...option,
                                values: option.values?.slice(0, -1),
                            };
                            return (
                                <div className="flex flex-wrap items-stretch gap-2" >
                                    {filteredOption?.values?.slice(0, 4).map((color, index) => (
                                        <div key={index} className="flex items-center">
                                            <div
                                                className={`size-[32px] sm:size-[48px] xl:size-[60px] shrink-0 transition cursor-pointer p-1 sm:p-1.5 xl:rounded-[16px] border border-[--lightGrey]`}
                                            >
                                                <img
                                                    src={
                                                        color.value && (
                                                            fabric[color.value.toLowerCase()]
                                                        )
                                                    }
                                                    className="size-full object-cover rounded-[11px] overflow-hidden"
                                                    alt={color.value}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {filteredOption?.values?.length > 4 && (
                                        <span className="text-sm text-[--black] self-center">
                                            +{filteredOption?.values?.length - 4} More
                                        </span>
                                    )}
                                </div>
                            )
                        }))}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <Button variant={'primary'} size={'small'} asChild>
                    <a href={`/${props.customizePage}/${props.data.id}`} target="_blank">
                        Customise
                    </a>
                </Button>
            </div>
        </div>
    );
}

export default ProductComponent;

