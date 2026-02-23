import React from "react";
import './css/style.css';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Button } from "@lib/components/ui/button";

const categoriesData = [
	{
		img: "/images/categories/1.png",
		title: "Roller Blinds",
		link: "/blinds/roller-blinds",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/2.png",
		title: "Curtains",
		link: "/curtains",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/2.png",
		title: "Double Roller Blinds",
		link: "/blinds/double",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
	{
		img: "/images/categories/3.png",
		title: "Shutters",
		link: "/shutters",
		desc: "Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.",
	},
];

function Categories() {

	return (
		<section className="categories-section w-screen xl:h-screen xl:p-[1.25vw] sm:p-4 p-2" id="categories">
			<div className="relative w-full xl:h-full bg-[--primary] rounded-48 xl:ps-[2.5vw] xl:py-0 sm:py-[6.25vw] py-[10.909vw] flex xl:flex-row flex-col xl:items-end justify-between xl:gap-[6.667vw] sm:gap-[6.25vw] gap-[10.909vw] overflow-hidden pt-12 pb-12 xl:pt-0 xl:pb-0">
				{/* Left Column */}
				<div className="relative xl:w-[24.375vw] w-full xl:m-0 mx-auto xl:pb-[11vh] flex flex-col xl:items-start items-center xl:text-left text-center justify-between xl:gap-[14vh] gap-[10.909vw] z-[15] shrink-0">
					<div className="flex flex-col gap-2 sm:px-0 px-8">
						<h2 className="text-xxxl text-white">EXPLORE ALL CATEGORIES</h2>
						<p className="sm:w-fit w-[80%] mx-auto text-sm mbl:text-sm text-white mb-12 sm:mb-0 mbl:mb-0">Browse the different options for window furnishings.</p>
					</div>
					<div className="xl:flex hidden items-stretch gap-4">
						<Button variant={'outline_white'} size={'xxl'} className="rounded-full" id="card-prev">
							<Icon icon="ri:arrow-left-line" />
						</Button>
						<Button variant={'light'} size={'xxl'} className="rounded-full border-[--white]" id="card-next">
							<Icon icon="ri:arrow-right-line" />
						</Button>
					</div>
				</div>

				{/* Right Column - Swiper */}
				<div className="container-categories relative w-full xl:h-full h-fit overflow-hidden xl:py-[112px] m-0 xl:px-0 px-4 z-[15] xl:rounded-s-[2.5vw]">
					<Swiper
						navigation={{ nextEl: "#card-next", prevEl: "#card-prev" }}
						modules={[Navigation]}
						spaceBetween={16}
						slidesPerView={1}
						className="xl:w-[26.354vw] w-[95%]  xl:h-full sm:h-[53.711vw] h-[460px] !m-0 !overflow-visible"
						breakpoints={{
							640: { slidesPerView: 1, spaceBetween: 16 },
							765: { slidesPerView: 2, spaceBetween: 16 },
							1150: { slidesPerView: 1, spaceBetween: 16 },
						}}
						onSwiper={(swiper) => swiper.slideTo(0, 0)} // Ensure correct first slide positioning
					>
						{categoriesData.map((item, idx) => (
							<SwiperSlide
								className="size-full overflow-hidden rounded-48 relative shrink-0 p-6 "
								key={idx}
							>
								<img
									src={item.img}
									alt="categories"
									className="absolute inset-0 w-full h-full object-cover rounded-48 z-0 mbl:ml-0"
								/>
								<div className="size-full flex flex-col justify-between relative z-10">
									<Button variant={'light'} size={'large'} asChild className="w-fit ms-auto border-none">
										<a href={item.link} target="_blank">
											Shop Now
										</a>
									</Button>
									<div
										className="w-full flex flex-col gap-2 text-white text-left z-10 "
									>
										<h3 className="text-xxl ">{item.title}</h3>
										<p className="text-sm">{item.desc}</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="flex justify-end gap-4 xl:hidden sm:mt-[6.25vw] mt-[10.909vw]">
						<Button variant={'outline_white'} size={'xxl'} className="rounded-full" id="card-prev">
							<Icon icon="ri:arrow-left-line" />
						</Button>
						<Button variant={'light'} size={'xxl'} className="rounded-full border-[--white]" id="card-next">
							<Icon icon="ri:arrow-right-line" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Categories;
