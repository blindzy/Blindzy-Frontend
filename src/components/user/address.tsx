import React, { useEffect, useRef, useState } from "react";
import { AddAddress } from './add-address';
import { EditAddress } from './edit-address';
import fetchMedusaApi from "@lib/lib/fetchMedusaApi";

type Address = {
    id: string | number;
    address_1: string;
    address?: string;
    apartment?: string;
    city: string;
    state: string;
    postal_code: string;
    zipCode?: string;
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
function Address(props) {
    const [addressList, setAddressList] = useState<Address[]>([]);
    type UserData = {
        id: string | number;
        email: string;
        first_name: string;
        last_name: string;
        // add other fields as needed
    };
    const [userData, setUserData] = useState<UserData | null>(null);
    
    // const handleUpdateAddress = (updatedAddress) => {
    //     setAddressList(prev =>
    //         prev.map(address =>
    //             address.id === updatedAddress.id ? updatedAddress : address
    //         )
    //     );
    // };
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
        getAddress();
    }, [addressList]);
    const handleAddressChange = async () => {
        // Fetch updated address list
        const data = await fetchMedusaApi<any>({
            endpoint: "/store/customers/addresses",
            query: { email: userData?.email ?? "" },
        });
        setAddressList(data.addresses);
    };

    return (
        addressList.length > 0 ? (
            <div className="grid grid-cols-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                {addressList.map((address) => (
                    <div key={address.id} className="sm:col-span-6 col-span-12 flex flex-col gap-6 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                        <div className="w-full flex items-center justify-between">
                            <h5 className="text-lg">ADDRESS</h5>
                            <EditAddress
                                userData={userData}
                                address={address}
                                onSuccess={props.onAddressChange}
                            />
                        </div>
                        {/* <p>{address.address_1} , {address.state}, {address.city}</p> */}
                        <p>{address?.address_1} , {address.city}</p>
                        <div className="flex items-center gap-2 justify-between">
                            <p className="text-md text-[--Black]">Postal Code: {address.postal_code}</p>
                            <div className="flex items-center gap-1">
                                {address.apartment && <span className="text-md text-[--Black]">Apartment: {address.apartment}</span>}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                    <h5 className="text-lg text-center">WANT TO ADD A NEW ADDRESS?</h5>
                    <AddAddress userData={props.userData} onSuccess={props.onAddressChange} />
                </div>
            </div>
        ) : (
            <div className="w-full grid grid-cols-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                    <h5 className="text-lg text-center">No address found</h5>
                    <p className="text-sm text-center text-gray-600">Add your first address to get started</p>
                </div>
                <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                    <h5 className="text-lg text-center">ADD New ADDRESS</h5>
                    <AddAddress userData={props.userData} onSuccess={handleAddressChange} />
                </div>
            </div>
        )
    );
};

export default Address;

