import React, { useEffect } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';

function SingleProducted() {

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
		<section className="w-screen h-[86vh] flex items-stretch xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:px-[1.25vw] sm:px-[2.344vw] px-4" id="singleProduct">
			<div className="w-full h-full flex items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black border border-[--Black] rounded-48">
                <div className="relative w-full h-full overflow-hidden ">
                    <Swiper
                        navigation={{ nextEl: "#cards-next", prevEl: "#cards-prev" }}
                        modules={[Navigation]}
                        spaceBetween={16}
                        speen={3000}
                        slidesPerView={1}
                        className="w-full h-full product-cards"
                    >
                        <SwiperSlide className="card-item w-full h-full rounded-32 overflow-hidden" >
                            <img src="/images/product/product-datail.png" className="w-full h-full object-cover" alt="product-datail" />
                        </SwiperSlide>
                        <SwiperSlide className="card-item w-full h-full rounded-32 overflow-hidden" >
                            <img src="/images/product/product-datail2.png" className="w-full h-full object-cover" alt="product-datail" />
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
                <div className="w-[780px] shrink-0 flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Product Name</h5>
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                            <p className="text-sm ">Lorem ipsum dolor sit amet consectetur. Lacus commodo fusce at neque malesuada id et aliquam. Aliquam eleifend mattis a risus orci nunc pretium elementum sem. Porttitor enim elit enim in at. Proin eget tellus faucibus sem. At eros leo sed ut arcu in.</p>
                            <p className="text-sm ">Lorem ipsum dolor sit amet consectetur. Lacus commodo fusce at neque malesuada id et aliquam. Aliquam eleifend mattis a risus orci nunc pretium elementum sem. Porttitor enim elit enim in at. Proin eget tellus faucibus sem. At eros leo sed ut arcu in.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Customisations</h5>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Color:</p>
                            <p className="text-sm">Ash</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Size:</p>
                            <p className="text-sm">24cm x 56cm</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Fit Type:</p>
                            <p className="text-sm">Recess Fit</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Roll Direction:</p>
                            <p className="text-sm">Front Roll</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Chain Colour:</p>
                            <p className="text-sm">Silver</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Bracket Colour:</p>
                            <p className="text-sm">Sandstone</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Base Rail Shape:</p>
                            <p className="text-sm">Oval</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Base Rail Colour:</p>
                            <p className="text-sm">Bone</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="flex items-cnter gap-2">
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
