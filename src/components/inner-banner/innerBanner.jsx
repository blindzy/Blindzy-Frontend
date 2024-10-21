import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

import './css/style.css';

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
		<section className="innerBanner w-screen xl:px-[1.25vw] sm:px-[2.344vw] px-4" id="innerBanner">
			<div className="inner-content rounded-48 ">
				<div className="flex flex-col gap-2 text-white">
                    <h2 className="text-1xl">{props.title}</h2>
                    <p className="text-md w-[606px]">{props.content}</p>

                </div>
			</div>
		</section>
	);
}

export default Hero;
