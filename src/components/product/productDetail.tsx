import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import $ from 'jquery';

import { api } from '../../services/api';

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
function CustomCheckbox({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
	return (
		<div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => onChange(!checked)}>
			<div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition ${checked ? 'bg-primary border-primary' : 'border-gray-400 bg-white'}`}>
				{checked && <Icon icon="tabler:check" className="text-white text-sm" />}
			</div>
			<label className="text-sm">
				I have double checked my measurements and customisations
			</label>
		</div>
	);
}

function ProductDetails(props: ProductDetailsProps) {
	const lenis = useLenis();
	const [customisations, setCustomisations] = useState<ProductCustomisations | null>(null);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [loading, setLoading] = useState(false);
	
	// Sample product ID - in real implementation, this should come from props or URL params
	const productId = '1';

	const addToCart = async () => {
		if (!isConfirmed) {
			alert('Please confirm that you have double checked your measurements and customisations');
			return;
		}

		if (!customisations) {
			alert('Please wait for product customisations to load');
			return;
		}

		try {
			setLoading(true);
			
			// Get customer email from localStorage
			const customerData = localStorage.getItem('user');
			const customer = customerData ? JSON.parse(customerData) : null;
			
			if (!customer?.email) {
				alert('Please log in to add items to cart');
				window.location.href = '/login';
				return;
			}

			// Get form values for customization
			const roomName = (document.getElementById('roomName') as HTMLInputElement)?.value || '';
			const width = (document.getElementById('width') as HTMLInputElement)?.value || '';
			const height = (document.getElementById('height') as HTMLInputElement)?.value || '';
			
			if (!width || !height) {
				alert('Please enter both width and height measurements');
				return;
			}

			await api.addToCart({
				email: customer.email,
				product_id: productId,
				quantity: 1,
				customizations: {
					...customisations,
					roomName,
					width,
					height,
					measurements: `${width} x ${height}`
				}
			});
			
			alert('Product added to cart successfully!');
			// Refresh cart count in navbar
			window.dispatchEvent(new CustomEvent('cartUpdated'));
		} catch (error) {
			console.error('Error adding to cart:', error);
			alert('Failed to add product to cart. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const buyNow = async () => {
		await addToCart();
		// Redirect to checkout if successful
		if (!loading) {
			window.location.href = '/checkout';
		}
	};

	useEffect(() => {
		// Only run on client side
		if (typeof window === 'undefined') return;
		
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

	// Fetch product customisations (integration-ready, using sample data for now)
	useEffect(() => {
		// Replace '1' with the actual productId when available
		api.getProductCustomisations('1').then((data: ProductCustomisations | undefined) => {
			if (data) setCustomisations(data);
			else setCustomisations(null);
		});
	}, []);

	return (
		<section className="product-detail w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-[80px] py-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="ProductDetail">
			<div className="detail-sidebar xl:w-[1223px] w-full xl:h-full h-auto flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 text-black xl:overflow-hidden overflow-auto scroll-hidden rounded-48 xl:shrink-0">
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
					<div className="flex flex-col gap-2">
						<h5 className="text-lg xl:text-2xl">Customisations</h5>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Color:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.color : '-'}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Size:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.size : '-'}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Fit Type:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.fitType : '-'}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Roll Direction:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.rollDirection : '-'}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Chain Colour:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.chainColour : '-'}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Bracket Colour:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.bracketColour : '-'}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Base Rail Shape:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.baseRailShape : '-'}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm lg:text-base xl:text-lg">Base Rail Colour:</p>
							<p className="text-sm lg:text-base xl:text-lg">{customisations ? customisations.baseRailColour : '-'}</p>
						</div>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between">
						<h5 className="text-lg">TOTAL PRICE</h5>
						<h5 className="text-lg">{customisations ? `$${customisations.price.toFixed(2)}` : '-'}</h5>
					</div>
					<div className="flex items-center gap-2">
						<CustomCheckbox checked={isConfirmed} onChange={setIsConfirmed} />
					</div>
					<div className="flex items-center gap-2">
						<button 
							className="w-1/2 cus-btn small primary shrink-0"
							onClick={addToCart}
							disabled={loading}
						>
							{loading ? 'Adding...' : 'Add to Cart'}
						</button>
						<button 
							className="w-1/2 cus-btn small shrink-0 stroke-black"
							onClick={buyNow}
							disabled={loading}
						>
							{loading ? 'Processing...' : 'Buy Now'}
						</button>
					</div>
				</div>

			</div>
		</section>
	);
}

export default ProductDetails;

