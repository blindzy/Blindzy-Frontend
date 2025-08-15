import React from "react";
import { Plus } from 'lucide-react';
import { Checkbox } from "@lib/components/ui/checkbox";
import { Button } from "@lib/components/ui/button";

function ProductCard({ productData, selectedColor, measurements, selectedOptions, totalPrice }) {
    return (
        <div className="sticky top-4 max-w-[630px] h-[calc(100vh-32px)] px-2 text-[--Black] bg-[--white] border border-[--Black] shrink-0 rounded-48 overflow-hidden">
            <div className="size-full flex flex-col gap-6 py-6 px-4 overflow-auto line-scroll" data-lenis-prevent>
                <div className="w-full h-[450px] shrink-0 rounded-32 overflow-hidden">
                    <img src={productData.images[0].url} className="w-full h-full object-cover object-center" alt="" />
                </div>
                <h4 className="text-xl">{productData.title}</h4>
                <span className="text-xl">
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
                <div className="flex items-center gap-2 shrink-0 text-[--Black]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--Black]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <div className="w-full flex flex-col gap-2">
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
                <div className="flex items-center gap-2 shrink-0 text-[--Black]">
                    <Plus className="size-[18px]" />
                    <div className="w-full border-b border-[--Black]"></div>
                    <Plus className="size-[18px]" />
                </div>
                <div className="flex items-center justify-between">
                    <h5 className="text-lg">TOTAL PRICE</h5>
                    <h5 className="text-lg">
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
                        return symbol + totalPrice;
                    })()}
                    </h5>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="measurements-checked"/>
                    <label htmlFor="measurements-checked" className="text-sm normal">I have double checked my measurements and customisations</label>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant={'primary'} size={'large'} className="w-full flex-1">
                        Add to Cart
                    </Button>
                    <Button variant={'light'} size={'large'} className="w-full flex-1">
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
