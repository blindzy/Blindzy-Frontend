import React, { useEffect , useState, useRef } from "react";
import { Icon } from '@iconify/react';
import './css/style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';


interface InspirationProps {
	// Add any props if needed in the future
}
function Inspiration(props: InspirationProps) {
    const [screen, setScreen] = useState<boolean>(true);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

	useEffect(() => {
        if(window.innerWidth < 1025){
            setScreen(false)
        }
	}, []);

	return (
		<section className="inspiration-section w-screen xl:h-screen flex flex-col items-center justify-center gap-[48px] xl:py-[1.25vw] sm:py-[11vh] py-[6vh] overflow-hidden" id="inspiration">
            <div className="flex items-center xl:justify-between justify-center xl:text-left text-center w-full xl:px-[1.25vw] sm:px-4 px-2">
                <h2 className="text-xxxl text-black uppercase">INSPIRATIONS</h2>
                <div className="sm:flex hidden items-stretch gap-4">
                    <button className="arrow-btn stroke" ref={prevRef} id="inspiration-slider-prev">
                        <Icon icon="ri:arrow-left-line" />
                    </button>
                    <button className="arrow-btn primary" ref={nextRef} id="inspiration-slider-next">
                        <Icon icon="ri:arrow-right-line" />
                    </button>
                </div>
            </div>
            {screen ?(
                <div className="w-full overflow-hidden">
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
            ):(
                <div className="w-full flex items-stretch sm:gap-4 gap-2 xl:overflow-hidden overflow-auto sm:px-4 px-2 scroll-hidden">
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/4.png" className="w-full object-cover" alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/3.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/2.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/1.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/2.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/3.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/4.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                        <div className="relative sm:w-[50vw] w-[80vw] shrink-0 rounded-48 overflow-hidden" >
                            <img src="/images/inspiration/1.png" className="w-full object-cover " alt="inspiration" />
                            <h4 className="absolute sm:left-[16px] left-[8px] sm:bottom-[16px] bottom-[8px] text-xl text-white z-[10]">SHUTTERS</h4>
                        </div>
                </div>
            )}
		</section>
	);
}

export default Inspiration;

