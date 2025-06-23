import React, { useEffect } from "react";
import './css/style.css';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation} from 'swiper/modules';

interface CategoriesProps {
	// Add any props if needed in the future
}
function Categories(props: CategoriesProps) {

	useEffect(() => {
	}, []);

	return (
		<section className=" categorie-section w-screen h-screen xl:p-[1.25vw] sm:p-4 p-2" id="categorie">
            <div className="relative bg-effect w-full h-full bg-primary rounded-48  xl:ps-[2.5vw]  xl:py-0 py-[64px] flex xl:flex-row flex-col xl:items-end justigy-between xl:gap-[6.667vw] gap-[9vh] overflow-hidden">
                <div className="relative xl:w-[24.375vw] w-[80%] xl:m-0 mx-auto xl:pb-[11vh] flex flex-col xl:items-start items-center xl:text-left text-center justify-between xl:gap-[14vh] gap-[48px] z-[15] shrink-0">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xxxl text-white">
                            EXPLORE ALL CATEGORIES
                        </h2>
                        <p className="text-sm text-white">Lorem ipsum dolor sit amet consectetur. Vel id pellentesque mollis orci purus. Est arcu adipiscing eget a maecenas mauris.</p>
                    </div>
                    <div className="sm:flex hidden items-stretch gap-4">
                        <button className="arrow-btn white" id="card-prev">
                            <Icon icon="ri:arrow-left-line" />
                        </button>
                        <button className="arrow-btn black" id="card-next">
                            <Icon icon="ri:arrow-right-line" />
                        </button>
                    </div>
                </div>
                <div className="container-categories relative w-full h-full overflow-hidden">
                    <Swiper
                        navigation={{ nextEl: "#card-next", prevEl: "#card-prev" }}
                        modules={[Navigation]}
                        // loop={true}
                        // centeredSlides={true}
                        spaceBetween={16}
                        slidesPerView={1}
                        className="categories-cards" 
                        breakpoints={{
                            1025: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            765: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            }
                        }}
                    >
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/categories/1.png" alt="categories" />
                            <div className="content">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xxl">Curtains</h3>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Vel id pellentesque mollis orci purus. Est arcu adipiscing eget a maecenas mauris.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/categories/2.png" alt="categories" />
                            <div className="content">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xxl">Curtains</h3>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Vel id pellentesque mollis orci purus. Est arcu adipiscing eget a maecenas mauris.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/categories/3.png" alt="categories" />
                            <div className="content">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xxl">Curtains</h3>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Vel id pellentesque mollis orci purus. Est arcu adipiscing eget a maecenas mauris.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/categories/1.png" alt="categories" />
                            <div className="content">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xxl">Curtains</h3>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Vel id pellentesque mollis orci purus. Est arcu adipiscing eget a maecenas mauris.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/categories/2.png" alt="categories" />
                            <div className="content">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xxl">Curtains</h3>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Vel id pellentesque mollis orci purus. Est arcu adipiscing eget a maecenas mauris.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="cards-item rounded-48" >
                            <img src="/images/categories/3.png" alt="categories" />
                            <div className="content">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xxl">Curtains</h3>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur. Vel id pellentesque mollis orci purus. Est arcu adipiscing eget a maecenas mauris.</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        
                    </Swiper>
                </div>
            </div>
		</section>
	);
}

export default Categories;

