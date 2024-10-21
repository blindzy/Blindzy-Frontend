import React, { useEffect } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import $ from 'jquery';


import './css/style.css';

function ProductDetails() {

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		ScrollTrigger.normalizeScroll(true);

		const deviceWidth = window.innerWidth;
		if (deviceWidth > 768) {
		  ScrollSmoother.create({
		    smooth: 2,
		    effects: true,
		    normalizeScroll: true,
		  });
		}
        $('.detail-sidebar').on('mouseenter', function() {
            ScrollTrigger.normalizeScroll(false);
        });
        $('.detail-sidebar').on('mouseleave', function() {
            ScrollTrigger.normalizeScroll(true);
        }); 
	}, []);

	return (
		<section className="innerBanner w-screen h-[86vh] flex items-stretch xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:px-[1.25vw] sm:px-[2.344vw] px-4" id="ProductDetail">
            <div className="detail-sidebar w-[635px] h-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black border border-[--Black] overflow-auto scroll-hidden rounded-48 shrink-0">
                <h4 className="text-xl">Build Your blind</h4>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg">Enter Measurements</h5>
                <input type="text" className="formInput" id="roomName" placeholder="Room Name"/>
                <div className="w-full flex items-center gap-4">
                    <input type="text" className="formInput" id="width" placeholder="Width:"/>
                    <input type="text" className="formInput" id="height" placeholder="Height:"/>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Choose Fabric</h5>
                    <div className="flex flex-wrap items-stretch  gap-2">
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-1" value="" defaultChecked/>
                            <label htmlFor="fabricColor-1" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-1.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-2" value="" defaultChecked/>
                            <label htmlFor="fabricColor-2" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-2.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-3" value="" defaultChecked/>
                            <label htmlFor="fabricColor-3" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-3.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-4" value="" defaultChecked/>
                            <label htmlFor="fabricColor-4" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-4.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-5" value="" defaultChecked/>
                            <label htmlFor="fabricColor-5" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-5.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-6" value="" defaultChecked/>
                            <label htmlFor="fabricColor-6" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-6.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-7" value="" defaultChecked/>
                            <label htmlFor="fabricColor-7" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-7.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-8" value="" defaultChecked/>
                            <label htmlFor="fabricColor-8" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-8.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-9" value="" defaultChecked/>
                            <label htmlFor="fabricColor-9" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-9.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        <div className="w-fit shrink-0 selector">
                            <input type="radio" name="fabricColor" id="fabricColor-10" value="" defaultChecked/>
                            <label htmlFor="fabricColor-10" className="p-2.5 rounded-xl">
                                <img src="/images/colors/fabric-10.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
                            </label>
                        </div>
                        
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Controls</h5>
                    <div className="flex items-stretch gap-2">
                        <div className="w-full selector">
                            <input type="radio" name="controls" id="control-left" value="" defaultChecked/>
                            <label htmlFor="control-left" className="rounded-24">
                                <img src="/images/product/control-left.png" className="w-full object-scale-down" alt="control-left" />
                            </label>
                        </div>
                        <div className="w-full selector">
                            <input type="radio" name="controls" id="control-right" value=""/>
                            <label htmlFor="control-right" className="rounded-24">
                                <img src="/images/product/control-right.png" className="w-full" alt="control-right" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Select Fit</h5>
                    <div className="flex items-stretch gap-2">
                        <div className="w-full selector">
                            <input type="radio" name="fit" id="fit-1" value="" defaultChecked/>
                            <label htmlFor="fit-1" className="rounded-24">
                                <img src="/images/product/fit-1.png" className="w-full object-cover object-center" alt="fit-1" />
                                <div className="image-after"></div>
                            </label>
                        </div>
                        <div className="w-full selector">
                            <input type="radio" name="fit" id="fit-2" value=""/>
                            <label htmlFor="fit-2" className="rounded-24">
                                <img src="/images/product/fit-2.png" className="w-full object-cover object-center" alt="fit-2" />
                                <div className="image-after"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Choose Roll Direction</h5>
                    <div className="flex items-stretch gap-2">
                        <div className="w-full selector">
                            <input type="radio" name="roll" id="dir-1" value="" defaultChecked/>
                            <label htmlFor="dir-1" className="rounded-24">
                                <img src="/images/product/roll-direction-1.png" className="w-full object-cover object-center" alt="Direction1" />
                                <div className="image-after"></div>
                            </label>
                        </div>
                        <div className="w-full selector">
                            <input type="radio" name="roll" id="dir-2" value=""/>
                            <label htmlFor="dir-2" className="rounded-24">
                                <img src="/images/product/roll-direction-2.png" className="w-full object-cover object-center" alt="Direction2" />
                                <div className="image-after"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Choose Chain Color</h5>
                    <div className="flex items-stretch gap-2">
                        <div className="selector">
                            <input type="radio" name="chainColor" id="chainColor-1" value="" defaultChecked/>
                            <label htmlFor="chainColor-1" className="p-2.5 rounded-xl">
                                <img src="/images/colors/07.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="chainColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="chainColor" id="chainColor-2" value=""/>
                            <label htmlFor="chainColor-2" className="p-2.5 rounded-xl">
                                <img src="/images/colors/08.png" className="w-full object-cover object-center rounded-lg" alt="chainColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="chainColor" id="chainColor-3" value=""/>
                            <label htmlFor="chainColor-3" className="p-2.5 rounded-xl">
                                <img src="/images/colors/09.png" className="w-full object-cover object-center rounded-lg" alt="chainColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="chainColor" id="chainColor-4" value=""/>
                            <label htmlFor="chainColor-4" className="p-2.5 rounded-xl">
                                <img src="/images/colors/10.png" className="w-full object-cover object-center rounded-lg" alt="chainColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="chainColor" id="chainColor-5" value=""/>
                            <label htmlFor="chainColor-5" className="p-2.5 rounded-xl">
                                <img src="/images/colors/11.png" className="w-full object-cover object-center rounded-lg" alt="chainColor" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Choose Bracket Color</h5>
                    <div className="flex items-stretch gap-2">
                        <div className="selector">
                            <input type="radio" name="bracketColor" id="bracketColor-1" value="" defaultChecked/>
                            <label htmlFor="bracketColor-1" className="p-2.5 rounded-xl">
                                <img src="/images/colors/07.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="bracketColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="bracketColor" id="bracketColor-2" value=""/>
                            <label htmlFor="bracketColor-2" className="p-2.5 rounded-xl">
                                <img src="/images/colors/08.png" className="w-full object-cover object-center rounded-lg" alt="bracketColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="bracketColor" id="bracketColor-3" value=""/>
                            <label htmlFor="bracketColor-3" className="p-2.5 rounded-xl">
                                <img src="/images/colors/09.png" className="w-full object-cover object-center rounded-lg" alt="bracketColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="bracketColor" id="bracketColor-4" value=""/>
                            <label htmlFor="bracketColor-4" className="p-2.5 rounded-xl">
                                <img src="/images/colors/10.png" className="w-full object-cover object-center rounded-lg" alt="bracketColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="bracketColor" id="bracketColor-5" value=""/>
                            <label htmlFor="bracketColor-5" className="p-2.5 rounded-xl">
                                <img src="/images/colors/11.png" className="w-full object-cover object-center rounded-lg" alt="bracketColor" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Choose Base Rail Shape</h5>
                    <div className="flex items-stretch gap-2">
                        <div className="w-full selector">
                            <input type="radio" name="Rail" id="rail-1" value="" defaultChecked/>
                            <label htmlFor="rail-1" className="rounded-24">
                                <img src="/images/product/rail-1.png" className="w-full object-cover object-center" alt="rail-1" />
                                <div className="image-after"></div>
                            </label>
                        </div>
                        <div className="w-full selector">
                            <input type="radio" name="Rail" id="rail-2" value=""/>
                            <label htmlFor="rail-2" className="rounded-24">
                                <img src="/images/product/rail-2.png" className="w-full object-cover object-center" alt="rail-2" />
                                <div className="image-after"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg">Choose Base Rail Color</h5>
                    <div className="flex items-stretch gap-2">
                        <div className="selector">
                            <input type="radio" name="railColor" id="railColor-1" value="" defaultChecked/>
                            <label htmlFor="railColor-1" className="p-2.5 rounded-xl">
                                <img src="/images/colors/07.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="railColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="railColor" id="railColor-2" value=""/>
                            <label htmlFor="railColor-2" className="p-2.5 rounded-xl">
                                <img src="/images/colors/08.png" className="w-full object-cover object-center rounded-lg" alt="railColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="railColor" id="railColor-3" value=""/>
                            <label htmlFor="railColor-3" className="p-2.5 rounded-xl">
                                <img src="/images/colors/09.png" className="w-full object-cover object-center rounded-lg" alt="railColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="railColor" id="railColor-4" value=""/>
                            <label htmlFor="railColor-4" className="p-2.5 rounded-xl">
                                <img src="/images/colors/10.png" className="w-full object-cover object-center rounded-lg" alt="railColor" />
                            </label>
                        </div>
                        <div className="selector">
                            <input type="radio" name="railColor" id="railColor-5" value=""/>
                            <label htmlFor="railColor-5" className="p-2.5 rounded-xl">
                                <img src="/images/colors/11.png" className="w-full object-cover object-center rounded-lg" alt="railColor" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black border border-[--Black] rounded-48">
                <div className="w-full h-full rounded-32 overflow-hidden">
                    <img src="/images/product/product-datail.png" className="w-full object-cover" alt="product-datail" />
                </div>
                <div className="w-[350px] shrink-0 flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Product Name</h5>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Customisations</h5>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Color:</p>
                            <p className="text-sm">Ash</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Size:</p>
                            <p className="text-sm">24cm x 56cm</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Fit Type:</p>
                            <p className="text-sm">Recess Fit</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Roll Direction:</p>
                            <p className="text-sm">Front Roll</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Chain Colour:</p>
                            <p className="text-sm">Silver</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Bracket Colour:</p>
                            <p className="text-sm">Sandstone</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Base Rail Shape:</p>
                            <p className="text-sm">Oval</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Base Rail Colour:</p>
                            <p className="text-sm">Bone</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="flex items-center justify-between">
                        <h5 className="text-lg">TOTAL PRICE</h5>
                        <h5 className="text-lg">$450.00</h5>
                    </div>
                    <div className="check-box">
                        <input type="checkbox" id="permanent" name="employment"/>
                        <div className="icon">
                            <Icon icon="tabler:check" />
                        </div>
                        <label htmlFor="permanent" className="text-sm">I have double checked my measurements and customisations</label>
                    </div>
                    <div className="flex items-cnter gap-2">
                        <button className="w-full cus-btn sm primary">
                            Add to Cart
                        </button>
                        <button className="w-full cus-btn sm stroke-black" >
                            Buy Now
                        </button>
                    </div>
                </div>

            </div>
		</section>
	);
}

export default ProductDetails;
