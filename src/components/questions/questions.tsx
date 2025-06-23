import React, { useEffect } from "react";
import './css/style.css';

interface QuestionsProps {
	// Add any props if needed in the future
}
function Questions(props: QuestionsProps) {

	useEffect(() => {
	}, []);

	return (
		<section className=" questions-section w-screen sm:h-screen flex items-center justify-center xl:py-[3.333vw] sm:py-0 py-[6vh] xl:px-[1.25vw] sm:px-4 px-2" id="questions">
            <div className="flex xl:flex-row flex-col items-stretch justify-between xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2 ">
                <div className="w-full flex flex-col xl:gap-[2.5vw] gap-[4.688vw] xl:items-start items-center xl:text-left text-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-primary rounded-48">
                    <div className="xl:w-fit sm:w-[70%] w-full flex flex-col gap-2">
                        <h2 className="text-1xl text-white">HAVE ANY QUESTIONS?</h2>
                        <p className="xl:w-[29.479vw] text-sm text-white">Weâ€™d love to hear from you! Whether itâ€™s measuring tips, installation advice, or product info, the Blindzy team is ready to help.</p>
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
                    <div className="card w-full relative rounded-48 overflow-hidden card-shadow">
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
                        <div className="card w-full relative rounded-48 overflow-hidden card-shadow">
                            <img src="/images/questions/2.png" className="w-full" alt="" />
                            <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between items-end xl:p-[1.25vw] sm:p-[2.344vw] p-2 ">
                                <a href="/shop" className="cus-btn white w-fit">
                                    Shop Now
                                </a>
                                <div className="w-full flex flex-col gap-2 text-white">
                                    <h3 className="text-xl">CURTAINS</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card w-full relative rounded-48 overflow-hidden card-shadow">
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
		</section>
	);
}

export default Questions;

