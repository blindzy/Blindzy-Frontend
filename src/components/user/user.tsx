import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import Address from './address';

import OrderList from "./orderList";
import UserDetail from "./userDetail";
import Payment from "./payment";
import fetchMedusaApi from "@lib/lib/fetchMedusaApi";


// type Address = {
//     id: string | number;
//     address: string;
//     apartment?: string;
//     city: string;
//     state: string;
//     zipCode: string;
// };
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
    const [paymentDetail, setPaymentDetail] = useState<PaymentCard[]>([]);
    const [currentTab, setCurrentTab] = useState("payment");
    const [show, setShow] = useState(true);
    const [addressList, setAddressList] = useState<Address[]>([]);
        type UserData = {
            id: string | number;
            email: string;
            first_name: string;
            last_name: string;
            // add other fields as needed
    };
    const [userData, setUserData] = useState<UserData | null>(null);
    const [orderList, setOrderList] = useState<any[]>([]);
    
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
        async function getAddress() {
            const userDataString = localStorage.getItem("user");
            if (!userDataString) {
                console.error("User Data not found in localStorage");
                return;
            }
            const userDataObj = JSON.parse(userDataString);
            setUserData(userDataObj);

            const data = await fetchMedusaApi<any>({
                endpoint: "/store/customers/addresses",
                query: { email: userDataObj.email },
            });

            setAddressList(data.addresses);
            // console.log("Addresses:", data.addresses);
        }
        async function getOrders() {
            // Ye code ab sirf client pe chalega
            const email = localStorage.getItem("userEmail");
            if (!email) {
                console.error("Email not found in localStorage");
                return;
            }

            const ordersData = await fetchMedusaApi<any>({
                endpoint: "/store/customers/order",
                query: { email },
            });

            setOrderList(ordersData);
            // console.log("Orders:", ordersData);
        }
        async function getCards() {
            // Ye code ab sirf client pe chalega
            const email = localStorage.getItem("userEmail");
            if (!email) {
                console.error("Email not found in localStorage");
                return;
            }

            const cardsData = await fetchMedusaApi<any>({
                endpoint: "/store/customers/card",
                query: { email },
            });

            setPaymentDetail(cardsData);
        }
        getAddress();
        getCards();
        getOrders();
    }, []);


    

    const handleAddressChange = async () => {
        // Fetch updated address list
        const data = await fetchMedusaApi<any>({
            endpoint: "/store/customers/addresses",
            query: { email: userData?.email ?? "" },
        });
        setAddressList(data.addresses);
    };
    const handleCardChange = async () => {
        // Fetch updated card list
        const data = await fetchMedusaApi<any>({
            endpoint: "/store/customers/cards",
            query: { email: userData?.email ?? "" },
        });
        setPaymentDetail(data.cards);
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
                        <OrderList list={orderList} />
                    ):currentTab === 'address'?(
                        <Address list={addressList} userData={userData} onAddressChange={handleAddressChange} />
                    ):currentTab === 'payment'&&(
                        <Payment list={paymentDetail} userData={userData} onCardChange={handleCardChange}/>
                    )
                }
                </div>
            </div>
        </div>
  );
};

export default User;