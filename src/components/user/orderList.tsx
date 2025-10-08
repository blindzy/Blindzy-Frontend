import React, { useEffect, useState } from "react";
import { Package } from 'lucide-react';
import { Button } from "@lib/components/ui/button";
import OrderListComponent from "./order-list";
function OrderList(props) {
    // Dummy data for orders until API is integrated
    // [{
    //         id: 1,
    //         title: "Product Name",
    //         thumbnail: '/images/categories/1.png',
    //         price: { amount: 150, currency_code: 'usd' },
    //         options: [
    //             { id: 1, name: "Color:", value: "Ash" },
    //             { id: 2, name: "Size:", value: "24cm x 56cm" },
    //             { id: 3, name: "Fit Type:", value: "Recess Fit" },
    //             { id: 4, name: "Roll Direction:", value: "Front Roll" },
    //             { id: 5, name: "Chain Colour:", value: "Silver" },
    //             { id: 6, name: "Bracket Colour:", value: "Sandstone" },
    //             { id: 7, name: "Base Rail Shape:", value: "Oval" },
    //             { id: 8, name: "Base Rail Colour:", value: "Bone" },
    //         ],
    //         date: "2023-01-01",
    //         status: "Shipped",
    //     },
    //     {
    //         id: 2,
    //         title: "Product 2",
    //         thumbnail: '/images/categories/2.png',
    //         price: { amount: 100, currency_code: 'usd' },
    //         options: [
    //             { id: 1, name: "Color:", value: "Ash" },
    //             { id: 2, name: "Size:", value: "24cm x 56cm" },
    //             { id: 3, name: "Fit Type:", value: "Recess Fit" },
    //             { id: 4, name: "Roll Direction:", value: "Front Roll" },
    //             { id: 5, name: "Chain Colour:", value: "Silver" },
    //             { id: 6, name: "Bracket Colour:", value: "Sandstone" },
    //             { id: 7, name: "Base Rail Shape:", value: "Oval" },
    //             { id: 8, name: "Base Rail Colour:", value: "Bone" },
    //         ],
    //         date: "2023-01-02",
    //         status: "Pending"
    //     }
    // ]


    return (
        props.list.length > 0 ? (
            <div className="w-full flex flex-col gap-6 overflow-auto line-scroll" data-lenis-prevent>
                {props.list.map((order) => (
                    <OrderListComponent data={order} />
                ))}
            </div>
        ) : (
            <div className="size flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-center text-[--Black] xl:overflow-hidden overflow-auto scroll-hidden">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-[64px] bg-[--lightestGrey] rounded-full flex items-center justify-center">
                        <Package className="size-[32px] text-gray-400" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium text-[--Black]">No orders yet</h3>
                    <p className="text-sm text-[--Black]">Your order history will appear here after you make a purchase</p>
                </div>
                <Button
                    variant={'primary'} size={'small'}
                    className="sm:w-[500px] w-full"
                    asChild
                >
                    <a href="/blinds/single">
                        Start Shopping
                    </a>
                </Button>
            </div>
        )
    );
};

export default OrderList;