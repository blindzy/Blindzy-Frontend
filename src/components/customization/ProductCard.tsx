import React from "react";
import { Plus } from 'lucide-react';


function ProductCard({productData, customizationData, totalPrice}) {
    return (
        <div className="sticky top-4 w-full xl:max-w-[32.813vw] h-fit sm:h-[calc(100vh-32px)] px-2 xl:px-[0.417vw] text-[--Black] bg-[--white] border border-[--Black] shrink-0 rounded-48 overflow-hidden">
            <div className="size-full flex flex-col gap-6 xl:gap-[1.25vw] py-4 sm:py-6 xl:py-[1.25vw] sm:px-4 px-2 xl:px-[0.833vw] overflow-hidden">
                <div className="w-full h-[60.465vw] sm:h-[43.945vw] xl:h-[23.438vw] shrink-0 rounded-32 overflow-hidden">
                    <img
                        src={productData.thumbnail?.replace("http://localhost:9000", "https://api.blindzy.com")}
                        // src={productData.thumbnail}
                        className="w-full h-full object-cover object-center" 
                          alt={productData.title}
                />
                </div>
                <div className="w-full flex items-center justify-between shrink-0">
                    <h4 className="text-lg">{productData.title}</h4>
                    <span className="text-lg">
                        {totalPrice}
                    </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[--Black]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--Black]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <div className="w-full flex flex-col gap-2 pr-5 overflow-auto line-scroll" data-lenis-prevent>
                    <h4 className="text-lg">Customisations</h4>
                    {customizationData.map((option, index) => (
                        option.value ? (
                            <div className="w-full flex items-center justify-between" key={index}>
                                <p className="text-sm">{option.title}</p>
                                <p className="text-sm">{option.value}</p>
                            </div>
                        ) : null
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default ProductCard;
