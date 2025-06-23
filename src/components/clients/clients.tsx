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

	useEffect(() => {
	}, []);

	return (
		<section className="client-section w-screen xl:h-screen flex flex-col justify-center gap-[48px] xl:py-[1.25vw] sm:py-[10vh] py-[6vh] overflow-hidden" id="client">
            <div className="xl:w-full w-[80%] mx-auto flex xl:flex-row flex-col items-center justify-between gap-6 text-center xl:px-[1.25vw] sm:px-4 px-2">
                <h2 className="text-xxxl text-black uppercase">What Our Clients are saying</h2>
                <div className="sm:flex hidden items-stretch gap-4">
                    <button className="arrow-btn stroke" id="slider-prev">
                        <Icon icon="ri:arrow-left-line" />
                    </button>
                    <button className="arrow-btn primary" id="slider-next">
                        <Icon icon="ri:arrow-right-line" />
                    </button>
                </div>
            </div>
            <div className="w-full overflow-hidden">
                <Swiper
                    navigation={{ nextEl: "#slider-next", prevEl: "#slider-prev" }}
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
                    <SwiperSlide className="cards-item rounded-48" >
                        <div className="flex items-center gap-4">
                            <img src="/images/blindzy-icon.png" className="w-fit" alt="blindzy-icon" />
                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg text-black">CUSTOMERâ€™S NAME</h5>
                                <div className="flex items-center gap-2">
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-md text-black">Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.</p>
                    </SwiperSlide>
                    <SwiperSlide className="cards-item rounded-48" >
                        <div className="flex items-center gap-4">
                            <img src="/images/blindzy-icon.png" className="w-fit" alt="blindzy-icon" />
                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg text-black">CUSTOMERâ€™S NAME</h5>
                                <div className="flex items-center gap-2">
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-md text-black">Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.</p>
                    </SwiperSlide>
                    <SwiperSlide className="cards-item rounded-48" >
                        <div className="flex items-center gap-4">
                            <img src="/images/blindzy-icon.png" className="w-fit" alt="blindzy-icon" />
                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg text-black">CUSTOMERâ€™S NAME</h5>
                                <div className="flex items-center gap-2">
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-md text-black">Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.</p>
                    </SwiperSlide>
                    <SwiperSlide className="cards-item rounded-48" >
                        <div className="flex items-center gap-4">
                            <img src="/images/blindzy-icon.png" className="w-fit" alt="blindzy-icon" />
                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg text-black">CUSTOMERâ€™S NAME</h5>
                                <div className="flex items-center gap-2">
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-md text-black">Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.</p>
                    </SwiperSlide>
                    <SwiperSlide className="cards-item rounded-48" >
                        <div className="flex items-center gap-4">
                            <img src="/images/blindzy-icon.png" className="w-fit" alt="blindzy-icon" />
                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg text-black">CUSTOMERâ€™S NAME</h5>
                                <div className="flex items-center gap-2">
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                    <Icon icon="ic:round-star" className="text-[24px] text-primary"/>
                                </div>
                            </div>
                        </div>
                        <p className="text-md text-black">Lorem ipsum dolor sit amet consectetur. Felis nibh nullam massa ac quis malesuada proin non. Rhoncus nisl consectetur leo morbi. Dictum commodo hac penatibus arcu pellentesque dolor. Sollicitudin in non venenatis enim sit.</p>
                    </SwiperSlide>
                </Swiper>
            </div>
		</section>
	);
}

export default Clients;

