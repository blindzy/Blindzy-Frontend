import React, { useEffect , useState } from "react";
import { api } from '../../services/api';
import type { Product } from '../../services/api';
import { Button } from "@lib/components/ui/button";
import { Label } from "@lib/components/ui/label";
import ProductComponent from './product';
import Instruction from './instruction';



const sampleProducts = [
  {
    id: '1',
    title: 'Premium Plantation Shutters',
    handle: 'premium-plantation-shutters',
    description:
      'High-quality timber plantation shutters with adjustable louvers for perfect light control.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [
      { id: 'img1', url: '/images/categories/1.png' }
    ],
    categories: [
      { id: 'cat1', name: 'Shutters', handle: 'shutters' }
    ],
    price: { amount: 150, currency_code: 'usd' },
    
    // ✅ Options array with colors
    options: [
      {
        id: 'opt1',
        title: 'Color',
        values: [
          { label: 'White', image: '/images/colors/01.png' },
          { label: 'Grey', image: '/images/colors/02.png' },
          { label: 'Black', image: '/images/colors/03.png' },
          { label: 'Oak', image: '/images/colors/04.png' },
          { label: 'Walnut', image: '/images/colors/05.png' },
          { label: 'Charcoal', image: '/images/colors/06.png' },
        ]
      }
    ],

    // ✅ Variants for each color
    variants: [
      {
        id: 'v1',
        title: 'White',
        sku: 'SHUT-001-WHITE',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'White' },
        inventory_quantity: 10,
        image: '/images/colors/01.png'
      },
      {
        id: 'v2',
        title: 'Grey',
        sku: 'SHUT-001-GREY',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'Grey' },
        inventory_quantity: 8,
        image: '/images/colors/02.png'
      },
      {
        id: 'v3',
        title: 'Black',
        sku: 'SHUT-001-BLACK',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'Black' },
        inventory_quantity: 12,
        image: '/images/colors/03.png'
      },
      {
        id: 'v4',
        title: 'Oak',
        sku: 'SHUT-001-OAK',
        prices: [{ amount: 300, currency_code: 'usd' }],
        options: { Color: 'Oak' },
        inventory_quantity: 5,
        image: '/images/colors/04.png'
      },
      {
        id: 'v5',
        title: 'Walnut',
        sku: 'SHUT-001-WALNUT',
        prices: [{ amount: 300, currency_code: 'usd' }],
        options: { Color: 'Walnut' },
        inventory_quantity: 7,
        image: '/images/colors/05.png'
      },
      {
        id: 'v6',
        title: 'Charcoal',
        sku: 'SHUT-001-CHARCOAL',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'Charcoal' },
        inventory_quantity: 6,
        image: '/images/colors/06.png'
      }
    ],

    tags: 'light-filtering',
    created_at: '',
    updated_at: ''
  },
  {
    id: '2',
    title: 'Premium Plantation Shutters',
    handle: 'premium-plantation-shutters',
    description:
      'High-quality timber plantation shutters with adjustable louvers for perfect light control.',
    status: 'published',
    thumbnail: '/images/categories/1.png',
    images: [
      { id: 'img1', url: '/images/categories/1.png' }
    ],
    categories: [
      { id: 'cat1', name: 'Shutters', handle: 'shutters' }
    ],
    price: { amount: 150, currency_code: 'usd' },
    
    // ✅ Options array with colors
    options: [
      {
        id: 'opt1',
        title: 'Color',
        values: [
          { label: 'White', image: '/images/colors/01.png' },
          { label: 'Grey', image: '/images/colors/02.png' },
          { label: 'Black', image: '/images/colors/03.png' },
          { label: 'Oak', image: '/images/colors/04.png' },
          { label: 'Walnut', image: '/images/colors/05.png' },
          { label: 'Charcoal', image: '/images/colors/06.png' },
        ]
      }
    ],

    // ✅ Variants for each color
    variants: [
      {
        id: 'v1',
        title: 'White',
        sku: 'SHUT-001-WHITE',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'White' },
        inventory_quantity: 10,
        image: '/images/colors/01.png'
      },
      {
        id: 'v2',
        title: 'Grey',
        sku: 'SHUT-001-GREY',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'Grey' },
        inventory_quantity: 8,
        image: '/images/colors/02.png'
      },
      {
        id: 'v3',
        title: 'Black',
        sku: 'SHUT-001-BLACK',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'Black' },
        inventory_quantity: 12,
        image: '/images/colors/03.png'
      },
      {
        id: 'v4',
        title: 'Oak',
        sku: 'SHUT-001-OAK',
        prices: [{ amount: 300, currency_code: 'usd' }],
        options: { Color: 'Oak' },
        inventory_quantity: 5,
        image: '/images/colors/04.png'
      },
      {
        id: 'v5',
        title: 'Walnut',
        sku: 'SHUT-001-WALNUT',
        prices: [{ amount: 300, currency_code: 'usd' }],
        options: { Color: 'Walnut' },
        inventory_quantity: 7,
        image: '/images/colors/05.png'
      },
      {
        id: 'v6',
        title: 'Charcoal',
        sku: 'SHUT-001-CHARCOAL',
        prices: [{ amount: 200, currency_code: 'usd' }],
        options: { Color: 'Charcoal' },
        inventory_quantity: 6,
        image: '/images/colors/06.png'
      }
    ],

    tags: 'light-filtering',
    created_at: '',
    updated_at: ''
  }
];



