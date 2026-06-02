import React, { useEffect, useState } from "react";
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
    };
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
            console.error("User Data not found in localStorage");
            return;
        }
        const userDataObj = JSON.parse(userDataString);
        setUserData(userDataObj);

        fetchAddresses();
    }, [props.userData]);

    const handleAddressChange = async () => {
        await fetchAddresses();
        props.onAddressChange?.(); // also notify parent if needed
    };

    const fetchAddresses = async () => {
        if (!props.userData?.email) return;

        try {
            setLoading(true);

            const data = await fetchMedusaApi<any>({
                endpoint: "/store/customers/addresses",
                query: { email: props.userData.email },
            });

            setAddressList(data.addresses || []);
        } catch (err) {
            console.error("Error fetching addresses:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center py-10">
                <p className="text-gray-500">Loading addresses...</p>
            </div>
        );
    }

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
                                onSuccess={handleAddressChange}
                            />
                        </div>
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
                    <AddAddress userData={props.userData} onSuccess={handleAddressChange} />
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