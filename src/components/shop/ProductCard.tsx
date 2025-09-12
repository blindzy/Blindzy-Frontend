import React from "react";
import { Plus } from 'lucide-react';


function ProductCard({ productData, selectedColor, measurements, selectedOptions, totalPrice }) {
    return (
        <div className="sticky top-4 w-full xl:max-w-[32.813vw] h-fit sm:h-[calc(100vh-32px)] px-2 xl:px-[0.417vw] text-[--Black] bg-[--white] border border-[--Black] shrink-0 rounded-48 overflow-hidden">
            <div className="size-full flex flex-col gap-6 xl:gap-[1.25vw] py-4 sm:py-6 xl:py-[1.25vw] sm:px-4 px-2 xl:px-[0.833vw] overflow-hidden">
                <div className="w-full h-[60.465vw] sm:h-[43.945vw] xl:h-[23.438vw] shrink-0 rounded-32 overflow-hidden">
                    <img src={productData.images[0].url} className="w-full h-full object-cover object-center" alt="" />
                </div>
                <div className="w-full flex items-center justify-between shrink-0">
                    <h4 className="text-lg">{productData.title}</h4>
                    <span className="text-lg">
                        {(() => {
                            const code = productData.price.currency_code?.toLowerCase();
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
                            return symbol + productData.price.amount;
                        })()}
                    </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[--Black]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--Black]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <div className="w-full flex flex-col gap-2 pr-5 overflow-auto line-scroll" data-lenis-prevent>
                    <h4 className="text-lg">Customisations</h4>
                    <div className="w-full flex items-center justify-between">
                        <p className="text-sm">Color</p>
                        <p className="text-sm">{selectedColor || 'Not selected'}</p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <p className="text-sm">Size:</p>
                        <p className="text-sm">{measurements.width && measurements.height ? `${measurements.width}m X ${measurements.height}m` : '1m X 1m'}</p>
                    </div>
                    {/* Loop through all non-color options and display selected values */}
                    {productData?.options?.filter(option => option.title !== 'Color').map((option) => (
                        <div key={option.id} className="w-full flex items-center justify-between">
                            <p className="text-sm">{option.title}:</p>
                            <p className="text-sm">{selectedOptions[option.title] || 'Not selected'}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default ProductCard;
