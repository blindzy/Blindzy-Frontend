import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

import './css/style.css';

interface HeroProps {
	// Add any props if needed in the future
}
function Hero(props) {

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		ScrollTrigger.normalizeScroll(true);

		const deviceWidth = window.innerWidth;
		if (deviceWidth > 768) {
		  ScrollSmoother.create({
		    smooth: 2,
		    effects: true,
		    normalizeScroll: true,
		  });
		}
	}, []);

	return (
		<section className="innerBanner w-full px-4 sm:px-6 lg:px-8" id="innerBanner">
			<div className="inner-content rounded-48 ">
				<div className="flex flex-col gap-2 sm:gap-4 text-white">
                    <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl">{props.title}</h2>
                    <p className="text-sm sm:text-base lg:text-lg w-full max-w-[606px]">{props.content}</p>

                </div>
			</div>
		</section>
	);
}

export default Hero;

