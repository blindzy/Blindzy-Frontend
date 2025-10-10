import * as React from "react";


function AboutDetail() {


	return (
		<section className="w-screen flex flex-col xl:gap-[4.167vw] sm:gap-[9.375vw] gap-[22.326vw] xl:py-[4.427vw] sm:py-[7.813vw] py-[11.163vw] xl:px-[1.25vw] sm:px-[2.344vw] px-6" id="aboutDetail">
            <div className="flex xl:flex-row flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-6">
                <div className="w-full flex flex-col sm:gap-4 gap-2 text-[--Black] xl:text-left text-center">
                    <h2 className="text-xxxl uppercase">Who We Are</h2>
                    <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                        <p className="text-sm ">Lorem ipsum dolor sit amet consectetur. Amet id eu nunc montes fames varius commodo. Est viverra velit et tortor donec ac. Mattis rhoncus id id ut vestibulum pulvinar augue. Diam felis molestie odio risus. Aliquam in purus neque nulla. Lacus sit enim id convallis at. Eu gravida pellentesque nibh vitae varius condimentum fermentum eget. Ullamcorper egestas justo nec et. Aliquam purus nec ultricies justo nullam ipsum dictum lectus pharetra. At sagittis commodo pretium id senectus semper adipiscing a.</p>
                        <p className="text-sm">Dapibus nullam pretium orci nulla vel tempus aliquet enim morbi. Elementum turpis iaculis a leo hendrerit non tortor. Viverra semper risus quis eros neque nullam. Viverra faucibus aliquam cursus ultricies diam leo. Fames dui tempus mi est habitasse enim dictum viverra metus. Vivamus amet faucibus posuere scelerisque. Ullamcorper ultrices et et enim sit est nunc volutpat. Varius sem quis et ac.</p>
                    </div>
                </div>
                <div className="w-full overflow-hidden rounded-48">
                    <img src="/images/about/2.png" className="w-full" alt="about-image" />
                </div>
            </div>
            <div className="flex xl:flex-row flex-col-reverse items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-6">
                <div className="w-full overflow-hidden rounded-48">
                    <img src="/images/about/2.png" className="w-full" alt="about-image" />
                </div>
                <div className="w-full flex flex-col sm:gap-4 gap-2 text-[--Black] xl:text-left text-center">
                    <h2 className="text-xxxl uppercase">Our Mission</h2>
                    <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                        <p className="text-sm">Our mission is to provide Aussies with high quality Blinds and curtains at affordable prices. We make it easy to access premium blinds, curtains and other products by delivering directly from our factory to your doorstep, helping to avoid unnecessary delays and low quality products. With simple steps for measuring and installation, you can enjoy top quality blinds at the best value, all from the comfort of your home.</p>
                    </div>
                </div>
            </div>
		</section>
	);
}

export default AboutDetail;

