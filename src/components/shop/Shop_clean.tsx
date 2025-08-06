import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { api } from "../../services/api";
import type { Product } from "../../services/api";
import { pricingEngine, PricingEngine } from '../../utils/pricingEngine';

import './css/style.css';

/**
 * SHOP PAGE WITH SAMPLE PRODUCTS
 * 
 * This shop page uses a local sample products array instead of API calls
 * for consistent development and testing without backend dependency.
 * 
 * The sample products include proper categories and tags for filtering:
 * 
 * Available Filter Tags:
 * - 'blockout' - Products that provide complete light blocking
 * - 'light-filtering' - Products that filter light while maintaining visibility  
 * - 'sunscreen' - Products that provide UV protection while maintaining view
 * 
 * Categories included:
 * - Shutters, Blinds, Curtains, Double Curtains, Vertical Blinds, Double Roller Blinds
 * 
 * All products work with the comprehensive pricing engine for real-time calculations.
 */

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
		description: 'Complete blackout roller blinds perfect for bedrooms and media rooms.',
		status: 'published',
		thumbnail: '/images/categories/2.png',
		images: [{ id: 'img3', url: '/images/categories/2.png' }],
		categories: [{ id: 'cat3', name: 'Blackout Blinds', handle: 'blackout-blinds' }],
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
		title: 'Elegant Curtains',
		handle: 'elegant-curtains',
		description: 'Beautiful flowing curtains that add elegance and style to any room.',
		status: 'published',
		thumbnail: '/images/categories/3.png',
		images: [{ id: 'img4', url: '/images/categories/3.png' }],
		categories: [{ id: 'cat4', name: 'Curtains', handle: 'curtains' }],
		variants: [
			{
				id: 'v4',
				title: 'Standard',
				sku: 'CURTAIN-001',
				prices: [{ amount: 12000, currency_code: 'usd' }], // $120.00
				options: {},
				inventory_quantity: 8,
			},
		],
		options: [],
		tags: ['sunscreen'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '5',
		title: 'Double Curtains',
		handle: 'double-curtains',
		description: 'Layered double curtain system for enhanced privacy and light control.',
		status: 'published',
		thumbnail: '/images/categories/1.png',
		images: [{ id: 'img5', url: '/images/categories/1.png' }],
		categories: [{ id: 'cat5', name: 'Double Curtains', handle: 'double-curtains' }],
		variants: [
			{
				id: 'v5',
				title: 'Standard',
				sku: 'DCURTAIN-001',
				prices: [{ amount: 13500, currency_code: 'usd' }], // $135.00
				options: {},
				inventory_quantity: 6,
			},
		],
		options: [],
		tags: ['blockout'],
		created_at: '',
		updated_at: '',
	},
	{
		id: '6',
		title: 'Vertical Blinds',
		handle: 'vertical-blinds',
		description: 'Classic vertical blinds ideal for large windows and sliding doors.',
		status: 'published',
		thumbnail: '/images/categories/2.png',
		images: [{ id: 'img6', url: '/images/categories/2.png' }],
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

function Shop() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [widthInput, setWidthInput] = useState('');
	const [heightInput, setHeightInput] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All');

	// Function to fetch products (using sample data instead of API)
	const fetchProducts = async () => {
		try {
			setLoading(true);
			
			// Simulate API loading delay for realistic UX
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// Use sample products instead of API call
			setProducts(sampleProducts);
			setLoading(false);
		} catch (error) {
			console.error("Error loading sample products:", error);
			setError("Failed to load products");
			setLoading(false);
		}
	};

	// Get the current price for a product using the pricing engine
	const getProductPrice = (product: Product, isWithDimensions: boolean = false) => {
		// Default dimensions if none specified
		const width = isWithDimensions && widthInput ? parseFloat(widthInput) : 1.0;
		const height = isWithDimensions && heightInput ? parseFloat(heightInput) : 1.0;
		
		// Detect product type for pricing calculations
		const productType = product.categories?.[0]?.name?.toLowerCase().includes('curtain') ? 'curtains' :
						  product.categories?.[0]?.name?.toLowerCase().includes('shutter') ? 'shutters' :
						  'blinds';
		
		// Get base product price
		const basePrice = product.variants?.[0]?.prices?.[0]?.amount 
			? product.variants[0].prices[0].amount / 100 
			: 0;
		
		// Calculate using comprehensive pricing engine
		const calculation = pricingEngine.calculatePrice(
			width, 
			height, 
			productType,
			{
				baseProductPrice: basePrice,
				installation: 'standard'
			}
		);
		
		return calculation.finalPrice.toFixed(2);
	};

	// Check if product matches the selected category/tag filter
	const isProductVisible = (product: Product, category: string) => {
		if (category === 'All') return true;
		
		// Check if product has the category as a tag
		const categoryKey = category.toLowerCase().replace(' ', '-');
		return product.tags?.includes(categoryKey) || 
			   product.tags?.includes(category.toLowerCase()) ||
			   product.categories?.some(cat => cat.name.toLowerCase().includes(category.toLowerCase()));
	};

	// Get filtered products based on selected category
	const getFilteredProducts = () => {
		return products.filter(product => isProductVisible(product, selectedCategory));
	};

	// Calculate pricing for shop display
	const calculateShopPricing = () => {
		const filteredProducts = getFilteredProducts();
		const hasDimensions = widthInput && heightInput;
		
		if (hasDimensions) {
			// Update all products with new pricing based on dimensions
			// This is done in the render to maintain reactivity
		}
		
		return filteredProducts;
	};

	// Navigate to customization with product details and calculated price
	const navigateToCustomization = (product: Product) => {
		const price = getProductPrice(product, true);
		const width = widthInput || '';
		const height = heightInput || '';
		
		// Determine customization URL based on product type
		let customizationUrl = '/customization/';
		const productCategory = product.categories?.[0]?.name?.toLowerCase() || '';
		
		if (productCategory.includes('shutter')) {
			customizationUrl += 'shutter-customisation';
		} else if (productCategory.includes('curtain')) {
			if (productCategory.includes('double')) {
				customizationUrl += 'double-curtain-customisation';
			} else {
				customizationUrl += 'curtain-customisation';
			}
		} else if (productCategory.includes('vertical')) {
			customizationUrl += 'vertical-blind-customisation';
		} else if (productCategory.includes('double') && productCategory.includes('blind')) {
			customizationUrl += 'double-roller-blind-customisation';
		} else {
			customizationUrl += 'blind-customisation';
		}
		
		// Add product information as URL parameters
		const params = new URLSearchParams({
			product: product.id,
			name: product.title,
			price: price,
			image: product.thumbnail,
			description: product.description,
			category: productCategory,
			calculatedPrice: 'true',
			width: width,
			height: height
		});
		
		window.location.href = `${customizationUrl}?${params.toString()}`;
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const displayProducts = calculateShopPricing();
	const productCount = displayProducts.length;

	return (
		<section className="w-screen xl:py-[85px] py-[60px] xl:px-[1.25vw] sm:px-[2.344vw] px-4" id="shop">
			<div className="shop-container w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
				<div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
					<h4 className="text-xl text-black">SHOP</h4>
					<div className="flex xl:flex-row flex-col xl:items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
						<div className="flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
							<input 
								type="text" 
								placeholder="Width (m)" 
								className="formInput xl:w-[150px] w-full"
								value={widthInput}
								onChange={(e) => setWidthInput(e.target.value)}
							/>
							<input 
								type="text" 
								placeholder="Height (m)" 
								className="formInput xl:w-[150px] w-full"
								value={heightInput}
								onChange={(e) => setHeightInput(e.target.value)}
							/>
						</div>
					</div>
				</div>
				
				<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
					<Icon icon="uil:plus" className="text-[18px]" />
					<div className="w-full h-[1px] bg-mediumGrey"></div>
					<Icon icon="uil:plus" className="text-[18px]" />
				</div>

				<div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
					<p className="text-sm text-black">Showing {productCount > 0 ? '1' : '0'}-{productCount} of {productCount} products</p>
					<div className="flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2 overflow-x-auto">
						{['All', 'Light Filtering', 'Blockout', 'Sunscreen'].map(category => (
							<button 
								key={category}
								className={`cus-btn text-sm small shrink-0 ${selectedCategory === category ? 'active' : ''}`}
								onClick={() => setSelectedCategory(category)}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{loading ? (
					<div className="w-full text-center py-8">Loading products...</div>
				) : error ? (
					<div className="w-full text-center py-8 text-red-500">{error}</div>
				) : (
					<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
						{displayProducts.map(product => (
							<div key={product.id} className="w-full flex flex-col gap-2 text-black cursor-pointer" onClick={() => navigateToCustomization(product)}>
								<div className="w-full relative rounded-32 overflow-hidden bg-lightGrey">
									<img 
										src={product.thumbnail} 
										alt={product.title}
										className="w-full h-[250px] object-cover"
									/>
									<div className="absolute top-4 left-4">
										<span className="px-3 py-1 bg-white text-black text-xs rounded-full">
											{product.tags?.[0] || 'Product'}
										</span>
									</div>
								</div>
								<div className="w-full flex flex-col gap-1">
									<h6 className="text-md font-medium">{product.title}</h6>
									<p className="text-sm text-mediumGrey line-clamp-2">{product.description}</p>
									<p className="text-lg font-bold text-primary">
										${getProductPrice(product, true)}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export default Shop;
