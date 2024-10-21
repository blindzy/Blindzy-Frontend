import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';

import './css/style.css';

function Shop() {
	const [selectedCategory, setSelectedCategory] = useState('all');
	useEffect(() => {
		
	}, []);

	return (
		<section className="shop-section w-screen min-h-screen flex items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4" id="shop">
			<div className="w-[450px] flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0">
				<div className="w-full flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg uppercase">GET AN INSTANT PRICE</h5>
						<p className="text-sm w-[90%]">Enter window size for real-time pricing.Fine-tune later.</p>
					</div>
					<input type="text" className="formInput" id="Width" placeholder="Width:"/>
					<input type="text" className="formInput" id="Height" placeholder="Height:"/>
					<button className="w-full cus-btn sm-text">
						Calculate
					</button>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-32">
						<img src="/images/icon/box-sm.png" className="w-fit shrink-0" alt="Box" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md">Free Delivery</h6>
							<p className="text-xs">Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
					<div className="flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-32">
						<img src="/images/icon/guarantee-sm.png" className="w-fit shrink-0" alt="guarantee" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md">10 Years Warranty</h6>
							<p className="text-xs"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
					<div className="flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-32">
						<img src="/images/icon/australia-sm.png" className="w-fit shrink-0" alt="australia" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md">Made in Australia</h6>
							<p className="text-xs"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
					<div className="flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-32">
						<img src="/images/icon/diy-sm.png" className="w-fit shrink-0" alt="diy" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md">Install Yourself</h6>
							<p className="text-xs"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
				</div>

			</div>
			<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
				<div className="w-full xl:p-[1.25vw] sm:p-[2.344vw] p-4 flex items-center justify-between border border-[--Black] rounded-48">
					<h6 className="text-md text-black">Showing 1-50 Results</h6>
					<div className="flex items-center gap-4">
						<button className={`cus-btn tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
							onClick={() => setSelectedCategory('all')}>
							All Products
						</button>
						<button className={`cus-btn tab-btn ${selectedCategory === 'blackout' ? 'active' : ''}`}
							onClick={() => setSelectedCategory('blackout')}>
							Blockout
						</button>
						<button className={`cus-btn tab-btn ${selectedCategory === 'filtering' ? 'active' : ''}`}
						onClick={() => setSelectedCategory('filtering')}>
							Light Filtering
						</button>
						<button className={`cus-btn tab-btn ${selectedCategory === 'sunscreen' ? 'active' : ''}`}
						onClick={() => setSelectedCategory('sunscreen')}>
							Sunscreen
						</button>
					</div>
				</div>
				<div className="grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4">
					<div className={`blackout-block transition sm:col-span-4 col-span-6 ${selectedCategory === 'all' || selectedCategory === 'blackout' ? 'visible': 'hidden'}`}>
						<div className="w-full flex flex-col gap-4 text-black border border-[--Black] p-4 rounded-48">
							<div className="relative rounded-32 overflow-hidden">
								<img src="/images/product/1.png" className="w-full" alt="" />
								<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
									<p className="text-sm ">Blackout</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h5 className="text-lg">Product Name</h5>
								<h5 className="text-lg text-primary">$3000.00</h5>
							</div>
							<p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<h6 className="text-md">Available Colors</h6>
							<div className="flex items-stretch gap-2">
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/01.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/02.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/03.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/04.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/05.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/06.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
							</div>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<a href="/product-detail" className="w-full cus-btn text-center">
								Customise
							</a>
						</div>
					</div>
					<div className={`sunscreen-block transition sm:col-span-4 col-span-6 ${selectedCategory === 'all' || selectedCategory === 'sunscreen' ? 'visible': 'hidden'}`}>
						<div className="w-full flex flex-col gap-4 text-black border border-[--Black] p-4 rounded-48">
							<div className="relative rounded-32 overflow-hidden">
								<img src="/images/product/2.png" className="w-full" alt="" />
								<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
									<p className="text-sm ">Sunscreen</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h5 className="text-lg">Product Name</h5>
								<h5 className="text-lg text-primary">$3000.00</h5>
							</div>
							<p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<h6 className="text-md">Available Colors</h6>
							<div className="flex items-stretch gap-2">
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/01.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/02.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/03.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/04.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/05.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/06.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
							</div>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<a href="/product-detail" className="w-full cus-btn text-center">
								Customise
							</a>
						</div>
					</div>
					<div className={`filtering-block transition sm:col-span-4 col-span-6 ${selectedCategory === 'all' || selectedCategory === 'filtering' ? 'visible': 'hidden'}`}>
						<div className="w-full flex flex-col gap-4 text-black border border-[--Black] p-4 rounded-48">
							<div className="relative rounded-32 overflow-hidden">
								<img src="/images/product/3.png" className="w-full" alt="" />
								<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
									<p className="text-sm ">Light Filtering</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h5 className="text-lg">Product Name</h5>
								<h5 className="text-lg text-primary">$3000.00</h5>
							</div>
							<p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<h6 className="text-md">Available Colors</h6>
							<div className="flex items-stretch gap-2">
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/01.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/02.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/03.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/04.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/05.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/06.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
							</div>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<a href="/product-detail" className="w-full cus-btn text-center">
								Customise
							</a>
						</div>
					</div>
					<div className={`blackout-block transition sm:col-span-4 col-span-6 ${selectedCategory === 'all' || selectedCategory === 'blackout' ? 'visible': 'hidden'}`}>
						<div className="w-full flex flex-col gap-4 text-black border border-[--Black] p-4 rounded-48">
							<div className="relative rounded-32 overflow-hidden">
								<img src="/images/product/4.png" className="w-full" alt="" />
								<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
									<p className="text-sm ">Blackout</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h5 className="text-lg">Product Name</h5>
								<h5 className="text-lg text-primary">$3000.00</h5>
							</div>
							<p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<h6 className="text-md">Available Colors</h6>
							<div className="flex items-stretch gap-2">
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/01.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/02.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/03.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/04.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/05.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/06.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
							</div>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<a href="/product-detail" className="w-full cus-btn text-center">
								Customise
							</a>
						</div>
					</div>
					<div className={`sunscreen-block transition sm:col-span-4 col-span-6 ${selectedCategory === 'all' || selectedCategory === 'sunscreen' ? 'visible': 'hidden'}`}>
						<div className="w-full flex flex-col gap-4 text-black border border-[--Black] p-4 rounded-48">
							<div className="relative rounded-32 overflow-hidden">
								<img src="/images/product/5.png" className="w-full" alt="" />
								<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
									<p className="text-sm ">Sunscreen</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h5 className="text-lg">Product Name</h5>
								<h5 className="text-lg text-primary">$3000.00</h5>
							</div>
							<p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<h6 className="text-md">Available Colors</h6>
							<div className="flex items-stretch gap-2">
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/01.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/02.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/03.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/04.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/05.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/06.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
							</div>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<a href="/product-detail" className="w-full cus-btn text-center">
								Customise
							</a>
						</div>
					</div>
					<div className={`filtering-block transition sm:col-span-4 col-span-6 ${selectedCategory === 'all' || selectedCategory === 'filtering' ? 'visible': 'hidden'}`}>
						<div className="w-full flex flex-col gap-4 text-black border border-[--Black] p-4 rounded-48">
							<div className="relative rounded-32 overflow-hidden">
								<img src="/images/product/6.png" className="w-full" alt="" />
								<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
									<p className="text-sm ">Light Filtering</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<h5 className="text-lg">Product Name</h5>
								<h5 className="text-lg text-primary">$3000.00</h5>
							</div>
							<p className="text-sm">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<h6 className="text-md">Available Colors</h6>
							<div className="flex items-stretch gap-2">
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/01.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/02.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/03.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/04.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/05.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
								<div className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
									<img src="/images/colors/06.png" className="w-fit object-scale-down rounded-lg" alt="colors" />
								</div>
							</div>
							<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
								<Icon icon="uil:plus" className="text-[18px]" />
								<div className="w-full h-[1px] bg-mediumGrey"></div>
								<Icon icon="uil:plus" className="text-[18px]" />
							</div>
							<a href="/product-detail" className="w-full cus-btn text-center">
								Customise
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Shop;
