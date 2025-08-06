import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import $ from 'jquery';
import gsap from "gsap";
import { api } from '../../services/api';
import type { Cart, CartItem } from '../../services/api';
import { pricingEngine } from '../../utils/pricingEngine';

import './css/style.css';

interface CartProps {
    // Add any props if needed in the future
}

function Cart(props: CartProps) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        $('.open__cartPopup').on('click', function () {
            $('body').addClass('scroll-none');
            $('#cartPopup').show();
            $('#back-drop').css({ 'pointerEvents': 'auto', 'opacity': 1 });
            $('#cartPopup').css({ height: '100vh', pointerEvents: 'auto', display: 'block' });
            loadCart();
        })
    }, []);

    const loadCart = async (isRefetch: boolean = false) => {
        try {
            if (isRefetch) {
                setIsRefetching(true);
            } else {
                setLoading(true);
            }
            setError(null);
            
            // Get customer email from localStorage
            const customerData = localStorage.getItem('user');
            const customer = customerData ? JSON.parse(customerData) : null;
            const email = customer?.email;
            
            console.log(isRefetch ? 'Refetching cart for email:' : 'Loading cart for email:', email);
            
            const cartData: any = await api.getCart(email);
            console.log('Cart data fetched from backend:', cartData);
            
            // Process backend cart format
            let processedCart;
            if (cartData.cart) {
                // Backend returned {cart: {...}} format
                processedCart = cartData.cart;
            } else if (cartData.id) {
                // Backend returned cart data directly
                processedCart = cartData;
            } else {
                // Fallback to empty cart
                processedCart = { 
                    id: '', 
                    items: [], 
                    total: 0, 
                    subtotal: 0, 
                    tax_total: 0, 
                    shipping_total: 0 
                };
            }
            
            // Ensure we always get a proper cart structure
            const sanitizedCart = {
                id: processedCart.id || '',
                items: processedCart.items || [],
                total: processedCart.total || 0,
                subtotal: processedCart.subtotal || 0,
                tax_total: processedCart.tax_total || 0,
                shipping_total: processedCart.shipping_total || 0
            };
            
            console.log('Processed cart data:', sanitizedCart);
            setCart(sanitizedCart);
            
            // Don't clear localStorage cart data - we need it for cart operations
            // The localStorage cart is our primary data source in sample mode
        } catch (error) {
            console.error('Error loading cart:', error);
            setError('Failed to load cart');
            // Set empty cart on error
            setCart({ id: '', items: [], total: 0, subtotal: 0, tax_total: 0, shipping_total: 0 });
        } finally {
            if (isRefetch) {
                setIsRefetching(false);
            } else {
                setLoading(false);
            }
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (quantity <= 0) return; // Prevent negative quantities
        
        try {
            setError(null);
            setUpdatingItems(prev => new Set(prev.add(itemId)));
            
            console.log(`Updating item ${itemId} to quantity ${quantity}`);
            console.log('Current cart before update:', cart);
            console.log('All cart item IDs:', cart?.items?.map(item => item.id));
            
            // Call the API to update quantity - this will update localStorage
            const updatedCart = await api.updateCartItem(itemId, quantity);
            console.log('Cart item updated successfully:', updatedCart);
            
            // Directly set the updated cart instead of refetching
            setCart(updatedCart);
            console.log('Cart UI updated with new data');
            
        } catch (error) {
            console.error('Error updating cart:', error);
            setError('Failed to update item quantity');
            
            // Try to reload from localStorage on error
            console.log('Reloading cart from localStorage after error...');
            try {
                const fallbackCart = await api.getCart();
                setCart(fallbackCart);
            } catch (loadError) {
                console.error('Error reloading cart after failed update:', loadError);
                setError('Failed to refresh cart. Please refresh the page.');
            }
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const removeItem = async (itemId: string) => {
        try {
            setError(null);
            setUpdatingItems(prev => new Set(prev.add(itemId)));
            
            console.log(`Removing item ${itemId} from cart`);
            
            // Call the API to remove item - this will update localStorage
            const updatedCart = await api.removeFromCart(itemId);
            console.log('Cart item removed successfully:', updatedCart);
            
            // Directly set the updated cart instead of refetching
            setCart(updatedCart);
            console.log('Cart UI updated after item removal');
            
        } catch (error) {
            console.error('Error removing item:', error);
            setError('Failed to remove item');
            
            // Try to reload from localStorage on error
            console.log('Reloading cart from localStorage after error...');
            try {
                const fallbackCart = await api.getCart();
                setCart(fallbackCart);
            } catch (loadError) {
                console.error('Error reloading cart after failed removal:', loadError);
                setError('Failed to refresh cart. Please refresh the page.');
            }
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const clearCart = async () => {
        try {
            setError(null);
            await api.clearCart();
            console.log('Cart cleared');
            setCart({ id: '', items: [], total: 0, subtotal: 0, tax_total: 0, shipping_total: 0 });
        } catch (error) {
            console.error('Error clearing cart:', error);
            setError('Failed to clear cart');
        }
    };

    const addToCart = async (productData: { 
        email: string;
        product_id: string; 
        quantity: number; 
        customizations?: any 
    }) => {
        try {
            setError(null);
            
            console.log('Adding item to cart:', productData);
            
            const updatedCart = await api.addToCart(productData);
            console.log('Item added to cart:', updatedCart);
            
            setCart(updatedCart);
            return updatedCart;
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError('Failed to add item to cart');
            throw error;
        }
    };

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
                // Extract dimensions and calculate basic price
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

    const getTotalPrice = () => {
        if (!cart) return '$0.00';
        
        // Always calculate total from items for consistency
        if (cart.items && cart.items.length > 0) {
            let total = 0;
            cart.items.forEach(item => {
                const itemPriceStr = getItemPrice(item);
                const itemPrice = parseFloat(itemPriceStr.replace('$', ''));
                if (!isNaN(itemPrice)) {
                    total += itemPrice * item.quantity;
                }
            });
            
            console.log('Calculated cart total:', total, 'from', cart.items.length, 'items');
            return `$${total.toFixed(2)}`;
        }
        
        // Fallback to cart.total if no items but total exists
        if (cart.total !== undefined && cart.total > 0) {
            return `$${(cart.total / 100).toFixed(2)}`;
        }
        
        return '$0.00';
    };
    
    const cartClose = () => {
        $('#cartPopup').css({ height: '0', pointerEvents: 'none', display: 'none' });
        $('#back-drop').css({ opacity: '0', pointerEvents: 'none' });
        $('body').removeClass('scroll-none');
    };


    return (
        <>
            <div className="fixed left-0 top-0 z-[100] contact-popup w-screen h-0 overflow-hidden hidden pointer-events-none" id="cartPopup">
                <div className="w-screen h-screen xl:p-[1.25vw] sm:p-[2.344vw] p-4">
                    <div className="max-w-[640px] w-full min-h-[694px] max-h-screen h-auto ml-auto mr-4 bg-white flex flex-col xl:p-[1.25vw] sm:p-[2.344vw] p-4 rounded-48 box-border">
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 shrink-0">
                            <div className="flex items-center justify-between gap-4 text-black">
                                <h3 className="text-xxl">Cart</h3>
                                <button className="close-button" onClick={cartClose}>
                                    <span className="leftright"></span>
                                    <span className="rightleft"></span>
                                </button>
                            </div>
                            
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                    ❌ {error}
                                </div>
                            )}
                            
                            {/* Refetching Indicator */}
                            {isRefetching && (
                                <div className="p-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"></div>
                                    Updating cart...
                                </div>
                            )}
                            
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                                <div className="w-full h-[1px] bg-mediumGrey"></div>
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                            </div>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto scroll-hidden mb-4">
                            {loading && (
                                <div className="text-center py-8">Loading cart...</div>
                            )}

                            {!loading && (!cart || !cart.items || cart.items.length === 0) && (
                                <div className="text-center py-8">
                                    <p>Your cart is empty</p>
                                    <div className="flex justify-center">
                                        <button
                                            className="cus-btn mt-4"
                                            onClick={() => window.location.href = '/shop'}
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!loading && cart && cart.items && cart.items.length > 0 && cart.items.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="w-full flex items-stretch gap-4 pb-4">
                                    <div className="w-[88px] h-[88px] bg-primary rounded-[15px] shrink-0">
                                        <img
                                            src="/images/product/1.png"
                                            alt={getItemTitle(item)}
                                            className="w-full h-full object-cover rounded-[15px]"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col justify-between gap-2">
                                        <div className="flex items-center justify-between gap-4">
                                            <h6 className="text-md text-black">{getItemTitle(item)}</h6>
                                            <span className="text-md text-black">{getItemPrice(item)}</span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="quantity flex items-center border border-gray-300 rounded-md overflow-hidden">
                                                <button
                                                    className="px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || updatingItems.has(item.id)}
                                                    data-item-id={item.id}
                                                >
                                                    <Icon icon="uil:minus" />
                                                </button>
                                                <input
                                                    type="text"
                                                    value={updatingItems.has(item.id) ? "..." : item.quantity}
                                                    readOnly
                                                    className="w-10 text-center bg-white border-l border-r border-gray-300"
                                                    data-item-id={item.id}
                                                />
                                                <button
                                                    className="px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={updatingItems.has(item.id)}
                                                    data-item-id={item.id}
                                                >
                                                    <Icon icon="uil:plus" />
                                                </button>
                                            </div>

                                            <span
                                                className={`text-md text-[--danger] cursor-pointer border border-black rounded-xl p-2.5 w-10 h-10 flex items-center justify-center transition hover:bg-gray-100 ${updatingItems.has(item.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                onClick={() => !updatingItems.has(item.id) && removeItem(item.id)}
                                                data-item-id={item.id}
                                            >
                                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M4.26489 5.85706L4.75971 15.2463C4.83591 16.7102 6.0419 17.8571 7.5058 17.8571H12.2099C13.6738 17.8571 14.8798 16.7101 14.956 15.2467L15.4508 5.85706H4.26489Z" fill="#D72B2A" />
                                                    <path d="M16.1072 4.85706H12.8572V3.60706C12.8572 2.64226 12.072 1.85706 11.1072 1.85706H8.60718C7.64238 1.85706 6.85718 2.64226 6.85718 3.60706V4.85706H3.60718C3.19308 4.85706 2.85718 5.19296 2.85718 5.60706C2.85718 6.02116 3.19308 6.35706 3.60718 6.35706H16.1072C16.5213 6.35706 16.8572 6.02116 16.8572 5.60706C16.8572 5.19296 16.5213 4.85706 16.1072 4.85706ZM8.35718 3.60706C8.35718 3.47136 8.47148 3.35706 8.60718 3.35706H11.1072C11.2429 3.35706 11.3572 3.47136 11.3572 3.60706V4.85706H8.35718V3.60706Z" fill="#D72B2A" />
                                                </svg>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 shrink-0 bg-white pt-2">
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                                <div className="w-full h-[1px] bg-mediumGrey"></div>
                                <Icon icon="uil:plus" className="text-[18px] text-[--mediumGrey]" />
                            </div>
                            <div className="flex items-center justify-between shrink-0">
                                <h3 className="text-xl">TOTAL</h3>
                                <span className="text-xl">{getTotalPrice()}</span>
                            </div>
                            <button
                                className="cus-btn primary text-center"
                                onClick={() => {
                                    cartClose();
                                    window.location.href = '/checkout';
                                }}
                                disabled={!cart || !cart.items || cart.items.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;

