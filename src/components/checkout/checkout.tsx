import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Input } from '@lib/components/ui/input';
import './css/style.css';
import { Button } from "@lib/components/ui/button";
import OrderListComponent from "./order-list";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@lib/components/ui/select";
import fetchMedusaApi from "@lib/lib/fetchMedusaApi";
import { Loader2, Plus } from 'lucide-react';
import Separate from "@components/separate";
import PaymentPage from "./payment";
import { createAddresses } from "services/create-address";
import { useGooglePlacesAutocomplete } from "hooks/useGoogleMapsAutoComplete";

const normalizeCountry = (code?: string) => {
	if (!code) return "au"
	const map: Record<string, string> = {
		AUS: "au",
		USA: "us",
		GBR: "gb",
		CAN: "ca",
		NZL: "nz",
	}
	return (map[code] ?? code).toLowerCase()
}

function Checkout() {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [show, setShow] = useState<boolean>(true);
	const [loader, setLoader] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [shippingInfo, setShippingInfo] = useState({
		// state: '',
		country: '',
		city: '',
		zipCode: '',
		address: '',
		apartment: '',
		company: ''
	});
	const [paymentInfo, setPaymentInfo] = useState({
		id: '',
		cardType: '',
		cardName: '',
		cardNumber: '',
		expiryDate: '',
		securityCode: '',
		differentBilling: false
	});
	type UserData = {
		id: string | number;
		first_name: string;
		last_name: string;
		firstName?: string;
		lastName?: string;
		email?: string;
		phone?: string;
		// company?: string;
	};

	const [userData, setUserData] = useState<UserData | null>(null);
	const [customerInfo, setCustomerInfo] = useState({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		// company: ''
	});
	const [totalAmount, setTotalAmount] = useState(0);
	const [shippingAmount, setShippingAmount] = useState(0);
	const [currencySymbol, setCurrencySymbol] = useState('');
	const [addressList, setAddressList] = useState('');
	const [error, setError] = useState('');
	const [orderList, setOrderList] = useState([
		// {
		//     id: 1,
		//     title: "Product Name",
		//     thumbnail: '/images/categories/1.png',
		//     price: { amount: 150, currency_code: 'usd' },
		//     options: [
		//         { id: 1, name: "Color:", value: "Ash" },
		//         { id: 2, name: "Size:", value: "24cm x 56cm" },
		//         { id: 3, name: "Fit Type:", value: "Recess Fit" },
		//         { id: 4, name: "Roll Direction:", value: "Front Roll" },
		//         { id: 5, name: "Chain Colour:", value: "Silver" },
		//         { id: 6, name: "Bracket Colour:", value: "Sandstone" },
		//         { id: 7, name: "Base Rail Shape:", value: "Oval" },
		//         { id: 8, name: "Base Rail Colour:", value: "Bone" },
		//     ],
		//     date: "2023-01-01",
		//     status: "Shipped",
		// },
		// {
		//     id: 2,
		//     title: "Product 2",
		//     thumbnail: '/images/categories/2.png',
		//     price: { amount: 100, currency_code: 'usd' },
		//     options: [
		//         { id: 1, name: "Color:", value: "Ash" },
		//         { id: 2, name: "Size:", value: "24cm x 56cm" },
		//         { id: 3, name: "Fit Type:", value: "Recess Fit" },
		//         { id: 4, name: "Roll Direction:", value: "Front Roll" },
		//         { id: 5, name: "Chain Colour:", value: "Silver" },
		//         { id: 6, name: "Bracket Colour:", value: "Sandstone" },
		//         { id: 7, name: "Base Rail Shape:", value: "Oval" },
		//         { id: 8, name: "Base Rail Colour:", value: "Bone" },
		//     ],
		//     date: "2023-01-02",
		//     status: "Pending"
		// }
	]);
	const calculateTotalAmount = (items) => {
		let total = 0;
		let symbol = '';

		items.forEach(item => {
			const itemAmount = (item.customizations?.amount || 0) * (item.quantity || 1);
			total += itemAmount;
			// Get currency symbol from first item (assuming all items have same currency)
			if (!symbol && item.customizations?.currency) {
				symbol = item.customizations.currency;
			}
		});

		setCurrencySymbol(symbol);
		setTotalAmount(total);
	};

	useEffect(() => {
		const userDataString = localStorage.getItem("user");
		if (!userDataString) {
			console.error("User Data not found in localStorage");
			return;
		}
		const userDataObj = JSON.parse(userDataString);
		setUserData(userDataObj);
		setCustomerInfo(prev => ({
			...prev,
			id: userDataObj.id || '',
			firstName: userDataObj.first_name || '',
			lastName: userDataObj.last_name || '',
			email: userDataObj.email || '',
			phone: userDataObj.phone || '',
			// company: userDataObj.company || ''
		}));
		setIsLoggedIn(!!userDataObj);
	}, []);

	const getAddress = async () => {
		try {
			if (!userData || !userData.email) {
				console.error("User Data not found in localStorage");
				return;
			}
			const data = await fetchMedusaApi<any>({
				endpoint: "/store/customers/addresses",
				query: { email: userData.email },
			});
			if (data.addresses.length == 0) {
				setAddressList("No addresses found");
			}
			setShippingInfo(prev => ({
				...prev,
				// state: data.addresses[0]?.state || '',
				id: data.addresses[0]?.id || '',
				country: data.addresses[0]?.country_code || '',
				city: data.addresses[0]?.city || '',
				zipCode: data.addresses[0]?.postal_code || '',
				address: data.addresses[0]?.address_1 || '',
			}));
		} catch (error) {
			console.error("Error fetching addresses:", error);
		}
	}

	useEffect(() => {
		const getCart = async () => {
			try {
				if (!userData || !userData.email) {
					console.error("User Data not found in localStorage");
					return;
				}
				const data = await fetchMedusaApi<any>({
					endpoint: "store/customers/cart",
					query: { email: userData.email },
				});
				setOrderList(data.cart.items);
				calculateTotalAmount(data.cart.items);
				setLoader(false);
			} catch (error) {
				console.error("Error fetching cart:", error);
			}
		};

		getCart();
		getAddress();
	}, [userData]);

	useEffect(() => {
		calculateTotalAmount(orderList);
	}, [orderList]);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);

	const handleCustomerInfoChange = (field: string, value: string) => {
		setCustomerInfo(prev => ({
			...prev,
			[field]: value
		}));
	};
	const handleShippingInfoChange = (field: string, value: string) => {
		setShippingInfo(prev => ({
			...prev,
			[field]: value
		}));
	};
	const handlePaymentInfoChange = (field: string, value: string | boolean) => {
		setPaymentInfo(prev => ({
			...prev,
			[field]: value
		}));
	};
	const nextStep = async () => {
		if (currentStep === 1) {
			if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
				setError("Please fill in all required personal information.");
				return;
			} else {
				setError("");
			}
		} else if (currentStep === 2) {
			if (!shippingInfo.country || !shippingInfo.city || !shippingInfo.zipCode || !shippingInfo.address) {
				setError("Please fill in all required shipping information.");
				return;
			} else {
				setError("");
				if (addressList === "No addresses found") {
					console.log(addressList);
					// Guard userData to avoid calling properties on null
					if (!userData || !userData.id || !userData.email) {
						console.error("Cannot create address: missing user data");
					} else {
						try {
							const response = await createAddresses.storeAddress({
								customer_id: String(userData.id),
								email: userData.email,
								first_name: userData.first_name,
								last_name: userData.last_name,
								address_1: shippingInfo.address,
								city: shippingInfo.city,
								postal_code: shippingInfo.zipCode,
								country_code: shippingInfo.country
							});
							if (response.message === "Address created successfully") {
								console.log("Address created successfully:", response);
								getAddress();
							}
						} catch (err) {
							console.error("Error creating address:", err);
						}
					}
				}
			}
		} else if (currentStep === 3) {
			if (!paymentInfo.cardType || !paymentInfo.cardName || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.securityCode) {
				setError("Please fill in all required payment information.");
				return;
			} else {
				setError("");
			}
		}
		if (currentStep < 3) {
			setShow(false);
			setTimeout(() => {
				setCurrentStep(currentStep + 1);
				setShow(true);
			}, 300);
		}
	};
	const prevStep = () => {
		if (currentStep > 1) {
			setShow(false);
			setTimeout(() => {
				setCurrentStep(currentStep - 1);
				setShow(true);
			}, 300);
		}
	};

	const addressInputRef = useRef<HTMLInputElement>(null);

	const handlePlaceSelect = useCallback((fields: { address: string; city: string; zipCode: string; country: string }) => {
		// Map short country code (e.g. "AU") to your Select values (e.g. "AUS")
		const countryMap: Record<string, string> = {
			AU: "AUS", US: "USA", CA: "CAN", GB: "GBR", NZ: "NZL",
			DE: "DEU", FR: "FRA", JP: "JPN",
		};
		setShippingInfo(prev => ({
			...prev,
			address: fields.address,
			city: fields.city,
			zipCode: fields.zipCode,
			country: countryMap[fields.country] ?? fields.country,
		}));
	}, []);

	useGooglePlacesAutocomplete(addressInputRef, handlePlaceSelect);

	return (
		<section className="checkout-section w-screen flex flex-col gap-[80px] pb-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="checkout">
			<div className="flex xl:flex-row flex-col gap-4 w-full xl:items-start">
				<div className="xl:w-[34.688vw] w-full xl:h-[42.917vw] flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black xl:shrink-0 rounded-48 overflow-hidden">
					<h4 className="text-xl shrink-0">YOUR ORDER</h4>
					<Separate />
					{orderList.length > 0 ? (
						<div className="w-full max-h-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 overflow-auto line-scroll" data-lenis-prevent>
							{orderList.map((order, key) => (
								<OrderListComponent item={order} key={key} />
							))}
						</div>
					) : (

						<div className="w-full min-h-full max-h-full flex justify-center py-10">
							{loader ? (
								<Loader2 className="h-8 w-8 animate-spin text-[--primary]" />
							) : (
								<div>No items in your order</div>
							)}
						</div>
					)}
					<Separate />
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-lg">SUBTOTAL</h5>
						<h5 className="text-lg">
							{currencySymbol}
							{totalAmount.toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
						</h5>
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-lg">SHIPPING</h5>
						<h5 className="text-lg">{currencySymbol}{shippingAmount.toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}</h5>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Plus className="size-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Plus className="size-[18px]" />
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-xl">TOTAL</h5>
						<h5 className="text-xl">
							{currencySymbol}
							{(totalAmount + shippingAmount).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
						</h5>
					</div>
				</div>
				<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-48 xl:self-start">
					<div className="hidden sm:flex items-center gap-4">
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 1 || currentStep === 2 ? 'border-[--primary] text-white bg-primary' : 'border-[--black] text-black'}`}>1</div>
							<p className="text-sm">Personal Info</p>
						</div>
						<div className="w-full h-[1px] bg-black"></div>
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 2 || currentStep === 3 ? 'border-[--primary] text-white bg-primary' : 'border-[--black] text-black'}`}>2</div>
							<p className="text-sm">Shipping Info</p>
						</div>
						<div className="w-full h-[1px] bg-black"></div>
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 3 ? 'border-[--primary] text-white bg-primary' : 'border-[--black] text-black'}`}>3</div>
							<p className="text-sm">Payment</p>
						</div>
					</div>
					<div className={`flex flex-col gap-[32px]`}>
						<div className="flex sm:flex-row flex-col sm:items-center justify-between gap-2">
							<h3 className="text-xxl">CUSTOMER INFO</h3>
							{!isLoggedIn && (
								<div className="flex items-center gap-1 text-md">
									<p>Already have an account? </p>
									<a href="/login" className="text-primary">Login</a>
								</div>
							)}
						</div>
						{error && (
							<p className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</p>
						)}
						<div className={`w-full grid grid-cols-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 ${show ? 'fade-in' : 'fade-out'}`}>
							{currentStep === 1 ? (
								<>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text"
											id="f-name"
											placeholder="First Name"
											value={customerInfo.firstName}
											onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text"
											id="l-name"
											placeholder="Last Name"
											value={customerInfo.lastName}
											onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="email"
											id="email"
											placeholder="Email"
											value={customerInfo.email}
											onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="tel"
											id="number"
											placeholder="Number"
											value={customerInfo.phone}
											onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
										/>
									</div>
									{/* <div className="col-span-12">
										<Input
											type="text" 
											id="company" 
											placeholder="Company Name (Optional)"
											value={customerInfo.company}
											onChange={(e) => handleCustomerInfoChange('company', e.target.value)}
										/>
									</div> */}

								</>
							) : currentStep === 2 ? (
								<>
									<div className="sm:col-span-6 col-span-12">
										<Select value={shippingInfo.country} onValueChange={(value) => handleShippingInfoChange('country', value)}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Country / Region" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="AUS">Australia</SelectItem>
												<SelectItem value="USA">United States</SelectItem>
												<SelectItem value="CAN">Canada</SelectItem>
												<SelectItem value="GBR">United Kingdom</SelectItem>
												<SelectItem value="NZL">New Zealand</SelectItem>
												<SelectItem value="DEU">Germany</SelectItem>
												<SelectItem value="FRA">France</SelectItem>
												<SelectItem value="JPN">Japan</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text"
											id="town"
											placeholder="Town / City"
											value={shippingInfo.city}
											onChange={(e) => handleShippingInfoChange('city', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text"
											id="zipCode"
											placeholder="Zip Code"
											value={shippingInfo.zipCode}
											onChange={(e) => handleShippingInfoChange('zipCode', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<input
											ref={addressInputRef}
											type="text"
											placeholder="Start typing your address..."
											value={shippingInfo.address}
											onChange={(e) => handleShippingInfoChange('address', e.target.value)}
											autoComplete="off"
											className="w-full border border-[--Black] rounded-full text-[--black] bg-white p-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[--lightGrey] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
										/>
									</div>
									{/* <div className="col-span-12">
										<Input
											type="text" 
											id="apartment" 
											placeholder="Apartment, suit, unit, etc. (Optional)"
											value={shippingInfo.apartment}
											onChange={(e) => handleShippingInfoChange('apartment', e.target.value)}
										/>
									</div> */}
								</>
							) : (
								<>
									{/* <div className="sm:col-span-6 col-span-12">
										<Select onValueChange={(value) => handlePaymentInfoChange('cardType', value)}>
											<SelectTrigger className="w-full"
											>
												<SelectValue placeholder="Credit Card" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="visa">Visa</SelectItem>
												<SelectItem value="mastercard">Mastercard</SelectItem>
												<SelectItem value="amex">American Express</SelectItem>
												<SelectItem value="discover">Discover</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text" 
											id="cardName" 
											placeholder="Name of Card"
											value={paymentInfo.cardName}
											onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text" 
											id="cardNumber" 
											placeholder="Card Number"
											value={paymentInfo.cardNumber}
											onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text" 
											id="expiration-date" 
											placeholder="Expiration Date (MM / YY)"
											value={paymentInfo.expiryDate}
											onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
										/>
									</div>
									<div className="sm:col-span-6 col-span-12">
										<Input
											type="text" 
											id="securityCode" 
											placeholder="Security Code"
											value={paymentInfo.securityCode}
											onChange={(e) => handlePaymentInfoChange('securityCode', e.target.value)}
										/>
									</div> */}
									<PaymentPage amount={(totalAmount + shippingAmount)} customer={customerInfo} shippingInfo={shippingInfo} back={prevStep} />
								</>
							)}
							<div className="flex justify-end col-span-12 gap-2">
								{currentStep < 3 && (
									<React.Fragment>
										{currentStep > 1 && (
											<Button variant={'light'} size={'small'} className="sm:w-[200px] w-full sm:shrink-0 shrink " onClick={prevStep}>
												Back
											</Button>
										)}
										<Button variant={'primary'} size={'small'} className="sm:w-[200px] w-full sm:shrink-0 shrink " onClick={nextStep}>
											{currentStep === 3 ? 'Place Order' : 'Next'}
										</Button>
									</React.Fragment>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Checkout;

