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

function doubleCurtains(props: ProductDetailsProps) {
	const lenis = useLenis();
	// Only keep the attributes that are actually customisable on the left
	const [customisations, setCustomisations] = useState({
		setup: 'blockout',
		fabricColor: 'fabric-1',
		blackoutColor: '07',
		sheerFabricColor: 'fabric-1',
		sheerColor: '07',
		style: 'sFold',
		hem: 'lead-weight',
		controls: 'control-left',
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
					<input type="text" className="formInput" id="width" placeholder="Width" />
					<input type="text" className="formInput" id="height" placeholder="Height" />
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
								defaultChecked={idx === 0}
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
							<span className="text-base font-bold mt-2 capitalize font-rounded text-left">{option.label}</span>
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
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-1" value="" defaultChecked />
								<label htmlFor="fabricColor-1" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-1.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-2" value="" defaultChecked />
								<label htmlFor="fabricColor-2" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-2.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">

								<input type="radio" name="fabricColor" id="fabricColor-3" value="" defaultChecked />
								<label htmlFor="fabricColor-3" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-3.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-4" value="" defaultChecked />
								<label htmlFor="fabricColor-4" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-4.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-5" value="" defaultChecked />
								<label htmlFor="fabricColor-5" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-5.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-6" value="" defaultChecked />
								<label htmlFor="fabricColor-6" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-6.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-7" value="" defaultChecked />
								<label htmlFor="fabricColor-7" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-7.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-8" value="" defaultChecked />
								<label htmlFor="fabricColor-8" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-8.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-9" value="" defaultChecked />
								<label htmlFor="fabricColor-9" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-9.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="fabricColor" id="fabricColor-10" value="" defaultChecked />
								<label htmlFor="fabricColor-10" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-10.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="fabricColor" />
								</label>
							</div>

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
											defaultChecked={num === 7}
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
									<input type="radio" name="Style" id="sFold" value="" defaultChecked />
									<label htmlFor="sFold" className="rounded-24">
										<img src="/images/custom/sFold.png" className="w-full object-cover object-center" alt="sFold" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="Style" id="pinch" value="" />
									<label htmlFor="pinch" className="rounded-24">
										<img src="/images/custom/pinch.png" className="w-full object-cover object-center" alt="pinch" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="Style" id="pencil" value="" />
									<label htmlFor="pencil" className="rounded-24">
										<img src="/images/custom/pencil.png" className="w-full object-cover object-center" alt="pencil" />
										<div className="image-after"></div>
									</label>
								</div>
							</div>
							<div className="flex gap-2 mt-1">
								<span className="w-full text-base font-bold text-left font-rounded">S Fold</span>
								<span className="w-full text-base font-bold text-left font-rounded">Triple Pinch Pleat</span>
								<span className="w-full text-base font-bold text-left font-rounded">Pencil Pleat</span>
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
											defaultChecked={idx === 0}
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
								<span className="w-full text-base font-bold text-left font-rounded">Lead Weight</span>
								<span className="w-full text-base font-bold text-left font-rounded">70mm Hem</span>
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
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-1" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-1" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-1.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-2" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-2" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-2.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">

								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-3" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-3" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-3.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-4" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-4" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-4.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-5" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-5" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-5.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-6" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-6" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-6.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-7" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-7" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-7.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-8" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-8" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-8.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-9" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-9" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-9.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>
							<div className="w-fit shrink-0 selector">
								<input type="radio" name="sheerFabricColor" id="sheerFabricColor-10" value="" defaultChecked />
								<label htmlFor="sheerFabricColor-10" className="p-2.5 rounded-xl">
									<img src="/images/colors/fabric-10.png" className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt="sheerFabricColor" />
								</label>
							</div>

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
											defaultChecked={num === 7}
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
									<input type="radio" name="sheerStyle" id="sheerStyle-sFold" value="" defaultChecked />
									<label htmlFor="sheerStyle-sFold" className="rounded-24">
										<img src="/images/custom/sFold.png" className="w-full object-cover object-center" alt="sFold" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="sheerStyle" id="sheerStyle-pinch" value="" />
									<label htmlFor="sheerStyle-pinch" className="rounded-24">
										<img src="/images/custom/pinch.png" className="w-full object-cover object-center" alt="pinch" />
										<div className="image-after"></div>
									</label>
								</div>
								<div className="w-full selector">
									<input type="radio" name="sheerStyle" id="sheerStyle-pencil" value="" />
									<label htmlFor="sheerStyle-pencil" className="rounded-24">
										<img src="/images/custom/pencil.png" className="w-full object-cover object-center" alt="pencil" />
										<div className="image-after"></div>
									</label>
								</div>
							</div>
							<div className="flex gap-2 mt-1">
								<span className="w-full text-base font-bold text-left font-rounded">S Fold</span>
								<span className="w-full text-base font-bold text-left font-rounded">Triple Pinch Pleat</span>
								<span className="w-full text-base font-bold text-left font-rounded">Pencil Pleat</span>
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
											defaultChecked={idx === 0}
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
								<span className="w-full text-base font-bold text-left font-rounded">Lead Weight</span>
								<span className="w-full text-base font-bold text-left font-rounded">70mm Hem</span>
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
								<input type="radio" name="controls" id="control-left" value="" defaultChecked />
								<label htmlFor="control-left" className="rounded-24">
									<img src="/images/custom/leftStyle.png" className="w-full object-scale-down" alt="control-left" />
								</label>
							</div>
							<div className="w-full selector">
								<input type="radio" name="controls" id="control-right" value="" />
								<label htmlFor="control-right" className="rounded-24">
									<img src="/images/custom/rightStyle.png" className="w-full" alt="control-right" />
								</label>
							</div>
						</div>
						<div className="flex gap-2 mt-1">
							<span className="w-full text-base font-bold text-left font-rounded">Left</span>
							<span className="w-full text-base font-bold text-left font-rounded">Right</span>
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
										defaultChecked={num === 1}
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
							<span className="w-full text-base font-bold text-left font-rounded">Fit</span>
							<span className="w-full text-base font-bold text-left font-rounded">Recess</span>
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
										defaultChecked={idx === 0}
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
							<span className="w-full text-base font-bold text-left font-rounded">Designer</span>
							<span className="w-full text-base font-bold text-left font-rounded">Residential</span>
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
							<input type="radio" name="Stack" id="rail-1" value="" defaultChecked />
							<label htmlFor="rail-1" className="rounded-24 w-full block">
								<img src="/images/custom/leftStack.png" className="w-full object-cover object-center" alt="rail-1" />
								<div className="image-after"></div>
							</label>
							<span className="text-base font-bold mt-1 ml-1 font-rounded">Left Stack</span>
						</div>
						<div className="w-full selector flex flex-col items-start">
							<input type="radio" name="Stack" id="rail-2" value="" />
							<label htmlFor="rail-2" className="rounded-24 w-full block">
								<img src="/images/custom/rightStack.png" className="w-full object-cover object-center" alt="rail-2" />
								<div className="image-after"></div>
							</label>
							<span className="text-base font-bold mt-1 ml-1 font-rounded">Right Stack</span>
						</div>
						<div className="w-full selector flex flex-col items-start">
							<input type="radio" name="Stack" id="centerOpening" value="" />
							<label htmlFor="centerOpening" className="rounded-24 w-full block">
								<img src="/images/custom/centerOpening.png" className="w-full object-cover object-center" alt="centerOpening" />
								<div className="image-after"></div>
							</label>
							<span className="text-base font-bold mt-1 ml-1 font-rounded">Center Opening</span>
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
								<input type="radio" name="wandLength" id="length-910" value="910" defaultChecked />
								<label htmlFor="length-910" className="rounded-24">
									<img src="/images/custom/short.png" className="w-full object-cover object-center" alt="910mm" />
									<div className="image-after"></div>
								</label>
							</div>
							<div className="w-full selector">
								<input type="radio" name="wandLength" id="length-1220" value="1220" />
								<label htmlFor="length-1220" className="rounded-24">
									<img src="/images/custom/medium.png" className="w-full object-cover object-center" alt="1220mm" />
									<div className="image-after"></div>
								</label>
							</div>
							<div className="w-full selector">
								<input type="radio" name="wandLength" id="length-1520" value="1520" />
								<label htmlFor="length-1520" className="rounded-24">
									<img src="/images/custom/long.png" className="w-full object-cover object-center" alt="1520mm" />
									<div className="image-after"></div>
								</label>
							</div>
						</div>
						<div className="flex gap-2 mt-1">
							<span className="w-full text-base font-bold text-left font-rounded">910mm</span>
							<span className="w-full text-base font-bold text-left font-rounded">1220mm</span>
							<span className="w-full text-base font-bold text-left font-rounded">1520mm</span>
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
										defaultChecked={idx === 0}
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
							<span className="w-full text-base font-bold text-left font-rounded">White</span>
							<span className="w-full text-base font-bold text-left font-rounded">Black</span>
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
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex flex-col gap-2">
						<h5 className="text-lg xl:text-2xl">Customisations</h5>
						{Object.entries(customisations).map(([key, value]) => (
							<div className="flex items-center justify-between" key={key}>
								<p className="capitalize text-sm lg:text-base xl:text-lg">{key.replace(/([A-Z])/g, ' $1')}:</p>
								<p className="text-sm lg:text-base xl:text-lg">{value}</p>
							</div>
						))}
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between">
						<h5 className="text-lg">TOTAL PRICE</h5>
						<h5 className="text-lg">-</h5>
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

export default doubleCurtains;

