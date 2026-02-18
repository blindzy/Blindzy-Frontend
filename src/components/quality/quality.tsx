import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import DrawSVGPlugin from "gsap/dist/DrawSVGPlugin";
import { Button } from "@lib/components/ui/button";
import './css/style.css'; // Ensure this path is correct relative to quality.tsx


function Quality() {

    useEffect(() => {
        if (window.innerWidth > 1150) {
            // gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

            // // Timeline for the first line animation and step-1 appearance
            // const lineAnimate1 = gsap.timeline();
            // lineAnimate1.fromTo('.linePath1', { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1, ease: "sine.inOut" });
            // lineAnimate1.to('#quailty #step-1', { opacity: 1, x: 0, ease: "sine.inOut", duration: 1 }, '<');

            // // ScrollTrigger for the first animation
            // ScrollTrigger.create({
            //     trigger: '#quailty',
            //     scrub: 1,
            //     markers: false,
            //     start: "top 70%",
            //     end: "top top",
            //     animation: lineAnimate1,
            // });

            // const lineAnimate2 = gsap.timeline();
            // lineAnimate2.fromTo('.linePath2', { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1, ease: "sine.inOut" });
            // lineAnimate2.to('#quailty #step-2', { opacity: 1, x: 0, ease: "sine.inOut", duration: 1 }, '<');
            // lineAnimate2.fromTo('.linePath3', { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1, ease: "sine.inOut" });
            // lineAnimate2.to('#quailty #step-3', { opacity: 1, x: 0, ease: "sine.inOut", duration: 1 }, '<');
            // lineAnimate2.fromTo('.linePath4', { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1, ease: "sine.inOut" });
            // lineAnimate2.to('#quailty #step-4', { opacity: 1, x: 0, ease: "sine.inOut", duration: 1 }, '<');

            // // ScrollTrigger for the second animation block, with pinning
            // ScrollTrigger.create({
            //     trigger: '#quailty',
            //     scrub: 1,
            //     markers: false,
            //     pin: true,
            //     start: "top top",
            //     end: "+=120%",
            //     animation: lineAnimate2,
            // });
        }
    }, []);

    return (
        <section className="quailty-section w-screen h-screen flex xl:flex-row flex-col items-center xl:justify-between justify-center xl:gap-0 sm:gap-[48px] sm:h-screen mbl:h-full gap-4 mini:py-[1.25vw] xl:py-2 sm:py-[6.25vw] py-2 xl:px-[1.25vw] sm:px-7 mbl:px-7 px-2 xl:pr-[2.344vw] sm:pr-[4.883vw] overflow-hidden" id="quailty">
            {/* Left content area */}
            <div className="xl:w-[41.667vw] sm:w-[80%] w-full xl:m-0 mx-auto xl:text-left text-center flex flex-col xl:items-start items-center gap-[2.5vw]">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xxxl text-black uppercase mbl:px-4">4 Steps to Designer Quality Blinds</h2>
                    <p className="text-sm lg:text-base xl:text-lg text-black"> Lorem ipsum dolor sit amet consectetur. Massa ultricies convallis condimentum etiam gravida tristique. Quisque faucibus molestie aliquam </p>
                </div>
                <Button variant={'primary'} size={'large'} className="hover:border-[--white] hover:text-[--white]">
                    Download Guide
                </Button>
            </div>

            {/* Right steps and line animation area */}
            <div className="xl:w-[38.542vw] sm:w-[62vw] xl:h-full sm:h-[70%] h-[60%] flex xl:gap-3 sm:gap-8 gap-2">
                {/* Individual quality steps */}
                <div className="w-full flex flex-col justify-between mini:gap-[1.25vw] xl:gap-2 sm:gap-6 gap-2 mbl:gap-4">
                    {/* Step 1 */}
                    <div className="quailty-step relative h-fit flex items-center xl:translate-x-[50px] xl:opacity-0" id="step-1">
                        <div className="bg xl:h-[10.573vw] relative flex items-center xl:gap-[1.25vw] sm:gap-4 gap-[2.036vw]">
                            <img src="/images/icon/measuring.png" className="sm:w-fit w-[16.285vw] object-scale-down mbl:w-[11.163vw]" alt="measuring" />
                            <div className="flex flex-col xl:gap-[0.833vw] sm:gap-4 gap-2">
                                <h4 className="text-xl xl:text-2xl text-black mbl:font-bold mbl:text-[4.884vw]">Measure Up</h4>
                                <p className="text-md lg:text-lg xl:text-xl xl:line-clamp-2 mbl:font-normal mbl:text-xs mbl:pr-2">Measure your windows and leave the rest up to us!</p>
                            </div>
                        </div>
                        <div className="relative xl:w-[3.333vw] sm:w-[6.25vw] w-[32px] xl:h-[3.333vw] sm:h-[6.25vw] h-[32px] bg-primary text-white flex items-center justify-center xl:rounded-[3.333vw] sm:rounded-[3.333vw] rounded-[32px] shrink-0 z-[10] xl:ms-[-1.25vw] ms-[-2vw]">
                            <span className="text-lg">01</span>
                        </div>
                    </div>
                    {/* Step 2 */}
                    <div className="quailty-step relative h-fit flex items-center xl:translate-x-[50px] xl:opacity-0" id="step-2">
                        <div className="bg xl:h-[10.573vw] relative flex items-center xl:gap-[1.25vw] sm:gap-4 gap-[2.036vw]">
                            <img src="/images/icon/fabricpattern.png" className="sm:w-fit w-[16.285vw] object-scale-down mbl:w-[11.163vw]" alt="fabricpattern" />
                            <div className="flex flex-col xl:gap-[0.833vw] sm:gap-4 gap-2">
                                <h4 className="text-xl xl:text-2xl text-black mbl:font-bold mbl:text-[4.884vw]">Chose Samples</h4>
                                <p className="text-md lg:text-lg xl:text-xl xl:line-clamp-2 mbl:font-normal mbl:text-xs mbl:pr-2">Receive free samples from us to help select and customise your home.</p>
                            </div>
                        </div>
                        <div className="relative xl:w-[3.333vw] sm:w-[6.25vw] w-[32px] xl:h-[3.333vw] sm:h-[6.25vw] h-[32px] bg-primary text-white flex items-center justify-center xl:rounded-[3.333vw] sm:rounded-[3.333vw] rounded-[32px] shrink-0 z-[10] xl:ms-[-1.25vw] ms-[-2vw]">
                            <span className="text-lg">02</span>
                        </div>
                    </div>
                    {/* Step 3 */}
                    <div className="quailty-step relative h-fit flex items-center xl:translate-x-[50px] xl:opacity-0" id="step-3">
                        <div className="bg xl:h-[10.573vw] relative flex items-center xl:gap-[1.25vw] sm:gap-4 gap-[2.036vw]">
                            <img src="/images/icon/customization.png" className="sm:w-fit w-[16.285vw] object-scale-down mbl:w-[11.163vw]" alt="customization" />
                            <div className="flex flex-col xl:gap-[0.833vw] sm:gap-4 gap-2">
                                <h4 className="text-xl xl:text-2xl text-black mbl:font-bold mbl:text-[4.884vw]">Customise</h4>
                                <p className="text-md lg:text-lg xl:text-xl xl:line-clamp-2 mbl:font-normal mbl:text-xs mbl:pr-2">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.</p>
                            </div>
                        </div>
                        <div className="relative xl:w-[3.333vw] sm:w-[6.25vw] w-[32px] xl:h-[3.333vw] sm:h-[6.25vw] h-[32px] bg-primary text-white flex items-center justify-center xl:rounded-[3.333vw] sm:rounded-[3.333vw] rounded-[32px] shrink-0 z-[10] xl:ms-[-1.25vw] ms-[-2vw]">
                            <span className="text-lg">03</span>
                        </div>
                    </div>
                    {/* Step 4 */}
                    <div className="quailty-step relative h-fit flex items-center xl:translate-x-[50px] xl:opacity-0" id="step-4">
                        <div className="bg xl:h-[10.573vw] relative flex items-center xl:gap-[1.25vw] sm:gap-4 gap-[2.036vw]">
                            <img src="/images/icon/diy-quality.png" className="sm:w-fit w-[16.285vw] object-scale-down  mbl:w-[11.163vw]" alt="diy-quality" />
                            <div className="flex flex-col xl:gap-[0.833vw] sm:gap-4 gap-2">
                                <h4 className="text-xl xl:text-2xl text-black mbl:font-bold mbl:text-[4.884vw]">DIY Install</h4>
                                <p className="text-md lg:text-lg xl:text-xl xl:line-clamp-2 mbl:font-normal mbl:text-xs mbl:pr-2">Use our simple guides to help install blinds and curtains in your home.</p>
                            </div>
                        </div>
                        <div className="relative xl:w-[3.333vw] sm:w-[6.25vw] w-[32px] xl:h-[3.333vw] sm:h-[6.25vw] h-[32px] bg-primary text-white flex items-center justify-center xl:rounded-[3.333vw] sm:rounded-[3.333vw] rounded-[32px] shrink-0 z-[10] xl:ms-[-1.25vw] ms-[-2vw]">
                            <span className="text-lg">04</span>
                        </div>
                    </div>
                </div>

                {/* Vertical line for animation */}
                <div className="xl:w-[1.667vw] sm:w-[2.93vw] w-[20px] h-full border border-[#C1C1C8] rounded-24 sm:py-4 py-2 hidden xl:block">
                    <div className="w-full h-full flex flex-col items-center justif-center relative overflow-hidden">
                        {/* SVG paths for line animations */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="196" viewBox="0 0 4 196" fill="none">
                            <path className="linePath1" d="M2 2L1.99999 194" stroke="#9F89E8" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="translate-y-[-3px]" width="4" height="220" viewBox="0 0 4 220" fill="none">
                            <path className="linePath2" d="M2 2L1.99999 220" stroke="#9F89E8" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="translate-y-[-5px]" width="4" height="220" viewBox="0 0 4 220" fill="none">
                            <path className="linePath3" d="M2 2L1.99999 220" stroke="#9F89E8" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="translate-y-[-7px]" width="4" height="238" viewBox="0 0 4 238" fill="none">
                            <path className="linePath4" d="M2 2L1.99999 236" stroke="#9F89E8" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Quality;