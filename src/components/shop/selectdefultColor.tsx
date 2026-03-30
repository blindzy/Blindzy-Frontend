import React from "react";

function SelectDefultColor(props) {

    const values = props.data?.values || []
    const visibleColors = values.slice(0, 4)
    const remainingCount = values.length - 4

    return (
        <div className="flex items-center gap-2">

            {/* First 4 Colors */}
            {visibleColors.map((color) => (
                <label
                    key={color.id}
                    htmlFor={color.id}
                    className="size-[32px] sm:size-[4.688vw] xl:size-[3.125vw] shrink-0 transition cursor-pointer p-1 sm:p-1.5 xl:rounded-[16px] border border-[--lightGrey]"
                >
                    {color.color ? (
                        <div
                            className="size-full rounded-[11px] border border-[--lightGrey] overflow-hidden"
                            style={{ backgroundColor: color.color }}
                        />
                    ) : props.colorsType === "shutter" ? (
                        <div
                            className="size-full rounded-[11px] border border-[--lightGrey] overflow-hidden"
                            style={{ backgroundColor: color.value || "transparent" }}
                        />
                    ) : props.productName ? (
                        <img
                            src={`/images/product-colors-image/curtains/${props.productName.toLowerCase()}/${color.value?.toLowerCase()}.jpg`}
                            className="size-full object-cover rounded-[11px]"
                            alt={color.value}
                        />
                    ) : null}
                </label>
            ))}

            {/* +More Text */}
            {remainingCount > 0 && (
                <span className="text-sm text-[--black]">
                    +{remainingCount} More
                </span>
            )}

        </div>
    )
}

export default SelectDefultColor

