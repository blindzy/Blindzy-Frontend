import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import $ from 'jquery';
import gsap from "gsap";
import { api, type Cart, type CartItem } from '../../services/api';

import './css/style.css';

interface CartProps {
    // Add any props if needed in the future
}
function Cart(props: CartProps) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        $('.open__cartPopup').on('click', function () {
            $('body').addClass('scroll-none');
            $('#cartPopup').show();
            $('#back-drop').css({ 'pointerEvents': 'auto', 'opacity': 1 });
            $('#cartPopup').css({ height: '100vw', pointerEvents: 'auto', display: 'block' });
            loadCart();
        })
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const cartData = await api.getCart();
            setCart(cartData);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        try {
            const updatedCart = await api.updateCartItem(itemId, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeItem = async (itemId: string) => {
        try {
            const updatedCart = await api.removeFromCart(itemId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const getItemPrice = (item: CartItem) => {
        return `$${(item.unit_price / 100).toFixed(2)}`;
    };

    const getTotalPrice = () => {
        if (!cart) return '$0.00';
        return `$${(cart.total / 100).toFixed(2)}`;
    };
    const cartClose = () => {
        $('#cartPopup').css({ height: '0', pointerEvents: 'none', display: 'none' });
        $('#back-drop').css({ opacity: '0', pointerEvents: 'none' });
        $('body').removeClass('scroll-none');
    }


    return (
        <>
            <div className="fixed left-0 top-0 z-[100] contact-popup w-screen h-0 overflow-hidden hidden pointer-events-none" id="cartPopup">
                <div className="w-screen h-screen xl:p-[1.25vw] sm:p-[2.344vw] p-4">
                    <div className="xl:w-[640px] w-full h-full xl:ml-auto mx-auto bg-white flex flex-col justify-between xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 shrink-0 rounded-48">
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 shrink-0">
                            <div className="flex items-center justify-between gap-4 text-black">
                                <h3 className="text-xxl">Cart</h3>
                                <button className="close-button" onClick={cartClose}>
                                    <span className="leftright"></span>
                                    <span className="rightleft"></span>
                                </button>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                                <div className="w-full h-[1px] bg-mediumGrey"></div>
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col gap-8 overflow-scroll scroll-hidden ">
                            {loading && (
                                <div className="text-center py-8">Loading cart...</div>
                            )}

                            {!loading && (!cart || cart.items.length === 0) && (
                                <div className="text-center py-8">
                                    <p>Your cart is empty</p>
                                    <button
                                        className="cus-btn mt-4"
                                        onClick={() => window.location.href = '/shop'}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            )}

                            {!loading && cart && cart.items.length > 0 && cart.items.map((item) => (
                                <div key={item.id} className="w-full flex items-stretch gap-4">
                                    <div className="w-[88px] h-[88px] bg-primary rounded-[15px] shrink-0">
                                        <img
                                            src="/images/product/1.png"
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-[15px]"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col justify-between gap-2">
                                        <div className="flex items-center justify-between gap-4">
                                            <h6 className="text-md text-black">{item.title}</h6>
                                            <span className="text-md text-black">{getItemPrice(item)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="quantity">
                                                <button
                                                    className="minus"
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                >
                                                    <Icon icon="uil:minus" />
                                                </button>
                                                <input type="text" value={item.quantity} readOnly />
                                                <button
                                                    className="plus"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Icon icon="uil:plus" />
                                                </button>
                                            </div>
                                            <span
                                                className="text-md text-[--danger] cursor-pointer border border-black rounded-xl p-2.5 w-10 h-10 flex items-center justify-center transition hover:bg-gray-100"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M4.26489 5.85706L4.75971 15.2463C4.83591 16.7102 6.0419 17.8571 7.5058 17.8571H12.2099C13.6738 17.8571 14.8798 16.7101 14.956 15.2467L15.4508 5.85706H4.26489Z" fill="#D72B2A" />
                                                    <path d="M16.1072 4.85706H12.8572V3.60706C12.8572 2.64226 12.072 1.85706 11.1072 1.85706H8.60718C7.64238 1.85706 6.85718 2.64226 6.85718 3.60706V4.85706H3.60718C3.19308 4.85706 2.85718 5.19296 2.85718 5.60706C2.85718 6.02116 3.19308 6.35706 3.60718 6.35706H16.1072C16.5213 6.35706 16.8572 6.02116 16.8572 5.60706C16.8572 5.19296 16.5213 4.85706 16.1072 4.85706ZM8.35718 3.60706C8.35718 3.47136 8.47148 3.35706 8.60718 3.35706H11.1072C11.2429 3.35706 11.3572 3.47136 11.3572 3.60706V4.85706H8.35718V3.60706Z" fill="#D72B2A" />
                                                </svg>

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 shrink-0">
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                                <div className="w-full h-[1px] bg-mediumGrey"></div>
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl">TOTAL</h3>
                                <span className="text-xl">{getTotalPrice()}</span>
                            </div>
                            <button
                                className="cus-btn primary text-center"
                                onClick={() => {
                                    cartClose();
                                    window.location.href = '/checkout';
                                }}
                                disabled={!cart || cart.items.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;

