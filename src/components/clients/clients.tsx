import React, { useEffect } from "react";
import './css/style.css';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';
import { Button } from "@lib/components/ui/button";

function Clients(props) {

	// const testimonials = [
	// 	{
	// 		name: "CUSTOMER'S NAME",
	// 		text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
	// 		image: "/images/blindzy-icon.png",
	// 		stars: 5,
	// 	},
	// 	{
	// 		name: "CUSTOMER'S NAME",
	// 		text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
	// 		image: "/images/blindzy-icon.png",
	// 		stars: 5,
	// 	},
	// 	{
	// 		name: "CUSTOMER'S NAME",
	// 		text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
	// 		image: "/images/blindzy-icon.png",
	// 		stars: 5,
	// 	},
	// 	{
	// 		name: "CUSTOMER'S NAME",
	// 		text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
	// 		image: "/images/blindzy-icon.png",
	// 		stars: 5,
	// 	},
	// 	{
	// 		name: "CUSTOMER'S NAME",
	// 		text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
	// 		image: "/images/blindzy-icon.png",
	// 		stars: 5,
	// 	},
	// ];

	useEffect(() => {
	}, []);

	return (
		<section className="client-section w-screen xl:h-screen flex items-center xl:py-[1.25vw] sm:py-[10vh] py-[6vh] overflow-hidden" id="client">
            <div className="w-full flex flex-wrap items-center justify-between  overflow-hidden">
                <div className="xl:w-fit w-full xl:text-left text-center order-1 xl:px-[1.25vw] sm:px-[2.344vw] px-[5.455vw]">
                    <h2 className="text-xxxl text-black uppercase">What Our Clients are saying</h2>
                </div>
                <div className="xl:w-fit w-full flex justify-end gap-4 xl:order-1 order-3 xl:pe-[1.25vw] sm:px-[2.344vw] px-[5.455vw]">
                    <Button variant={'light'} size={'xxl'} className="rounded-full" id="client-slider-prev">
                        <Icon icon="ri:arrow-left-line" />
                    </Button>
                    <Button variant={'primary'} size={'xxl'} className="rounded-full border-[--white]" id="client-slider-next">
                        <Icon icon="ri:arrow-right-line" />
                    </Button>
                </div>
                <div className="w-full xl:order-3 order-2 overflow-hidden">
                    <Swiper
                        navigation={{ nextEl: "#client-slider-next", prevEl: "#client-slider-prev" }}
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={1}
                        className="client-cards" 
                        breakpoints={{
                            1260: {
                                slidesPerView:3,
                                spaceBetween: 16,
                            },
                            765: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                        }}
                    >
                        {props.data && props.data.map((testimonial, idx) => (
                            <SwiperSlide className="cards-item rounded-48" key={idx}>
                                    <div className="flex items-center gap-4">
                                        <img src='/images/blindzy-icon.png' className="w-fit mbl:w-[9.542vw]" alt="blindzy-icon" />
                                        <div className="flex flex-col gap-2">
                                            <h5 className="text-lg mbl:text-base mbl:font-extrabold text-black">{testimonial.name}</h5>
                                            <div className="flex items-center gap-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Icon icon="ic:round-star" className="text-[24px] text-primary" key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-md text-black">{testimonial.description}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
		</section>
	);
}

export default Clients;

