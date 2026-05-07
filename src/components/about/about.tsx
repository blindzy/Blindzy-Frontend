import React from "react";
import { Button } from "@lib/components/ui/button";
import './css/style.css';


function About() {


	return (
		<section className="about-section w-screen h-screen mbl:h-auto flex items-center justify-center xl:p-[1.25vw] sm:p-4 p-2 mbl:px-7 mbl:py-[11.977vw]" id="about-section">
            <div className="flex xl:flex-row flex-col items-center justify-between xl:gap-[2.5vw] sm:gap-[4.688vw] gap-[9.796vw]">
                <div className="xl:w-full sm:w-[80%] w-full xl:m-0 mx-auto xl:text-left text-center flex flex-col gap-[4.167vw] xl:p-[1.25vw]">
                    <div className="flex flex-col xl:items-start items-center xl:gap-[2.5vw] sm:gap-[4.688vw] gap-[5vw]">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl text-black">ABOUT US</h2>
                            <p className="xl:w-[90%] text-md ">At Blindzy, we believe that luxury is all about the details. That's why we take pride in offering premium blinds and curtains that combine craftsmanship with elegance. Based in Melbourne, Victoria, our state-of-the-art manufacturing facility ensures that every product we create is handmade and of the highest quality. As experts in window furnishings, our passion is reflected in every product we make.</p>
                        </div>
                        <Button variant={"primary"} size={"large"} asChild>
                            <a href="/about" >
                                Learn More
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="xl:w-full sm:w-[80%] w-full mx-auto xl:p-[1.25vw] mbl:w-[77.907vw]">
                    <img src="/images/about/1.png" className="w-full object-cover" alt="about" />
                </div>

            </div>
            
		</section>
	);
}

export default About;
