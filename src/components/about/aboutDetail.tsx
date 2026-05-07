import * as React from "react";


function AboutDetail() {


    return (
        <section className="w-screen flex flex-col xl:gap-[4.167vw] sm:gap-[9.375vw] gap-[22.326vw] xl:py-[4.427vw] sm:py-[7.813vw] py-[11.163vw] xl:px-[1.25vw] sm:px-[2.344vw] px-6" id="aboutDetail">
            <div className="flex xl:flex-row flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-6">
                <div className="w-full flex flex-col sm:gap-4 gap-2 text-[--Black] xl:text-left text-center">
                    <h2 className="text-3xl uppercase">Who We Are</h2>
                    <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                        <p className="text-sm ">Blindzy was created to simplify the way Australians buy custom blinds and curtains. Instead
                            of dealing with expensive showrooms, pushy salespeople, and long wait times, we offer a
                            direct, transparent approach to high-quality window furnishings made to your exact
                            specifications and delivered straight to your door.</p>
                        <p className="text-sm">With a strong background in local manufacturing, we focus on combining quality
                            craftsmanship, modern design, and affordability. Every product is carefully made to suit
                            Australian homes, giving you full control over your style, measurements and budget without
                            compromising on quality.</p>
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
                    <h2 className="text-3xl uppercase">Our Mission</h2>
                    <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                        <p className="text-sm">Our mission is to make premium window furnishings in Australia accessible, affordable, and
                            easy to install. By cutting out unnecessary middlemen and working directly with customers,
                            we deliver custom blinds, curtains, and shutters at honest prices.</p>
                        <p className="text-sm">We believe great design shouldn’t be complicated. That’s why we’ve built a simple,
                            step-by-step process that allows you to measure, customise, and install with confidence,
                            helping you achieve a high-end finish in your home without the traditional cost or hassle.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutDetail;

