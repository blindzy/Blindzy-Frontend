import React, { useEffect , useState } from "react";
import { Button } from "@lib/components/ui/button";
import { Plus  } from 'lucide-react';

function ProductComponent(props) {
    

    // Grid view (default)
	return (
		<div key={props.data.id} className={`col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col justify-between gap-4 xl:gap-[0.833vw] p-4 xl:p-[0.833vw] border border-[--Black] rounded-48`}>
            <div className="relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[13.021vw]">
                <img src={props.data.images[0].url} className="w-full h-full object-cover" alt={props.data.title} />
                <p className="text-sm absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[1]">
                    {props.data.tags}
                </p>
            </div>
            <div className="flex flex-col gap-4 xl:gap-[0.833vw]">
                <div className="flex items-center justify-between gap-2">
                    <h5 className="text-lg line-clamp-1">{props.data.title}</h5>
                    <h5 className="text-lg text-primary shrink-0 ">
                        {(() => {
                            const code = props.data.price.currency_code?.toLowerCase();
                            let symbol = '';
                            switch (code) {
                                case 'usd': symbol = '$'; break;
                                case 'aud': symbol = 'A$'; break;
                                case 'gbp': symbol = '£'; break;
                                case 'eur': symbol = '€'; break;
                                case 'inr': symbol = '₹'; break;
                                case 'nzd': symbol = 'NZ$'; break;
                                default: symbol = code ? code.toUpperCase() + ' ' : '';
                            }
                            return symbol + (props.data.price.amount * props.size);
                        })()}
                    </h5>
                </div>
                <p className="text-sm line-clamp-2">{props.data.description}</p>
                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <h6 className="text-md">Available Colors</h6>
                <div className="flex flex-wrap items-stretch gap-2">
                    {props.data.options
                        ?.find(opt => opt.title.toLowerCase() === 'color')
                        ?.values?.map((color, index) => (
                            <div
                                key={index}
                                className="size-[55px] sm:size-[5.371vw] xl:size-[2.865vw] shrink-0 border transition border-[--lightGrey] cursor-pointer p-[6px] sm:p-[0.586vw] xl:p-[0.313vw] rounded-[18px] sm:rounded-[1.758vw] xl:rounded-[0.938vw]"
                            >
                                <img
                                    src={color.image}
                                    className="size-full object-cover rounded-[12px] sm:rounded-[1.172vw] xl:rounded-[0.625vw] overflow-hidden"
                                    alt={color.label}
                                />
                            </div>
                        ))}
                </div>

                <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <Button variant={'primary'} size={'small'} asChild>
                    {/* <a href={getCustomizationPage(product)} > */}
                    <a href={`/${props.customizePage}/${props.data.type}/detail`}>
                        Customise
                    </a>
                </Button>
            </div>
        </div>
	);
}

export default ProductComponent;

