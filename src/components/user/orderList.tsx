import React, { useEffect, useState } from "react";
import { Package } from 'lucide-react';
import { Button } from "@lib/components/ui/button";
import OrderListComponent from "./order-list";
import fetchMedusaApi from "@lib/lib/fetchMedusaApi";
function OrderList(props) {
    const [orderList, setOrderList] = useState<any[]>([]);

    useEffect(() => {
        async function getOrders() {
            const email = localStorage.getItem("userEmail");
            if (!email) {
                console.error("Email not found in localStorage");
                return;
            }

            const ordersData = await fetchMedusaApi<any>({
                endpoint: "/store/customers/order",
                query: { email: email },
            });
            // console.log(ordersData.orders)
            if(ordersData.orders){
                setOrderList(ordersData.orders);
            }
            // console.log("Orders:", ordersData);
        }
        getOrders();
    }, []);
    return (
        orderList.length > 0 ? (
            <div className="w-full flex flex-col gap-6 overflow-auto line-scroll" data-lenis-prevent>
                {orderList.map((order,key) => (
                    <React.Fragment key={key}>
                        {order.items.map((item,index) => (
                            <OrderListComponent  key={index} data={item} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        ):(
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
                    <a href="/blinds/roller-blinds">
                        Start Shopping
                    </a>
                </Button>
            </div>
        )
        // <div className="w-full flex flex-col gap-6 overflow-auto line-scroll" data-lenis-prevent>
        //     {orderList.map((order) => (
        //         <OrderListComponent data={order} />
        //     ))}
        // </div>
        // props.list.orders > 0 ? (
        // ) : (
        //     <div className="size flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-center text-[--Black] xl:overflow-hidden overflow-auto scroll-hidden">
        //         <div className="flex flex-col items-center gap-4">
        //             <div className="size-[64px] bg-[--lightestGrey] rounded-full flex items-center justify-center">
        //                 <Package className="size-[32px] text-gray-400" />
        //             </div>
        //         </div>
        //         <div className="flex flex-col gap-2">
        //             <h3 className="text-lg font-medium text-[--Black]">No orders yet</h3>
        //             <p className="text-sm text-[--Black]">Your order history will appear here after you make a purchase</p>
        //         </div>
        //         <Button
        //             variant={'primary'} size={'small'}
        //             className="sm:w-[500px] w-full"
        //             asChild
        //         >
        //             <a href="/blinds/single">
        //                 Start Shopping
        //             </a>
        //         </Button>
        //     </div>
        // )
    );
};

export default OrderList;