import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { AddAddress } from './add-address';
import { EditAddress } from './edit-address';
import { AddCard } from './add-card';
import { EditCard } from './edit-card';
import OrderList from "./orderList";
import UserDetail from "./userDetail";

type Address = {
    id: string | number;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
};
type PaymentCard = {
    id: string | number;
    cardType: string;
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvvCode: string;
    createdAt: string;
};
function User() {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [user, setUser] = useState({});
    const [addressList, setAddressList] = useState<Address[]>([]);
    const [paymentDetail, setPaymentDetail] = useState<PaymentCard[]>([]);
    const [currentTab, setCurrentTab] = useState("payment");
    const [show, setShow] = useState(true);

//     useEffect(() => {
//     async function getOrders() {
//       // Ye code ab sirf client pe chalega
//       const email = localStorage.getItem("userEmail");
//       if (!email) {
//         console.error("Email not found in localStorage");
//         return;
//       }

//       const ordersData = await fetchMedusaApi<any>({
//         endpoint: "/store/customers/order",
//         query: { email },
//       });

//       setOrderList(ordersData);
//       console.log("Orders:", ordersData);
//     }

//     getOrders();
//   }, []);


    const handleAddAddress = (newAddress) => {
        console.log('New Address:', newAddress);
        setAddressList(prev => [...prev, newAddress]);
    };
    const handleUpdateAddress = (updatedAddress) => {
        setAddressList(prev => 
            prev.map(address => 
                address.id === updatedAddress.id ? updatedAddress : address
            )
        );
    };
    const handleAddCard = (newCard) => {
        setPaymentDetail(prev => [...prev, newCard]);
    };
    const handleUpdateCard = (updatedCard) => {
        setPaymentDetail(prev => 
            prev.map(card => 
                card.id === updatedCard.id ? updatedCard : card
            )
        );
    };
    const handleTabChange = (tab: string) => {
        setShow(false);
        setTimeout(() => {
        setCurrentTab(tab);
        setShow(true);
        }, 300);
    };
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.normalizeScroll(true);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }
    }, [lenis]);

  return (
        <div className="w-screen flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 overflow-hidden" id="user">
            
            <UserDetail />
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <div className="w-full border border-[--Black] sm:rounded-[48px] rounded-full sm:p-3 p-1 shrink-0">
                    <div className="relative flex items-stretch">
                        <span className={`absolute w-[33%] h-full top-0 left-0 rounded-full bg-[--primary] transition ${currentTab === 'orders'?'left-0':currentTab === 'address'?'left-[33%]':'left-[67%]'}`}/>
                        <button className={`relative z-10 w-full sm:p-6 p-4 text-center xl:text-[1.458vw] sm:text-[2.734vw] text-[12px] sm:font-extrabold font-normal sm:font-plus font-roboto leading-snug transition ${currentTab === 'orders'?'text-[--white]':'text-[--Black]'}`} onClick={() => handleTabChange('orders')}>
                            Order History
                        </button>
                        <button className={`relative z-10 w-full sm:p-6 p-4 text-center xl:text-[1.458vw] sm:text-[2.734vw] text-[12px] sm:font-extrabold font-normal sm:font-plus font-roboto leading-snug transition ${currentTab === 'address'?'text-[--white]':'text-[--Black]'}`} onClick={() => handleTabChange('address')}>
                            Address Book
                        </button>
                        <button className={`relative z-10 w-full sm:p-6 p-4 text-center xl:text-[1.458vw] sm:text-[2.734vw] text-[12px] sm:font-extrabold font-normal sm:font-plus font-roboto leading-snug transition ${currentTab === 'payment'?'text-[--white]':'text-[--Black]'}`} onClick={() => handleTabChange('payment')}>
                            Payment Options
                        </button>
                    </div>
                </div>
                <div className={`w-full ${show ? 'fade-in' : 'fade-out'}`}> 
                {
                    currentTab === 'orders'?(
                        <OrderList />
                    ):currentTab === 'address'?(
                        <div className="w-full grid grid-cols-12 gap-4" >
                            {addressList.length > 0 ? (
                                <React.Fragment>
                                    {addressList.map((address) => (
                                        <div key={address.id} className="sm:col-span-6 col-span-12 flex flex-col gap-6 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                            <div className="w-full flex items-center justify-between">
                                                <h5 className="text-lg">ADDRESS</h5>
                                                <EditAddress 
                                                    address={address} 
                                                    onAddressUpdate={handleUpdateAddress} 
                                                />
                                            </div>
                                            <p>{address.address} , {address.state}, {address.city}</p>
                                            <div className="flex items-center gap-2 justify-between">
                                                <p className="text-md text-[--Black]">Postal Code: {address.zipCode}</p>
                                                <div className="flex items-center gap-1">
                                                    {address.apartment && <span className="text-md text-[--Black]">Apartment: {address.apartment}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                        <h5 className="text-lg text-center">WANT TO ADD A NEW ADDRESS?</h5>
                                        <AddAddress onAddressAdd={handleAddAddress}/>
                                    </div>
                                </React.Fragment>
                            ):(
                                <React.Fragment>
                                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                        <h5 className="text-lg text-center">No address found</h5>
                                        <p className="text-sm text-center text-gray-600">Add your first address to get started</p>
                                    </div>
                                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                        <h5 className="text-lg text-center">ADD New ADDRESS</h5>
                                        <AddAddress onAddressAdd={handleAddAddress}/>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    ):currentTab === 'payment'&&(
                        <div className="w-full grid grid-cols-12 gap-4">
                            {paymentDetail.length > 0 ? (
                                <React.Fragment>
                                    {paymentDetail.map((card) => (
                                        <div key={card.id} className="sm:col-span-6 col-span-12 flex flex-col gap-6 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                            <div className="w-full flex items-center justify-between">
                                                <h5 className="text-lg">{card.cardName}</h5>
                                                <EditCard card={card} onCardUpdate={handleUpdateCard} />
                                            </div>
                                            <p className="text-md text-[--Black]">Credit Card Number: ****{card.cardNumber.slice(-4)}</p>
                                            <div className="flex items-center gap-2 justify-between">
                                                <p className="text-md text-[--Black]">Expires: {card.expiryDate}</p>
                                                <p className="text-md text-[--Black]">CVV: {card.cvvCode}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                        <h5 className="text-lg text-center">WANT TO ADD A NEW CARD?</h5>
                                        <AddCard onCardAdd={handleAddCard} />
                                    </div>
                                </React.Fragment>
                            ):(
                                <React.Fragment>
                                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                        <h5 className="text-lg text-center">No cards found</h5>
                                        <p className="text-sm text-center text-gray-600">Add your first card to get started</p>
                                    </div>
                                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                        <h5 className="text-lg text-center">ADD NEW CARD</h5>
                                        <AddCard onCardAdd={handleAddCard} />
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    )
                }
                </div>
            </div>
        </div>
  );
};

export default User;