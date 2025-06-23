import React, { useEffect } from "react";
import { Icon } from '@iconify/react';
import $ from 'jquery';
import gsap from "gsap";

import './css/style.css';

interface CartProps {
	// Add any props if needed in the future
}
function Cart(props: CartProps) {

	useEffect(() => {
        $('.open__cartPopup').on('click',function(){
            $('body').addClass('scroll-none');
            // $('body').css({'pointerEvents': 'none'});
            $('#cartPopup').show();
            $('#back-drop').css({'pointerEvents': 'auto', 'opacity': 1});
            let tl1 = gsap.timeline();
            tl1.to('#cartPopup', { height: '100vw', pointerEvents: 'auto', duration:1.5});
        })
	}, []);
    const cartClose = () => {
        // $('body').css({'height': 'auto','overFlow': 'visible'});
        let tl1 = gsap.timeline();
        tl1.to('#cartPopup', { height: '0', pointerEvents: 'none', duration:1});
        tl1.to('#cartPopup', { display:'none',duration:0},'-=0.1');
        tl1.to('#back-drop', { opacity: '0', pointerEvents: 'none', duration:0});
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
                            <div className="w-full flex items-stretch gap-4">
                                <div className="w-[88px] h-[88px] bg-primary rounded-[15px] shrink-0"></div>
                                <div className="w-full flex flex-col justify-between gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <h6 className="text-md text-black">Product Name</h6>
                                        <span className="text-md text-black">$7000</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="quantity ">
                                            <button className="minus">
                                                <Icon icon="uil:minus" />    
                                            </button>
                                            <input type="text" value={1}/>
                                            <button className="plus">
                                                <Icon icon="uil:plus" />    
                                            </button>
                                        </div>
                                        <span className="text-md text-[--danger]">Delete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-stretch gap-4">
                                <div className="w-[88px] h-[88px] bg-primary rounded-[15px] shrink-0"></div>
                                <div className="w-full flex flex-col justify-between gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <h6 className="text-md text-black">Product Name</h6>
                                        <span className="text-md text-black">$7000</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="quantity ">
                                            <button className="minus">
                                                <Icon icon="uil:minus" />    
                                            </button>
                                            <input type="text" value={1}/>
                                            <button className="plus">
                                                <Icon icon="uil:plus" />    
                                            </button>
                                        </div>
                                        <span className="text-md text-[--danger]">Delete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-stretch gap-4">
                                <div className="w-[88px] h-[88px] bg-primary rounded-[15px] shrink-0"></div>
                                <div className="w-full flex flex-col justify-between gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <h6 className="text-md text-black">Product Name</h6>
                                        <span className="text-md text-black">$7000</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="quantity ">
                                            <button className="minus">
                                                <Icon icon="uil:minus" />    
                                            </button>
                                            <input type="text" value={1}/>
                                            <button className="plus">
                                                <Icon icon="uil:plus" />    
                                            </button>
                                        </div>
                                        <span className="text-md text-[--danger]">Delete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-stretch gap-4">
                                <div className="w-[88px] h-[88px] bg-primary rounded-[15px] shrink-0"></div>
                                <div className="w-full flex flex-col justify-between gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <h6 className="text-md text-black">Product Name</h6>
                                        <span className="text-md text-black">$7000</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="quantity ">
                                            <button className="minus">
                                                <Icon icon="uil:minus" />    
                                            </button>
                                            <input type="text" value={1}/>
                                            <button className="plus">
                                                <Icon icon="uil:plus" />    
                                            </button>
                                        </div>
                                        <span className="text-md text-[--danger]">Delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 shrink-0">
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                                <div className="w-full h-[1px] bg-mediumGrey"></div>
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                            </div>
                            <div className="flex items-cener justify-between">
                                <h3 className="text-xl">TOTAL</h3>
                                <span className="text-xl">$14000</span>
                            </div>
                            <button className="cus-btn primary text-center">
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

