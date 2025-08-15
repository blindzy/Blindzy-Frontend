import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { api, type Sample } from '../../services/api';
import { Button } from "@lib/components/ui/button";
import { Label } from "@lib/components/ui/label";
import { Plus  } from 'lucide-react';

function Samples() {
	const [samples, setSamples] = useState<Sample[]>([]);

	useEffect(() => {
		api.getSamples().then(setSamples);
	}, []);

	return (
		<section className="shop-section w-screen min-h-screen flex xl:flex-row flex-col items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2" id="blindsShop">
			<div className="w-full xl:w-[23.438vw] flex flex-col xl:gap-6 text-[--Black] shrink-0">
				<div className="w-full flex flex-col gap-4 p-6 sm:p-6 xl:p-[1.25vw] border border-[--Black] rounded-48">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg uppercase">Filter</h5>
						<p className="text-sm xl:w-[90%]">
							Filter the Samples Based on the Product, Materials, and Fabric
						</p>
					</div>
					<div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
						<Label htmlFor="product" className="shrink-0">Product:</Label>
						<input 
							type="number" 
							id="product" 
							className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
						/>
					</div>
					<div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
						<Label htmlFor="material" className="shrink-0">Material:</Label>
						<input 
							type="number" 
							id="material" 
							className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
						/>
					</div>
					<div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
						<Label htmlFor="fabric" className="shrink-0">Fabric:</Label>
						<input 
							type="number" 
							id="fabric" 
							className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
						/>
					</div>
					<Button 
						variant={'primary'}
						size={'small'}
						className="w-full"
					>
						Calculate
					</Button>
				</div>
			</div>
			<div className="w-full grid items-stretch grid-cols-12 gap-4 sm:gap-6 xl:gap-[1.25vw]">
				{samples.map((sample, idx) => (
					<div className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col justify-between gap-4 xl:gap-[0.833vw] p-4 xl:p-[0.833vw] border border-[--Black] rounded-48" key={sample.id}>
						<div className="relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[19.271vw]">
							<img src={sample.image_url} className="w-full h-full object-cover" alt={sample.name} />
						</div>
						<div className="flex flex-col gap-4 xl:gap-[0.833vw]">
							<div className="flex items-center justify-between gap-2">
								<h5 className="text-lg line-clamp-1">{sample.name}</h5>
								<h5 className="text-lg text-primary shrink-0">{sample.price === 0 ? 'Free' : `$${sample.price}`}</h5>
							</div>
							<div className="flex items-center gap-1">
								<h6 className="text-md">Colour:</h6>
								<h6 className="text-md ">{sample.material}</h6>
							</div>
							<div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
								<Plus className="size-[18px]" />
								<div className="w-full border-b border-[--mediumGrey]"></div>
								<Plus className="size-[18px]" />
							</div>
							<div className="flex items-center gap-4">
								<Button variant={'primary'} size={'small'} className="w-full flex-1">
									Get Samples
								</Button>
								<Button variant={'light'} size={'small'} className="w-full flex-1">
									Add to Cart
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default Samples;

