import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { api, type Sample } from '../../services/api';
import './css/style.css';

function Samples() {
	const [samples, setSamples] = useState<Sample[]>([]);

	useEffect(() => {
		api.getSamples().then(setSamples);
	}, []);

	return (
		<section className="shop-section w-screen min-h-screen flex xl:flex-row flex-col items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2" id="blindsShop">
			<div className="xl:w-[450px] w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black xl:shrink-0">
				<div className="w-full flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2 border border-[--Black] rounded-48">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg uppercase">Filter </h5>
						<p className="text-sm w-[90%]">Filter the Samples Based on the Product, Materials, and Fabric</p>
					</div>
					<input type="text" className="formInput" id="Product" placeholder="Product"/>
					<input type="text" className="formInput" id="Material" placeholder="Material"/>
					<input type="text" className="formInput" id="Fabric" placeholder="Fabric"/>
					<button className="w-full cus-btn sm-text">
						Calculate
					</button>
				</div>
			</div>
			<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
				<div className="grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4">
					{samples.map((sample, idx) => (
						<div className="sm:col-span-4 col-span-6" key={sample.id}>
							<div className="w-full flex flex-col gap-4 text-black border border-[--Black] p-4 rounded-48">
								<div className="relative rounded-32 overflow-hidden">
									<img src={sample.image_url} className="w-full" alt={sample.name} />
								</div>
								<div className="flex items-center justify-between">
									<h5 className="text-lg">{sample.name}</h5>
									<h5 className="text-lg text-primary">{sample.price === 0 ? 'Free' : `$${sample.price}`}</h5>
								</div>
								<div className="flex items-center gap-1">
									<h6 className="text-md">Colour:</h6>
									<h6 className="text-md ">{sample.material}</h6>
								</div>
								<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
									<Icon icon="uil:plus" className="text-[18px]" />
									<div className="w-full h-[1px] bg-mediumGrey"></div>
									<Icon icon="uil:plus" className="text-[18px]" />
								</div>
								<div className="flex items-center gap-4">
									<button className="w-full cus-btn sm md-text">
										Get Samples
									</button>
									<button className="w-full cus-btn stroke-black sm md-text">
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Samples;

