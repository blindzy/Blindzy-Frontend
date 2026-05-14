import React, { useState, useEffect } from "react";
import { Plus} from 'lucide-react';

function ProductCard({
    productData,
    customizationData,
    totalPrice,
    svg,
    svgColor = '#4A4A4A'
}: {
    productData: any;
    customizationData: any;
    totalPrice: any;
    svg?: boolean;
    svgColor?: string;
}) {

    const [isFabricMode, setIsFabricMode] = useState(false);

    const selectedColor = customizationData?.find((item: any) => item?.title === 'Colour')?.value ?? null;


    const defaultImage = productData?.thumbnail?.replace(
        "http://localhost:9000",
        "https://api.blindzy.com"
    );


    // Guard — render nothing until minimum data is available
    if (!productData || !customizationData) return null;

    return (
        <>
            <div className="sticky top-4 w-full xl:max-w-[32.813vw] h-fit sm:h-[calc(100vh-32px)] px-2 xl:px-[0.417vw] text-[--Black] bg-[--white] border border-[--Black] shrink-0 rounded-48 overflow-hidden">
                <div className="size-full flex flex-col gap-6 xl:gap-[1.25vw] py-4 sm:py-6 xl:py-[1.25vw] sm:px-4 px-2 xl:px-[0.833vw] overflow-hidden">

                    {/* Image container */}
                    <div
                        className={`relative w-full h-[60.465vw] sm:h-[88.945vw] xl:h-[23.438vw] shrink-0 rounded-32 overflow-hidden `}
                    >

                        <div className="size-full absolute left-0 top-0 flex justify-center ">
                            <img
                                src={'/images/product/product-datail.png'}
                                className={`w-full h-full object-cover`}
                                alt={productData.title}
                            />
                            
                        </div>

                        {/* SVG overlay ONLY for default mode */}
                        {!isFabricMode && svg && (
                            <div className="size-full absolute left-0 top-0 flex justify-center pt-[12.326vw] sm:pt-[13.086vw] xl:pt-[1.042vw]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[77.674vw] sm:w-[79.102vw] xl:w-[26.615vw] h-[32.093vw] sm:h-[31.641vw] xl:h-[10.469vw]"
                                    viewBox="0 0 511 201"
                                    fill="none"
                                >
                                    <path
                                        d="M0 3L2 0H507H509L510.5 4V9L509 12L507 13V200.5H4V14.5L2 13L1 9.5L0 3Z"
                                        fill={svgColor}
                                    />
                                </svg>
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

        </>
    );
}

export default ProductCard;