import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import $ from 'jquery';

import './css/style.css';
import ProductCard from './ProductCard';

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

function doubleCurtains(props: ProductDetailsProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	// Only keep the attributes that are actually customisable on the left
	const [customisations, setCustomisations] = useState({
		setup: 'blockout',
		fabricColor: 'fabric-1',
		blackoutColor: '07',
		sheerFabricColor: 'fabric-1',
		sheerColor: '07',
		blockoutStyle: 'sFold',
		sheerStyle: 'sFold',
		blockoutControls: 'control-left',
		sheerControls: 'control-left',
		hem: 'lead-weight',
		sheerHem: 'sheer-lead-weight',
		fit: 'fit-1',
		curtainType: 'designer',
		stack: 'leftStack',
		wandLength: '910',
		trackColour: 'track-white',
	});

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
			<div className="detail-sidebar xl:w-[1223px] w-full flex flex-col gap-4 p-4 text-black overflow-auto scroll-hidden rounded-48">
				<h4 className="text-xl">DOUBLE CURTAIN CUSTOMISATION</h4>
				<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
				<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>
				<h5 className="text-lg mt-4">Enter Measurements</h5>
				<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
				<div className="w-full flex items-center gap-4">
					<input type="text" className="formInput" id="roomName" placeholder="Room Name" />
					<input type="text" className="formInput" id="width" placeholder="Width (meters)" />
					<input type="text" className="formInput" id="height" placeholder="Height (meters)" />
				</div>
				<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>
				<h5 className="text-lg mt-4">Choose Your Setup</h5>
				<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
				<div className="flex items-stretch gap-2">
					{[
						{ id: "blockout", img: "/images/custom/blockout.png", label: "Blockout in Front" },
						{ id: "sheer", img: "/images/custom/sheer.png", label: "Sheer in Front" }
					].map((option, idx) => (
						<div className="w-full selector flex flex-col items-start" key={`setup-${option.id}`}>
							<input
								type="radio"
								name="setup"
								id={`setup-${option.id}`}
								value={option.id}
								checked={customisations.setup === option.id}
								onChange={(e) => setCustomisations({ ...customisations, setup: e.target.value })}
								className="hidden" // Hide native radio
							/>
							<label
								htmlFor={`setup-${option.id}`}
								className="block rounded-24 bg-transparent hover:bg-transparent transition-all w-full"
							>
								<img
									src={option.img}
									className="w-full object-cover object-center rounded-24"
									alt={option.id}
								/>
								<div className="image-after"></div>
							</label>
							<span className="text-base font-bold mt-2 capitalize font-plus text-left">{option.label}</span>
						</div>
					))}
				</div>

				<div className="border border-black rounded-3xl p-4">
					<h4 className="text-xl">BLOCKOUT OPTIONS</h4>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>

					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Choose Your Blackout Fabric</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex flex-wrap items-stretch  gap-2">
							{/* Fabric Color radios */}
							<>
								{[1,2,3,4,5,6,7,8,9,10].map(num => (
									<div className="w-fit shrink-0 selector" key={`fabricColor-${num}`}>
										<input
											type="radio"
											name="fabricColor"
											id={`fabricColor-${num}`}
											value={`fabric-${num}`}
											checked={customisations.fabricColor === `fabric-${num}`}
											onChange={(e) => setCustomisations({ ...customisations, fabricColor: e.target.value })}
										/>
										<label htmlFor={`fabricColor-${num}`} className="p-2.5 rounded-xl">
											<img src={`/images/colors/fabric-${num}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`fabricColor-${num}`} />
								</label>
							</div>
								))}
							</>
						</div>
					</div>

					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>


					<h5 className="text-lg">Choose Your Blackout Colour</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-wrap items-stretch gap-2">
						{Array.from({ length: 11 }, (_, i) => i + 1)
							.slice(-5)
							.map((num) => {
								const paddedNum = num < 10 ? `0${num}` : `${num}`;
								return (
									<div className="w-fit shrink-0 selector" key={`chainColor-${paddedNum}`}>
										<input
											type="radio"
											name="chainColor"
											id={`chainColor-${paddedNum}`}
											value={paddedNum}
											checked={customisations.blackoutColor === paddedNum}
											onChange={(e) => setCustomisations({ ...customisations, blackoutColor: e.target.value })}
										/>
										<label htmlFor={`chainColor-${paddedNum}`} className="p-2.5 rounded-xl">
											<img
												src={`/images/colors/${paddedNum}.png`}
												className="w-full border border-[--lightGrey] object-cover object-center rounded-lg"
												alt={`chainColor-${paddedNum}`}
											/>
										</label>
									</div>
								);
							})}
					</div>

					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Choose Your Curtain Style</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex flex-col gap-1">
							<div className="flex items-stretch gap-2">
								<div className="w-full selector">
									<input type="radio" name="blockoutStyle" id="blockout-sFold" value="sFold" checked={customisations.blockoutStyle === "sFold"} onChange={e => setCustomisations({ ...customisations, blockoutStyle: e.target.value })} />
									<label htmlFor="blockout-sFold" className="rounded-24">
										<img src="/images/custom/sFold.png" className="w-full object-cover object-center" alt="sFold" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="blockoutStyle" id="blockout-pinch" value="pinch" checked={customisations.blockoutStyle === "pinch"} onChange={e => setCustomisations({ ...customisations, blockoutStyle: e.target.value })} />
									<label htmlFor="blockout-pinch" className="rounded-24">
										<img src="/images/custom/pinch.png" className="w-full object-cover object-center" alt="pinch" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="blockoutStyle" id="blockout-pencil" value="pencil" checked={customisations.blockoutStyle === "pencil"} onChange={e => setCustomisations({ ...customisations, blockoutStyle: e.target.value })} />
									<label htmlFor="blockout-pencil" className="rounded-24">
										<img src="/images/custom/pencil.png" className="w-full object-cover object-center" alt="pencil" />
										<div className="image-after"></div>
									</label>
								</div>
							</div>
							<div className="flex gap-2 mt-1">
								<span className="w-full text-base font-bold text-left font-plus">S Fold</span>
								<span className="w-full text-base font-bold text-left font-plus">Triple Pinch Pleat</span>
								<span className="w-full text-base font-bold text-left font-plus">Pencil Pleat</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Choose Your Curtain Hem</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex flex-col gap-1">
							<div className="flex items-stretch gap-2">
								{[
									{
										key: "lead-weight",
										label: "Lead Weight",
										img: "/images/custom/leadWeight.png"
									},
									{
										key: "70mm-hem",
										label: "70mm Hem",
										img: "/images/custom/70mm.png"
									}
								].map((option, idx) => (
									<div className="w-full selector" key={option.key}>
										<input
											type="radio"
											name="curtainHem"
											id={option.key}
											value={option.key}
											checked={customisations.hem === option.key}
											onChange={(e) => setCustomisations({ ...customisations, hem: e.target.value })}
											className="hidden"
										/>
										<label htmlFor={option.key} className="block rounded-24 bg-transparent hover:bg-transparent transition-all">
											<img
												src={option.img}
												className="w-full object-cover object-center rounded-24"
												alt={option.label}
											/>
											<div className="image-after"></div>
										</label>
									</div>
								))}
							</div>
							<div className="flex gap-2 mt-1">
								<span className="w-full text-base font-bold text-left font-plus">Lead Weight</span>
								<span className="w-full text-base font-bold text-left font-plus">70mm Hem</span>
							</div>
						</div>
					</div>

				</div>
				<div className="border border-black rounded-3xl p-4">
					<h4 className="text-xl">SHEER OPTIONS</h4>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>

					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Choose Your Sheer Fabric</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex flex-wrap items-stretch  gap-2">
							{/* Sheer Fabric Color radios */}
							<>
								{[1,2,3,4,5,6,7,8,9,10].map(num => (
									<div className="w-fit shrink-0 selector" key={`sheerFabricColor-${num}`}>
										<input
											type="radio"
											name="sheerFabricColor"
											id={`sheerFabricColor-${num}`}
											value={`fabric-${num}`}
											checked={customisations.sheerFabricColor === `fabric-${num}`}
											onChange={(e) => setCustomisations({ ...customisations, sheerFabricColor: e.target.value })}
										/>
										<label htmlFor={`sheerFabricColor-${num}`} className="p-2.5 rounded-xl">
											<img src={`/images/colors/fabric-${num}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`sheerFabricColor-${num}`} />
								</label>
							</div>
								))}
							</>
						</div>
					</div>

					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>


					<h5 className="text-lg">Choose Your Sheer Colour</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-wrap items-stretch gap-2">
						{Array.from({ length: 11 }, (_, i) => i + 1)
							.slice(-5)
							.map((num) => {
								const paddedNum = num < 10 ? `0${num}` : `${num}`;
								return (
									<div className="w-fit shrink-0 selector" key={`sheerChainColor-${paddedNum}`}>
										<input
											type="radio"
											name="sheerChainColor"
											id={`sheerChainColor-${paddedNum}`}
											value={paddedNum}
											checked={customisations.sheerColor === paddedNum}
											onChange={(e) => setCustomisations({ ...customisations, sheerColor: e.target.value })}
										/>
										<label htmlFor={`sheerChainColor-${paddedNum}`} className="p-2.5 rounded-xl">
											<img
												src={`/images/colors/${paddedNum}.png`}
												className="w-full border border-[--lightGrey] object-cover object-center rounded-lg"
												alt={`sheerChainColor-${paddedNum}`}
											/>
										</label>
									</div>
								);
							})}
					</div>

					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Choose Your Sheer Style</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex flex-col gap-1">
							<div className="flex items-stretch gap-2">
								<div className="w-full selector">
									<input type="radio" name="sheerStyle" id="sheer-sFold" value="sFold" checked={customisations.sheerStyle === "sFold"} onChange={e => setCustomisations({ ...customisations, sheerStyle: e.target.value })} />
									<label htmlFor="sheer-sFold" className="rounded-24">
										<img src="/images/custom/sFold.png" className="w-full object-cover object-center" alt="sFold" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="sheerStyle" id="sheer-pinch" value="pinch" checked={customisations.sheerStyle === "pinch"} onChange={e => setCustomisations({ ...customisations, sheerStyle: e.target.value })} />
									<label htmlFor="sheer-pinch" className="rounded-24">
										<img src="/images/custom/pinch.png" className="w-full object-cover object-center" alt="pinch" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="sheerStyle" id="sheer-pencil" value="pencil" checked={customisations.sheerStyle === "pencil"} onChange={e => setCustomisations({ ...customisations, sheerStyle: e.target.value })} />
									<label htmlFor="sheer-pencil" className="rounded-24">
										<img src="/images/custom/pencil.png" className="w-full object-cover object-center" alt="pencil" />
										<div className="image-after"></div>
									</label>
								</div>
							</div>
							<div className="flex gap-2 mt-1">
								<span className="w-full text-base font-bold text-left font-plus">S Fold</span>
								<span className="w-full text-base font-bold text-left font-plus">Triple Pinch Pleat</span>
								<span className="w-full text-base font-bold text-left font-plus">Pencil Pleat</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg">Choose Your Sheer Hem</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex flex-col gap-1">
							<div className="flex items-stretch gap-2">
								{[
									{
										key: "sheer-lead-weight",
										label: "Lead Weight",
										img: "/images/custom/leadWeight.png"
									},
									{
										key: "sheer-70mm-hem",
										label: "70mm Hem",
										img: "/images/custom/70mm.png"
									}
								].map((option, idx) => (
									<div className="w-full selector" key={option.key}>
										<input
											type="radio"
											name="sheerHem"
											id={option.key}
											value={option.key}
											checked={customisations.sheerHem === option.key}
											onChange={(e) => setCustomisations({ ...customisations, sheerHem: e.target.value })}
											className="hidden"
										/>
										<label htmlFor={option.key} className="block rounded-24 bg-transparent hover:bg-transparent transition-all">
											<img
												src={option.img}
												className="w-full object-cover object-center rounded-24"
												alt={option.label}
											/>
											<div className="image-after"></div>
										</label>
									</div>
								))}
							</div>
							<div className="flex gap-2 mt-1">
								<span className="w-full text-base font-bold text-left font-plus">Lead Weight</span>
								<span className="w-full text-base font-bold text-left font-plus">70mm Hem</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Fitting Type</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-col gap-1">
						<div className="flex items-stretch gap-2">
							<div className="w-full selector">
								<input type="radio" name="blockoutControls" id="blockout-control-left" value="control-left" checked={customisations.blockoutControls === "control-left"} onChange={e => setCustomisations({ ...customisations, blockoutControls: e.target.value })} />
								<label htmlFor="blockout-control-left" className="rounded-24">
									<img src="/images/custom/leftStyle.png" className="w-full object-scale-down" alt="control-left" />
								</label>
							</div>
							<div className="w-full selector">
								<input type="radio" name="blockoutControls" id="blockout-control-right" value="control-right" checked={customisations.blockoutControls === "control-right"} onChange={e => setCustomisations({ ...customisations, blockoutControls: e.target.value })} />
								<label htmlFor="blockout-control-right" className="rounded-24">
									<img src="/images/custom/rightStyle.png" className="w-full" alt="control-right" />
								</label>
							</div>
						</div>
						<div className="flex gap-2 mt-1">
							<span className="w-full text-base font-bold text-left font-plus">Left</span>
							<span className="w-full text-base font-bold text-left font-plus">Right</span>
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
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-col gap-1">
						<div className="flex items-stretch gap-2">
							{[1, 2].map(num => (
								<div className="w-full selector" key={`fit-${num}`}>
									<input
										type="radio"
										name="fit"
										id={`fit-${num}`}
										value={`fit-${num}`}
										checked={customisations.fit === `fit-${num}`}
										onChange={(e) => setCustomisations({ ...customisations, fit: e.target.value })}
										className="hidden"
									/>
									<label htmlFor={`fit-${num}`} className="block rounded-24 bg-transparent hover:bg-transparent transition-all">
										<img
											src={num === 1 ? "/images/custom/fit.png" : "/images/custom/recess.png"}
											className="w-full object-cover object-center rounded-24"
											alt={`fit-${num}`}
										/>
										<div className="image-after"></div>
									</label>
								</div>
							))}
						</div>
						<div className="flex gap-2 mt-1">
							<span className="w-full text-base font-bold text-left font-plus">Fit</span>
							<span className="w-full text-base font-bold text-left font-plus">Recess</span>
						</div>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Curtain Track Type</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-col gap-1">
						<div className="flex items-stretch gap-2">
							{[
								{ key: "designer", label: "Designer", img: "/images/custom/designer.png" },
								{ key: "residential", label: "Residential", img: "/images/custom/residential.png" }
							].map((option, idx) => (
								<div className="w-full selector" key={option.key}>
									<input
										type="radio"
										name="curtainType"
										id={option.key}
										value={option.key}
										checked={customisations.curtainType === option.key}
										onChange={(e) => setCustomisations({ ...customisations, curtainType: e.target.value })}
										className="hidden"
									/>
									<label htmlFor={option.key} className="block rounded-24 bg-transparent hover:bg-transparent transition-all">
										<img
											src={option.img}
											className="w-full object-cover object-center rounded-24"
											alt={option.label}
										/>
										<div className="image-after"></div>
									</label>
								</div>
							))}
						</div>
						<div className="flex gap-2 mt-1">
							<span className="w-full text-base font-bold text-left font-plus">Designer</span>
							<span className="w-full text-base font-bold text-left font-plus">Residential</span>
						</div>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Curtain Stack</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex items-stretch gap-2">
						<div className="w-full selector flex flex-col items-start">
							<input type="radio" name="stack" id="leftStack" value="leftStack" checked={customisations.stack === "leftStack"} onChange={e => setCustomisations({ ...customisations, stack: e.target.value })} />
							<label htmlFor="leftStack" className="rounded-24 w-full block">
								<img src="/images/custom/leftStack.png" className="w-full object-cover object-center" alt="leftStack" />
								<div className="image-after"></div>
							</label>
							<span className="text-base font-bold mt-1 ml-1 font-plus">Left Stack</span>
						</div>
						<div className="w-full selector flex flex-col items-start">
							<input type="radio" name="stack" id="rightStack" value="rightStack" checked={customisations.stack === "rightStack"} onChange={e => setCustomisations({ ...customisations, stack: e.target.value })} />
							<label htmlFor="rightStack" className="rounded-24 w-full block">
								<img src="/images/custom/rightStack.png" className="w-full object-cover object-center" alt="rightStack" />
								<div className="image-after"></div>
							</label>
							<span className="text-base font-bold mt-1 ml-1 font-plus">Right Stack</span>
						</div>
						<div className="w-full selector flex flex-col items-start">
							<input type="radio" name="stack" id="centerOpening" value="centerOpening" checked={customisations.stack === "centerOpening"} onChange={e => setCustomisations({ ...customisations, stack: e.target.value })} />
							<label htmlFor="centerOpening" className="rounded-24 w-full block">
								<img src="/images/custom/centerOpening.png" className="w-full object-cover object-center" alt="centerOpening" />
								<div className="image-after"></div>
							</label>
							<span className="text-base font-bold mt-1 ml-1 font-plus">Center Opening</span>
						</div>
					</div>
				</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Wand Length</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-col gap-1">
						<div className="flex items-stretch gap-2">
							<div className="w-full selector">
								<input type="radio" name="wandLength" id="length-910" value="910" checked={customisations.wandLength === "910"} onChange={(e) => setCustomisations({ ...customisations, wandLength: e.target.value })} />
								<label htmlFor="length-910" className="rounded-24">
									<img src="/images/custom/short.png" className="w-full object-cover object-center" alt="910mm" />
									<div className="image-after"></div>
								</label>
							</div>
							<div className="w-full selector">
								<input type="radio" name="wandLength" id="length-1220" value="1220" checked={customisations.wandLength === "1220"} onChange={(e) => setCustomisations({ ...customisations, wandLength: e.target.value })} />
								<label htmlFor="length-1220" className="rounded-24">
									<img src="/images/custom/medium.png" className="w-full object-cover object-center" alt="1220mm" />
									<div className="image-after"></div>
								</label>
							</div>
							<div className="w-full selector">
								<input type="radio" name="wandLength" id="length-1520" value="1520" checked={customisations.wandLength === "1520"} onChange={(e) => setCustomisations({ ...customisations, wandLength: e.target.value })} />
								<label htmlFor="length-1520" className="rounded-24">
									<img src="/images/custom/long.png" className="w-full object-cover object-center" alt="1520mm" />
									<div className="image-after"></div>
								</label>
							</div>
						</div>
						<div className="flex gap-2 mt-1">
							<span className="w-full text-base font-bold text-left font-plus">910mm</span>
							<span className="w-full text-base font-bold text-left font-plus">1220mm</span>
							<span className="w-full text-base font-bold text-left font-plus">1520mm</span>
						</div>
					</div>
				</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Track Colour</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-col gap-1">
						<div className="flex items-stretch gap-2">
							{[
								{
									key: "track-white",
									label: "White",
									img: "/images/custom/white.png"
								},
								{
									key: "track-black",
									label: "Black",
									img: "/images/custom/black.png"
								}
							].map((option, idx) => (
								<div className="w-full selector" key={option.key}>
									<input
										type="radio"
										name="trackColour"
										id={option.key}
										value={option.key}
										checked={customisations.trackColour === option.key}
										onChange={(e) => setCustomisations({ ...customisations, trackColour: e.target.value })}
										className="hidden"
									/>
									<label htmlFor={option.key} className="block rounded-24 bg-transparent hover:bg-transparent transition-all">
										<img
											src={option.img}
											className="w-full object-cover object-center rounded-24"
											alt={option.label}
										/>
										<div className="image-after"></div>
									</label>
								</div>
							))}
						</div>
						<div className="flex gap-2 mt-1">
							<span className="w-full text-base font-bold text-left font-plus">White</span>
							<span className="w-full text-base font-bold text-left font-plus">Black</span>
						</div>
					</div>
				</div>
			</div>
			<ProductCard
				customisations={{
					fabricColor: customisations.fabricColor,
					blackoutColor: customisations.blackoutColor,
					sheerFabricColor: customisations.sheerFabricColor,
					sheerColor: customisations.sheerColor,
					blockoutStyle: customisations.blockoutStyle,
					sheerStyle: customisations.sheerStyle,
					blockoutControls: customisations.blockoutControls,
					sheerControls: customisations.sheerControls,
					hem: customisations.hem,
					sheerHem: customisations.sheerHem,
					setup: customisations.setup,
					fitType: customisations.fit,
					curtainType: customisations.curtainType,
					stack: customisations.stack,
					wandLength: customisations.wandLength,
					trackColour: customisations.trackColour
				}}
				fields={[
					"fabricColor",
					"blackoutColor",
					"sheerFabricColor",
					"sheerColor",
					"blockoutStyle",
					"sheerStyle",
					"blockoutControls",
					"sheerControls",
					"hem",
					"sheerHem",
					"setup",
					"fitType",
					"curtainType",
					"stack",
					"wandLength",
					"trackColour"
				]}
				customLabels={{
					fabricColor: "Blockout Fabric",
					blackoutColor: "Blockout Colour",
					sheerFabricColor: "Sheer Fabric",
					sheerColor: "Sheer Colour",
					blockoutStyle: "Blockout Style",
					sheerStyle: "Sheer Style",
					blockoutControls: "Blockout Controls",
					sheerControls: "Sheer Controls",
					hem: "Blockout Hem",
					sheerHem: "Sheer Hem",
					setup: "Setup",
					fitType: "Fit Type",
					curtainType: "Curtain Track Type",
					stack: "Stack",
					wandLength: "Wand Length",
					trackColour: "Track Colour"
				}}
				imageSrc="/images/product/product-datail.png"
				productName="Double Curtains"
				productDescription="Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. "
				price="-"
			/>
			
		</section>
	);
}

export default doubleCurtains;

