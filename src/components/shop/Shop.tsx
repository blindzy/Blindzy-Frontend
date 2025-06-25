import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';

import './css/style.css';

interface ShopProps {
	
}


const products = [
	{
		id: 1,
		name: "Product Name",
		price: "$3000.00",
		description: "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
		image: "/images/product/1.png",
		category: "blackout",
		categoryLabel: "Blackout",
		colors: [
			"/images/colors/01.png",
			"/images/colors/02.png", 
			"/images/colors/03.png",
			"/images/colors/04.png",
			"/images/colors/05.png",
			"/images/colors/06.png"
		]
	},
	{
		id: 2,
		name: "Product Name",
		price: "$3000.00",
		description: "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
		image: "/images/product/2.png",
		category: "sunscreen",
		categoryLabel: "Sunscreen",
		colors: [
			"/images/colors/01.png",
			"/images/colors/02.png", 
			"/images/colors/03.png",
			"/images/colors/04.png",
			"/images/colors/05.png",
			"/images/colors/06.png"
		]
	},
	{
		id: 3,
		name: "Product Name",
		price: "$3000.00",
		description: "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
		image: "/images/product/3.png",
		category: "filtering",
		categoryLabel: "Light Filtering",
		colors: [
			"/images/colors/01.png",
			"/images/colors/02.png", 
			"/images/colors/03.png",
			"/images/colors/04.png",
			"/images/colors/05.png",
			"/images/colors/06.png"
		]
	},
	{
		id: 4,
		name: "Product Name",
		price: "$3000.00",
		description: "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
		image: "/images/product/4.png",
		category: "blackout",
		categoryLabel: "Blackout",
		colors: [
			"/images/colors/01.png",
			"/images/colors/02.png", 
			"/images/colors/03.png",
			"/images/colors/04.png",
			"/images/colors/05.png",
			"/images/colors/06.png"
		]
	},
	{
		id: 5,
		name: "Product Name",
		price: "$3000.00",
		description: "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
		image: "/images/product/5.png",
		category: "sunscreen",
		categoryLabel: "Sunscreen",
		colors: [
			"/images/colors/01.png",
			"/images/colors/02.png", 
			"/images/colors/03.png",
			"/images/colors/04.png",
			"/images/colors/05.png",
			"/images/colors/06.png"
		]
	},
	{
		id: 6,
		name: "Product Name",
		price: "$3000.00",
		description: "Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl.",
		image: "/images/product/6.png",
		category: "filtering",
		categoryLabel: "Light Filtering",
		colors: [
			"/images/colors/01.png",
			"/images/colors/02.png", 
			"/images/colors/03.png",
			"/images/colors/04.png",
			"/images/colors/05.png",
			"/images/colors/06.png"
		]
	}
];

function Shop(props: ShopProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	useEffect(() => {
		
	}, []);

	return (
		<section className="shop-section w-full min-h-screen flex flex-col lg:flex-row items-start gap-4 lg:gap-6 xl:gap-8 p-2 sm:p-6 xl:p-8" id="shop">
			<div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col gap-4 lg:gap-6 xl:gap-8 text-black shrink-0">
				<div className="w-full flex flex-col gap-4 p-2 sm:p-6 xl:p-8 border border-[--Black] rounded-48">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg xl:text-xl uppercase">GET AN INSTANT PRICE</h5>
						<p className="text-sm xl:text-base w-[90%]">Enter window size for real-time pricing.Fine-tune later.</p>
					</div>
					<input type="text" className="formInput" id="Width" placeholder="Width:"/>
					<input type="text" className="formInput" id="Height" placeholder="Height:"/>
					<button className="w-full cus-btn sm-text">
						Calculate
					</button>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4 p-2 sm:p-6 xl:p-8 border border-[--Black] rounded-32">
						<img src="/images/icon/box-sm.png" className="w-fit shrink-0" alt="Box" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md xl:text-lg">Free Delivery</h6>
							<p className="text-xs xl:text-sm">Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
					<div className="flex items-center gap-4 p-2 sm:p-6 xl:p-8 border border-[--Black] rounded-32">
						<img src="/images/icon/guarantee-sm.png" className="w-fit shrink-0" alt="guarantee" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md xl:text-lg">10 Years Warranty</h6>
							<p className="text-xs xl:text-sm"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
					<div className="flex items-center gap-4 p-2 sm:p-6 xl:p-8 border border-[--Black] rounded-32">
						<img src="/images/icon/australia-sm.png" className="w-fit shrink-0" alt="australia" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md xl:text-lg">Made in Australia</h6>
							<p className="text-xs xl:text-sm"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
					<div className="flex items-center gap-4 p-2 sm:p-6 xl:p-8 border border-[--Black] rounded-32">
						<img src="/images/icon/diy-sm.png" className="w-fit shrink-0" alt="diy" />
						<div className="w-full flex flex-col gap-1">
							<h6 className="text-md xl:text-lg">Install Yourself</h6>
							<p className="text-xs xl:text-sm"> Phasellus lectus sit felis nascetu ante imperdiet semper leo. </p>
						</div>
					</div>
				</div>

			</div>
			<div className="w-full flex flex-col gap-4 lg:gap-6 xl:gap-8">
				<div className="w-full p-2 sm:p-6 xl:p-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-[--Black] rounded-48">
					<h6 className="text-md xl:text-lg text-black">Showing 1-50 Results</h6>
					<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 xl:gap-6">
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
				<div className="grid items-stretch grid-cols-12 gap-4 lg:gap-5 xl:gap-6">
					{/*PRODUCT CARDS  */}
					{products.map((product) => (
						<div key={product.id} className={`${product.category}-block transition col-span-12 sm:col-span-6 lg:col-span-12 xl:col-span-4 ${selectedCategory === 'all' || selectedCategory === product.category ? 'visible': 'hidden'}`}>
							<div className="w-full flex flex-col gap-4 lg:gap-5 xl:gap-6 text-black border border-[--Black] p-2 lg:p-5 xl:p-6 rounded-48">
								<div className="relative rounded-32 overflow-hidden">
									<img src={product.image} className="w-full" alt={product.name} />
									<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
										<p className="text-sm lg:text-base xl:text-base">{product.categoryLabel}</p>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<h5 className="text-lg lg:text-xl xl:text-xl">{product.name}</h5>
									<h5 className="text-lg lg:text-xl xl:text-xl text-primary">{product.price}</h5>
								</div>
								<p className="text-sm lg:text-base xl:text-base">{product.description}</p>
								<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
									<Icon icon="uil:plus" className="text-[18px]" />
									<div className="w-full h-[1px] bg-mediumGrey"></div>
									<Icon icon="uil:plus" className="text-[18px]" />
								</div>
								<h6 className="text-md lg:text-lg">Available Colors</h6>
								<div className="flex items-stretch gap-2">
									{product.colors.map((color, index) => (
										<div key={index} className="border transition border-[--lightGrey] cursor-pointer p-2 rounded-xl">
											<img src={color} className="w-fit object-scale-down rounded-lg" alt="colors" />
										</div>
									))}
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
					))}
				</div>
			</div>
		</section>
	);
}

export default Shop;

