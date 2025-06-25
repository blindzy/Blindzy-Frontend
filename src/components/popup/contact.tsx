import React, { useEffect } from "react";
import { Icon } from '@iconify/react';
import $ from 'jquery';
import gsap from "gsap";

import './css/style.css';

interface ProductsProps {
	// Add any props if needed in the future
}
function Products(props: ProductsProps) {

	useEffect(() => {
        $('.open__contactPopup').on('click',function(){
            $('body').addClass('scroll-none');
            $('#contactPopup').show();
            $('#back-drop').css({'pointerEvents': 'auto', 'opacity': 1});
            let tl1 = gsap.timeline();
            tl1.to('#contactPopup', { width: '100vw', pointerEvents: 'auto', duration:1.5});
        })
	}, []);
    const contactClose = () => {

        $('#back-drop').css({'pointerEvents': 'none', 'opacity': 0});        
        let tl1 = gsap.timeline();
        tl1.to('#contactPopup', { width: '0', pointerEvents: 'none', duration:1.5});
        tl1.to('#contactPopup', { display:'none',duration:0},'-=0.1');
        $('body').removeClass('scroll-none');

    }
    

	return (
        <>
            <div className="fixed top-0 left-0 z-[90] w-screen h-screen bg-[#00000078] transition backdrop-blur-[10px] opacity-0 pointer-events-none" id="back-drop"></div>

            <div className="fixed left-0 top-0 z-[100] contact-popup w-[0] h-screen overflow-hidden hidden pointer-events-none" id="contactPopup">
                <div className="w-screen h-screen xl:p-[1.25vw] sm:p-[2.344vw] p-2">
                    <div className="xl:w-[1107px] w-full xl:ml-auto mx-auto flex xl:flex-row flex-col items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 h-full shrink-0">
                        <div className="xl:w-[360px] w-full text-white flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2 bg-primary xl:shrink-0 rounded-48 order-2 xl:order-1">
                            <h4 className="text-xl">Contact INFO</h4>
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px]" />
                                <div className="w-full h-[1px] bg-white"></div>
                                <Icon icon="uil:plus" className="text-[18px]" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h6 className="text-md">Contact Via</h6>
                                <div className="flex flex-col gap-6">
                                    <a href="" className="flex items-center gap-2 text-sm transition hover:text-[--Black]">
                                        <Icon icon="solar:phone-outline" />
                                        <span>+1 233 898 0897</span>
                                    </a>
                                    <a href="" className="flex items-center gap-2 text-sm transition hover:text-[--Black]">
                                        <Icon icon="fluent:mail-32-light" />
                                        <span>email@example.com</span>
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px]" />
                                <div className="w-full h-[1px] bg-white"></div>
                                <Icon icon="uil:plus" className="text-[18px]" />
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <h6 className="text-md">OPENING HOUR</h6>
                                <div className="flex items-center justify-between gap-8">
                                    <p className="text-sm">WEEK DAYS</p>
                                    <p className="text-sm">9 AM â€" 7 PM</p>
                                </div>
                                <div className="flex items-center justify-between gap-8">
                                    <p className="text-sm">SATURDAY</p>
                                    <p className="text-sm">9 AM â€" 5 PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full max-h-full h-fit flex flex-col gap-[48px] text-black xl:p-[1.25vw] sm:p-[2.344vw] p-2 bg-white rounded-48 overflow-scroll scroll-hidden order-1 xl:order-2">
                            <button className="absolute top-6 right-6 transition text-black text-[32px] hover:text-primary" onClick={contactClose}>
                                <Icon icon="iconamoon:close-bold" />
                            </button>
                            <div className="flex flex-col gap-4">
                                <h2 className="text-xxl uppercase">Fill Out The Form to Contact us</h2>
                                <p className="text-sm">Lorem ipsum dolor sit amet consectetur nunc faucibus ut ornare.</p>
                            </div>
                            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                <div className="w-full flex xl:flex-row flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <input type="text" className="formInput" id="name" placeholder="Your Name"/>
                                    <input type="text" className="formInput" id="name" placeholder="Your"/>
                                </div>
                                <div className="w-full flex xl:flex-row flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <input type="text" className="formInput" id="name" placeholder="Phone Number"/>
                                    <input type="text" className="formInput" id="name" placeholder="Enquiry About"/>
                                </div>
                                <div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <input type="text" className="formInput" id="name" placeholder="Your Number"/>
                                </div>
                                <div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <textarea name="" id="" className="formInput h-[162px]"></textarea>
                                </div>
                                <button className="w-fit xl:ml-auto mx-auto cus-btn small shrink-0">
                                    Send Message
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
	);
}

export default Products;

