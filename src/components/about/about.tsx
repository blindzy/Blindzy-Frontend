import React, { useEffect } from "react";
import './css/style.css';

interface AboutProps {
	// Add any props if needed in the future
}

function About(props: AboutProps) {

	useEffect(() => {
	}, []);

	return (
		<section className=" about-section w-screen h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-4 p-2" id="about">
            <div className="flex xl:flex-row flex-col items-center justify-between xl:gap-[2.5vw] sm:gap-[4.688vw] gap-[9.796vw]">
                <div className="xl:w-full sm:w-[80%] w-full xl:m-0 mx-auto xl:text-left text-center flex flex-col gap-[4.167vw] xl:p-[1.25vw]">
                    <div className="flex flex-col xl:items-start items-center xl:gap-[2.5vw] sm:gap-[4.688vw] gap-[5vw]">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xxxl sm:text-[32px] text-black">ABOUT US</h2>
                            <p className="xl:w-[90%] text-md text-black">At Blindzy, we believe that luxury is all about the details. That's why we take pride in offering premium blinds and curtains that combine craftsmanship with elegance. Based in Melbourne, Victoria, our state-of-the-art manufacturing facility ensures that every product we create is handmade and of the highest quality. As experts in window furnishings, our passion is reflected in every product we make.</p>
                        </div>
                        <a href="/about" className="cus-btn w-fit sm:rounded-full-override">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="xl:w-full sm:w-[80%] w-full mx-auto xl:p-[1.25vw]">
                    <img src="/images/about/1.png" className="w-full object-cover" alt="about" />
                </div>

            </div>
            
		</section>
	);
}

export default About;
