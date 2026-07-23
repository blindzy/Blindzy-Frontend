import React, { useEffect } from "react";
import './css/style.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/free-mode';
import { whyChooseContent, whyChooseReasons } from "@data/site-content";

function WhyChoose() {

	useEffect(() => {
		// Only run on client side
		if (typeof window === 'undefined') return;

        const multiplier = {
            translate: .25,
            rotate: .025
        }
        
        
        function calculateWheel() {
            const slides = document.querySelectorAll('.choose-item') as NodeListOf<HTMLElement>;
            slides.forEach((slide) => {
                const rect = slide.getBoundingClientRect();
                const r = window.innerWidth * .5 - (rect.x + rect.width * .5);
                let ty = Math.abs(r) * multiplier.translate - rect.width * multiplier.translate;
        
                if (ty < 0) {
                    ty = 0;
                }
                const transformOrigin = r < 0 ? 'left top' : 'right top';
                slide.style.transform = 'translate(0, ' + ty + 'px) rotate(' + (-r * multiplier.rotate) + 'deg)';
                slide.style.transformOrigin = transformOrigin;
            });
        }
        
        function raf() {
            requestAnimationFrame(raf)
            calculateWheel()
        }
        
        raf();
	}, []);

	return (
		<section className="why-choose w-screen h-screen justify-between xl:p-[1.25vw] sm:p-[2.344vw] p-4" id="whyChoose">
            <div className="w-full h-full flex flex-col gap-[100px] bg-primary rounded-48 xl:pt-[48px] sm:pt-[48px] pt-6 pb-0 overflow-hidden">
                <div className="xl:w-[1000px] w-full flex flex-col gap-2 xl:px-[48px] sm:px-[2.344vw] px-2 text-white">
                    <h2 className="text-xxl">{whyChooseContent.heading}</h2>
                    <p className="text-sm">{whyChooseContent.paragraph}</p>
                </div>
                <div className="w-full h-full">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={100}
                        centeredSlides={true}
                        loop={true}
                        speed={500}
                        grabCursor={true}
                        className="choose-slider"
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 50,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 100,
                            }
                        }}
                    >
                        {[...whyChooseReasons, ...whyChooseReasons].map((reason, index) => (
                            <SwiperSlide className="choose-item bg-white text-black rounded-48" key={index}>
                                <img src="/images/icon/guarantee2.png" alt="guarantee2" />
                                <h5 className="text-lg">{reason}</h5>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
		</section>
	);
}

export default WhyChoose;

