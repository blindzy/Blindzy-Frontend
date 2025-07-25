import React, { useEffect } from "react";
import './css/style.css';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface CategoriesProps {
	// Add any props if needed in the future
}

const categoriesData = [
	{
		img: "/images/categories/1.png",
		title: "Blinds",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/2.png",
		title: "Curtains",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/3.png",
		title: "Curtains",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/1.png",
		title: "Curtains",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/2.png",
		title: "Curtains",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/3.png",
		title: "Curtains",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
];

function Categories(props: CategoriesProps) {
	useEffect(() => {}, []);

	return (
		<section className="categorie-section w-screen xl:h-screen xl:p-[1.25vw] sm:p-4 p-2" id="categorie">
			<div className="relative bg-effect w-full xl:h-full bg-primary rounded-48 xl:ps-[2.5vw] xl:py-0 py-[64px] flex xl:flex-row flex-col xl:items-end justigy-between xl:gap-[6.667vw] gap-[9vh] overflow-hidden pt-12 pb-12 sm:pt-0 sm:pb-0 mbl:px-0 mbl:py:12 mbl:gap-12">
				
				{/* Left Column */}
				<div className="relative xl:w-[24.375vw] w-[80%] xl:m-0 mx-auto xl:pb-[11vh] flex flex-col xl:items-start items-center xl:text-left text-center justify-between xl:gap-[14vh] gap-[48px] z-[15] shrink-0">
					<div className="flex flex-col gap-2">
						<h2 className="text-xxxl text-white">EXPLORE ALL CATEGORIES</h2>
						<p className="text-sm mbl:text-sm text-white mb-12 sm:mb-0 mbl:mb-0">Browse the different options for window furnishings.</p>
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

				{/* Right Column - Swiper */}
				<div className="container-categories relative w-full h-full overflow-hidden flex flex-col mb-12 sm:mb-0 p-0 mbl:p-0 mbl:mb-0 mbl:px-4">
					<Swiper
						navigation={{ nextEl: "#card-next", prevEl: "#card-prev" }}
						modules={[Navigation]}
						spaceBetween={16}
						slidesPerView={1}
						className="categories-cards"
						breakpoints={{
							640: { slidesPerView: 1, spaceBetween: 16 },
							765: { slidesPerView: 1, spaceBetween: 16 },
							1025: { slidesPerView: 1, spaceBetween: 16 },
						}}
						onSwiper={(swiper) => swiper.slideTo(0, 0)} // Ensure correct first slide positioning
					>
						{categoriesData.map((item, idx) => (
							<SwiperSlide
								className="cards-item rounded-48 relative flex flex-col flex-shrink-0 self-stretch mbl:max-w-[81.425vw] mbl:p-6 mbl:h-[458px] mbl:max-h-[458px] mbl:min-h-[458px] sm:p-6 sm:rounded-48"
								key={idx}
							>
								{/* Image as background */}
								<img
									src={item.img}
									alt="categories"
									className="absolute inset-0 w-full h-full object-cover rounded-48 z-0 mbl:ml-0"
								/>
								{/* Unified content wrapper above image */}
								<div className="content absolute left-0 top-0 z-20 w-full h-full flex flex-col justify-between mbl:pl-0 mbl:ml-0">
									{/* Shop Now button in top-right */}
									<a
										href="/shop"
										className="cus-btn white w-fit sm:absolute sm:top-6 sm:right-6 z-30 mb-4 sm:mb-0"
									>
										Shop Now
									</a>
									{/* Texts in bottom-left */}
									<div
										className="absolute left-6 bottom-6 flex flex-col text-white text-left z-10 w-[80%] max-w-[90%]"
									>
										<h3 className="text-xxl mbl:text-[7.125vw]">{item.title}</h3>
										<p className="text-sm">{item.desc}</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					{/* Mobile navigation buttons below Swiper */}
					<div className="flex justify-center gap-4 mt-4 sm:hidden mbl:mt-12 mbl:pr-4">
						<button className="arrow-btn white" id="card-prev">
							<Icon icon="ri:arrow-left-line" />
						</button>
						<button className="arrow-btn black" id="card-next">
							<Icon icon="ri:arrow-right-line" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Categories;
