import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';
import { api } from '../../services/api';
import type { Product } from '../../services/api';

import './css/style.css';

interface ShopProps {
	
}

function Shop(props: ShopProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [dimensions, setDimensions] = useState({ width: '', height: '' });
	const [calculating, setCalculating] = useState(false);
	const [calculatedPrice, setCalculatedPrice] = useState<string>('');

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await api.getProducts({ 
				status: 'published',
				limit: 50 
			});
			setProducts(response.products);
		} catch (err) {
			setError('Failed to load products');
			console.error('Error fetching products:', err);
		} finally {
			setLoading(false);
		}
	};

	const getProductPrice = (product: Product) => {
		if (product.variants && product.variants.length > 0) {
			const variant = product.variants[0];
			if (variant.prices && variant.prices.length > 0) {
				return `$${(variant.prices[0].amount / 100).toFixed(2)}`;
			}
		}
		return 'Price not available';
	};

	const getProductCategory = (product: Product) => {
		if (product.categories && product.categories.length > 0) {
			return product.categories[0].handle;
		}
		return 'general';
	};

	const getProductImage = (product: Product) => {
		if (product.thumbnail) {
			return product.thumbnail;
		}
		if (product.images && product.images.length > 0) {
			return product.images[0].url;
		}
		return '/images/product/1.png'; // Fallback image
	};

	const addToCart = async (productId: string) => {
		try {
			await api.addToCart(productId, 1);
			alert('Product added to cart!');
			// Refresh cart count in navbar
			window.dispatchEvent(new CustomEvent('cartUpdated'));
		} catch (error) {
			console.error('Error adding to cart:', error);
			alert('Failed to add product to cart');
		}
	};

	const calculatePrice = async () => {
		if (!dimensions.width || !dimensions.height) {
			alert('Please enter both width and height');
			return;
		}

		setCalculating(true);
		setCalculatedPrice('');

		try {
			// Simple price calculation based on area
			const width = parseFloat(dimensions.width);
			const height = parseFloat(dimensions.height);
			const area = width * height;
			
			// Base price per square cm (you can adjust this)
			const basePricePerSqCm = 0.5;
			const totalPrice = (area * basePricePerSqCm).toFixed(2);
			
			setCalculatedPrice(totalPrice);
		} catch (error) {
			console.error('Error calculating price:', error);
			alert('Error calculating price');
		} finally {
			setCalculating(false);
		}
	};

	return (
		<section className="shop-section w-full min-h-screen flex flex-col lg:flex-row items-start gap-4 lg:gap-6 xl:gap-8 p-2 sm:p-6 xl:p-8" id="shop">
			<div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col gap-4 lg:gap-6 xl:gap-8 text-black shrink-0">
				<div className="w-full flex flex-col gap-4 p-2 sm:p-6 xl:p-8 border border-[--Black] rounded-48">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg xl:text-xl uppercase">GET AN INSTANT PRICE</h5>
						<p className="text-sm xl:text-base w-[90%]">Enter window size for real-time pricing.Fine-tune later.</p>
					</div>
					<input 
						type="number" 
						className="formInput" 
						id="Width" 
						placeholder="Width (cm):"
						value={dimensions.width}
						onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
					/>
					<input 
						type="number" 
						className="formInput" 
						id="Height" 
						placeholder="Height (cm):"
						value={dimensions.height}
						onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
					/>
					<button 
						className="w-full cus-btn sm-text"
						onClick={calculatePrice}
						disabled={!dimensions.width || !dimensions.height}
					>
						{calculating ? 'Calculating...' : 'Calculate'}
					</button>
					{calculatedPrice && (
						<div className="text-center p-3 bg-green-100 rounded-lg">
							<p className="text-lg font-bold text-green-800">
								Estimated Price: ${calculatedPrice}
							</p>
						</div>
					)}
				</div>
				{/* Sidebar info cards (large screens only) */}
				<div className="hidden lg:flex flex-col gap-2">
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
				<div className="w-full p-2 sm:p-4 xl:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[--Black] rounded-48">
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
						<button className={`cus-btn tab-btn ${selectedCategory === 'light-filtering' ? 'active' : ''}`}
							onClick={() => setSelectedCategory('light-filtering')}>
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
					{loading && <div className="col-span-12 text-center py-8">Loading products...</div>}
					{error && <div className="col-span-12 text-center py-8 text-red-500">{error}</div>}
					{!loading && !error && products.map((product) => {
						const productCategory = getProductCategory(product);
						const isVisible = selectedCategory === 'all' || selectedCategory === productCategory;
						
						return (
							<div key={product.id} className={`${productCategory}-block transition col-span-12 sm:col-span-6 lg:col-span-12 xl:col-span-4 ${isVisible ? 'visible': 'hidden'}`}>
								<div className="w-full max-w-[450px] h-[550px] lg:h-[750px] flex flex-col gap-4 lg:gap-5 xl:gap-6 text-black border border-[--Black] p-2 lg:p-5 xl:p-6 rounded-48 mx-auto">
									<div className="relative rounded-32 overflow-hidden h-[250px]">
										<img src={getProductImage(product)} className="w-full h-full object-cover" alt={product.title} />
										<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
											<p className="text-sm lg:text-base xl:text-base">
												{product.categories && product.categories.length > 0 
													? product.categories[0].name 
													: 'General'
												}
											</p>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<h5 className="text-lg lg:text-xl xl:text-xl">{product.title}</h5>
										<h5 className="text-lg lg:text-xl xl:text-xl text-primary">{getProductPrice(product)}</h5>
									</div>
									<p className="text-sm lg:text-base xl:text-base line-clamp-2">{product.description}</p>
									<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
										<Icon icon="uil:plus" className="text-[18px]" />
										<div className="w-full h-[1px] bg-mediumGrey"></div>
										<Icon icon="uil:plus" className="text-[18px]" />
									</div>
									<h6 className="text-md lg:text-lg">Available Colors</h6>
									<div className="flex items-stretch gap-2">
										{/* Default color options - you can extend this based on product options */}
										{['/images/colors/01.png', '/images/colors/02.png', '/images/colors/03.png', '/images/colors/04.png', '/images/colors/05.png', '/images/colors/06.png'].map((color, index) => (
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
									<div className="flex gap-2 mt-auto">
										<a href={`/product-detail?id=${product.id}`} className="flex-1 cus-btn text-center">
											Customise
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				{/* Info cards at bottom (small screens only) */}
				<div className="flex flex-col gap-2 mt-6 lg:hidden">
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
		</section>
	);
}

export default Shop;

