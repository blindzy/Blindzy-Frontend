import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

import Navbar from "@components/navbar/navbar";

import './css/style.css';

interface HeroProps {
	// Add any props if needed in the future
}
function Hero(props: HeroProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
			ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}

		gsap.to("#hero", {
		    scrollTrigger: {
		        trigger: "#hero",
		        start: "top top",
		        end: "center top",
		        scrub: 1,
		    },
		    scale: 0.95,
		    borderRadius: "60px",
		    duration: 0.1,
		});
	}, [lenis]);

	return (
		<section className="hero-section w-screen h-screen overflow-hidden" id="hero">
			<div className="hero-content ">
				<Navbar/>
				<div className="relative w-full h-full flex xl:flex-row flex-col items-center xl:justify-between sm:justify-end justify-center xl:gap-0 gap-[48px]  mini:p-[1.25vw] xl:p-2 mini:pt-0 xl:pt-0 sm:p-[2.344vw] sm:pt-0 p-2 pt-0 z-[10]">
					{/* Desktop/Tablet: Center/left text/buttons */}
					<div className="hidden xl:flex xl:w-[35.521vw] w-full xl:m-0 mx-auto xl:text-left text-center flex-col xl:gap-[1.25vw] gap-4">
						<div className="flex flex-col gap-2">
							<h2 className="text-xxxl text-white uppercase">Installing Blinds Made Easy</h2>
							<p className="text-sm text-white">Welcome to Blindzy, your trusted source for custom DIY window furnishings in Australia. Browse our wide range of affordable, high quality window furnishings, and follow our simple installation guides to effortlessly transform your home.</p>
						</div>
						<div className="flex items-center xl:justify-start justify-center xl:gap-[1.25vw] gap-4">
							<a href="/samples" className="cus-btn">Get Free Samples</a>
							<div className="xl:block hidden shrink-0">
								<a href="/about" className="cus-btn stroke">Learn More</a>
							</div>
							<div className="xl:hidden shrink-0">
								<a href="/about" className="cus-btn white">Learn More</a>
							</div>
						</div>
					</div>
					{/* Text/buttons block: responsive position */}
					<div className="hero-main-content xl:hidden xl:w-[35.521vw] w-full xl:m-0 mx-auto xl:text-left text-center flex flex-col xl:gap-[1.25vw] gap-4
						sm:static sm:translate-x-0 sm:px-0 sm:pb-0
						absolute bottom-0 left-1/2 -translate-x-1/2 px-4 pb-8 sm:text-left z-20">
						<div className="flex flex-col gap-2">
							<h2 className="text-xxxl text-white uppercase">Installing Blinds Made Easy</h2>
							<p className="text-sm text-white">Welcome to Blindzy, your trusted source for custom DIY window furnishings in Australia. Browse our wide range of affordable, high quality window furnishings, and follow our simple installation guides to effortlessly transform your home.</p>
						</div>
						<div className="flex items-center xl:justify-start justify-center xl:gap-[1.25vw] gap-4">
							<a href="/samples" className="cus-btn">Get Free Samples</a>
							<div className="xl:block hidden shrink-0">
								<a href="/about" className="cus-btn stroke">Learn More</a>
							</div>
							<div className="xl:hidden shrink-0">
								<a href="/about" className="cus-btn white">Learn More</a>
							</div>
						</div>
					</div>
					{/* Cards: hidden on mobile, visible on xl and up */}
					<div className="hidden xl:flex xl:w-[350px] w-full xl:h-full h-auto flex-wrap flex-col mini:gap-[1.25vw] justify-between xl:gap-2 gap-4">
						<div className="xl:w-full w-[48%] flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/box.png" className="w-fit shrink-0" alt="box" />
							<div className="flex flex-col gap-1">
								<h6 className="text-md bold">Free Delivery</h6>
								<p className="text-xs text-black"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
							</div>
						</div>
						<div className="xl:w-full w-[48%] flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/guarantee.png" className="w-fit shrink-0" alt="guarantee" />
							<div className="flex flex-col gap-1">
								<h6 className="text-md bold">10 Years Warranty</h6>
								<p className="text-xs text-black"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
							</div>
						</div>
						<div className="xl:w-full w-[48%] flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/australia.png" className="w-fit shrink-0" alt="australia" />
							<div className="flex flex-col gap-1">
								<h6 className="text-md bold">Made in Australia</h6>
								<p className="text-xs text-black"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
							</div>
						</div>
						<div className="xl:w-full w-[48%] flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/diy.png" className="w-fit shrink-0" alt="diy" />
							<div className="flex flex-col gap-1">
								<h6 className="text-md bold">Install Yourself</h6>
								<p className="text-xs text-black"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero; 

