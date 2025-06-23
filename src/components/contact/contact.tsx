import React, { useEffect } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

interface ContactProps {
	// Add any props if needed in the future
}

function Contact(props: ContactProps) {

	useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		ScrollTrigger.normalizeScroll(true);

		const deviceWidth = window.innerWidth;
		if (deviceWidth > 768) {
		  ScrollSmoother.create({
		    smooth: 2,
		    effects: true,
		    normalizeScroll: true,
		  });
		}
	}, []);
    

	return (
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="contact-us">
            <div className="w-full border border-[--Black] p-4 text-center rounded-[48px]">
                <h1 className="text-1xl text-black">CONTACT US</h1>
            </div>
            <div className="flex items-stretch xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <div className="w-[575px] flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-[48px]">
                    <h4 className="text-xl ">Contact METHODS</h4>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h6 className="text-md ">Contact Via</h6>
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                            <a href="" className="flex items-center gap-2 text-sm transition hover:text-[--primary]">
                                <Icon icon="solar:phone-outline" />
                                <span>+1 233 898 0897</span>
                            </a>
                            <a href="" className="flex items-center gap-2 text-sm transition hover:text-[--primary]">
                                <Icon icon="fluent:mail-32-light" />
                                <span>email@example.com</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <h6 className="text-md">OPENING HOUR</h6>
                        <div className="flex items-center justify-between gap-8">
                            <p className="text-sm">WEEK DAYS</p>
                            <p className="text-sm">9 AM – 7 PM</p>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                            <p className="text-sm">SATURDAY</p>
                            <p className="text-sm">9 AM – 5 PM</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:gap-[48px] xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-[48px]">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl">Fill Out The Form to Contact us</h4>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur nunc faucibus ut ornare.</p>
                    </div>
                    <form action="">
                        <div className="grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4">
                            <div className="sm:col-span-6 col-span-12">
                                <input type="text" className="formInput" id="name" placeholder="Your Name"/>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <input type="eamil" className="formInput" id="eamil" placeholder="Your Email"/>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <input type="text" className="formInput" id="phoneNumber" placeholder="Phone Number"/>
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <input type="text" className="formInput" id="enquiryAbout" placeholder="Enquiry About"/>
                            </div>
                            <div className="col-span-12">
                                <input type="number" className="formInput" id="yourNumber" placeholder="Your Number"/>
                            </div>
                            <div className="col-span-12">
                                <textarea name="message" id="message" placeholder="Your Message Here" className="formInput h-[186px]"></textarea>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button className="w-fit cus-btn small shrink-0">
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
	);
}

export default Contact;
