import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

interface InnerBannerProps {
	title?: string;
	content?: string;
	// Add any props if needed in the future
}
function InnerBanner(props: InnerBannerProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	// useEffect(() => {
	// 	if (!isDesktop) return;
	// 	gsap.registerPlugin(ScrollTrigger);
	// 	ScrollTrigger.normalizeScroll(true);

	// 	// If using Lenis, connect it with GSAP
	// 	if (lenis) {
	// 		lenis.on('scroll', ScrollTrigger.update);
	// 	}
	// }, [lenis, isDesktop]);

	return (
		<section className="w-full px-2 sm:px-6 xl:px-[1.25vw]" id="innerBanner">
			<div className="w-full h-[53.023vw] sm:h-[43.945vw] xl:h-[23.438vw] flex items-center xl:justify-start justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-2 overflow-hidden xl:bg-[url(/images/innerBanner/shop-bg.jpg)] bg-[url(/images/innerBanner/shop-bg-mobile.jpg)] bg-cover bg-no-repeat bg-center rounded-48 ">
				<div className="flex flex-col gap-2 sm:gap-4 text-white xl:text-left text-center">
					<h2 className="text-1xl uppercase">{props.title}</h2>
					<p className="text-md xl:w-full xl:max-w-[606px]">{props.content}</p>
				</div>
			</div>
		</section>
	);
}

export default InnerBanner;

