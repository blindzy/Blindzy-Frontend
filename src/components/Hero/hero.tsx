import * as React from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Button } from "@lib/components/ui/button";
import Navbar from "@components/navbar/navbar";

import './css/style.css';

interface HeroProps {
	// Add any props if needed in the future
}
function Hero(props: HeroProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1150;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		if(window.innerWidth  > 1150){
			ScrollTrigger.normalizeScroll(true);
		}

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}

		gsap.to("#hero", {
		    scrollTrigger: {
		        trigger: ".hero-content",
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
				<div className="relative w-full h-full flex xl:flex-row flex-col items-center xl:justify-between justify-end xl:gap-0 gap-[48px]  mini:p-[1.25vw] xl:p-2 mini:pt-0 xl:pt-0 sm:p-[2.344vw] sm:pt-0 p-4 px-6 pt-0 z-[5]">
					{/* Desktop/Tablet: Center/left text/buttons */}
					<div className="flex xl:w-[35.521vw] sm:w-[80%] w-full xl:m-0 mx-auto xl:text-left text-center flex-col xl:gap-[1.25vw] gap-4 mb-[100px]">
						<div className="flex flex-col gap-2">
							<h2 className="text-xxxl text-white uppercase">Installing Blinds Made Easy</h2>
							<p className="text-sm text-white">Welcome to Blindzy, your trusted source for custom DIY window furnishings in Australia. Browse our wide range of affordable, high quality window furnishings, and follow our simple installation guides to effortlessly transform your home.</p>
						</div>
						<div className="flex items-center xl:justify-start justify-center gap-[24px]">
							<Button variant={'primary'} size={'large'} asChild className="hover:border-[--white] hover:text-[--white]">
								<a href="/samples">
									Get Free Samples
								</a>
							</Button>
							<Button variant={'outline'} size={'large'} asChild>
								<a href="/about">
									Learn More
								</a>
							</Button>
						</div>
					</div>
					{/* Cards: hidden on mobile, visible on xl and up */}
					<div className="hidden xl:flex xl:w-[340px] h-full flex-col xl:gap-[1.25vw] gap-6">
						<div className="w-full h-full flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/box.png" className="w-fit shrink-0" alt="box" />
							<div className="flex flex-col gap-1">
								<p className="text-md">Free Delivery</p>
								<p className="text-xs text-black"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
							</div>
						</div>
						<div className="w-full h-full flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/guarantee.png" className="w-fit shrink-0" alt="guarantee" />
							<div className="flex flex-col gap-1">
								<p className="text-md">10 Years Warranty</p>
								<p className="text-xs text-black"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
							</div>
						</div>
						<div className="w-full h-full flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/australia.png" className="w-fit shrink-0" alt="australia" />
							<div className="flex flex-col gap-1">
								<p className="text-md">Made in Australia</p>
								<p className="text-xs text-black"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
							</div>
						</div>
						<div className="w-full h-full flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
							<img src="/images/icon/diy.png" className="w-fit shrink-0" alt="diy" />
							<div className="flex flex-col gap-1">
								<p className="text-md">Install Yourself</p>
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

