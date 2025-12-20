import React, { useEffect , useState } from "react";
import { Button } from "@lib/components/ui/button";
import { Plus  } from 'lucide-react';

function ProductComponent(props) {

    const colorOption = props.data.options?.find(opt => typeof opt.title === 'string' && ['color', 'colour', 'fabric'].includes(opt.title.toLowerCase().trim()));

        return (
		<div key={props.data.id} className={`col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col justify-between gap-4 xl:gap-[0.833vw] p-4 xl:p-[0.833vw] border border-[--Black] rounded-48`}>
            <div className="relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[13.021vw]">
                {/* <img src={props.data.thumbnail} className="w-full h-full object-cover" alt={props.data.title} /> */}
                <img
                    src={props.data.thumbnail?.replace("http://localhost:9000", "https://api.blindzy.com")}
                    className="w-full h-full object-cover"
                    alt={props.data.title}
                />

                {props.data.tags.length>0 &&(
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
                {/* <div className="flex  items-stretch gap-2 overflow-hidden">
                    {colorOption?.values?.slice(0, 4).map((color, index) => {
                        customizePage === 'shutters'?(
                            <div
                                key={index}
                                className="size-[55px] sm:size-[5.371vw] xl:size-[2.865vw] shrink-0 border transition border-[--lightGrey] cursor-pointer p-[6px] sm:p-[0.586vw] xl:p-[0.313vw] rounded-[18px] sm:rounded-[1.758vw] xl:rounded-[0.938vw] shrink-0"
                            >
                                <div className=" size-full rounded-[12px] sm:rounded-[14px] xl:rounded-[16px] border border-[--lightGrey] overflow-hidden"
                                    style={{ backgroundColor: color.color ? color.color : 'transparent' }}
                                />
                            </div>
                        ):(
                            const raw = color && color.value ? String(color.value) : '';
                            // const key = raw.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
                            const key = raw.toLowerCase();
                            const src = `/images/product-colors-image/blinds-fabric/${color.value.split('-')[0].toLowerCase()}/${(color.value.toLowerCase())}.jpg`;
                            return (
                                <div
                                    key={index}
                                    className="size-[55px] sm:size-[5.371vw] xl:size-[2.865vw] shrink-0 border transition border-[--lightGrey] cursor-pointer p-[6px] sm:p-[0.586vw] xl:p-[0.313vw] rounded-[18px] sm:rounded-[1.758vw] xl:rounded-[0.938vw] shrink-0"
                                >
                                    <img
                                        src={src}
                                        className="size-full object-cover rounded-[12px] sm:rounded-[1.172vw] xl:rounded-[0.625vw] overflow-hidden"
                                        alt={color.value || 'Color option'}
                                    />
                                </div>
                            );
                        )
                    })}
                    {colorOption && colorOption.values && colorOption.values.length > 4 && (
                        <span className="text-sm text-[--black] self-center">
                            {`+${colorOption.values.length - 4} More`}
                        </span>
                    )}
                </div> */}
                <div className="flex items-stretch gap-2 overflow-hidden">
                    {colorOption?.values?.slice(0, 4).map((color, index) => {

                        if (props.customizePage === "shutters") {
                            return (
                                <div
                                key={index}
                                className="size-[55px] sm:size-[5.371vw] xl:size-[2.865vw] shrink-0 border transition border-[--lightGrey] cursor-pointer p-[6px] sm:p-[0.586vw] xl:p-[0.313vw] rounded-[18px] sm:rounded-[1.758vw] xl:rounded-[0.938vw]"
                                >
                                <div
                                    className="size-full rounded-[12px] sm:rounded-[1.172vw] xl:rounded-[0.625vw] border border-[--lightGrey] overflow-hidden"
                                    style={{ backgroundColor: color.value || "transparent" }}
                                />
                                </div>
                            );
                        }
                        if (props.customizePage === "curtains/single") {
                            const raw = color?.value ? String(color.value) : "";
                            const src = `/images/product-colors-image/blinds-fabric/screen-blind/${raw.toLowerCase()}.jpg`;

                            return (
                                <div
                                    key={index}
                                    className="size-[55px] sm:size-[5.371vw] xl:size-[2.865vw] shrink-0 border transition border-[--lightGrey] cursor-pointer p-[6px] sm:p-[0.586vw] xl:p-[0.313vw] rounded-[18px] sm:rounded-[1.758vw] xl:rounded-[0.938vw]"
                                >
                                    <img
                                    src={src}
                                    className="size-full object-cover rounded-[12px] sm:rounded-[1.172vw] xl:rounded-[0.625vw] overflow-hidden"
                                    alt={raw || "Color option"}
                                    />
                                </div>
                            );
                        }

                        const raw = color?.value ? String(color.value) : "";
                        const src = `/images/product-colors-image/blinds-fabric/${raw
                        .split("-")[0]
                        .toLowerCase()}/${raw.toLowerCase()}.jpg`;

                        return (
                            <div
                                key={index}
                                className="size-[55px] sm:size-[5.371vw] xl:size-[2.865vw] shrink-0 border transition border-[--lightGrey] cursor-pointer p-[6px] sm:p-[0.586vw] xl:p-[0.313vw] rounded-[18px] sm:rounded-[1.758vw] xl:rounded-[0.938vw]"
                            >
                                <img
                                src={src}
                                className="size-full object-cover rounded-[12px] sm:rounded-[1.172vw] xl:rounded-[0.625vw] overflow-hidden"
                                alt={raw || "Color option"}
                                />
                            </div>
                        );
                    })}

                    {colorOption?.values?.length > 4 && (
                        <span className="text-sm text-[--black] self-center">
                        +{colorOption.values.length - 4} More
                        </span>
                    )}
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

