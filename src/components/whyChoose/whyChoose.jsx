import React, { useEffect } from "react";
import './css/style.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/free-mode';


function WhyChoose() {

	useEffect(() => {

        const multiplier = {
            translate: .25,
            rotate: .025
        }
        
        
        function calculateWheel() {
            const slides = document.querySelectorAll('.choose-item')
            slides.forEach((slide) => {
                const rect = slide.getBoundingClientRect()
                const r = window.innerWidth * .5 - (rect.x + rect.width * .5)
                let ty = Math.abs(r) * multiplier.translate - rect.width * multiplier.translate
        
                if (ty < 0) {
                    ty = 0
                }
                const transformOrigin = r < 0 ? 'left top' : 'right top';
                slide.style.transform = `translate(0, ${ty}px) rotate(${-r * multiplier.rotate}deg)`
                slide.style.transformOrigin = transformOrigin
            })
        }
        
        function raf() {
            requestAnimationFrame(raf)
            calculateWheel()
        }
        
        raf();
	}, []);

	return (
		<section className="why-choose w-screen h-screen  justify-between  xl:p-[1.25vw] sm:p-[2.344vw] p-4" id="whyChoose">
            <div className="w-full h-full flex flex-col gap-[100px] bg-primary rounded-48 xl:pt-[48px] sm:pt-[48px] pt-6 pb-0 overflow-hidden">
                <div className="w-[1000px] flex flex-col gap-2 px-[48px] text-white">
                    <h2 className="text-xxl">WHY CHOOSE US?</h2>
                    <p className="text-sm">We invite you to join us on our mission to make home decorating fun and affordable for everyone. Explore our stunning collection of custom blinds and curtains today and experience the 5 Minute Blinds difference for yourself!</p>
                </div>
                <div className="w-full h-full">
                    <Swiper
                        slidesPerView={3}   
                        spaceBetween={100}
                        centeredSlides={true}
                        loop={true}
                        speed={500}
                        grabCursor={true}
                        className="choose-slider"
                    >
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Exceptional customer service and support.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">A diverse selection of stylish and trendy fabrics.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Easy 5 minute installation.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Family-owned with over 26 years of experience.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Free shipping and a crazy 10 year warranty.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Exceptional customer service and support.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">A diverse selection of stylish and trendy fabrics.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Easy 5 minute installation.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Family-owned with over 26 years of experience.</h5>
                        </SwiperSlide>
                        <SwiperSlide className="choose-item bg-white text-black rounded-48">
                            <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                            <h5 className="text-lg">Free shipping and a crazy 10 year warranty.</h5>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
		</section>
	);
}

export default WhyChoose;
