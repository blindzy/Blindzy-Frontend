import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import $ from 'jquery';

import './css/style.css';

interface ProductDetailsProps {
	// Add any props if needed in the future
}

// Define the type for product customisations
interface ProductCustomisations {
	color: string;
	size: string;
	fitType: string;
	rollDirection: string;
	chainColour: string;
	bracketColour: string;
	baseRailShape: string;
	baseRailColour: string;
	price: number;
}

// CustomCheckbox as a standalone component
function CustomCheckbox() {
	const [checked, setChecked] = useState(false);
	return (
		<div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setChecked(!checked)}>
			<div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition ${checked ? 'bg-primary border-primary' : 'border-gray-400 bg-white'}`}>
				{checked && <Icon icon="tabler:check" className="text-white text-sm" />}
			</div>
			<label className="text-sm">
				I have double checked my measurements and customisations
			</label>
		</div>
	);
}

function verBlind(props: ProductDetailsProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	// Only keep the attributes that are actually customisable on the left
	const [customisations, setCustomisations] = useState({
		color: '07',
		fit: 'fit-1',
		trackColor: 'silverTrack',
		weightType: 'chained',
		control: 'left',
	});

	const handleChange = (key: keyof typeof customisations) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomisations(prev => ({ ...prev, [key]: e.target.value }));
	};

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}

		const deviceWidth = window.innerWidth;
		if (deviceWidth > 768) {
			ScrollTrigger.normalizeScroll(false);
		}
		$('.detail-sidebar').on('mouseenter', function () {
			ScrollTrigger.normalizeScroll(false);
		});
		$('.detail-sidebar').on('mouseleave', function () {
			ScrollTrigger.normalizeScroll(true);
		});
	}, [lenis]);

	return (
		<section className="product-detail w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[80px] py-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
			<div className="detail-sidebar xl:w-[1223px] w-full xl:h-full h-auto flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black xl:overflow-hidden overflow-auto scroll-hidden rounded-48 xl:shrink-0">
				<h4 className="text-xl">VERTICAL BLIND CUSTOMISATION</h4>
				<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
				<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>
				<h5 className="text-lg">Enter Measurements</h5>
				<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
				<div className="w-full flex items-center gap-4">
					<input type="text" className="formInput" id="roomName" placeholder="Room Name" />
					<input type="text" className="formInput" id="width" placeholder="Width:" />
					<input type="text" className="formInput" id="height" placeholder="Height:" />
				</div>
				<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Color</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-wrap items-stretch gap-2">
						{Array.from({ length: 11 }, (_, i) => i + 1)
							.slice(-5)
							.map((num) => {
								const paddedNum = num < 10 ? `0${num}` : `${num}`;
								return (
									<div className="w-fit shrink-0 selector" key={`color-${paddedNum}`}>
										<input
											type="radio"
											name="color"
											id={`color-${paddedNum}`}
											value={paddedNum}
											checked={customisations.color === paddedNum}
											onChange={handleChange('color')}
										/>
										<label htmlFor={`color-${paddedNum}`} className="p-2.5 rounded-xl">
											<img
												src={`/images/colors/${paddedNum}.png`}
												className="w-full border border-[--lightGrey] object-cover object-center rounded-lg"
												alt={`color-${paddedNum}`}
											/>
										</label>
									</div>
								);
							})}
					</div>

					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Controls</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex items-stretch gap-2">
							{[
								{ id: "left", label: "Left Hand Stack", image: "/images/custom/leftHand.png" },
								{ id: "right", label: "Right Hand Stack", image: "/images/custom/rightHand.png" },
								{ id: "center", label: "Centre Opening", image: "/images/custom/center.png" },
							].map(({ id, label, image }, index) => (
								<div className="w-full selector flex flex-col items-start" key={id}>
									<input
										type="radio"
										name="control"
										id={id}
										value={id}
										checked={customisations.control === id}
										onChange={handleChange('control')}
										className="hidden"
									/>
									<label htmlFor={id} className="w-full block overflow-hidden rounded-2xl border border-[--lightGrey]">
										<img
											src={image}
											className="w-full object-cover object-center rounded-2xl"
											alt={id}
										/>
										<div className="image-after"></div>
									</label>
									<span className="text-base font-bold mt-2 text-left font-rounded">{label}</span>
								</div>
							))}
						</div>

					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Select Fit</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>

						<div className="flex items-stretch gap-4">
							{[
								{ id: "fit-1", label: "Fit", image: "/images/product/fit-1.png" },
								{ id: "fit-2", label: "Recess", image: "/images/product/fit-2.png" },
							].map(({ id, label, image }, index) => (
								<div className="w-full selector flex flex-col items-start" key={id}>
									<input type="radio" name="fit" id={id} value={id} checked={customisations.fit === id} onChange={handleChange('fit')} className="hidden" />

									<label htmlFor={id} className="w-full block overflow-hidden rounded-2xl border border-[--lightGrey]">
										<img
											src={image}
											className="w-full object-cover object-center rounded-2xl"
											alt={label}
										/>
										<div className="image-after"></div>
									</label>

									<span className="text-base font-bold mt-2 text-left font-rounded">{label}</span>
								</div>
							))}
						</div>
					</div>


					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>

					<h5 className="text-lg mt-4">Choose Your Track Colour</h5>
					<div className="flex items-stretch gap-2">
						{["silverTrack", "whiteTrack", "blackTrack", "birchTrack"].map((id, i) => (
							<div className="w-full selector flex flex-col items-start" key={id}>
								<input
									type="radio"
									name="trackColor"
									id={id}
									value={id}
									checked={customisations.trackColor === id}
									onChange={handleChange('trackColor')}
									className="hidden"
								/>
								<label htmlFor={id} className="rounded-2xl w-full block overflow-hidden border border-[--lightGrey]">
									<img
										src={`/images/custom/${id}.png`}
										className="w-full object-cover object-center rounded-2xl"
										alt={`${id}`}
									/>
									<div className="image-after"></div>
								</label>
								<span className="text-base font-bold mt-2 capitalize self-start text-left font-rounded">{id}</span>
							</div>
						))}
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Choose your Weight Type</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>

						<div className="flex items-stretch gap-4">
							{[
								{ id: "chained", label: "chained", image: "/images/custom/chained.png" },
								{ id: "unchained", label: "unchained", image: "/images/custom/unchained.png" },
							].map(({ id, label, image }, index) => (
								<div className="w-full selector flex flex-col items-start" key={id}>
									<input type="radio" name="weightType" id={id} value={id} checked={customisations.weightType === id} onChange={handleChange('weightType')} className="hidden" />

									<label htmlFor={id} className="w-full block overflow-hidden rounded-2xl border border-[--lightGrey]">
										<img
											src={image}
											className="w-full object-cover object-center rounded-2xl"
											alt={label}
										/>
										<div className="image-after"></div>
									</label>

									<span className="text-base font-bold mt-2 text-left font-rounded">{label}</span>
								</div>
							))}
						</div>
					</div>

				</div>
			</div>
			<div className="w-full max-w-[629px] xl:w-[629px] xl:max-w-[629px] h-full flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black border border-[--Black] rounded-48 xl:sticky xl:top-8">
				<div className="w-full xl:w-auto h-full rounded-32 overflow-hidden mb-4 xl:mb-0">
					<img src="/images/product/product-datail.png" className="w-full object-cover" alt="product-datail" />
				</div>
				<div className="w-full shrink-0 flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Product Name</h5>
						<p className="text-sm lg:text-base xl:text-lg">Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="w-full flex flex-col gap-4">
						<h5 className="text-lg xl:text-2xl">Customisations</h5>
						{Object.entries(customisations).map(([key, value]) => (
							<div className="flex items-center justify-between" key={key}>
								<p className="capitalize text-sm lg:text-base xl:text-lg">{key.replace(/([A-Z])/g, ' $1')}:</p>
								<p className="text-sm lg:text-base xl:text-lg">{value}</p>
							</div>
						))}
						<div className="flex items-center justify-between">
							<h5 className="text-lg">TOTAL PRICE</h5>
							<h5 className="text-lg">-</h5>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<CustomCheckbox />
					</div>
					<div className="flex items-center gap-2">
						<button className="w-1/2 cus-btn small primary shrink-0">
							Add to Cart
						</button>
						<button className="w-1/2 cus-btn small shrink-0 stroke-black">
							Buy Now
						</button>
					</div>
				</div>

			</div>
		</section>
	);
}

export default verBlind;

