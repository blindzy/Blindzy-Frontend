import React, { useEffect } from "react";
import './css/style.css';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import Navbar from "@components/navbar/navbar";


interface AboutProps {
	// Add any props if needed in the future
}
function About(props: AboutProps) {

	useEffect(() => {
		
		if (window.innerWidth > 1025) {
			gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
			ScrollTrigger.normalizeScroll(true);
			ScrollSmoother.create({
				smooth: 2,
				effects: true,
				normalizeScroll: true,
			});
		}
	}, []);

	return (
		<section className="about-banner w-screen h-screen flex flex-col " id="about">
            <Navbar customClass="shrink-0"/>
            <div className="w-full h-full xl:p-[1.25vw] sm:p-4 p-2 xl:pt-0 sm:pt-0 p-0">
                <div className="about-bg w-full h-full flex items-center justify-center overflow-hidden rounded-48">
                    <div className="w-[38.281vw] flex flex-col text-center gap-2 text-white">
                        <h2 className="text-1xl uppercase">about blindzy</h2>
                        <p className="text-md">At Blindzy, we believe that luxury is all about the details. That's why we take pride in offering premium blinds and curtains that combine craftsmanship with elegance. Based in Melbourne, Victoria, our state-of-the-art manufacturing facility ensures that every product we create is handmade and of the highest quality. As experts in window furnishings, our passion is reflected in every product we make.</p>
                    </div>
                </div>
            </div>
		</section>
	);
}

export default About;

