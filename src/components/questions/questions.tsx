import React, { useEffect } from "react";
import { Button } from "@lib/components/ui/button";

// import './css/style.css';

interface QuestionsProps {
	// Add any props if needed in the future
}
function Questions(props: QuestionsProps) {

	useEffect(() => {
	}, []);

	return (
		<section className="questions-section w-screen sm:h-screen flex items-center justify-center xl:py-[3.333vw] py-[6vh] xl:px-[1.25vw]" id="questions">
            <div className="flex xl:flex-row flex-col-reverse xl:items-stretch xl:justify-between xl:gap-[1.25vw] w-full xl:px-2">
                <div className="xl:w-full sm:w-[calc(100%-32px)] xl:h-[auto] sm:h-[42.969vw] h-[77.273vw] flex flex-col xl:gap-[2.5vw] sm:gap-[4.688vw] gap-[5.455vw] xl:items-start sm:items-center items-start  xl:text-left sm:text-center text-left sm:justify-center justify-between xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-primary rounded-48 shadow-shadow01 xl:mx-0 mx-4">
                    <div className="xl:w-fit sm:w-[70%] w-full flex flex-col gap-2">
                        <h2 className="xl:text-[4.688vw] sm:text-[6.25vw] text-[7.273vw] font-black font-plus leading-[110%] text-white">HAVE ANY QUESTIONS?</h2>
                        <p className="xl:w-[29.479vw] text-sm text-white">We'd love to hear from you! Whether it's measuring tips, installation advice, or product info, the Blindzy team is ready to help.</p>
                    </div>
                    <div className="sm:w-fit w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                        <Button variant={"light"} size={"large"} asChild className="sm:w-fit w-full flex-1">
                            <a href="/contact" >
                                Contact Us
                            </a>
                        </Button>
                        <Button variant={"outline_white"} size={"large"} asChild className="sm:w-fit w-full flex-1">
                            <a href="/about" >
                                Learn More
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="w-full flex xl:flex-wrap xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:pb-0  sm:pb-[4.688vw] pb-[5.455vw] xl:overflow-hidden overflow-auto scroll-hidden xl:px-0 px-4">
                    <div className="xl:w-full sm:w-[43.945vw] w-[72.727vw] xl:h-fit sm:h-[42.969vw] h-[77.273vw] xl:shrink shrink-0 relative rounded-48 overflow-hidden shadow-shadow01">
                        <img src="/images/questions/1.png" className="w-full xl:h-fit h-full object-cover" alt="" />
                        <div className="absolute left-0 top-0 size-full flex flex-col justify-between items-end xl:p-[1.25vw] sm:p-[2.344vw] p-[5.455vw] ">
                            <Button variant={"light"} size={"small"} asChild className="w-fit h-fit">
                                <a href="/shutters" >
                                    Shop Now
                                </a>
                            </Button>
                            <div className="w-full flex flex-col gap-2 text-white">
                                <h3 className="xl:text-[1.875vw] sm:text-[3.516vw] text-[6.512vw] sm:font-extrabold font-bold font-plus leading-tight">SHUTTERS</h3>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-[calc(50%-0.625vw)] sm:w-[43.945vw] w-[72.727vw] xl:h-fit sm:h-[42.969vw] h-[77.273vw] xl:shrink shrink-0 relative rounded-48 overflow-hidden shadow-shadow01">
                        <img src="/images/questions/2.png" className="w-full xl:h-fit h-full object-cover" alt="" />
                        <div className="absolute left-0 top-0 size-full flex flex-col justify-between items-end xl:p-[1.25vw] sm:p-[2.344vw] p-[5.455vw] ">
                            <Button variant={"light"} size={"small"} asChild className="w-fit h-fit">
                                <a href="/blinds/single" >
                                    Shop Now
                                </a>
                            </Button>
                            <div className="w-full flex flex-col gap-2 text-white">
                                <h3 className="xl:text-[1.875vw] sm:text-[3.516vw] text-[6.512vw] sm:font-extrabold font-bold font-plus leading-tight">BLINDS</h3>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-[calc(50%-0.625vw)] sm:w-[43.945vw] w-[72.727vw] xl:h-fit sm:h-[42.969vw] h-[77.273vw] xl:shrink shrink-0 relative rounded-48 overflow-hidden shadow-shadow01">
                        <img src="/images/questions/3.png" className="w-full xl:h-fit h-full object-cover" alt="" />
                        <div className="absolute left-0 top-0 size-full flex flex-col justify-between items-end xl:p-[1.25vw] sm:p-[2.344vw] p-[5.455vw] ">
                            <Button variant={"light"} size={"small"} asChild className="w-fit h-fit">
                                <a href="/curtains/single" >
                                    Shop Now
                                </a>
                            </Button>
                            <div className="w-full flex flex-col gap-2 text-white">
                                <h3 className="xl:text-[1.875vw] sm:text-[3.516vw] text-[6.512vw] sm:font-extrabold font-bold font-plus leading-tight">CURTAINS</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

		</section>
	);
}

export default Questions;

