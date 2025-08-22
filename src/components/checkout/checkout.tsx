import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Input } from '@lib/components/ui/input';
import './css/style.css';
import { Button } from "@lib/components/ui/button";
import OrderListComponent from "./order-list";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@lib/components/ui/select";

interface CheckoutProps {
	// Add any props if needed in the future
}

function Checkout(props: CheckoutProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [show, setShow] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [customerInfo, setCustomerInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		company: ''
	});
	const [shippingInfo, setShippingInfo] = useState({
		state: '',
		city: '',
		zipCode: '',
		address: '',
		apartment: '',
		company: ''
	});
	const [paymentInfo, setPaymentInfo] = useState({
		cardType: '',
		cardName: '',
		cardNumber: '',
		expiryDate: '',
		securityCode: '',
		differentBilling: false
	});

	const [orderList, setOrderList] = useState([
			{
			    id: 1,
			    title: "Product Name",
			    thumbnail: '/images/categories/1.png',
			    price: { amount: 150, currency_code: 'usd' },
			    options: [
			        { id: 1, name: "Color:", value: "Ash" },
			        { id: 2, name: "Size:", value: "24cm x 56cm" },
			        { id: 3, name: "Fit Type:", value: "Recess Fit" },
			        { id: 4, name: "Roll Direction:", value: "Front Roll" },
			        { id: 5, name: "Chain Colour:", value: "Silver" },
			        { id: 6, name: "Bracket Colour:", value: "Sandstone" },
			        { id: 7, name: "Base Rail Shape:", value: "Oval" },
			        { id: 8, name: "Base Rail Colour:", value: "Bone" },
			    ],
			    date: "2023-01-01",
			    status: "Shipped",
			},
			{
			    id: 2,
			    title: "Product 2",
			    thumbnail: '/images/categories/2.png',
			    price: { amount: 100, currency_code: 'usd' },
			    options: [
			        { id: 1, name: "Color:", value: "Ash" },
			        { id: 2, name: "Size:", value: "24cm x 56cm" },
			        { id: 3, name: "Fit Type:", value: "Recess Fit" },
			        { id: 4, name: "Roll Direction:", value: "Front Roll" },
			        { id: 5, name: "Chain Colour:", value: "Silver" },
			        { id: 6, name: "Bracket Colour:", value: "Sandstone" },
			        { id: 7, name: "Base Rail Shape:", value: "Oval" },
			        { id: 8, name: "Base Rail Colour:", value: "Bone" },
			    ],
			    date: "2023-01-02",
			    status: "Pending"
			}
		]);

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
    const nextStep = () => {
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

	return (
		<section className="checkout-section w-screen flex flex-col gap-[80px] pb-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="checkout">
			<div className="flex xl:flex-row flex-col gap-4 w-full xl:items-start">
				<div className="xl:w-[666px] w-full xl:h-[824px] flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black xl:shrink-0 rounded-48">
					<h4 className="text-xl shrink-0">YOUR ORDER</h4>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
						{orderList.length > 0 ? (
							<div className="w-full max-h-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 overflow-auto line-scroll" data-lenis-prevent>
                                {orderList.map((order,key) => (
                                    <OrderListComponent data={order} key={key}/>
                                ))}
                            </div>
                        ):(
							<div className=""></div>
						)}
					{/* </div> */}
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-lg">SUBTOTAL</h5>
						<h5 className="text-lg">$14000</h5>
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-lg">SHIPPING</h5>
						<h5 className="text-lg">$20.00</h5>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-xl">TOTAL</h5>
						<h5 className="text-xl">$14000</h5>
					</div>
				</div>
				<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-48 xl:self-start">
					<div className="hidden sm:flex items-center gap-4">
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 1 || currentStep === 2 ? 'border-[--primary] text-white bg-primary':'border-[--black] text-black'}`}>1</div>
							<p className="text-sm">Personal Info</p>
						</div>
						<div className="w-full h-[1px] bg-black"></div>
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 2 || currentStep === 3 ? 'border-[--primary] text-white bg-primary':'border-[--black] text-black'}`}>2</div>
							<p className="text-sm">Shipping Info</p>
						</div>
						<div className="w-full h-[1px] bg-black"></div>
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 3 ? 'border-[--primary] text-white bg-primary':'border-[--black] text-black'}`}>3</div>
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
						<div className={`w-full grid grid-cols-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 ${show?'fade-in':'fade-out'}`}>
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
									<div className="col-span-12">
										<Input
											type="text" 
											id="company" 
											placeholder="Company Name (Optional)"
											value={customerInfo.company}
											onChange={(e) => handleCustomerInfoChange('company', e.target.value)}
										/>
									</div>
									
								</>
							):currentStep === 2 ? (
								<>
									<div className="sm:col-span-6 col-span-12">
										<Select onValueChange={(value) => handleShippingInfoChange('state', value)}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="State" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="NSW">New South Wales</SelectItem>
												<SelectItem value="VIC">Victoria</SelectItem>
												<SelectItem value="QLD">Queensland</SelectItem>
												<SelectItem value="WA">Western Australia</SelectItem>
												<SelectItem value="SA">South Australia</SelectItem>
												<SelectItem value="TAS">Tasmania</SelectItem>
												<SelectItem value="NT">Northern Territory</SelectItem>
												<SelectItem value="ACT">Australian Capital Territory</SelectItem>
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
										<Input
											type="text" 
											id="address" 
											placeholder="House number and street name"
											value={shippingInfo.address}
											onChange={(e) => handleShippingInfoChange('address', e.target.value)}
										/>
									</div>
									<div className="col-span-12">
										<Input
											type="text" 
											id="apartment" 
											placeholder="Apartment, suit, unit, etc. (Optional)"
											value={shippingInfo.apartment}
											onChange={(e) => handleShippingInfoChange('apartment', e.target.value)}
										/>
									</div>
								</>
							):(
								<>
									<div className="sm:col-span-6 col-span-12">
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
									</div>
								</>
							)}
							<div className="flex justify-end col-span-12 gap-2">
								{ currentStep > 1 && (
									<Button variant={'light'} size={'small'} className="sm:w-[200px] w-full sm:shrink-0 shrink " onClick={prevStep}>
										Back
									</Button>
								)}
								<Button variant={'primary'} size={'small'} className="sm:w-[200px] w-full sm:shrink-0 shrink " onClick={nextStep}>
									Next
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Checkout;

