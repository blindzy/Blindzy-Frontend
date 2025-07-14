import React, { useEffect , useState } from "react";
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

	useEffect(() => {
        if(window.innerWidth < 1025){
            setScreen(false)
        }
	}, []);

	return (
		<section className="inspiration-section w-screen xl:h-screen flex flex-col items-center justify-center gap-[48px] xl:py-[1.25vw] sm:py-[11vh] py-[6vh] overflow-hidden" id="inspiration">
            <div className="flex items-center xl:justify-between justify-center xl:text-left text-center w-full xl:px-[1.25vw] sm:px-4 px-2">
                <h2 className="text-xxxl text-black uppercase">INSPIRATIONS</h2>
            </div>
            {screen ?(
                <div className="w-full overflow-hidden">
                    <Swiper
                        navigation={{ nextEl: "#slider-next", prevEl: "#slider-prev" }}
                        modules={[Navigation]}
                        // loop={true}
                        grabCursor={true}
                        // centeredSlides={true}
                        spaceBetween={16}
                        slidesPerView={1}
                        initialSlide={3}
                        className="inspiration-cards" 
                        breakpoints={{
                            1260: {
                                slidesPerView:7,
                                spaceBetween: 24,
                                initialSlide: 3,
                                centeredSlides: true,
                            },
                            765: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                                initialSlide: 1,
                            },
                        }}
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

