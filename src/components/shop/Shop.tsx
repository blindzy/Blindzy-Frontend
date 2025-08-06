import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';
import { api } from '../../services/api';
import type { Product } from '../../services/api';
import { pricingEngine, PricingEngine } from '../../utils/pricingEngine';

import './css/style.css';

// Sample products array for shop page independence from backend API
// This replaces API calls with local data for consistent development/testing
const sampleProducts: Product[] = [
	{
		id: '1',
		title: 'Premium Plantation Shutters',
		handle: 'premium-plantation-shutters',
		description: 'High-quality timber plantation shutters with adjustable louvers for perfect light control.',
		status: 'published',
		thumbnail: '/images/categories/1.png',
		images: [{ id: 'img1', url: '/images/categories/1.png' }],
		categories: [{ id: 'cat1', name: 'Shutters', handle: 'shutters' }],
		variants: [
			{
				id: 'v1',
				title: 'Standard',
				sku: 'SHUT-001',
				prices: [{ amount: 15000, currency_code: 'usd' }], // $150.00
				options: {},
				inventory_quantity: 10,
			},
		],
		options: [],
		tags: ['light-filtering'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '2',
		title: 'Zebra Roller Blinds',
		handle: 'zebra-roller-blinds',
		description: 'Modern zebra blinds with alternating fabric strips for versatile light filtering.',
		status: 'published',
		thumbnail: '/images/categories/1.png',
		images: [{ id: 'img2', url: '/images/categories/1.png' }],
		categories: [{ id: 'cat2', name: 'Blinds', handle: 'blinds' }],
		variants: [
			{
				id: 'v2',
				title: 'Standard',
				sku: 'BLIND-001',
				prices: [{ amount: 8000, currency_code: 'usd' }], // $80.00
				options: {},
				inventory_quantity: 15,
			},
		],
		options: [],
		tags: ['light-filtering'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '3',
		title: 'Blackout Roller Blinds',
		handle: 'blackout-roller-blinds',
		description: 'Complete light blocking roller blinds perfect for bedrooms and media rooms.',
		status: 'published',
		thumbnail: '/images/categories/2.png',
		images: [{ id: 'img3', url: '/images/categories/2.png' }],
		categories: [{ id: 'cat3', name: 'Blinds', handle: 'blinds' }],
		variants: [
			{
				id: 'v3',
				title: 'Standard',
				sku: 'BLACKOUT-001',
				prices: [{ amount: 9500, currency_code: 'usd' }], // $95.00
				options: {},
				inventory_quantity: 12,
			},
		],
		options: [],
		tags: ['blockout'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '4',
		title: 'Double Layer Curtains',
		handle: 'double-layer-curtains',
		description: 'Elegant double layer curtains combining blockout and sheer fabrics.',
		status: 'published',
		thumbnail: '/images/categories/3.png',
		images: [{ id: 'img4', url: '/images/categories/3.png' }],
		categories: [{ id: 'cat4', name: 'Double Curtains', handle: 'double-curtains' }],
		variants: [
			{
				id: 'v4',
				title: 'Standard',
				sku: 'DCURTAIN-001',
				prices: [{ amount: 12000, currency_code: 'usd' }], // $120.00
				options: {},
				inventory_quantity: 8,
			},
		],
		options: [],
		tags: ['blockout'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '5',
		title: 'Premium Single Curtains',
		handle: 'premium-single-curtains',
		description: 'Luxurious single panel curtains made from premium fabrics.',
		status: 'published',
		thumbnail: '/images/categories/2.png',
		images: [{ id: 'img5', url: '/images/categories/2.png' }],
		categories: [{ id: 'cat5', name: 'Curtains', handle: 'curtains' }],
		variants: [
			{
				id: 'v5',
				title: 'Standard',
				sku: 'CURTAIN-001',
				prices: [{ amount: 14000, currency_code: 'usd' }], // $140.00
				options: {},
				inventory_quantity: 10,
			},
		],
		options: [],
		tags: ['sunscreen'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '6',
		title: 'Vertical Blinds Collection',
		handle: 'vertical-blinds-collection',
		description: 'Practical vertical blinds ideal for large windows and sliding doors.',
		status: 'published',
		thumbnail: '/images/categories/3.png',
		images: [{ id: 'img6', url: '/images/categories/3.png' }],
		categories: [{ id: 'cat6', name: 'Vertical Blinds', handle: 'vertical-blinds' }],
		variants: [
			{
				id: 'v6',
				title: 'Standard',
				sku: 'VBLIND-001',
				prices: [{ amount: 7500, currency_code: 'usd' }], // $75.00
				options: {},
				inventory_quantity: 20,
			},
		],
		options: [],
		tags: ['light-filtering'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '7',
		title: 'Double Roller Blinds',
		handle: 'double-roller-blinds',
		description: 'Innovative double roller system with both blackout and sunscreen options.',
		status: 'published',
		thumbnail: '/images/categories/3.png',
		images: [{ id: 'img7', url: '/images/categories/3.png' }],
		categories: [{ id: 'cat7', name: 'Double Roller Blinds', handle: 'double-roller-blinds' }],
		variants: [
			{
				id: 'v7',
				title: 'Standard',
				sku: 'DRBLIND-001',
				prices: [{ amount: 11500, currency_code: 'usd' }], // $115.00
				options: {},
				inventory_quantity: 14,
			},
		],
		options: [],
		tags: ['blockout'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '8',
		title: 'Roman Blinds',
		handle: 'roman-blinds',
		description: 'Elegant Roman blinds with soft fabric folds for a sophisticated look.',
		status: 'published',
		thumbnail: '/images/categories/1.png',
		images: [{ id: 'img8', url: '/images/categories/1.png' }],
		categories: [{ id: 'cat8', name: 'Roman Blinds', handle: 'roman-blinds' }],
		variants: [
			{
				id: 'v8',
				title: 'Standard',
				sku: 'ROMAN-001',
				prices: [{ amount: 11000, currency_code: 'usd' }], // $110.00
				options: {},
				inventory_quantity: 14,
			},
		],
		options: [],
		tags: ['blockout'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '9',
		title: 'Sunscreen Roller Blinds',
		handle: 'sunscreen-roller-blinds',
		description: 'UV protection sunscreen blinds that filter light while maintaining visibility.',
		status: 'published',
		thumbnail: '/images/categories/2.png',
		images: [{ id: 'img9', url: '/images/categories/2.png' }],
		categories: [{ id: 'cat9', name: 'Sunscreen Blinds', handle: 'sunscreen-blinds' }],
		variants: [
			{
				id: 'v9',
				title: 'Standard',
				sku: 'SUNSCREEN-001',
				prices: [{ amount: 8500, currency_code: 'usd' }], // $85.00
				options: {},
				inventory_quantity: 18,
			},
		],
		options: [],
		tags: ['sunscreen'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '10',
		title: 'Light Filtering Cellular Blinds',
		handle: 'light-filtering-cellular-blinds',
		description: 'Energy-efficient cellular blinds that gently filter natural light.',
		status: 'published',
		thumbnail: '/images/categories/3.png',
		images: [{ id: 'img10', url: '/images/categories/3.png' }],
		categories: [{ id: 'cat10', name: 'Cellular Blinds', handle: 'cellular-blinds' }],
		variants: [
			{
				id: 'v10',
				title: 'Standard',
				sku: 'CELLULAR-001',
				prices: [{ amount: 9000, currency_code: 'usd' }], // $90.00
				options: {},
				inventory_quantity: 16,
			},
		],
		options: [],
		tags: ['light-filtering'],
		created_at: '',
		updated_at: '',
	},
];

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
	const [dynamicPricing, setDynamicPricing] = useState(false); // Track if using calculated pricing

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			
			// Simulate API loading delay for realistic UX
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// Use sample products instead of API call
			setProducts(sampleProducts);
		} catch (err) {
			setError('Failed to load products');
			console.error('Error fetching products:', err);
		} finally {
			setLoading(false);
		}
	};

	const getProductPrice = (product: Product, useCalculated = false) => {
		// Get the original/base price from product data
		let originalPrice = 0;
		if (product.variants && product.variants.length > 0) {
			const variant = product.variants[0];
			if (variant.prices && variant.prices.length > 0) {
				originalPrice = variant.prices[0].amount / 100;
			}
		}
		
		// If we have calculated price and user wants to use it for this product
		if (useCalculated && calculatedPrice && dynamicPricing && dimensions.width && dimensions.height) {
			// Use comprehensive pricing engine for calculation
			const widthInMeters = parseFloat(dimensions.width);
			const heightInMeters = parseFloat(dimensions.height);
			
			// Convert meters to cm for pricing engine
			const width = widthInMeters * 100; // Convert to cm
			const height = heightInMeters * 100; // Convert to cm
			
			// Detect product type for pricing calculations
			const productType = product.categories?.[0]?.name?.toLowerCase().includes('curtain') ? 'curtains' :
							  product.categories?.[0]?.name?.toLowerCase().includes('shutter') ? 'shutters' :
							  'blinds';
			
			// Calculate using comprehensive pricing engine
			const calculation = pricingEngine.calculatePrice(
				width, 
				height, 
				productType,
				{
					baseProductPrice: originalPrice,
					installation: 'standard'
				}
			);
			
			return `$${calculation.finalPrice.toFixed(2)}`;
		}
		
		// Return original price if no calculation
		if (originalPrice > 0) {
			return `$${originalPrice.toFixed(2)}`;
		}
		return 'Price not available';
	};

	// Helper function to get only the original product price
	const getOriginalProductPrice = (product: Product) => {
		if (product.variants && product.variants.length > 0) {
			const variant = product.variants[0];
			if (variant.prices && variant.prices.length > 0) {
				return `$${(variant.prices[0].amount / 100).toFixed(2)}`;
			}
		}
		return 'Price not available';
	};

	const getProductTags = (product: Product) => {
		// Check if product has tags, otherwise use categories as fallback
		if (product.tags && product.tags.length > 0) {
			// Map standardized tags to display names
			const tagMapping: { [key: string]: string } = {
				'light-filtering': 'Light Filtering',
				'blockout': 'Blockout',
				'sunscreen': 'Sunscreen'
			};
			
			const tag = product.tags[0];
			return tagMapping[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
		}
		// Fallback to category if no tags
		if (product.categories && product.categories.length > 0) {
			return product.categories[0].name;
		}
		return 'General';
	};

	const getProductCategory = (product: Product) => {
		if (product.categories && product.categories.length > 0) {
			return product.categories[0].handle;
		}
		return 'general';
	};

	// Check if product matches the selected category/tag filter
	const isProductVisible = (product: Product, selectedCategory: string) => {
		if (selectedCategory === 'all') return true;
		
		// Check if product has the tag that matches selected category
		if (product.tags && product.tags.length > 0) {
			// Map UI category names to tag values
			const categoryTagMapping: { [key: string]: string } = {
				'blockout': 'blockout',
				'light-filtering': 'light-filtering',
				'sunscreen': 'sunscreen'
			};
			
			const targetTag = categoryTagMapping[selectedCategory.toLowerCase()];
			return product.tags.includes(targetTag);
		}
		
		// Fallback to category check
		const productCategory = getProductCategory(product);
		return selectedCategory === productCategory;
	};

	// Get filtered products based on selected category
	const getFilteredProducts = () => {
		return products.filter(product => isProductVisible(product, selectedCategory));
	};

	// Get product count information
	const getProductCountInfo = () => {
		const filteredProducts = getFilteredProducts();
		const totalCount = filteredProducts.length;
		const totalProducts = products.length;
		
		if (selectedCategory === 'all') {
			return `Showing 1-${totalProducts} of ${totalProducts} Results`;
		} else {
			return `Showing 1-${totalCount} of ${totalCount} Results`;
		}
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
			// Get customer email from localStorage for the API call
			const customerData = localStorage.getItem('user');
			const customer = customerData ? JSON.parse(customerData) : null;
			
			if (!customer?.email) {
				alert('Please log in to add items to cart');
				window.location.href = '/login';
				return;
			}

			// Find the product to get its details
			const product = products.find(p => p.id === productId);
			if (!product) {
				alert('Product not found');
				return;
			}
			
			const productCategory = product.categories?.[0]?.name || 'General';

			// Prepare customizations with current dimensions if available
			const basicCustomizations: Array<{ name: string; value: string }> = [];
			
			// Add dimensions if calculated
			if (dynamicPricing && dimensions.width && dimensions.height) {
				basicCustomizations.push({ name: 'Width', value: `${dimensions.width}m` });
				basicCustomizations.push({ name: 'Height', value: `${dimensions.height}m` });
			} else {
				// Default dimensions in meters
				basicCustomizations.push({ name: 'Width', value: '1.2m' });
				basicCustomizations.push({ name: 'Height', value: '1.8m' });
			}

			// Add basic customizations
			basicCustomizations.push({ name: 'Color', value: 'White' });
			basicCustomizations.push({ name: 'Installation', value: 'Self Installation' });

			// Add category-specific customizations
			if (productCategory.includes('Shutter')) {
				basicCustomizations.push({ name: 'Louver Size', value: '89mm' });
				basicCustomizations.push({ name: 'Material', value: 'Timber' });
			} else if (productCategory.includes('Curtain')) {
				basicCustomizations.push({ name: 'Fabric', value: 'Standard' });
				basicCustomizations.push({ name: 'Header Style', value: 'Eyelet' });
			} else if (productCategory.includes('Blind')) {
				basicCustomizations.push({ name: 'Operation', value: 'Chain Control' });
				basicCustomizations.push({ name: 'Mounting', value: 'Inside Mount' });
			}

			// Calculate the price for this specific product
			const calculatedPrice = getProductPrice(product, dynamicPricing);
			const priceValue = parseFloat(calculatedPrice.replace('$', ''));

			await api.addToCart({
				email: customer.email,
				product_id: productId,
				quantity: 1,
				customizations: basicCustomizations,
				calculatedPrice: priceValue
			});
			
			alert(`${product.title} added to cart successfully!`);
			// Refresh cart count in navbar
			window.dispatchEvent(new CustomEvent('cartUpdated'));
		} catch (error) {
			console.error('Error adding to cart:', error);
			alert('Failed to add product to cart');
		}
	};

	const getCustomizationPage = (product: Product) => {
		const productCategory = product?.categories?.[0]?.name?.toLowerCase() || '';
		
		// Map product categories to customization page slugs (matching existing [slug].astro)
		const categoryMapping: { [key: string]: string } = {
			'shutters': 'shutter-customisation',
			'curtains': 'curtain-customisation',
			'double curtains': 'double-curtain-customisation', 
			'blinds': 'blind-customisation',
			'double roller blinds': 'double-roller-blind-customisation',
			'vertical blinds': 'vertical-blind-customisation',
			'roman blinds': 'blind-customisation',
			'sunscreen blinds': 'blind-customisation',
			'cellular blinds': 'blind-customisation'
		};
		
		const customizationSlug = categoryMapping[productCategory] || 'blind-customisation'; // Default to blinds
		
		// Calculate the current price for this specific product
		const currentPrice = getProductPrice(product, dynamicPricing);
		
		// Prepare product parameters
		const productParams = new URLSearchParams({
			product: product.id,
			name: product.title,
			image: getProductImage(product),
			description: product.description || '',
			category: product.categories?.[0]?.name || 'General',
			price: currentPrice,
			calculatedPrice: dynamicPricing ? 'true' : 'false'
		});
		
		// Pass dimensions if they were used for shop calculation
		if (dynamicPricing && dimensions.width && dimensions.height) {
			productParams.set('width', dimensions.width); // Keep in meters
			productParams.set('height', dimensions.height); // Keep in meters
		}
		
		return `/customization/${customizationSlug}?${productParams.toString()}`;
	};

	const calculatePrice = async () => {
		if (!dimensions.width || !dimensions.height) {
			alert('Please enter both width and height');
			return;
		}

		setCalculating(true);
		setCalculatedPrice('');

		try {
			const widthInMeters = parseFloat(dimensions.width);
			const heightInMeters = parseFloat(dimensions.height);
			
			if (widthInMeters <= 0 || heightInMeters <= 0) {
				alert('Please enter valid dimensions greater than 0');
				return;
			}
			
			// Convert meters to cm for pricing engine
			const width = widthInMeters * 100; // Convert to cm
			const height = heightInMeters * 100; // Convert to cm
			
			// Calculate using comprehensive pricing engine for average product
			const calculation = pricingEngine.calculatePrice(
				width, 
				height, 
				'blinds', // Use blinds as default for general calculation
				{
					installation: 'standard'
				}
			);
			
			setCalculatedPrice(calculation.finalPrice.toFixed(2));
			setDynamicPricing(true); // Enable dynamic pricing for all products
		} catch (error) {
			console.error('Error calculating price:', error);
			alert('Error calculating price. Please enter valid numbers.');
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
						<p className="text-sm xl:text-base w-[90%]">Enter window size for real-time pricing. Fine-tune later.</p>
					</div>
					<input 
						type="number" 
						className="formInput" 
						id="Width" 
						placeholder="Width (meters)"
						value={dimensions.width}
						onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
					/>
					<input 
						type="number" 
						className="formInput" 
						id="Height" 
						placeholder="Height (meters)"
						value={dimensions.height}
						onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
					/>
					<button 
						className="w-full cus-btn sm-text"
						onClick={calculatePrice}
						disabled={!dimensions.width || !dimensions.height || calculating}
					>
						{calculating ? 'Calculating...' : 'Calculate Price'}
					</button>
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
					<h6 className="text-md xl:text-lg text-black">{getProductCountInfo()}</h6>
					<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 xl:gap-6">
						<button className={`cus-btn tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
							onClick={() => setSelectedCategory('all')}>
							All Products
						</button>
						<button className={`cus-btn tab-btn ${selectedCategory === 'blockout' ? 'active' : ''}`}
							onClick={() => setSelectedCategory('blockout')}>
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
					{!loading && !error && getFilteredProducts().length === 0 && (
						<div className="col-span-12 text-center py-8">
							<p className="text-lg text-gray-500">No products found for "{selectedCategory}" category.</p>
							<button 
								className="mt-4 cus-btn"
								onClick={() => setSelectedCategory('all')}
							>
								Show All Products
							</button>
						</div>
					)}
					{!loading && !error && getFilteredProducts().map((product) => {
						return (
							<div key={product.id} className={`transition col-span-12 sm:col-span-6 lg:col-span-12 xl:col-span-4`}>
								<div className="w-full max-w-[450px] h-[550px] lg:h-[750px] flex flex-col gap-4 lg:gap-5 xl:gap-6 text-black border border-[--Black] p-2 lg:p-5 xl:p-6 rounded-48 mx-auto">
									<div className="relative rounded-32 overflow-hidden h-[250px]">
										<img src={getProductImage(product)} className="w-full h-full object-cover" alt={product.title} />
										<div className="absolute left-4 top-4 px-3 py-2 bg-white rounded-[50px] z-[10]">
											<p className="text-sm lg:text-base xl:text-base">
												{getProductTags(product)}
											</p>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<h5 className="text-lg lg:text-xl xl:text-xl">{product.title}</h5>
										<h5 className="text-lg lg:text-xl xl:text-xl text-primary">
											{getProductPrice(product, dynamicPricing)}
										</h5>
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
										<a href={getCustomizationPage(product)} className="flex-1 cus-btn text-center">
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

