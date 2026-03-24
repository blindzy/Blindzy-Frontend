import React, { useState, useEffect } from "react";
import { Plus, X } from 'lucide-react';

function ProductCard({ productData, customizationData, totalPrice }: { productData: any; customizationData: any; totalPrice: any }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    const selectedColor = customizationData?.find((item: any) => item?.title === 'Colour')?.value ?? null;
    const fabricImage = selectedColor && productData?.title
        ? `/images/${productData.title.charAt(0).toUpperCase() + productData.title.slice(1)} ${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}.png`
        : null;

    useEffect(() => {
        setImageLoaded(false);
    }, [fabricImage]);

    // Guard — render nothing until minimum data is available
    if (!productData || !customizationData) return null;

    return (
        <>
            <div className="sticky top-4 w-full xl:max-w-[32.813vw] h-fit sm:h-[calc(100vh-32px)] px-2 xl:px-[0.417vw] text-[--Black] bg-[--white] border border-[--Black] shrink-0 rounded-48 overflow-hidden">
                <div className="size-full flex flex-col gap-6 xl:gap-[1.25vw] py-4 sm:py-6 xl:py-[1.25vw] sm:px-4 px-2 xl:px-[0.833vw] overflow-hidden">

                    {/* Image container */}
                    <div
                        className="relative w-full h-[60.465vw] sm:h-[88.945vw] xl:h-[23.438vw] shrink-0 rounded-32 overflow-hidden cursor-zoom-in"
                        onClick={() => fabricImage && setIsZoomed(true)}
                    >
                        {/* Skeleton — shown when no image or while loading */}
                        {(!fabricImage || !imageLoaded) && (
                            <div className="absolute inset-0 bg-[--Black]/10 animate-pulse rounded-32" />
                        )}

                        {fabricImage && (
                            <div className="size-full absolute left-0 top-0 flex justify-center pt-[12.326vw] sm:pt-[13.086vw] xl:pt-[1.042vw]">
                                <img
                                    src={fabricImage}
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    alt={productData.title}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="w-full flex items-center justify-between shrink-0">
                        <h4 className="text-lg">{productData.title ?? '—'}</h4>
                        <span className="text-lg">{totalPrice ?? '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[--Black]">
                        <Plus className="size-[18px]" />
                        <div className="w-full border-b border-[--Black]"></div>
                        <Plus className="size-[18px]" />
                    </div>
                    <div className="w-full flex flex-col gap-2 pr-5 overflow-auto line-scroll" data-lenis-prevent>
                        <h4 className="text-lg">Customisations</h4>
                        {customizationData.map((option: any, index: number) => (
                            option?.value ? (
                                <div className="w-full flex items-center justify-between" key={index}>
                                    <p className="text-sm">{option.title}</p>
                                    <p className="text-sm">{option.value}</p>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            </div>

            {/* Zoom modal */}
            {isZoomed && fabricImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setIsZoomed(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        onClick={() => setIsZoomed(false)}
                    >
                        <X className="size-6" />
                    </button>
                    <img
                        src={fabricImage}
                        alt={productData.title}
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}

export default ProductCard;