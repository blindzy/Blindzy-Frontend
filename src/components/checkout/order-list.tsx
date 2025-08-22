import React, { useEffect, useState } from "react";
import { Camera, ChevronDown, Package, Plus } from 'lucide-react';
import { Button } from "@lib/components/ui/button";


function OrderList(props) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

  return (
        <div className="w-full p-4 flex flex-col items-center gap-2.5 border border-[--Black] rounded-24" >
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-[64px] bg-[--primary] rounded-[16px] overflow-hidden">
                        <img src={props.data.thumbnail} className="w-full object-cover" alt="" />
                    </div>
                    <h6 className="hidden sm:block text-md text-[--Black]">{props.data.title}</h6>
                    <div className="w-fit sm:hidden flex flex-col gap-1">
                        <h6 className="text-lg text-[--Black]">{props.data.title}</h6>
                        <p className="text-md text-[--Black]">
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
                                return symbol + props.data.price.amount;
                            })()}
                        </p>
                    </div>
                </div>
                <h6 className="hidden sm:block text-md text-[--Black]">
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
                        return symbol + props.data.price.amount;
                    })()}
                </h6>
                <div className="sm:hidden flex items-center gap-1 cursor-pointer" onClick={toggleDetails}>
                    <ChevronDown className={`text-[--primary] size-[24px] transition-transform duration-300 ${showDetails ? 'rotate-180' : 'rotate-0'}`} />
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 cursor-pointer" onClick={toggleDetails}>
                <p className="text-sm text-[--primary]">{showDetails ? 'See Less' : 'See More'}</p>
                <ChevronDown className={`text-[--primary] size-[24px] transition-transform duration-300 ${showDetails ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            <div className={`w-full flex flex-col gap-4 overflow-hidden transition ${showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="w-full flex items-center gap-2 shrink-0 text-[--lightBlack]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--mediumGrey]"></div>
                    <Plus className="size-[18px]" />
                </div>
                {props.data.options.map((option) => (
                    <div className="w-full flex items-center justify-between" key={option.id}>
                        <span className="text-sm text-[--lightBlack]">
                            {option.name}
                        </span>
                        <span className="text-sm text-[--lightBlack]">
                            {option.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
  );
};

export default OrderList;