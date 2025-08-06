import React, { useEffect } from "react";
import './css/style.css';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';

interface ClientsProps {
	// Add any props if needed in the future
}
function Clients(props: ClientsProps) {

	// Testimonial data array
	const testimonials = [
		{
			name: "CUSTOMER'S NAME",
			text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
			image: "/images/blindzy-icon.png",
			stars: 5,
		},
		{
			name: "CUSTOMER'S NAME",
			text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
			image: "/images/blindzy-icon.png",
			stars: 5,
		},
		{
			name: "CUSTOMER'S NAME",
			text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
			image: "/images/blindzy-icon.png",
			stars: 5,
		},
		{
			name: "CUSTOMER'S NAME",
			text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
			image: "/images/blindzy-icon.png",
			stars: 5,
		},
		{
			name: "CUSTOMER'S NAME",
			text: "Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.",
			image: "/images/blindzy-icon.png",
			stars: 5,
		},
	];

	useEffect(() => {
	}, []);

	return (
		<section className="client-section w-screen xl:h-screen flex flex-col justify-center gap-[48px] xl:py-[1.25vw] sm:py-[10vh] py-[6vh] overflow-hidden  mbl:px-4 mbl:py-24" id="client">
            <div className="xl:w-full w-[80%] mx-auto flex xl:flex-row flex-col items-center justify-between gap-6 text-center xl:px-[1.25vw] sm:px-4 px-2">
                <h2 className="text-xxxl text-black uppercase">What Our Clients are saying</h2>
                <div className="sm:flex hidden items-stretch gap-4">
                    <button className="arrow-btn stroke" id="client-slider-prev">
                        <Icon icon="ri:arrow-left-line" />
                    </button>
                    <button className="arrow-btn primary" id="client-slider-next">
                        <Icon icon="ri:arrow-right-line" />
                    </button>
                </div>
            </div>
            <div className="w-full overflow-visible">
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
                    {testimonials.map((testimonial, idx) => (
                        <SwiperSlide className="cards-item mbl:max-w-[81.425vw] rounded-48 mbl:rounded-[8.142vw]" key={idx}>
                            <div className="mbl:p-5 flex flex-col gap-4 h-full justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} className="w-fit mbl:w-[9.542vw]" alt="blindzy-icon" />
                                    <div className="flex flex-col gap-2">
                                        <h5 className="text-lg mbl:text-base mbl:font-extrabold text-black">{testimonial.name}</h5>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: testimonial.stars }).map((_, i) => (
                                                <Icon icon="ic:round-star" className="text-[24px] text-primary" key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-md mbl:text-sm mbl:font-roboto mbl:font-normal text-black">{testimonial.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
		</section>
	);
}

export default Clients;

