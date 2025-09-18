import React from "react";
import { Plus } from 'lucide-react';
function separate() {
    return (
        <div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
            <Plus className="size-[18px]" />
            <div className="w-full border-b border-[--mediumGrey]"></div>
            <Plus className="size-[18px]" />
        </div>
    );
}

export default separate;

