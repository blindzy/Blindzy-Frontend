import * as React from "react";
import { useEffect } from "react";
// import './css/style.css';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import Navbar from "@components/navbar/navbar";

function About() {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1150;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		if (window.innerWidth > 1150) {
			ScrollTrigger.normalizeScroll(true);
		}

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);

	return (
		<section className="w-screen sm:h-screen flex flex-col " id="about">
			<Navbar customClass="shrink-0" logo="dark" />
			<div className="w-full sm:h-full h-[424px] xl:p-[1.25vw] sm:p-4 p-2 xl:pt-0 sm:pt-0 pt-0 ">
				<div className="sm:bg-[url(/images/innerBanner/about-bg.jpg)] bg-[url(/images/innerBanner/about-bg-mobile.jpg)] bg-cover sm:bg-center bg-bottom bg-no-repeat w-full h-full flex sm:items-center items-end justify-center overflow-hidden rounded-48">
					<div className="xl:w-[38.281vw] sm:w-[80%] w-full flex flex-col text-center gap-2 text-white sm:p-0 p-6">
						<h2 className="xl:text-[4.688vw] sm:text-[8.203vw] text-[7.442vw] font-black font-plus leading-[110%] uppercase">about blindzy</h2>
						<p className="xl:text-[1.094vw] sm:text-[1.758vw] text-[12px] sm:font-bold font-normal sm:font-plus font-roboto leading-normal">
							At Blindzy, we specialize in premium handmade blinds and curtains in Melbourne, Australia. Our high-quality custom window furnishings are crafted with expert workmanship, modern designs, and durable materials to bring style, elegance, and functionality to every home.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;

