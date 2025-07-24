import React, { useEffect } from "react";
import './css/style.css';

interface QuestionsProps {
	// Add any props if needed in the future
}
function Questions(props: QuestionsProps) {

	useEffect(() => {
	}, []);

	return (
		<section className="questions-section w-screen sm:h-screen flex items-center justify-center xl:py-[3.333vw]py-[6vh] xl:px-[1.25vw]" id="questions">
            {/* Desktop/tablet layout: visible on xl and up */}
            <div className="hidden xl:flex flex-row items-stretch justify-between xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2 w-full px-2">
                <div className="w-full flex flex-col xl:gap-[2.5vw] gap-[4.688vw] xl:items-start items-center xl:text-left text-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-primary rounded-48">
                    <div className="xl:w-fit sm:w-[70%] w-full flex flex-col gap-2">
                        <h2 className="text-1xl text-white">HAVE ANY QUESTIONS?</h2>
                        <p className="xl:w-[29.479vw] text-sm text-white">We'd love to hear from you! Whether it's measuring tips, installation advice, or product info, the Blindzy team is ready to help.</p>
                    </div>
                    <div className="flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                        <button className="open__contactPopup cus-btn white w-fit hover-black">
                            Contact Us
                        </button>
                        <a href="/about" className="cus-btn stroke w-fit hover-black">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                    <div className="questioncard w-full relative rounded-48 overflow-hidden questioncard-shadow">
                        <img src="/images/questions/1.png" className="w-full" alt="" />
                        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-end xl:p-[1.25vw] sm:p-[2.344vw] p-2 ">
                            <a href="/shop" className="cus-btn white w-fit">
                                Shop Now
                            </a>
                            <div className="w-full flex flex-col gap-2 text-white">
                                <h3 className="text-xl">SHUTTERS</h3>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-stretch xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                        <div className="questioncard w-full relative rounded-48 overflow-hidden questioncard-shadow">
                            <img src="/images/questions/2.png" className="w-full" alt="" />
                            <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-end xl:p-[1.25vw] sm:p-[2.344vw] p-2 ">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xl">BLINDS</h3>
                                </div>
                            </div>
                        </div>
                        <div className="questioncard w-full relative rounded-48 overflow-hidden questioncard-shadow">
                            <img src="/images/questions/3.png" className="w-full" alt="" />
                            <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-end xl:p-[1.25vw] sm:p-[2.344vw] p-2 ">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xl">CURTAINS</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile layout: visible below xl */}
            <div className="flex flex-col xl:hidden w-full">
                {/* Cards: horizontal scroll/swipe */}
                <div className="relative w-full overflow-x-auto scrollbar-hide">
                  <div className="flex flex-row gap-4 py-10 px-[16px] snap-x snap-mandatory">
                    {/* Card 1: Shutters */}
                    <div className="questioncard min-w-[80vw] sm:min-w-0 relative rounded-[8.142vw] overflow-hidden snap-start">
                      <img src="/images/questions/4.png" className="w-full h-full object-cover" alt="" />
                      <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-end sm:p-[2.344vw]  p-6">
                        <a href="/shop" className="cus-btn shop-now w-fit">
                          Shop Now
                        </a>
                        <div className="w-full flex flex-col gap-2 text-white">
                          <h3 className="text-[7.125vw] card-title-mobile">SHUTTERS</h3>
                        </div>
                      </div>
                    </div>
                    {/* Card 2: Blinds */}
                    <div className="questioncard min-w-[80vw] sm:min-w-0 relative rounded-[8.142vw] overflow-hidden snap-start">
                      <img src="/images/questions/2.png" className="w-full h-full object-cover" alt="" />
                      <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-end p-6 sm:p-[2.344vw]">
                        <a href="/shop" className="cus-btn shop-now w-fit">
                          Shop Now
                        </a>
                        <div className="w-full flex flex-col gap-2 text-white">
                          <h3 className="text-[7.125vw] card-title-mobile">BLINDS</h3>
                        </div>
                      </div>
                    </div>
                    {/* Card 3: Curtains */}
                    <div className="questioncard min-w-[80vw] sm:min-w-0 relative rounded-[8.142vw] overflow-hidden snap-start">
                      <img src="/images/questions/3.png" className="w-full h-full object-cover" alt="" />
                      <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-end p-6 sm:p-[2.344vw]">
                        <a href="/shop" className="cus-btn shop-now w-fit">
                          Shop Now
                        </a>
                        <div className="w-full flex flex-col gap-2 text-white">
                          <h3 className="text-[7.125vw] card-title-mobile">CURTAINS</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Questions below */}
                <div className="flex flex-col w-[91.858vw] h-[91.858vw] gap-[4.688vw] justify-between self-center bg-primary rounded-[8.142vw] p-6">
                    <div className="sm:w-[70%] w-full flex flex-col gap-2">
                        <h2 className="text-4xl text-white question-section-title-mobile">HAVE ANY QUESTIONS?</h2>
                        <p className="text-base text-white">We'd love to hear from you! Whether it's measuring tips, installation advice, or product info, the Blindzy team is ready to help.</p>
                    </div>
                    <div className="mobile-btns">
                        <button className="open__contactPopup cus-btn contact-us w-fit hover-black">
                            Contact Us
                        </button>
                        <a href="/about" className="cus-btn learn-more w-fit hover-black">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
		</section>
	);
}

export default Questions;

