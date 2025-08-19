import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { api } from '../../services/api';
import type { Cart, Address, Card } from '../../services/api';
import { pricingEngine } from '../../utils/pricingEngine';
import { Input } from '@lib/components/ui/input';
import './css/style.css';
import { Button } from "@lib/components/ui/button";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@lib/components/ui/select"

interface CheckoutProps {
	// Add any props if needed in the future
}

function Checkout(props: CheckoutProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [show, setShow] = useState<boolean>(true);
	const [expandedProducts, setExpandedProducts] = useState<{ [key: number]: boolean }>({});
	const productSectionRef = React.useRef<HTMLDivElement>(null);

	// Add cart and checkout related state
	const [cart, setCart] = useState<Cart | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
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

	// Calculate totals
	const calculateSubtotal = () => {
		if (!cart || !cart.items) return 0;
		return cart.items.reduce((total, item) => {
			const itemPrice = getItemPriceValue(item);
			// Don't multiply by 100 since getItemPriceValue already returns dollars
			return total + (itemPrice * (item.quantity || 1));
		}, 0);
	};

	const getShippingFee = () => {
		// Static shipping fee for now
		return 20; // $20.00
	};

	const calculateTotal = () => {
		const subtotal = calculateSubtotal();
		const shipping = getShippingFee();
		return subtotal + shipping;
	};

	// Helper functions to handle different cart item formats (backend vs local)
	const getItemPrice = (item: any) => {
		// Handle different cart item formats (backend vs local)
		if (item.unit_price) {
			// Local cart format
			return `$${(item.unit_price / 100).toFixed(2)}`;
		} else if (item.calculatedPrice) {
			// Backend format with calculated price
			return `$${item.calculatedPrice.toFixed(2)}`;
		} else {
			// Backend format without calculated price - estimate from customizations
			const widthCustomization = item.customizations?.find((c: any) => c.name.toLowerCase().includes('width'));
			const heightCustomization = item.customizations?.find((c: any) => c.name.toLowerCase().includes('height'));
			
			if (widthCustomization && heightCustomization) {
				// Extract dimensions and calculate price using pricing engine
				let width = parseFloat(widthCustomization.value.replace(/[^\d.]/g, ''));
				let height = parseFloat(heightCustomization.value.replace(/[^\d.]/g, ''));
				
				// Convert to cm based on unit suffix or reasonable assumptions
				if (widthCustomization.value.includes('m') && !widthCustomization.value.includes('cm')) {
					// Value is in meters, convert to cm
					width = width * 100;
				} else if (width < 10) {
					// Legacy handling: if value seems to be in meters (less than 10), convert to cm
					width = width * 100;
				}
				
				if (heightCustomization.value.includes('m') && !heightCustomization.value.includes('cm')) {
					// Value is in meters, convert to cm
					height = height * 100;
				} else if (height < 10) {
					// Legacy handling: if value seems to be in meters (less than 10), convert to cm
					height = height * 100;
				}
				
				if (width > 0 && height > 0) {
					// Use comprehensive pricing engine for accurate calculation
					const productId = item.product_id || '1';
					
					// Map product ID to category for pricing engine
					const productCategories: { [key: string]: string } = {
						'1': 'shutters',
						'2': 'blinds', 
						'3': 'blinds',
						'4': 'curtains',
						'5': 'curtains',
						'6': 'blinds',
						'7': 'blinds',
						'8': 'blinds',
						'9': 'blinds',
						'10': 'blinds'
					};
					
					const productType = productCategories[productId] || 'blinds';
					
					// Calculate using comprehensive pricing engine
					const calculation = pricingEngine.calculatePrice(
						width, 
						height, 
						productType as any,
						{
							installation: 'standard'
						}
					);
					
					return `$${calculation.finalPrice.toFixed(2)}`;
				}
			}
			
			// Default fallback price based on product type
			const productId = item.product_id || '1';
			const basePrices: { [key: string]: number } = {
				'1': 150, // Shutters
				'2': 80,  // Blinds
				'3': 95,  // Blackout Blinds
				'4': 120, // Curtains
				'5': 140, // Premium Curtains
				'6': 75,  // Vertical Blinds
				'7': 115, // Double Roller
				'8': 110, // Roman Blinds
				'9': 85,  // Sunscreen
				'10': 90  // Cellular
			};
			
			return `$${(basePrices[productId] || 100).toFixed(2)}`;
		}
	};

	const getItemPriceValue = (item: any): number => {
		const priceStr = getItemPrice(item);
		return parseFloat(priceStr.replace('$', ''));
	};

	const getItemTitle = (item: any) => {
		// Handle different cart item formats
		if (item.title) {
			// Local cart format
			return item.title;
		} else if (item.product_id) {
			// Backend format - try to get product name from sample data
			const sampleProducts = [
				{ id: '1', title: 'Premium Plantation Shutters' },
				{ id: '2', title: 'Zebra Roller Blinds' },
				{ id: '3', title: 'Blackout Roller Blinds' },
				{ id: '4', title: 'Double Layer Curtains' },
				{ id: '5', title: 'Premium Single Curtains' },
				{ id: '6', title: 'Vertical Blinds Collection' },
				{ id: '7', title: 'Double Roller Blinds' },
				{ id: '8', title: 'Roman Blinds' },
				{ id: '9', title: 'Sunscreen Roller Blinds' },
				{ id: '10', title: 'Light Filtering Cellular Blinds' }
			];
			
			const product = sampleProducts.find(p => p.id === item.product_id);
			return product?.title || `Product ${item.product_id}`;
		}
		
		return 'Unknown Product';
	};

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);

	// Handle wheel events for product section scrolling
	const handleProductSectionWheel = React.useCallback((e: WheelEvent) => {
		if (productSectionRef.current) {
			e.preventDefault();
			e.stopPropagation();
			
			const element = productSectionRef.current;
			const scrollAmount = e.deltaY;
			element.scrollTop += scrollAmount;
		}
	}, []);

	React.useEffect(() => {
		const productElement = productSectionRef.current;
		if (productElement) {
			productElement.addEventListener('wheel', handleProductSectionWheel, { passive: false });
			
			return () => {
				productElement.removeEventListener('wheel', handleProductSectionWheel);
			};
		}
	}, [handleProductSectionWheel]);

	// Fetch checkout data
	// React.useEffect(() => {
	// 	const loadCheckoutData = async () => {
	// 		try {
	// 			setLoading(true);
	// 			setError('');
				
	// 			// Get customer email from localStorage
	// 			const customerData = localStorage.getItem('user');
	// 			const customer = customerData ? JSON.parse(customerData) : null;
				
	// 			if (!customer?.email) {
	// 				setError('Please log in to proceed with checkout');
	// 				setIsLoggedIn(false);
	// 				return;
	// 			}

	// 			setIsLoggedIn(true);
	// 			console.log('Loading checkout data for:', customer.email);

	// 			// Get updated customer profile from API
	// 			let actualCustomer = customer;
	// 			try {
	// 				console.log('Checkout - calling getUserProfile with email:', customer.email);
	// 				const userProfile = await api.getUserProfile(customer.email);
	// 				console.log('Checkout - received userProfile:', userProfile);
	// 				actualCustomer = userProfile;
					
	// 				// Additional check to see what we received
	// 				if (userProfile.first_name === 'Sample' && userProfile.last_name === 'User') {
	// 					console.error('⚠️ Checkout received SAMPLE DATA from getUserProfile!');
	// 				} else {
	// 					console.log('✅ Checkout received REAL DATA from getUserProfile');
	// 				}
					
	// 			} catch (profileError) {
	// 				console.error('Error loading user profile, using localStorage data:', profileError);
	// 				// Continue with localStorage data if API fails
	// 			}

	// 			// Load cart first (most important)
	// 			try {
	// 				const cartData = await api.getCart(actualCustomer.email);
	// 				console.log('Cart data loaded:', cartData);
	// 				console.log('Cart items count:', cartData?.items?.length || 0);
					
	// 				// Handle different cart response formats
	// 				let actualCart = cartData;
	// 				if (cartData && (cartData as any).cart) {
	// 					// Backend response format: {cart: {items: [...]}}
	// 					actualCart = (cartData as any).cart;
	// 					console.log('Using cart from nested format:', actualCart);
	// 				}
					
	// 				if (!actualCart || !actualCart.items || actualCart.items.length === 0) {
	// 					console.warn('Cart is empty or invalid:', actualCart);
	// 				}
					
	// 				setCart(actualCart);
	// 			} catch (cartError) {
	// 				console.error('Error loading cart:', cartError);
	// 				setError('Failed to load cart data. Please refresh the page or check your cart.');
	// 				return;
	// 			}

	// 			// Load addresses and cards (optional)
	// 			try {
	// 				const addressesData = await api.getUserAddresses(actualCustomer.email);
	// 				console.log('Addresses loaded:', addressesData);
	// 				setAddresses(addressesData);
					
	// 				// Auto-select first address if available
	// 				if (addressesData.length > 0) {
	// 					setSelectedAddress(addressesData[0]);
	// 				}
	// 			} catch (addressError) {
	// 				console.error('Error loading addresses:', addressError);
	// 				// Continue without addresses
	// 			}

	// 			try {
	// 				const cardsData = await api.getUserCards();
	// 				console.log('Cards loaded:', cardsData);
	// 				setCards(cardsData);
					
	// 				// Auto-select first card if available
	// 				if (cardsData.length > 0) {
	// 					setSelectedCard(cardsData[0]);
	// 				}
	// 			} catch (cardError) {
	// 				console.error('Error loading cards:', cardError);
	// 				// Continue without cards
	// 			}

	// 			// Pre-fill customer info if available
	// 			if (actualCustomer) {
	// 				setCustomerInfo({
	// 					firstName: actualCustomer.first_name || '',
	// 					lastName: actualCustomer.last_name || '',
	// 					email: actualCustomer.email || '',
	// 					phone: actualCustomer.phone || '',
	// 					company: ''
	// 				});
	// 			}

	// 		} catch (error) {
	// 			console.error('Error loading checkout data:', error);
	// 			setError('Failed to load checkout information');
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	loadCheckoutData();
	// }, []);

	// const processCheckout = async () => {
	// 	// Basic validation
	// 	if (!cart || !cart.items || cart.items.length === 0) {
	// 		alert('Your cart is empty. Please add items before checkout.');
	// 		return;
	// 	}

	// 	// Form validation
	// 	if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
	// 		alert('Please fill in all required customer information.');
	// 		setCurrentStep(1);
	// 		return;
	// 	}

	// 	if (!shippingInfo.state || !shippingInfo.city || !shippingInfo.zipCode || !shippingInfo.address) {
	// 		alert('Please fill in all required shipping information.');
	// 		setCurrentStep(2);
	// 		return;
	// 	}

	// 	if (!paymentInfo.cardType || !paymentInfo.cardName || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.securityCode) {
	// 		alert('Please fill in all required payment information.');
	// 		setCurrentStep(3);
	// 		return;
	// 	}

	// 	try {
	// 		setLoading(true);
			
	// 		// First, save customer information if user is logged in
	// 		if (isLoggedIn) {
	// 			try {
	// 				const customerUpdateData = {
	// 					first_name: customerInfo.firstName,
	// 					last_name: customerInfo.lastName,
	// 					email: customerInfo.email,
	// 					phone: customerInfo.phone
	// 				};
					
	// 				console.log('Updating customer information:', customerUpdateData);
	// 				// Get user ID from localStorage for the update
	// 				const customerData = localStorage.getItem('user');
	// 				const customer = customerData ? JSON.parse(customerData) : null;
	// 				if (customer?.id) {
	// 					await api.updateUserProfile(customer.id, customerUpdateData);
	// 					console.log('Customer information updated successfully');
	// 				}
	// 			} catch (customerError) {
	// 				console.error('Failed to update customer info:', customerError);
	// 				// Continue with checkout even if customer update fails
	// 			}
				
	// 			// Save shipping address
	// 			try {
	// 				const addressData = {
	// 					first_name: customerInfo.firstName,
	// 					last_name: customerInfo.lastName,
	// 					address_1: shippingInfo.address,
	// 					address_2: shippingInfo.apartment || '',
	// 					city: shippingInfo.city,
	// 					province: shippingInfo.state,
	// 					postal_code: shippingInfo.zipCode,
	// 					country_code: 'AU',
	// 					phone: customerInfo.phone,
	// 					company: shippingInfo.company || ''
	// 				};
					
	// 				console.log('Saving shipping address:', addressData);
	// 				const savedAddress = await api.createUserAddress(addressData);
	// 				console.log('Shipping address saved successfully:', savedAddress);
	// 				setSelectedAddress(savedAddress);
	// 			} catch (addressError) {
	// 				console.error('Failed to save shipping address:', addressError);
	// 				// Continue with checkout even if address saving fails
	// 			}
				
	// 			// Save payment method (card information)
	// 			try {
	// 				const cardData = {
	// 					card_type: paymentInfo.cardType,
	// 					card_name: paymentInfo.cardName,
	// 					card_number: paymentInfo.cardNumber.replace(/\s/g, ''), // Remove spaces
	// 					expiry_date: paymentInfo.expiryDate,
	// 					security_code: paymentInfo.securityCode
	// 				};
					
	// 				console.log('Saving payment method:', { ...cardData, card_number: '****', security_code: '***' }); // Log without sensitive data
	// 				const savedCard = await api.createUserCard(cardData);
	// 				console.log('Payment method saved successfully:', savedCard);
	// 				setSelectedCard(savedCard);
	// 			} catch (cardError) {
	// 				console.error('Failed to save payment method:', cardError);
	// 				// Continue with checkout even if card saving fails
	// 			}
	// 		}
			
	// 		// Prepare order data from form information
	// 		const orderData = {
	// 			email: customerInfo.email,
	// 			customer_info: {
	// 				firstName: customerInfo.firstName,
	// 				lastName: customerInfo.lastName,
	// 				email: customerInfo.email,
	// 				phone: customerInfo.phone,
	// 				company: customerInfo.company
	// 			},
	// 			shipping_address: {
	// 				first_name: customerInfo.firstName,
	// 				last_name: customerInfo.lastName,
	// 				address_1: shippingInfo.address,
	// 				address_2: shippingInfo.apartment || '',
	// 				city: shippingInfo.city,
	// 				province: shippingInfo.state,
	// 				postal_code: shippingInfo.zipCode,
	// 				country_code: 'AU', // Fixed to Australia
	// 				phone: customerInfo.phone,
	// 				company: shippingInfo.company || ''
	// 			},
	// 			billing_address: {
	// 				first_name: customerInfo.firstName,
	// 				last_name: customerInfo.lastName,
	// 				address_1: shippingInfo.address,
	// 				address_2: shippingInfo.apartment || '',
	// 				city: shippingInfo.city,
	// 				province: shippingInfo.state,
	// 				postal_code: shippingInfo.zipCode,
	// 				country_code: 'AU', // Fixed to Australia
	// 				phone: customerInfo.phone,
	// 				company: shippingInfo.company || ''
	// 			},
	// 			payment_method: 'card', // Keep it simple as string
	// 			shipping_method: 'standard'
	// 		};

	// 		console.log('Processing checkout with data:', orderData);

	// 		// Process the order
	// 		const order = await api.processCheckout(orderData);
	// 		console.log('Order processed successfully:', order);
			
	// 		alert('Order placed successfully! Your order number is: ' + (order.id || 'ORD-' + Date.now()));
			
	// 		// Only clear cart AFTER successful order
	// 		try {
	// 			await api.clearCart();
	// 			console.log('Cart cleared after successful order');
	// 		} catch (clearError) {
	// 			console.error('Warning: Failed to clear cart after order:', clearError);
	// 			// Don't block the success flow if cart clearing fails
	// 		}
			
	// 		// Redirect to success page or user orders
	// 		window.location.href = '/user';
			
	// 	} catch (error) {
	// 		console.error('Error processing checkout:', error);
	// 		alert('Failed to process checkout. Please try again. Error: ' + (error.message || 'Unknown error'));
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// Form input handlers
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

	const toggleProductDetails = (productIndex: number) => {
		setExpandedProducts(prev => ({
			...prev,
			[productIndex]: !prev[productIndex]
		}));
	};

	const isProductExpanded = (productIndex: number) => {
		return expandedProducts[productIndex] || false;
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
    
      // Function to move to the previous step
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
					<div className="w-full flex-1 min-h-0 flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 overflow-y-auto line-scroll" ref={productSectionRef}>
						{loading ? (
							<div className="flex justify-center items-center py-8">
								<p>Loading cart...</p>
							</div>
						) : error ? (
							<div className="flex justify-center items-center py-8 text-red-500">
								<p>{error}</p>
							</div>
						) : cart && cart.items && cart.items.length > 0 ? (
							cart.items.map((item, index) => (
								<div key={item.id || index} className="w-full flex flex-col gap-2.5 p-4 border border-[--Black] rounded-24">
									<div className="flex items-center gap-2">
										<div className="w-[64px] h-[64px] bg-primary rounded-xl shrink-0">
											<img
												src="/images/product/1.png"
												alt={getItemTitle(item)}
												className="w-full h-full object-cover rounded-xl"
											/>
										</div>
										<div className="w-full flex items-center justify-between">
											<h6 className="text-md">{getItemTitle(item)}</h6>
											<div className="flex flex-col items-end">
												<h6 className="text-md">{getItemPrice(item)}</h6>
												<p className="text-sm text-mediumGrey">Qty: {item.quantity || 1}</p>
											</div>
										</div>
									</div>
									<div className="w-fit mx-auto flex items-center justify-center cursor-pointer text-sm text-primary hover:text-[--Black]" onClick={() => toggleProductDetails(index)}>
										<p>{isProductExpanded(index) ? 'See Less' : 'See More'}</p>
										<Icon icon={isProductExpanded(index) ? "icon-park-outline:up" : "icon-park-outline:down"} />
									</div>
									{isProductExpanded(index) && (
										<div className="flex flex-col gap-2">
											<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
												<Icon icon="uil:plus" className="text-[18px]" />
												<div className="w-full h-[1px] bg-mediumGrey"></div>
												<Icon icon="uil:plus" className="text-[18px]" />
											</div>
											{item.variant && (
												<div className="w-full flex items-center justify-between text-sm text-black">
													<p>SKU:</p>
													<p>{item.variant.sku}</p>
												</div>
											)}
											
											{/* Customizations Display */}
											{item.customizations && item.customizations.length > 0 && (
												<div className="space-y-2">
													<div className="text-sm font-medium text-black">Customizations:</div>
													{item.customizations.map((custom, customIdx) => (
														<div key={customIdx} className="w-full flex items-center justify-between text-sm text-gray-600">
															<span className="font-medium">{custom.name}:</span>
															<span>{custom.value}</span>
														</div>
													))}
												</div>
											)}
											
											<div className="w-full flex items-center justify-between text-sm text-black">
												<p>Subtotal:</p>
												<p>${(getItemPriceValue(item) * (item.quantity || 1)).toFixed(2)}</p>
											</div>
										</div>
									)}
								</div>
							))
						) : !loading && (
							<div className="flex justify-center items-center py-8">
								<p>Your cart is empty</p>
								<button 
									className="ml-4 text-primary underline"
									onClick={() => window.location.href = '/shop'}
								>
									Continue Shopping
								</button>
							</div>
						)}
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-lg">SUBTOTAL</h5>
						<h5 className="text-lg">${calculateSubtotal().toFixed(2)}</h5>
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-lg">SHIPPING</h5>
						<h5 className="text-lg">${getShippingFee().toFixed(2)}</h5>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between shrink-0">
						<h5 className="text-xl">TOTAL</h5>
						<h5 className="text-xl">${calculateTotal().toFixed(2)}</h5>
					</div>
				</div>
				<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-48 xl:self-start">
					<div className="flex items-center gap-4">
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
						<div className="flex items-center justify-between">
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
												// onChange={(e) => handleShippingInfoChange('state', e.target.value)}
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
									<Button variant={'light'} size={'small'} className="w-[200px]" onClick={prevStep}>
										Back
									</Button>
								)}
								<Button variant={'primary'} size={'small'} className="w-[200px]" onClick={nextStep}>
									Next
								</Button>
							</div>
						</div>
					</div>
					{/* <div className={`flex flex-col gap-[32px] ${currentStep === 3 ? 'flex' : 'hidden'}`}>
						<div className="flex items-center justify-between">
							<h3 className="text-xxl uppercase">PaymenT Method</h3>
							{!isLoggedIn && (
								<div className="flex items-center gap-1 text-sm">
									<p>Already have an account? </p>
									<a href="/login" className="text-primary">Login</a>
								</div>
							)}
						</div>
						<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
							<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
								
								
							</div>
							<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
								<div className="w-full">
									
								</div>
								
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									
									
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="check-box">
									
									<div className="icon">
										<Icon icon="tabler:check" />
									</div>
									<label htmlFor="permanent" className="text-sm">Use a different billing address?</label>
								</div>
								<div className="flex items-center gap-2">
									<button className="w-[200px] cus-btn small shrink-0 stroke-black" onClick={prevStep}>
										Back
									</button>
									<button 
										className="w-[200px] cus-btn small primary shrink-0" 
										onClick={(e) => {
											e.preventDefault();
											processCheckout();
										}}
										disabled={loading}
									>
										{loading ? 'Processing...' : 'Submit'}
									</button>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	);
}

export default Checkout;

