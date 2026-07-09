import React from "react";

type ColorVariant = {
    id: string;
    title?: string;
    thumbnail?: string;
};

type SelectDefultColorProps = {
    data?: ColorVariant[];
    selectedId?: string | null;
    onSelect?: (color: ColorVariant) => void;
};

const MAX_VISIBLE = 4;

function SelectDefultColor({ data = [], selectedId = null, onSelect }: SelectDefultColorProps) {
    const visibleColors = data.slice(0, MAX_VISIBLE);
    const remainingCount = data.length - MAX_VISIBLE;

    return (
        <div className="flex items-center gap-2">
            {/* First 4 Colors */}
            {visibleColors.map((color) => (
                <button
                    type="button"
                    key={color.id}
                    onClick={() => onSelect?.(color)}
                    title={color.title}
                    className={`size-[32px] sm:size-[4.688vw] xl:size-[3.125vw] shrink-0 transition cursor-pointer p-1 sm:p-1.5 xl:rounded-[16px] border ${selectedId === color.id ? "border-[--primary] border-2" : "border-[--lightGrey]"}`}
                >
                    <img
                        src={color.thumbnail}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover rounded-[11px]"
                        alt={color.title}
                    />
                </button>
            ))}

            {/* +More Text */}
            {remainingCount > 0 && (
                <span className="text-sm text-[--black]">
                    +{remainingCount} More
                </span>
            )}

        </div>
    );
}

export default SelectDefultColor;
