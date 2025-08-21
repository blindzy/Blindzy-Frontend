import React, { useEffect, useState } from "react";
import { Camera, Package, Plus } from 'lucide-react';
import { Button } from "@lib/components/ui/button";
import OrderListComponent from "./order-list";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { AddAddress } from './add-address';
import { EditAddress } from './edit-address';
import { AddCard } from './add-card';
import { EditCard } from './edit-card';


function User() {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;
    const [user, setUser] = useState({});
    type Address = {
        id: string | number;
        address: string;
        apartment?: string;
        city: string;
        state: string;
        zipCode: string;
    };
    const [addressList, setAddressList] = useState<Address[]>([]);
    type PaymentCard = {
        id: string | number;
        cardType: string;
        cardName: string;
        cardNumber: string;
        expiryDate: string;
        cvvCode: string;
        createdAt: string;
    };
    const [paymentDetail, setPaymentDetail] = useState<PaymentCard[]>([]);
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
    const [currentTab, setCurrentTab] = useState("payment");
    const [show, setShow] = useState(true);

    const handleAddAddress = (newAddress) => {
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
            
            <div className="sticky top-0 xl:w-[480px] w-full xl:h-[calc(100vh-32px)] h-full flex flex-col justify-between gap-[48px] xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-[48px] bg-primary rounded-48 text-white xl:shrink-0">
                <div className="w-full flex flex-col gap-[48px]">
                    <div className="w-full flex flex-col items-center gap-4">
                        <div className="w-[150px] h-[150px] rounded-[100%]">
                            <input type="file" className="hidden" id="user-image" accept=".jpg, .jpeg, .png"  />
                            <label htmlFor="user-image" className="relative w-full h-full flex items-center justify-center border border-[--white] rounded-[100%]">
                                <Camera className="w-[50px] h-[50px] text-[--white]" />
                                <div className="absolute right-[14px] bottom-[12px] w-[18px] h-[18px] bg-primary flex items-center justify-center">
                                    <Plus className="size-[18px] text-[--white]" />
                                </div>
                            </label>
                        </div>
                        <h4 className="text-xl">NAME OF PERSON</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">DETAIL</h5>
                        <div className="flex items-center gap-2 text-md">
                            <p>Email:</p>
                            <a href={`mailto:`} className="transition hover:text-[--Black]">example@gmail.com'</a>
                        </div>
                        <div className="flex items-center gap-2 text-md">
                            <p>Phone:</p>
                            <a href={`tel:`} className="transition hover:text-[--Black]">+123456789</a>
                        </div>
                        <div className="flex items-center gap-2 text-md">
                            <p>Company Name:</p>
                            <a href="" className="transition hover:text-[--Black]">AITHUR</a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button variant={'light'} size={'large'} className="w-full border-[--white] text-sm">
                        Edit Profile
                    </Button>
                    <Button variant={'outline_white'} size={'large'} className="w-full text-sm  ">
                        Log Out
                    </Button>
                </div>
            </div>
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <div className="w-full border border-[--Black] rounded-48 p-3 shrink-0">
                    <div className="relative flex items-stretch">
                        <span className={`absolute w-[33%] h-full top-0 left-0 rounded-full bg-[--primary] transition ${currentTab === 'orders'?'left-0':currentTab === 'address'?'left-[33%]':'left-[66%]'}`}/>
                        <button className={`relative z-10 w-full p-6 text-center text-lg transition ${currentTab === 'orders'?'text-[--white]':'text-[--Black]'}`} onClick={() => handleTabChange('orders')}>
                            Order History
                        </button>
                        <button className={`relative z-10 w-full p-6 text-center text-lg transition ${currentTab === 'address'?'text-[--white]':'text-[--Black]'}`} onClick={() => handleTabChange('address')}>
                            Address Book
                        </button>
                        <button className={`relative z-10 w-full p-6 text-center text-lg transition ${currentTab === 'payment'?'text-[--white]':'text-[--Black]'}`} onClick={() => handleTabChange('payment')}>
                            Payment Options
                        </button>
                    </div>
                </div>
                <div className={`w-full ${show ? 'fade-in' : 'fade-out'}`}> 
                {
                    currentTab === 'orders'?(
                        orderList.length > 0 ? (
                            <div className="w-full flex flex-col gap-6 overflow-auto line-scroll" data-lenis-prevent>
                                {orderList.map((order) => (
                                    <OrderListComponent data={order} />
                                ))}
                            </div>
                        ):(
                            <div className="size flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-center text-[--Black] xl:overflow-hidden overflow-auto scroll-hidden">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="size-[64px] bg-[--lightestGrey] rounded-full flex items-center justify-center">
                                            <Package  className="size-[32px] text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-medium text-[--Black]">No orders yet</h3>
                                        <p className="text-sm text-[--Black]">Your order history will appear here after you make a purchase</p>
                                    </div>
                                    <Button 
                                        variant={'primary'} size={'small'}
                                        className="sm:w-[500px] w-full"
                                        asChild
                                    >
                                        <a href="/shop">
                                            Start Shopping
                                        </a>
                                    </Button>
                            </div>
                        )
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