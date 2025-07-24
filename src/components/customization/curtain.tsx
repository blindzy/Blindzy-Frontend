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

function Curtains(props: ProductDetailsProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	// Only keep the attributes that are actually customisable on the left
	const [customisations, setCustomisations] = useState({
		fabricColor: 'fabric-1',
		controls: 'control-left',
		fitType: 'fit-1',
		style: 'sFold',
		hem: 'lead-weight',
		trackColour: 'track-white',
		bracketStyle: 'bracket-standard',
		curtainType: 'designer',
		wandLength: '910',
		stack: 'leftStack',
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
				<h4 className="text-xl">CURTAIN CUSTOMISATION</h4>
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
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Fabric</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex flex-wrap items-stretch gap-2">
						{[1,2,3,4,5,6,7,8,9,10].map(num => (
							<div className="w-fit shrink-0 selector flex flex-col items-center" key={`fabricColor-${num}`}> 
								<input type="radio" name="fabricColor" id={`fabricColor-${num}`} value={`fabric-${num}`} checked={customisations.fabricColor === `fabric-${num}`} onChange={handleChange('fabricColor')} className="hidden" />
								<label htmlFor={`fabricColor-${num}`} className="p-2.5 rounded-xl block cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.fabricColor === `fabric-${num}` ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/colors/fabric-${num}.png`} className="w-full border border-[--lightGrey] object-cover object-center rounded-lg" alt={`fabricColor-${num}`} />
								</label>
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
					<h5 className="text-lg">Choose Your Fitting Type</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex items-stretch gap-2">
						{['control-left','control-right'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="controls" id={id} value={id} checked={customisations.controls === id} onChange={handleChange('controls')} className="hidden" />
								<label htmlFor={id} className="rounded-24 block cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.controls === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id.replace('control-','').toLowerCase()}Style.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{id === 'control-left' ? 'Left' : 'Right'}</span>
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
					<div className="flex items-stretch gap-2">
						{[1,2].map(num => (
							<div className="w-full selector flex flex-col items-center" key={`fitType-${num}`}> 
								<input type="radio" name="fitType" id={`fitType-${num}`} value={`fit-${num}`} checked={customisations.fitType === `fit-${num}`} onChange={handleChange('fitType')} className="hidden" />
								<label htmlFor={`fitType-${num}`} className="block rounded-24 cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.fitType === `fit-${num}` ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={num === 1 ? "/images/custom/fit.png" : "/images/custom/recess.png"} className="w-full object-cover object-center rounded-24" alt={`fitType-${num}`} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{num === 1 ? 'Fit' : 'Recess'}</span>
							</div>
						))}
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
						{['leftStack','rightStack','centerOpening'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="stack" id={id} value={id} checked={customisations.stack === id} onChange={handleChange('stack')} className="hidden" />
								<label htmlFor={id} className="rounded-24 w-full block cursor-pointer border-2 transition-all" style={{ borderColor: customisations.stack === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id}.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="text-base font-bold mt-1 font-rounded">{id === 'leftStack' ? 'Left Stack' : id === 'rightStack' ? 'Right Stack' : 'Center Opening'}</span>
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
					<h5 className="text-lg">Choose Your Curtain Style</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex items-stretch gap-2">
						{['sFold','pinch','pencil'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="style" id={id} value={id} checked={customisations.style === id} onChange={handleChange('style')} className="hidden" />
								<label htmlFor={id} className="rounded-24 block cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.style === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id}.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{id === 'sFold' ? 'S Fold' : id === 'pinch' ? 'Triple Pinch Pleat' : 'Pencil Pleat'}</span>
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
					<h5 className="text-lg">Choose Your Curtain Hem</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex items-stretch gap-2">
						{['lead-weight','70mm-hem'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="hem" id={id} value={id} checked={customisations.hem === id} onChange={handleChange('hem')} className="hidden" />
								<label htmlFor={id} className="block rounded-24 cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.hem === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id === 'lead-weight' ? 'leadWeight' : '70mm'}.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{id === 'lead-weight' ? 'Lead Weight' : '70mm Hem'}</span>
							</div>
						))}
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
					<div className="flex items-stretch gap-2">
						{['designer','residential'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="curtainType" id={id} value={id} checked={customisations.curtainType === id} onChange={handleChange('curtainType')} className="hidden" />
								<label htmlFor={id} className="block rounded-24 cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.curtainType === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id}.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{id === 'designer' ? 'Designer' : 'Residential'}</span>
							</div>
						))}
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Wand Length</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex items-stretch gap-2">
						{['910','1220','1520'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="wandLength" id={`length-${id}`} value={id} checked={customisations.wandLength === id} onChange={handleChange('wandLength')} className="hidden" />
								<label htmlFor={`length-${id}`} className="rounded-24 block cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.wandLength === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id === '910' ? 'short' : id === '1220' ? 'medium' : 'long'}.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{id}mm</span>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Track Colour</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex items-stretch gap-2">
						{['track-white','track-black'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="trackColour" id={id} value={id} checked={customisations.trackColour === id} onChange={handleChange('trackColour')} className="hidden" />
								<label htmlFor={id} className="block rounded-24 cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.trackColour === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id === 'track-white' ? 'white' : 'black'}.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{id === 'track-white' ? 'White' : 'Black'}</span>
							</div>
						))}
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg">Choose Your Bracket Style</h5>
					<p>Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. </p>
					<div className="flex items-stretch gap-2">
						{['bracket-standard','bracket-extension'].map((id, idx) => (
							<div className="w-full selector flex flex-col items-center" key={id}>
								<input type="radio" name="bracketStyle" id={id} value={id} checked={customisations.bracketStyle === id} onChange={handleChange('bracketStyle')} className="hidden" />
								<label htmlFor={id} className="block rounded-24 cursor-pointer border-2 transition-all w-full" style={{ borderColor: customisations.bracketStyle === id ? 'var(--primary)' : 'var(--lightGrey)' }}>
									<img src={`/images/custom/${id === 'bracket-standard' ? 'standard' : 'extension'}.png`} className="w-full object-cover object-center rounded-24" alt={id} />
								</label>
								<span className="block text-center mt-1 text-base font-bold font-rounded">{id === 'bracket-standard' ? 'Standard' : 'Extension'}</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<ProductCard
					customisations={{
						fabricColor: customisations.fabricColor,
						fitType: customisations.fitType,
						stack: customisations.stack,
						style: customisations.style,
						hem: customisations.hem,
						curtainType: customisations.curtainType,
						wandLength: customisations.wandLength,
						trackColour: customisations.trackColour,
						bracketStyle: customisations.bracketStyle
					}}
					fields={['fabricColor', 'fitType', 'stack', 'style', 'hem', 'curtainType', 'wandLength', 'trackColour', 'bracketStyle']}
					imageSrc="/images/product/product-datail.png"
					productName="Curtain Product"
					productDescription="Lorem ipsum dolor sit amet consectetr. Orci morbi id tortor nulla nisl. "
					price="-"
				/>
		</section>
	);
}

export default Curtains;

