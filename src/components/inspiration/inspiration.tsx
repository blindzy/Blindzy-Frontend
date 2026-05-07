import React, { useEffect , useState, useRef } from "react";
import { Icon } from '@iconify/react';
import './css/style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';
import { Button } from "@lib/components/ui/button";

function Inspiration() {
    const [screen, setScreen] = useState<boolean>(true);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

	useEffect(() => {
        if(window.innerWidth < 1025){
            setScreen(false)
        }
	}, []);

	return (
		<section className="inspiration-section w-screen xl:h-screen flex items-center xl:py-[1.25vw] sm:py-[11vh] py-[6vh] overflow-hidden" id="inspiration">
            <div className="w-full flex flex-wrap items-center justify-between  overflow-hidden">
                <div className="xl:w-fit w-full xl:text-left text-center order-1 xl:px-[1.25vw] sm:px-[2.344vw] px-[5.455vw]">
                    <h2 className="text-3xl text-black uppercase">INSPIRATIONS</h2>
                </div>
                <div className="xl:w-fit w-full flex justify-end gap-4 xl:order-1 order-3 xl:pe-[1.25vw] sm:px-[2.344vw] px-[5.455vw]">
                    <Button variant={'light'} size={'xxl'} className="rounded-full" ref={prevRef}>
                        <Icon icon="ri:arrow-left-line" />
                    </Button>
                    <Button variant={'primary'} size={'xxl'} className="rounded-full border-[--white]" ref={nextRef}>
                        <Icon icon="ri:arrow-right-line" />
                    </Button>
                </div>
                <div className="w-full xl:order-3 order-2 overflow-hidden">
                    <Swiper
                        modules={[Navigation]}
                        grabCursor={true}
                        spaceBetween={16}
                        slidesPerView={1}
                        className="inspiration-cards"
                        initialSlide={3}
                        breakpoints={{
                            1260: {
                                slidesPerView:7,
                                spaceBetween: 24,
                                centeredSlides: true,
                            },
                            765: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                        }}
                        onBeforeInit={(swiper) => {
                            // @ts-ignore
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                    >
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/4.png" className="" alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/3.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/2.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/1.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/2.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/3.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/4.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/inspiration/1.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="title text-xl text-white">SHUTTERS</h4>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
		</section>
	);
}

export default Inspiration;