interface ShopProps {
	
}

function Shop(props: ShopProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [products, setProducts] = useState<Product[]>(sampleProducts);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [dimensions, setDimensions] = useState({ width: '', height: '' });
	const [calculating, setCalculating] = useState(false);
	const [calculatedPrice, setCalculatedPrice] = useState<string>('');
	const [dynamicPricing, setDynamicPricing] = useState(false);


	const calculatePrice = () => {
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
				setCalculating(false);
				return;
			}			

			const area = widthInMeters * heightInMeters;
			const pricePerSqM = 150;

			// Update all products price
			const updatedProducts = products.map(product => {
				// Update main price
				const newAmount = Math.round(area * pricePerSqM); // amount in cents
				const updatedProduct = {
					...product,
					price: {
						...product.price,
						amount: newAmount
					},
					variants: product.variants.map(variant => ({
						...variant,
						prices: [{
							amount: newAmount,
							currency_code: product.price.currency_code
						}]
					}))
				};
				return updatedProduct;
			});

			setProducts(updatedProducts);
			setCalculatedPrice(`Price updated based on ${area.toFixed(2)} m² area`);
			setDynamicPricing(true);

		} catch (error) {
			console.error('Error calculating price:', error);
			alert('Error calculating price. Please enter valid numbers.');
		} finally {
			setCalculating(false);
		}
	};


	return (
		<section className="shop-section w-full min-h-screen flex flex-col xl:flex-row items-start gap-4 sm:gap-6 xl:gap-[1.25vw] p-2 sm:p-6 xl:p-[1.25vw]" id="shop">
			<div className="w-full xl:w-[23.438vw] flex flex-col xl:gap-6 text-[--Black] shrink-0">
				<div className="w-full flex flex-col gap-4 p-6 sm:p-6 xl:p-[1.25vw] border border-[--Black] rounded-48">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg uppercase">GET AN INSTANT PRICE</h5>
						<p className="text-sm xl:w-[90%]">Enter window size for real-time pricing. Fine-tune later.</p>
					</div>
					<div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
						<Label htmlFor="Width" className="shrink-0">Width: <span className="text-xs">(m)</span></Label>
						<input 
							type="number" 
							id="Width" 
							className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
							value={dimensions.width}
							onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
						/>
					</div>
					<div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
						<Label htmlFor="Height" className="shrink-0">Height: <span className="text-xs">(m)</span></Label>
						<input 
							type="number" 
							id="Height" 
							className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
							value={dimensions.height}
							onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
						/>
					</div>
					<Button 
						variant={'primary'}
						size={'small'}
						className="w-full"
						onClick={calculatePrice}
						disabled={!dimensions.width || !dimensions.height || calculating}
					>
						{calculating ? 'Calculating...' : 'Calculate Price'}
					</Button>
				</div>
				{/* Sidebar info cards (large screens only) */}
				<div className="hidden xl:flex flex-col gap-2">
					<Instruction />
				</div>
			</div>
			<div className="w-full flex flex-col gap-4 sm:gap-6 xl:gap-[1.25vw]">
				<div className="w-full p-4 sm:py-[1.563vw] xl:py-[0.833vw] sm:px-[2.344vw] xl:p-[1.25vw] flex flex-col md:flex-row items-center justify-between gap-4 border border-[--Black] sm:rounded-full rounded-[32px]">
					<h6 className="text-md sm:block hidden text-black"></h6>
					<div className="relative flex sm:w-fit w-full shrink-0 ">
						<span className={`absolute left-0 top-0 transition w-[25%] sm:w-[14.648vw] xl:w-[9vw] h-full bg-[--primary] rounded-full
							${selectedCategory === 'all'? 'left-0' : selectedCategory === 'blockout' ? 'left-[25%]' : selectedCategory === 'light-filtering' ? 'left-[50%]' : selectedCategory === 'sunscreen' ? 'left-[75%]' : ''}
						`}/>
						<button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'all' ? 'text-[--white]' : ''}`}
							onClick={() => setSelectedCategory('all')}>
							All Products
						</button>
						<button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'blockout' ? 'text-[--white]' : ''}`}
							onClick={() => setSelectedCategory('blockout')}>
							Blockout
						</button>
						<button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'light-filtering' ? 'text-[--white]' : ''}`}
							onClick={() => setSelectedCategory('light-filtering')}>
							Light Filtering
						</button>
						<button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'sunscreen' ? 'text-[--white]' : ''}`}
							onClick={() => setSelectedCategory('sunscreen')}>
							Sunscreen
						</button>
					</div>
				</div>
				<div className="grid items-stretch grid-cols-12 gap-4 sm:gap-6 xl:gap-[1.25vw]">
					{/*PRODUCT CARDS  */}
					{loading && <div className="col-span-12 text-center py-8">Loading products...</div>}
					{error && <div className="col-span-12 text-center py-8 text-red-500">{error}</div>}
					{!loading && !error && products.map((product) => (
						<ProductComponent key={product.id} data={product}/>
					))}
				</div>
				<div className="xl:hidden flex flex-col gap-2">
					<Instruction/>
				</div>
			</div>
		</section>
	);
}

export default Shop;

