import React, { useEffect, useState } from "react";
import { Camera, ChevronDown, Package, Plus } from 'lucide-react';
import { Button } from "@lib/components/ui/button";


function OrderList(props) {

    const formattedDate = props.createdAt
        ? new Date(props.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : ""
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="w-full p-4 flex flex-col items-center gap-2.5 border border-[--Black] rounded-24" >
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-[64px] bg-[--primary] rounded-[16px] overflow-hidden">
                        <img src={props.data.metadata?.thumbnail?.replace("http://localhost:9000", "https://api.blindzy.com")} className="w-full object-cover" alt={props.data.metadata?.title} />
                    </div>
                    <h6 className="hidden sm:block text-md text-[--Black]">{props.data.metadata.title}</h6>
                    <span className="text-xs text-[--lightBlack]">
                        {formattedDate}
                    </span>
                    <div className="w-fit sm:hidden flex flex-col gap-1">
                        <h6 className="text-lg text-[--Black]">{props.data.metadata.title}</h6>
                        <p className="text-md text-[--Black]">
                            {props.data.metadata.currency}
                            {(props.data.metadata.amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </p>
                        <Button variant={'primary'} size={'smallest'} className="w-fit">
                            Reorder
                        </Button>
                    </div>
                </div>
                <h6 className="hidden sm:block text-md text-[--Black]">
                    {props.data.metadata.currency}
                    {(props.data.metadata.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
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
                {props.data.metadata.customizationData?.map((option, index) => (
                    <div className="w-full flex items-center justify-between" key={index}>
                        <span className="text-sm text-[--lightBlack]">
                            {option.title}
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