import React, { useEffect, useState } from "react";
import { Button } from "@lib/components/ui/button";
import { Label } from "@lib/components/ui/label";
import { Plus } from 'lucide-react';
import { createAddToCart } from '../../services/add-to-cart';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@lib/components/ui/select"


function Samples(props) {
	const [loading, setLoading] = useState(false);
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

	useEffect(() => {
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
	return (
		<section className="shop-section w-screen min-h-screen flex xl:flex-row flex-col items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2" id="blindsShop">
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
				<div className="w-full grid items-stretch grid-cols-12 gap-4 sm:gap-6 xl:gap-[1.25vw]">
					{error && (
						<div className="col-span-12">
							<p className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</p>
						</div>
					)}
					{success && (
						<div className="col-span-12">
							<p className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">{success}</p>
						</div>
					)}
					{props.data && props.data.map((sample, idx) => (
						<div key={idx} className="col-span-12 sm:col-span-6 xl:col-span-4 flex flex-col justify-between gap-4 xl:gap-[0.833vw] p-4 xl:p-[0.833vw] border border-[--Black] rounded-48">
							<div className="relative rounded-32 overflow-hidden h-[250px] sm:h-[24.414vw] xl:h-[19.271vw]">
								<img
									src={sample.thumbnail?.replace("http://localhost:9000", "https://api.blindzy.com")}
									className="w-full h-full object-cover" alt={sample.title} />
							</div>
							<div className="flex flex-col gap-4 xl:gap-[0.833vw]">
								<div className="flex items-center justify-between gap-2">
									<h5 className="text-lg line-clamp-1">{sample.title}</h5>
									<h5 className="text-lg text-primary shrink-0">
										{sample.variants?.[0]?.price_sets?.[0]?.prices?.[0]?.amount === 0
											? 'Free'
											: `A$${sample.variants?.[0]?.price_sets?.[0]?.prices?.[0]?.amount ?? 0}`}
									</h5>
								</div>
								<div className="flex items-center gap-1">
									<h6 className="text-md">Colour:</h6>
									<h6 className="text-md ">
										{sample.options.map((option, i) => (
											<React.Fragment key={i}>
												{option.values.map((opt, x) => (
													<span key={x}>
														{opt.value}
													</span>
												))}
											</React.Fragment>
										))}
									</h6>
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
										disabled={!!loadingItems[sample.id?.toString()]}
										onClick={() => {
											const itemId = sample.id?.toString();
											const isAdded = itemId ? addedItems[itemId] : false;
											if (isAdded) {
												if (typeof window !== 'undefined') {
													window.dispatchEvent(new CustomEvent('openCartPopup'));
												}
												return;
											}
											handleAddToCart(
												sample.id,
												sample.title,
												sample.thumbnail,
												sample.variants?.[0]?.price_sets?.[0]?.prices?.[0]?.amount,
												sample.variants?.[0]?.price_sets?.[0]?.prices?.[0]?.currency_code,
												sample.variants?.[0]?.id 
											);
										}}
									>
										{loadingItems[sample.id?.toString()] ? 'Adding...' : addedItems[sample.id?.toString()] ? 'View to cart' : 'Add to Cart'}
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Samples;

