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

function doubleBlind(props: ProductDetailsProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	// Only keep the attributes that are actually customisable on the left
	const [customisations, setCustomisations] = useState({
		setup: 'blockout',
		fabricColor: 'fabric-1',
		blackoutColor: '07',
		sheerFabricColor: 'fabric-1',
		sheerColor: '07',
		control: 'left',
		fit: 'fit-1',
		rollDirection: 'frontnBack',
		chainColor: '07',
		bracketColor: '07',
		baseRailShape: 'oval',
		baseRailColor: '07',
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
		$('.detail-sidebar').on('mouseenter', function() {
			ScrollTrigger.normalizeScroll(false);
		});
		$('.detail-sidebar').on('mouseleave', function() {
			ScrollTrigger.normalizeScroll(true);
		});
	}, [lenis]);

	return (
		<section className="product-detail w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[80px] py-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
			<div className="detail-sidebar xl:w-[1223px] w-full xl:h-full h-auto flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black xl:overflow-hidden overflow-auto scroll-hidden rounded-48 xl:shrink-0">
				<h4 className="text-xl">DOUBLE ROLLER BLIND CUSTOMISATION</h4>
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
					<input type="text" className="formInput" id="width" placeholder="Width" />
					<input type="text" className="formInput" id="height" placeholder="Height" />
				</div>
				<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>
				<h5 className="text-lg">Choose Your Setup</h5>
				<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
				<div className="flex items-stretch gap-2">
					{[
						{ id: "blockout", img: "/images/custom/blindBlockout.png", label: "Blockout in Front" },
						{ id: "sheer", img: "/images/custom/sunscreen.png", label: "Sheer in Front" }
					].map((option, idx) => (
						<div className="w-full selector flex flex-col items-start" key={`setup-${option.id}`}>
							<input
								type="radio"
								name="setup"
								id={`setup-${option.id}`}
								value={option.id}
								checked={customisations.setup === option.id}
								onChange={handleChange('setup')}
								className="hidden"
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
							{[1,2,3,4,5,6,7,8,9,10].map(num => (
								<div className="w-fit shrink-0 selector" key={`fabricColor-${num}`}> 
									<input type="radio" name="fabricColor" id={`fabricColor-${num}`} value={`fabric-${num}`} checked={customisations.fabricColor === `fabric-${num}`} onChange={handleChange('fabricColor')} />
									<label htmlFor={`fabricColor-${num}`} className="p-2.5 rounded-xl">
										<img src={`/images/colors/fabric-${num}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`fabricColor-${num}`} />
									</label>
								</div>
							))}
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
						{Array.from({ length: 11 }, (_, i) => i + 1).slice(-5).map((num) => {
							const paddedNum = num < 10 ? `0${num}` : `${num}`;
							return (
								<div className="w-fit shrink-0 selector" key={`blackoutColor-${paddedNum}`}> 
									<input type="radio" name="blackoutColor" id={`blackoutColor-${paddedNum}`} value={paddedNum} checked={customisations.blackoutColor === paddedNum} onChange={handleChange('blackoutColor')} />
									<label htmlFor={`blackoutColor-${paddedNum}`} className="p-2.5 rounded-xl">
										<img src={`/images/colors/${paddedNum}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`blackoutColor-${paddedNum}`} />
									</label>
								</div>
							);
						})}
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
						<h5 className="text-lg">Choose your Sunscreen or Light Filtering Fabric</h5>
						<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
						<div className="flex flex-wrap items-stretch  gap-2">
							{[1,2,3,4,5,6,7,8,9,10].map(num => (
								<div className="w-fit shrink-0 selector" key={`sheerFabricColor-${num}`}> 
									<input type="radio" name="sheerFabricColor" id={`sheerFabricColor-${num}`} value={`fabric-${num}`} checked={customisations.sheerFabricColor === `fabric-${num}`} onChange={handleChange('sheerFabricColor')} />
									<label htmlFor={`sheerFabricColor-${num}`} className="p-2.5 rounded-xl">
										<img src={`/images/colors/fabric-${num}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`sheerFabricColor-${num}`} />
									</label>
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center gap-2 shrink-0 text-mediumGrey py-4">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>


					<h5 className="text-lg">Choose your Sunscreen or Light Filtering Colour</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-wrap items-stretch gap-2">
						{Array.from({ length: 11 }, (_, i) => i + 1).slice(-5).map((num) => {
							const paddedNum = num < 10 ? `0${num}` : `${num}`;
							return (
								<div className="w-fit shrink-0 selector" key={`sheerColor-${paddedNum}`}> 
									<input type="radio" name="sheerColor" id={`sheerColor-${paddedNum}`} value={paddedNum} checked={customisations.sheerColor === paddedNum} onChange={handleChange('sheerColor')} />
									<label htmlFor={`sheerColor-${paddedNum}`} className="p-2.5 rounded-xl">
										<img src={`/images/colors/${paddedNum}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`sheerColor-${paddedNum}`} />
									</label>
								</div>
							);
						})}
					</div>
				</div>
				<h5 className="text-lg mt-4">Controls</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex items-stretch gap-2">
                    {["left", "right"].map((side, idx) => (
                        <div className="w-full selector flex flex-col items-start" key={`control-${side}`}>
                            <input
                                type="radio"
                                name="control"
                                id={`control-${side}`}
                                value={side}
                                checked={customisations.control === side}
                                onChange={handleChange('control')}
                                className="hidden"
                            />
                            <label
                                htmlFor={`control-${side}`}
                                className="block rounded-2xl bg-transparent hover:bg-transparent transition-all w-full"
                            >
                                <img
                                    src={`/images/custom/${side}.png`}
                                    className="w-full object-cover object-center rounded-2xl border border-[--lightGrey]"
                                    alt={`${side} control`}
                                />
                                <div className="image-after"></div>
                            </label>
                            <span className="text-base font-bold mt-2 self-start text-left capitalize font-rounded">{side}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg mt-4">Select Fit</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex items-stretch gap-2">
                    {[1, 2].map(num => (
                        <div className="w-full selector flex flex-col items-start" key={`fit-${num}`}>
                            <input
                                type="radio"
                                name="fit"
                                id={`fit-${num}`}
                                value={`fit-${num}`}
                                checked={customisations.fit === `fit-${num}`}
                                onChange={handleChange('fit')}
                                className="hidden"
                            />
                            <label
                                htmlFor={`fit-${num}`}
                                className="block rounded-2xl bg-transparent hover:bg-transparent transition-all w-full"
                            >
                                <img
                                    src={`/images/product/fit-${num}.png`}
                                    className="w-full object-cover object-center rounded-2xl border border-[--lightGrey]"
                                    alt={`fit-${num}`}
                                />
                                <div className="image-after"></div>
                            </label>
                            <span className="text-base font-bold mt-2 self-start text-left capitalize font-rounded">{`fit-${num}`}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>

                <h5 className="text-lg mt-4">Choose Roll Direction</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex items-stretch gap-2">
                    {[
                        { key: "frontnBack", label: "Front & Back Roll" },
                        { key: "bothFront", label: "Both Front Roll" },
                        { key: "backnFront", label: "Back & Front Roll" },
                        { key: "bothBack", label: "Both Back Roll" }
                    ].map((option, idx) => (
                        <div className="w-full selector flex flex-col items-start" key={`roll-${option.key}`}>
                            <input
                                type="radio"
                                name="rollDirection"
                                id={`roll-${option.key}`}
                                value={option.key}
                                checked={customisations.rollDirection === option.key}
                                onChange={handleChange('rollDirection')}
                                className="hidden"
                            />
                            <label
                                htmlFor={`roll-${option.key}`}
                                className="block rounded-2xl bg-transparent hover:bg-transparent transition-all w-full"
                            >
                                <img
                                    src={`/images/custom/${option.key}.png`}
                                    className="w-full object-cover object-center rounded-2xl border border-[--lightGrey]"
                                    alt={`${option.label} roll direction`}
                                />
                                <div className="image-after"></div>
                            </label>
                            <span className="text-base font-bold mt-2 self-start text-left capitalize font-rounded">{option.label}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg">Choose Chain Color</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex flex-wrap items-stretch gap-2">
                    {Array.from({ length: 11 }, (_, i) => i + 1).slice(-5).map((num) => {
                        const paddedNum = num < 10 ? `0${num}` : `${num}`;
                        return (
                            <div className="w-fit shrink-0 selector" key={`chainColor-${paddedNum}`}>
                                <input
                                    type="radio"
                                    name="chainColor"
                                    id={`chainColor-${paddedNum}`}
                                    value={paddedNum}
                                    checked={customisations.chainColor === paddedNum}
                                    onChange={handleChange('chainColor')}
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

                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg">Choose Bracket Color</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex flex-wrap items-stretch gap-2">
                    {Array.from({ length: 11 }, (_, i) => i + 1).slice(-5).map((num) => {
                        const paddedNum = num < 10 ? `0${num}` : `${num}`;
                        return (
                            <div className="w-fit shrink-0 selector" key={`bracketColor-${paddedNum}`}>
                                <input
                                    type="radio"
                                    name="bracketColor"
                                    id={`bracketColor-${paddedNum}`}
                                    value={paddedNum}
                                    checked={customisations.bracketColor === paddedNum}
                                    onChange={handleChange('bracketColor')}
                                />
                                <label htmlFor={`bracketColor-${paddedNum}`} className="p-2.5 rounded-xl">
                                    <img
                                        src={`/images/colors/${paddedNum}.png`}
                                        className="w-full border border-[--lightGrey] object-cover object-center rounded-lg"
                                        alt={`bracketColor-${paddedNum}`}
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
                <h5 className="text-lg mt-4">Choose Base Rail Shape</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex items-stretch gap-2">
                    {[
                        { num: 1, label: "Oval", img: "/images/custom/oval.png" },
                        { num: 2, label: "Square", img: "/images/custom/square.png" }
                    ].map(({ num, label, img }) => (
                        <div className="w-full selector flex flex-col items-start" key={`base-rail-shape-${num}`}>
                            <input
                                type="radio"
                                name="baseRailShape"
                                id={`base-rail-shape-${num}`}
                                value={label.toLowerCase()}
                                checked={customisations.baseRailShape === label.toLowerCase()}
                                onChange={handleChange('baseRailShape')}
                                className="hidden"
                            />
                            <label
                                htmlFor={`base-rail-shape-${num}`}
                                className="block rounded-2xl bg-transparent hover:bg-transparent transition-all w-full"
                            >
                                <img
                                    src={img}
                                    className="w-full object-cover object-center rounded-2xl border border-[--lightGrey]"
                                    alt={label}
                                />
                                <div className="image-after"></div>
                            </label>
                            <span className="text-base font-bold mt-2 self-start text-left capitalize font-rounded">{label}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h5 className="text-lg">Choose Base Rail Colour</h5>
                <p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
                <div className="flex flex-wrap items-stretch gap-2">
                    {Array.from({ length: 11 }, (_, i) => i + 1).slice(-5).map((num) => {
                        const paddedNum = num < 10 ? `0${num}` : `${num}`;
                        return (
                            <div className="w-fit shrink-0 selector" key={`baseRailColor-${paddedNum}`}>
                                <input
                                    type="radio"
                                    name="baseRailColor"
                                    id={`baseRailColor-${paddedNum}`}
                                    value={paddedNum}
                                    checked={customisations.baseRailColor === paddedNum}
                                    onChange={handleChange('baseRailColor')}
                                />
                                <label htmlFor={`baseRailColor-${paddedNum}`} className="p-2.5 rounded-xl">
                                    <img
                                        src={`/images/colors/${paddedNum}.png`}
                                        className="w-full border border-[--lightGrey] object-cover object-center rounded-lg"
                                        alt={`baseRailColor-${paddedNum}`}
                                    />
                                </label>
                            </div>
                        );
                    })}
                </div>
			</div>
			<ProductCard
				customisations={{
					fabricColor: customisations.fabricColor,
					blackoutColor: customisations.blackoutColor,
					sheerFabricColor: customisations.sheerFabricColor,
					sheerColor: customisations.sheerColor,
					setup: customisations.setup,
					controls: customisations.control,
					fitType: customisations.fit,
					rollDirection: customisations.rollDirection,
					chainColor: customisations.chainColor,
					bracketColor: customisations.bracketColor,
					baseRailShape: customisations.baseRailShape,
					baseRailColour: customisations.baseRailColor
				}}
				fields={[
					"fabricColor",
					"blackoutColor",
					"sheerFabricColor",
					"sheerColor",
					"setup",
					"controls",
					"fitType",
					"rollDirection",
					"chainColor",
					"bracketColor",
					"baseRailShape",
					"baseRailColour"
				]}
				customLabels={{
					fabricColor: "Blockout Fabric",
					blackoutColor: "Blockout Colour",
					sheerFabricColor: "Sheer Fabric",
					sheerColor: "Sheer Colour",
					controls: "Controls",
					fitType: "Fit Type",
					rollDirection: "Roll Direction",
					chainColor: "Chain Colour",
					bracketColor: "Bracket Colour",
					baseRailShape: "Base Rail Shape",
					baseRailColour: "Base Rail Colour"
				}}
				imageSrc="/images/product/product-datail.png"
				productName="Double Blind Product"
				productDescription="Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. "
				price="-"
			/>
		</section>
	);
}

export default doubleBlind;

