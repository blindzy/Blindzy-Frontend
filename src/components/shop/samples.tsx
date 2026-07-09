import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@lib/components/ui/button";
import { Plus, Search } from 'lucide-react';
import { createAddToCart } from '../../services/add-to-cart';
import SelectDefultColor from "@components/shop/selectdefultColor";


function Samples(props) {
	const [searchQuery, setSearchQuery] = useState('');
	const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});
	const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	type UserData = {
		id: string | number;
		email: string;
		first_name: string;
		last_name: string;
	};
	const [userData, setUserData] = useState<UserData | null>(null);
	const [selectedVariants, setSelectedVariants] = useState<Record<string, any>>({});

	const CATEGORIES = [
		{ handle: "blinds", label: "Blinds", image: "/images/product/1.png" },
		{ handle: "curtains", label: "Curtains", image: "/images/product/4.png" },
		{ handle: "shutters", label: "Shutters", image: "/images/product/2.png" },
	];
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const getSelectedVariant = (sample) => {
		const sampleId = sample.id?.toString();
		return selectedVariants[sampleId] ?? sample.variants?.[0];
	};

	useEffect(() => {
		console.log('debug', props.data)
		const userDataString = localStorage.getItem("user");
		if (!userDataString) {
			console.error("User Data not found in localStorage");
			return;
		}
		const userDataObj = JSON.parse(userDataString);
		setUserData(userDataObj);
	}, []);

	useEffect(() => {
		const guestItems = JSON.parse(localStorage.getItem('guest_cart') || '[]');
		const added: Record<string, boolean> = {};
		guestItems.forEach((item: any) => {
			if (item.product_id) {
				added[item.product_id] = true;
			}
		});
		setAddedItems(added);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleCartItemDeleted = (event: any) => {
			const { productId } = event.detail;
			// Check if there are still items with this product_id in the cart
			const guestItems = JSON.parse(localStorage.getItem('guest_cart') || '[]');
			const hasProduct = guestItems.some((item: any) => item.product_id?.toString() === productId);

			// If no items with this product_id remain, remove it from addedItems
			if (!hasProduct) {
				setAddedItems(prev => {
					const next = { ...prev };
					delete next[productId];
					return next;
				});
			}
		};

		window.addEventListener('cartItemDeleted', handleCartItemDeleted);

		return () => {
			window.removeEventListener('cartItemDeleted', handleCartItemDeleted);
		};
	}, []);

	const getCurrencySymbol = (currency_code) => {
		// const code = selectedVariant?.price_sets?.[0]?.prices?.[0]?.currency_code || 'USD';
		const code = currency_code || 'USD';
		let symbol = '';
		switch (code) {
			case 'usd': symbol = '$'; break;
			case 'aud': symbol = 'A$'; break;
			case 'gbp': symbol = '£'; break;
			case 'eur': symbol = 'A$'; break;
			case 'inr': symbol = '₹'; break;
			case 'nzd': symbol = 'NZ$'; break;
			default: symbol = code ? code.toUpperCase() + ' ' : '';
		}
		return symbol;
	};

	const handleAddToCart = async (id, title, thumbnail, amount, currency_code, variant_id) => {
		const productId = id.toString();
		setLoadingItems(prev => ({ ...prev, [productId]: true }));

		const cartItem = {
			id: `local_${Date.now()}_${Math.random().toString(36).slice(2)}`,
			product_id: id,
			variant_id: variant_id ?? null,   // ✅ add this
			quantity: 1,
			customizations: {
				title: title,
				amount: amount,
				currency: currency_code ? getCurrencySymbol(currency_code) : '',
				thumbnail: thumbnail,
			},
		};

		if (!userData) {
			try {
				const existing = JSON.parse(localStorage.getItem('guest_cart') || '[]');
				existing.push(cartItem);
				localStorage.setItem('guest_cart', JSON.stringify(existing));
				setSuccess('Added to cart!');
				setAddedItems(prev => ({ ...prev, [productId]: true }));
			} catch {
				setError('Failed to save item to cart.');
			} finally {
				setLoadingItems(prev => {
					const next = { ...prev };
					delete next[productId];
					return next;
				});
			}
			return;
		}

		try {
			await createAddToCart.addToCart({
				email: userData.email,
				product_id: id.toString(),
				quantity: cartItem.quantity,
				variant_id: cartItem.variant_id,
				customizations: cartItem.customizations,
			});

			setSuccess("Add to Cart created successfully!");
			setAddedItems(prev => ({ ...prev, [productId]: true }));

		} catch (err: any) {
			console.error("Add to Cart error:", err);
			setError(err.message || "Something went wrong during Add to Cart.");
		} finally {
			setLoadingItems(prev => {
				const next = { ...prev };
				delete next[productId];
				return next;
			});
		}
	}

	const filteredSamples = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		const byCategory = selectedCategory
			? (props.data ?? []).filter((sample: any) =>
				sample.categories?.some((cat: any) => cat.handle === selectedCategory)
			)
			: props.data ?? [];
		if (!query) return byCategory;
		return byCategory.filter((sample: any) => {
			const matchesTitle = sample.title?.toLowerCase().includes(query);
			const matchesColor = sample.options?.some((option: any) =>
				option.values?.some((opt: any) => opt.value?.toLowerCase().includes(query))
			);
			return matchesTitle || matchesColor;
		});
	}, [props.data, searchQuery, selectedCategory]);

	return (
		<section className="shop-section w-screen flex xl:flex-row flex-col items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2" id="blindsShop">
			{/* <div className="w-full xl:w-[23.438vw] flex flex-col xl:gap-6 text-[--Black] shrink-0">
				<div className="w-full flex flex-col gap-4 p-6 sm:p-6 xl:p-[1.25vw] border border-[--Black] rounded-48">
					<div className="flex flex-col gap-2">
						<h5 className="text-lg uppercase">Filter</h5>
						<p className="text-sm xl:w-[90%]">
							Filter the Samples Based on the Product, Materials, and Fabric
						</p>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Label htmlFor="product" className="shrink-0">Product:</Label>
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Blinds" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
								<SelectItem value="blinds">Blinds</SelectItem>
								<SelectItem value="curtains">Curtains</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Label htmlFor="material" className="shrink-0">Material:</Label>
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Blinds" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
								<SelectItem value="blockout">Blockout</SelectItem>
								<SelectItem value="light filtering">Light Filtering</SelectItem>
								<SelectItem value="sheer">Sheer</SelectItem>
								<SelectItem value="sunscreen">Sunscreen</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Label htmlFor="fabric" className="shrink-0">Fabric:</Label>
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Blinds" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
								<SelectItem value="blockout">Blockout</SelectItem>
								<SelectItem value="light filtering">Light Filtering</SelectItem>
								<SelectItem value="sheer">Sheer</SelectItem>
								<SelectItem value="sunscreen">Sunscreen</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<Button
						variant={'primary'}
						size={'small'}
						className="w-full"
					>
						Calculate
					</Button>
				</div>
			</div> */}
			<div className="w-full flex flex-col gap-4">
				{!selectedCategory ? (
					<div className="w-full grid items-stretch grid-cols-12 gap-4 sm:gap-6 xl:gap-[1.25vw] animate-in fade-in slide-in-from-bottom-2 duration-300">
						{CATEGORIES.map((category) => (
							<div
								key={category.handle}
								className="col-span-12 sm:col-span-4 relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[19.271vw] cursor-pointer group"
								onClick={() => setSelectedCategory(category.handle)}
							>
								<img
									src={category.image}
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
									alt={category.label}
								/>
								<div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center gap-4 bg-black/10">
									<h5 className="text-2xl text-white">{category.label}</h5>
									<Button
										variant={'primary'}
										size={'small'}
										onClick={(e) => {
											e.stopPropagation();
											setSelectedCategory(category.handle);
										}}
									>
										Explore samples
									</Button>
								</div>
							</div>
						))}
					</div>
				) : (
				<>
				<div className="w-full p-4 sm:py-[1.563vw] xl:py-[0.833vw] sm:px-[2.344vw] xl:p-[1.25vw] flex flex-col md:flex-row items-center justify-between gap-4 border border-[--Black] sm:rounded-full rounded-[32px]">
					<label className="relative flex items-center w-full md:w-[14.648vw] xl:w-[16vw] shrink-0">
						<Search className="absolute left-4 size-[18px] text-[--mediumGrey] pointer-events-none" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search"
							className="w-full text-sm py-3 pl-11 pr-4 bg-transparent border border-[--Black] rounded-full outline-none placeholder:text-[--mediumGrey]"
						/>
					</label>
					<h6 className="text-md sm:block hidden text-black whitespace-nowrap shrink-0">
						Showing {filteredSamples.length} Result{filteredSamples.length === 1 ? '' : 's'}
					</h6>
				</div>
				<div className="w-full grid items-stretch grid-cols-12 gap-4 sm:gap-6 xl:gap-[1.25vw]">
					{error && (
						<div className="col-span-12">
							<p className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</p>
						</div>
					)}
					<div className="col-span-12 flex flex-wrap items-center gap-2 sm:gap-3">
						{CATEGORIES.map((category) => (
							<button
								key={category.handle}
								type="button"
								className={`text-sm px-4 py-2 rounded-full border transition-colors duration-200 cursor-pointer ${
									selectedCategory === category.handle
										? "bg-[--primary] text-white border-[--primary]"
										: "bg-transparent text-[--Black] border-[--Black]/30 hover:border-[--Black]"
								}`}
								onClick={() => setSelectedCategory(category.handle)}
							>
								{category.label}
							</button>
						))}
						<button
							type="button"
							className="text-sm underline text-[--Black] ml-auto cursor-pointer"
							onClick={() => setSelectedCategory(null)}
						>
							&larr; Back to all categories
						</button>
					</div>
					{success && (
						<div className="col-span-12">
							<p className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">{success}</p>
						</div>
					)}
					{filteredSamples.length === 0 && (
						<div className="col-span-12 text-center py-8 text-[--mediumGrey]">
							No samples found{searchQuery.trim() ? ` for "${searchQuery.trim()}"` : ''}.
						</div>
					)}
					{filteredSamples.map((sample, idx) => {
						const sampleId = sample.id?.toString();
						const selectedVariant = getSelectedVariant(sample);
						return (
						<div key={idx} className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col justify-between gap-4 xl:gap-[0.833vw] p-4 xl:p-[0.833vw] border border-[--Black] rounded-48">
							<div className="relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[19.271vw]">
								<img
									src={(selectedVariant?.thumbnail ?? sample.thumbnail)?.replace("http://localhost:9000", "https://api.blindzy.com")}
									className="w-full h-full object-cover" alt={sample.title} />
							</div>
							<div className="flex flex-col gap-4 xl:gap-[0.833vw]">
								<div className="flex items-center justify-between gap-2">
									<h5 className="text-lg line-clamp-1">{sample.title}</h5>
									<h5 className="text-lg text-primary shrink-0">
										{selectedVariant?.price_sets?.[0]?.prices?.[0]?.amount === 0
											? 'Free'
											: `A$${selectedVariant?.price_sets?.[0]?.prices?.[0]?.amount ?? 0}`}
									</h5>
								</div>
								<div className="flex items-center gap-2">
									<h6 className="text-md shrink-0">Colour:</h6>
									<SelectDefultColor
										data={sample.variants}
										selectedId={selectedVariant?.id}
										onSelect={(color) => setSelectedVariants(prev => ({ ...prev, [sampleId]: color }))}
									/>
								</div>
								<div className="flex items-center gap-2 shrink-0 text-[--mediumGrey]">
									<Plus className="size-[18px]" />
									<div className="w-full border-b border-[--mediumGrey]"></div>
									<Plus className="size-[18px]" />
								</div>
								<div className="flex items-center gap-4">
									{/* <Button variant={'primary'} size={'small'} className="w-full flex-1">
										Get Samples
									</Button>
									<Button variant={'light'} size={'small'} className="w-full flex-1">
										{loading ? 'Adding...' : 'Add to Cart'}
									</Button> */}
									<Button
										variant={'primary'}
										size={'small'}
										className="w-full flex-1"
										disabled={!!loadingItems[sampleId]}
										onClick={() => {
											const isAdded = sampleId ? addedItems[sampleId] : false;
											if (isAdded) {
												if (typeof window !== 'undefined') {
													window.dispatchEvent(new CustomEvent('openCartPopup'));
												}
												return;
											}
											handleAddToCart(
												sample.id,
												`${sample.title}${selectedVariant?.title ? ` - ${selectedVariant.title}` : ''}`,
												selectedVariant?.thumbnail ?? sample.thumbnail,
												selectedVariant?.price_sets?.[0]?.prices?.[0]?.amount,
												selectedVariant?.price_sets?.[0]?.prices?.[0]?.currency_code,
												selectedVariant?.id
											);
										}}
									>
										{loadingItems[sampleId] ? 'Adding...' : addedItems[sampleId] ? 'View to cart' : 'Add to Cart'}
									</Button>
								</div>
							</div>
						</div>
						);
					})}
				</div>
				</>
				)}
			</div>
		</section>
	);
}

export default Samples;

