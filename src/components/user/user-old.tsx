import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { api } from "../../services/api";
import type { Order, Address } from "../../services/api";
import { debugApi } from "../../utils/debugApi";

interface UserType {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

interface Card {
  id: string;
  card_type: string;
  card_name: string;
  card_number: string;
  expiry_date: string;
  security_code: string;
}

function User() {
  const [user, setUser] = useState<UserType | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState("orders");
  const [fade, setFade] = useState("in");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});
  const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});

  const fetchUserData = async () => {
    try {
      // Only access localStorage on client side
      if (typeof window === 'undefined') return;
      
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      console.log('User component - localStorage user data:', user);
      
      if (!user?.email) {
        setError('Please log in to view profile');
        return;
      }
      
      console.log('User component - calling getUserProfile with email:', user.email);
      const userProfile = await api.getUserProfile(user.email);
      console.log('User component - received userProfile:', userProfile);
      
      setUser(userProfile);
      
      // Additional check to see what we actually set
      if (userProfile.first_name === 'Sample' && userProfile.last_name === 'User') {
        console.error('⚠️ User component received SAMPLE DATA from getUserProfile!');
      } else {
        console.log('✅ User component received REAL DATA from getUserProfile');
      }
      
    } catch (err) {
      console.error("Failed to fetch user:", err);
      // Don't set error for user profile, just use localStorage data
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          console.log('User component - using fallback localStorage data:', user);
          setUser({
            id: user.id || '',
            email: user.email || '',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            phone: user.phone || '',
          });
        }
      }
    }
  };

  const fetchOrders = async () => {
    try {
      // Only access localStorage on client side
      if (typeof window === 'undefined') return;
      
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      if (!user?.email) {
        return;
      }
      const ordersData = await api.getUserOrders(user.email);
      console.log("Orders data fetched:", ordersData);
      setOrders(ordersData || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]); // Set empty array on error
    }
  };

  const fetchAddresses = async () => {
    try {
      // Only access localStorage on client side
      if (typeof window === 'undefined') return;
      
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      if (!user?.email) {
        return;
      }
      const addressesData = await api.getUserAddresses(user.email);
      console.log("Addresses data fetched:", addressesData);
      setAddresses(addressesData || []);
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
      setAddresses([]); // Set empty array on error
    }
  };

  const fetchCards = async () => {
    try {
      // Note: This would need to be implemented in the API service if available
      console.log("Cards functionality not yet implemented in API service");
      setCards([]);
    } catch (err) {
      console.error("Failed to fetch cards:", err);
    }
  };

  // Address CRUD operations
  const createAddress = async (addressData: Omit<Address, 'id'>) => {
    try {
      const newAddr = await api.createUserAddress(addressData);
      console.log("Address created:", newAddr);
      // Refresh addresses after creation
      await fetchAddresses();
      return newAddr;
    } catch (err) {
      console.error("Failed to create address:", err);
      throw err;
    }
  };

  const updateAddress = async (addressId: string, addressData: Partial<Address>) => {
    try {
      const updatedAddr = await api.updateUserAddress(addressId, addressData);
      console.log("Address updated:", updatedAddr);
      // Refresh addresses after update
      await fetchAddresses();
      return updatedAddr;
    } catch (err) {
      console.error("Failed to update address:", err);
      throw err;
    }
  };

  // Handle address form functions
  const handleCreateAddress = async () => {
    try {
      if (!newAddress.first_name || !newAddress.last_name || !newAddress.address_1 || 
          !newAddress.city || !newAddress.postal_code || !newAddress.country_code) {
        setError("Please fill in all required address fields");
        return;
      }

      await createAddress(newAddress as Omit<Address, 'id'>);
      setNewAddress({});
      setEditingAddress(null);
      setError(null);
    } catch (error) {
      console.error("Error creating address:", error);
      setError("Failed to create address");
    }
  };

  const handleUpdateAddress = async (addressId: string, updatedData: Partial<Address>) => {
    try {
      await updateAddress(addressId, updatedData);
      setEditingAddress(null);
      setError(null);
    } catch (error) {
      console.error("Error updating address:", error);
      setError("Failed to update address");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (tab: string) => {
    setFade("out");
    setTimeout(() => {
      setCurrentTab(tab);
      setFade("in");
    }, 200);
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const isOrderExpanded = (orderId: string) => {
    return expandedOrders[orderId] || false;
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      
      // Check if user is logged in (only on client side)
      if (typeof window === 'undefined') return; // Skip on server side
      
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      if (!user?.email) {
        // Redirect to login if not authenticated
        window.location.href = '/login';
        return;
      }
      
      // Debug: Test API endpoints (only in development and client-side)
      // Re-enabled to test real backend connection
      if (process.env.NODE_ENV === 'development') {
        console.log('Running API debug tests...');
        await debugApi.runAllTests(user.email);
      }
      
      try {
        await Promise.all([
          fetchUserData(),
          fetchOrders(),
          fetchAddresses(),
          fetchCards(),
        ]);
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
        <div className="relative w-screen h-[88vh] flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 overflow-hidden" id="user">
            {loading ? (
                <div className="w-full flex items-center justify-center text-lg">Loading...</div>
            ) : error ? (
                <div className="w-full flex items-center justify-center text-lg text-red-500">{error}</div>
            ) : (
            <>
            <div className="xl:w-[480px] w-full h-full flex flex-col justify-between gap-[48px] xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-[48px] bg-primary rounded-48 text-white xl:shrink-0">
                <div className="w-full flex flex-col gap-[48px]">
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-[150px] h-[150px] rounded-[100%]">
                            {imageSrc == ''?(
                                <>
                                    <input type="file" className="hidden" id="user-image" accept=".jpg, .jpeg, .png" onChange={handleImageChange}  />
                                    <label htmlFor="user-image" className="relative w-full h-full flex items-center justify-center border border-[--white] rounded-[100%]">
                                        <Icon icon="ph:camera" className="text-[50px] text-white" />
                                        <div className="absolute right-[14px] bottom-[12px] w-[18px] h-[18px] bg-primary flex items-center justify-center">
                                            <Icon icon="mynaui:plus-solid" className="text-[18px] text-white" />
                                        </div>
                                    </label>
                                </>
                            ):(
                                <img src={imageSrc} alt="Selected" className="w-full h-full object-cover rounded-[100%]" />
                            )}
                        </div>
                        <h4 className="text-xl">{user ? `${user.first_name} ${user.last_name}` : 'NAME OF PERSON'}</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">DETAIL</h5>
                        <div className="flex items-center gap-2 text-md">
                            <p>Email:</p>
                            <a href={`mailto:${user?.email || ''}`} className="transition hover:text-[--Black]">{user?.email || 'example@gmail.com'}</a>
                        </div>
                        <div className="flex items-center gap-2 text-md">
                            <p>Phone:</p>
                            <a href={`tel:${user?.phone || ''}`} className="transition hover:text-[--Black]">{user?.phone || '+123456789'}</a>
                        </div>
                        <div className="flex items-center gap-2 text-md">
                            <p>Company Name:</p>
                            <a href="" className="transition hover:text-[--Black]">AITHUR</a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="w-full cus-btn white">Edit Profile</button>
                    <button className="w-full cus-btn stroke">Log Out</button>
                </div>
            </div>
            <div className="w-full h-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <div className="w-full flex xl:flex-row flex-col items-center justify-center xl:gap-4 sm:gap-2 gap-2 p-3 border border-[--Black] rounded-48 shrink-0 overflow-x-auto">
                    <button className={`xl:w-full w-[200px] cus-btn tab-btn ${currentTab === 'orders'&&'active'}`} onClick={() => handleTabChange('orders')}>
                        Order History
                    </button>
                    <button className={`xl:w-full w-[200px] cus-btn tab-btn ${currentTab === 'address'&&'active'}`} onClick={() => handleTabChange('address')}>
                        Address Book
                    </button>
                    <button className={`xl:w-full w-[200px] cus-btn tab-btn ${currentTab === 'payment'&&'active'}`} onClick={() => handleTabChange('payment')}>
                        Payment Options
                    </button>
                </div>
                <div className={`transition-opacity duration-200 ${fade === 'in' ? 'opacity-100' : 'opacity-0'}`}> 
                {
                    currentTab === 'orders'?(
                        <div className="w-full h-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black xl:overflow-hidden overflow-auto scroll-hidden" id="order-history">
                            {orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Icon icon="mdi:package-variant" className="text-2xl text-gray-400" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg font-medium text-gray-600">No orders yet</h3>
                                            <p className="text-sm text-gray-500">Your order history will appear here after you make a purchase</p>
                                        </div>
                                        <button 
                                            className="cus-btn primary small"
                                            onClick={() => window.location.href = '/shop'}
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                </div>
                            ) : orders.map(order => (
                                <div key={order.id} className="w-full flex flex-col gap-2.5 p-4 border border-[--Black] rounded-24">
                                    <div className="flex items-center gap-2">
                                        <div className="w-[64px] h-[64px] bg-primary rounded-xl shrink-0"></div>
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <h6 className="text-md">{order.items[0]?.title || 'Order'}</h6>
                                                {order.items.length > 1 && (
                                                    <p className="text-sm text-gray-600">+{order.items.length - 1} more items</p>
                                                )}
                                                <p className="text-sm text-mediumGrey">Order #{order.id}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <h6 className="text-md">${(order.total / 100).toFixed(2)}</h6>
                                                <p className="text-sm text-mediumGrey">Status: <span className="capitalize">{order.status}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-fit mx-auto flex items-center justify-center cursor-pointer text-sm text-primary hover:text-[--Black]" onClick={() => toggleOrderDetails(order.id)}>
                                        <p>{isOrderExpanded(order.id) ? 'See Less' : 'See More'}</p>
                                        <Icon icon={isOrderExpanded(order.id) ? "icon-park-outline:up" : "icon-park-outline:down"} />
                                    </div>
                                    {isOrderExpanded(order.id) && (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                                                <Icon icon="uil:plus" className="text-[18px]" />
                                                <div className="w-full h-[1px] bg-mediumGrey"></div>
                                                <Icon icon="uil:plus" className="text-[18px]" />
                                            </div>
                                            
                                            {/* Order Items */}
                                            <div className="space-y-3">
                                                <div className="text-sm font-medium text-gray-700">Order Items:</div>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div className="flex-1">
                                                                <h6 className="text-sm font-medium">{item.title}</h6>
                                                                <p className="text-xs text-gray-600">Qty: {item.quantity} • ${(item.unit_price / 100).toFixed(2)} each</p>
                                                            </div>
                                                            <div className="text-sm font-medium">
                                                                ${((item.unit_price * item.quantity) / 100).toFixed(2)}
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Item Customizations */}
                                                        {item.customizations && item.customizations.length > 0 && (
                                                            <div className="border-t border-gray-200 pt-2 mt-2">
                                                                <div className="text-xs font-medium text-gray-700 mb-1">Customizations:</div>
                                                                <div className="grid grid-cols-2 gap-1 text-xs">
                                                                    {item.customizations.map((custom, customIdx) => (
                                                                        <div key={customIdx} className="flex justify-between">
                                                                            <span className="text-gray-600">{custom.name}:</span>
                                                                            <span className="text-gray-800 font-medium">{custom.value}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="w-full flex items-center justify-between text-sm text-black">
                                                <p>Order Total:</p>
                                                <p>${(order.total / 100).toFixed(2)}</p>
                                            </div>
                                            
                                            <div className="w-full flex justify-center">
                                                <button className="cus-btn text-sm small shrink-0">
                                                    Reorder
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ):currentTab === 'address'?(
                        <div className="w-full max-h-full grid grid-cols-1 xl:grid-cols-2 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black" id="address">
                            {/* Always show Add Address card first */}
                            <div className="w-full flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                <h5 className="text-lg text-center">ADD NEW ADDRESS</h5>
                                <button className="w-fit cus-btn text-sm small">
                                    Add Address
                                </button>
                            </div>
                            {/* Show real addresses from backend or no addresses message */}
                            {addresses.length === 0 ? (
                                <div className="w-full flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                    <h5 className="text-lg text-center">No address found</h5>
                                    <p className="text-sm text-center text-gray-600">Add your first address to get started</p>
                                </div>
                            ) : addresses.map((address, idx) => (
                                <div key={address.id || idx} className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                    <div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between gap-2">
                                        <h5 className="text-lg">ADDRESS</h5>
                                        <button className="cus-btn text-sm xl:w-fit w-full"
                                                onClick={() => setEditingAddress(address.id || 'edit')}>
                                            Edit
                                        </button>
                                    </div>
                                    <p className="text-md xl:w-[80%] w-full">
                                        {address.address_1}
                                        {address.address_2 ? `, ${address.address_2}` : ''}
                                        {address.city ? `, ${address.city}` : ''}
                                        {address.postal_code ? `, ${address.postal_code}` : ''}
                                        {address.country_code ? `, ${address.country_code}` : ''}
                                    </p>
                                    <div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between gap-2">
                                        <h5 className="text-md">
                                            {address.first_name || ''} {address.last_name || ''}
                                        </h5>
                                        <span className="flex items-center gap-2 text-md transition hover:text-[--primary]">
                                            <Icon icon="material-symbols:home" />
                                            Home
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ):currentTab === 'payment'?(
                        <div className="w-full max-h-full grid grid-cols-1 xl:grid-cols-2 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black" id="payment">
                            {/* Always show Add Card card first */}
                            <div className="w-full flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                <h5 className="text-lg text-center">ADD NEW CARD</h5>
                                <button className="w-fit cus-btn text-sm small">
                                    Add Card
                                </button>
                            </div>
                            {cards.length === 0 ? (
                                <div className="w-full flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                    <h5 className="text-lg text-center">No cards found.</h5>
                                </div>
                            ) : cards.map((card, idx) => (
                                <div key={idx} className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                <div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between gap-2">
                                    <h5 className="text-lg">CARD</h5>
                                    <button className="cus-btn text-sm xl:w-fit w-full">
                                        Edit
                                    </button>
                                </div>
                                    <p className="text-md xl:w-[80%] w-full">{card.card_name || 'Card Name'}</p>
                                <div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between gap-2">
                                        <h5 className="text-md">Number: ****{card.card_number?.slice(-4) || 'XXXX'}</h5>
                                        <span className="flex items-center gap-2 text-md transition hover:text-[--primary]">
                                            <span className="text-sm">{card.card_type}</span>
                                            {card.expiry_date || 'MM/YY'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ):null
                }
                </div>
            </div>
            </>
            )}
        </div>
  );
};

export default User;