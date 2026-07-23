import * as React from "react";
import { useEffect } from "react";
import { useLenis } from '../../hooks/useLenis';
import { Button } from "@lib/components/ui/button";
import Navbar from "@components/navbar/navbar";
import { heroContent, heroFeatureBoxes } from "@data/site-content";
import './css/style.css';

function Hero() {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1150;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
		let cancelled = false;

		(async () => {
			const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
				import("gsap"),
				import("gsap/dist/ScrollTrigger"),
			]);
			if (cancelled) return;

			gsap.registerPlugin(ScrollTrigger);
			if (window.innerWidth > 1150) {
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
		})();

		return () => {
			cancelled = true;
		};
	}, [lenis]);

	return (
		<section className="hero-section w-screen h-screen overflow-hidden" id="hero">
			<div className="hero-content ">
				<Navbar />
				<div className="relative w-full h-full flex xl:flex-row flex-col items-center xl:justify-between justify-end xl:gap-0 gap-[48px]  mini:p-[1.25vw] xl:p-2 mini:pt-0 xl:pt-0 sm:p-[2.344vw] sm:pt-0 p-4 px-6 pt-0 z-[5]">
					{/* Desktop/Tablet: Center/left text/buttons */}
					<div className="flex xl:w-[35.521vw] sm:w-[80%] w-full xl:m-0 mx-auto xl:text-left text-center flex-col xl:gap-[1.25vw] gap-4 mb-[100px]">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl text-white uppercase">{heroContent.heading}</h1>
							<p className="text-sm text-white">{heroContent.paragraph}</p>
						</div>
						<div className="flex items-center xl:justify-start justify-center gap-[24px]">
							<Button variant={'primary'} size={'large'} asChild className="hover:border-[--white] hover:text-[--white]">
								<a href={heroContent.primaryButtonLink}>
									{heroContent.primaryButtonText}
								</a>
							</Button>
							<Button variant={'outline'} size={'large'} asChild>
								<a href={heroContent.secondaryButtonLink}>
									{heroContent.secondaryButtonText}
								</a>
							</Button>
						</div>
					</div>
					{/* Cards: hidden on mobile, visible on xl and up */}
					<div className="hidden xl:flex xl:w-[340px] h-full flex-col xl:gap-[1.25vw] gap-6">
						{heroFeatureBoxes.map((box, index) => (
							<div key={index} className="w-full h-full flex items-center xl:gap-[1.25vw] gap-4 xl:px-[1.25vw] px-2 xl:py-[1.667vw] bg-white border border-[--Black] rounded-32">
								<img src={box.icon} className="w-fit shrink-0" alt={box.title} />
								<div className="flex flex-col gap-1">
									<p className="text-md">{box.title}</p>
									<p className="text-xs text-black">{box.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;

