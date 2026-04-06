import React, { useEffect, useRef, useState } from "react";
import { Button } from "@lib/components/ui/button";
import Separate from "@components/separate";
import { CartProduct } from "./cart-product";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@lib/components/ui/dialog";
import { X, Loader2 } from 'lucide-react';
import { createAddToCart } from "services/add-to-cart";
import { updateCart } from "services/update-cart";
import fetchMedusaApi from "@lib/lib/fetchMedusaApi";
import './css/style.css';


export function CartPopup() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState(null);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0);

    // Calculate total amount from all cart items
    const calculateTotalAmount = (items) => {
        let total = 0;
        let symbol = '';

        items.forEach(item => {
            const itemAmount = (item.customizations?.amount || 0) * (item.quantity || 1);
            total += itemAmount;
            // Get currency symbol from first item (assuming all items have same currency)
            if (!symbol && item.customizations?.currency) {
                symbol = item.customizations.currency;
            }
        });

        setCurrencySymbol(symbol);
        setTotalAmount(total);
    };

    const isSyncingRef = useRef(false);

    // Function to fetch cart data
    const getCart = async () => {

        if (isSyncingRef.current) return;
        isSyncingRef.current = true;

        setLoading(true);
        try {
            const guestItems: any[] = JSON.parse(localStorage.getItem('guest_cart') || '[]');

            const userDataString = localStorage.getItem('user');
            if (!userDataString) {
                setCartItems(guestItems);
                setCartItemCount(guestItems.length);
                calculateTotalAmount(guestItems);
                return;
            }

            const userDataObj = JSON.parse(userDataString);
            setUserData(userDataObj);

            // Fetch server cart first so we can compare
            let serverItems: any[] = [];
            try {
                const data = await fetchMedusaApi<any>({
                    endpoint: 'store/customers/cart',
                    query: { email: userDataObj.email },
                });
                serverItems = data.cart.items ?? [];
            } catch (err: any) {
                if (err?.message?.includes('404')) {
                    if (guestItems.length > 0) {

                        localStorage.removeItem('guest_cart'); // 👈 clear here so outer block skips

                        // Create cart with the first guest item
                        await fetchMedusaApi<any>({
                            endpoint: 'store/customers/cart',
                            method: 'POST',
                            body: {
                                email: userDataObj.email,
                                product_id: guestItems[0].product_id,
                                quantity: guestItems[0].quantity,
                                customizations: guestItems[0].customizations,
                            },
                        });

                        // Add remaining items if any
                        if (guestItems.length > 1) {
                            await Promise.all(
                                guestItems.slice(1).map(item =>
                                    createAddToCart.addToCart({
                                        email: userDataObj.email,
                                        product_id: item.product_id,
                                        quantity: item.quantity,
                                        customizations: item.customizations,
                                    })
                                )
                            );
                        }
                    } else {
                        // No guest items, just init the cart — revert backend validation for this case
                        await fetchMedusaApi<any>({
                            endpoint: 'store/customers/cart',
                            method: 'POST',
                            body: { email: userDataObj.email, product_id: null, quantity: null },
                        });
                    }

                    const refreshed = await fetchMedusaApi<any>({
                        endpoint: 'store/customers/cart',
                        query: { email: userDataObj.email },
                    });
                    serverItems = refreshed.cart.items ?? [];
                } else {
                    throw err;
                }
            }

            if (guestItems.length > 0 && localStorage.getItem('guest_cart') !== null) {
                localStorage.removeItem('guest_cart');

                const addPromises: Promise<any>[] = [];
                const updatePromises: Promise<any>[] = [];

                guestItems.forEach(guestItem => {
                    const match = serverItems.find(
                        serverItem => serverItem.product_id === guestItem.product_id
                    );

                    if (match) {
                        // Product exists on server — update quantity instead of adding
                        updatePromises.push(
                            updateCart.updateCart(match.id, {
                                quantity: match.quantity + guestItem.quantity,
                            })
                        );
                    } else {
                        // New product — add it fresh
                        addPromises.push(
                            createAddToCart.addToCart({
                                email: userDataObj.email,
                                product_id: guestItem.product_id,
                                quantity: guestItem.quantity,
                                customizations: guestItem.customizations,
                            })
                        );
                    }
                });

                await Promise.all([...addPromises, ...updatePromises]);

                // Re-fetch after sync so UI reflects the final merged state
                const refreshed = await fetchMedusaApi<any>({
                    endpoint: 'store/customers/cart',
                    query: { email: userDataObj.email },
                });

                const finalItems = refreshed.cart.items ?? [];
                setCartItems(finalItems);
                setCartItemCount(finalItems.length);
                calculateTotalAmount(finalItems);
            } else {
                setCartItems(serverItems);
                setCartItemCount(serverItems.length);
                calculateTotalAmount(serverItems);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
            isSyncingRef.current = false;
        }
    };

    // Fetch cart data on mount to show badge count without opening the dialog
    useEffect(() => {
        getCart();
    }, []);

    // Fetch cart data when dialog opens
    useEffect(() => {
        if (open) {
            getCart();
        }
    }, [open]);

    // Recalculate total and update count when cart items change
    useEffect(() => {
        calculateTotalAmount(cartItems);
        setCartItemCount(cartItems.length);
    }, [cartItems]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'light'} size={'xl'} className="border-none rounded-full relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M15.75 17.5L18.25 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M24.25 17.5L21.75 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M26 17.5L25.403 24.666C25.317 25.703 24.45 26.5 23.41 26.5H16.59C15.55 26.5 14.683 25.703 14.597 24.666L14 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.75 17.5H27.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-[--primary] text-[--white] text-[10px] font-semibold rounded-full leading-none pointer-events-none">
                            {cartItemCount > 99 ? '99+' : cartItemCount}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[100vw] w-full h-[100vh] p-0 bg-transparent">
                <div className="sm:max-w-[400px] w-full sm:h-[calc(100vh-32px)] sm:mt-4 mt-2 sm:mr-4 mr-2 ml-auto h-[calc(100vh-16px)] flex flex-col gap-6 p-6 bg-[--white] rounded-48 overflow-hidden">
                    <div className="w-full flex flex-col gap-6">
                        <DialogHeader>
                            <DialogTitle className="text-xxl uppercase">Cart</DialogTitle>
                            <DialogClose asChild>
                                <Button type="button" variant="light" size={'lg'}>
                                    <X className="size-6" />
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <Separate />
                    </div>
                    <div className="w-full h-full flex flex-col gap-6 py-2 overflow-auto line-scroll" data-lenis-prevent>
                        {loading ? (
                            <div className="flex justify-center w-full h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-[--primary]" />
                            </div>
                        ) : cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <CartProduct
                                    key={index}
                                    item={item}
                                    onQuantityChange={(item, newQuantity) => {
                                        const updatedItems = cartItems.map(cartItem =>
                                            cartItem.id === item.id
                                                ? { ...cartItem, quantity: newQuantity }
                                                : cartItem
                                        );
                                        setCartItems(updatedItems);
                                        calculateTotalAmount(updatedItems);
                                    }}
                                    onDeleteSuccess={(deletedItemId) => {
                                        const updatedItems = cartItems.filter(cartItem => cartItem.id !== deletedItemId);
                                        setCartItems(updatedItems);
                                        calculateTotalAmount(updatedItems);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="text-center text-[--white]">No items in cart</div>
                        )}
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <Separate />
                        <div className="w-full flex items-center justify-between">
                            <h5 className="text-lg">TOTAL</h5>
                            <h5 className="text-lg">
                                {currencySymbol}
                                {totalAmount.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </h5>
                        </div>
                        <DialogFooter >
                            <Button
                                variant={'primary'}
                                size={'smallest'}
                                className="w-full"
                                asChild
                            >
                                <a href="/checkout">
                                    Proceed to Checkout
                                </a>
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}