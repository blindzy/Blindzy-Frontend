import React, { useEffect } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';

interface SingleProductedProps {
	// Add any props if needed in the future
}
function SingleProducted(props: SingleProductedProps) {

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
		<section className="w-screen min-h-screen flex xl:flex-row flex-col items-stretch gap-6 xl:px-16 sm:px-8 px-4 py-8" id="singleProduct">
			<div className="w-full flex flex-col xl:flex-row items-start gap-6 bg-white border border-[--Black] rounded-48 p-4 xl:p-8">
                <div className="relative w-full max-w-[500px] mx-auto xl:mx-0 xl:max-w-[500px] h-auto overflow-hidden mb-6 xl:mb-0">
                    <Swiper
                        navigation={{ nextEl: "#slider-next", prevEl: "#slider-prev" }}
                        modules={[Navigation]}
                        spaceBetween={16}
                        speed={500}
                        slidesPerView={1}
                        className="product-slider"
                    >
                        <SwiperSlide className="card-item w-full h-auto min-h-[200px] rounded-32 overflow-hidden" >
                            <img src="/images/product/product-datail.png" className="w-full h-auto max-h-[350px] object-contain mx-auto" alt="product-datail" />
                        </SwiperSlide>
                        <SwiperSlide className="card-item w-full h-auto min-h-[200px] rounded-32 overflow-hidden" >
                            <img src="/images/product/product-datail2.png" className="w-full h-auto max-h-[350px] object-contain mx-auto" alt="product-datail" />
                        </SwiperSlide>
                    </Swiper>
                    <div className="w-full h-full absolute left-0 top-0 flex items-center justify-between p-4 z-[10]">
                        <button id="cards-prev" className="w-[56px] h-[56px] flex items-center justify-center border border-[--white] transition text-[24px] text-white hover:bg-[--primary] hover:border-[--primary]  rounded-[56px]">
                            <Icon icon="majesticons:arrow-left-line" />
                        </button>
                        <button id="cards-next" className="w-[56px] h-[56px] flex items-center justify-center border-[2px] border-[--white] transition text-[24px] text-white hover:bg-[--primary] hover:border-[--primary]  rounded-[56px]">
                            <Icon icon="majesticons:arrow-right-line" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full flex flex-col gap-6 text-black">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg xl:text-2xl">Product Name</h5>
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                            <p className="text-sm lg:text-base xl:text-lg ">Lorem ipsum dolor sit amet consectetur. Lacus commodo fusce at neque malesuada id et aliquam. Aliquam eleifend mattis a risus orci nunc pretium elementum sem. Porttitor enim elit enim in at. Proin eget tellus faucibus sem. At eros leo sed ut arcu in.</p>
                            <p className="text-sm lg:text-base xl:text-lg ">Lorem ipsum dolor sit amet consectetur. Lacus commodo fusce at neque malesuada id et aliquam. Aliquam eleifend mattis a risus orci nunc pretium elementum sem. Porttitor enim elit enim in at. Proin eget tellus faucibus sem. At eros leo sed ut arcu in.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Color:</p>
                        <p className="text-sm lg:text-base xl:text-lg">Ash</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Size:</p>
                        <p className="text-sm lg:text-base xl:text-lg">24cm x 56cm</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Fit Type:</p>
                        <p className="text-sm lg:text-base xl:text-lg">Recess Fit</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Roll Direction:</p>
                        <p className="text-sm lg:text-base xl:text-lg">Front Roll</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Chain Colour:</p>
                        <p className="text-sm lg:text-base xl:text-lg">Silver</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Bracket Colour:</p>
                        <p className="text-sm lg:text-base xl:text-lg">Sandstone</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Base Rail Shape:</p>
                        <p className="text-sm lg:text-base xl:text-lg">Oval</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm lg:text-base xl:text-lg">Base Rail Colour:</p>
                        <p className="text-sm lg:text-base xl:text-lg">Bone</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-fit cus-btn small shrink-0 stroke-black">
                            Back
                        </button>
                        <button className="w-fit cus-btn small primary shrink-0">
                            Next
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-full cus-btn sm primary">
                            Add to Cart
                        </button>
                        <button className="w-full cus-btn sm stroke-black" >
                            Buy Now
                        </button>
                    </div>
                </div>

            </div>
		</section>
	);
}

export default SingleProducted;

