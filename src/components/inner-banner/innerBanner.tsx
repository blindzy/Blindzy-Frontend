import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

import './css/style.css';

interface InnerBannerProps {
	title?: string;
	content?: string;
	// Add any props if needed in the future
}
function InnerBanner(props: InnerBannerProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
		if (!isDesktop) return;
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis, isDesktop]);

	return (
		<section className="innerBanner w-full px-2 sm:px-6 lg:px-8" id="innerBanner">
			<div className="inner-content rounded-48 ">
				<div className="flex flex-col gap-2 sm:gap-4 text-white">
                    <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl">{props.title}</h2>
                    <p className="text-sm sm:text-base lg:text-lg w-full max-w-[606px]">{props.content}</p>

                </div>
			</div>
		</section>
	);
}

export default InnerBanner;

