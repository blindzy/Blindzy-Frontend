import React, { useEffect, useState } from "react";
import { Camera, Plus } from 'lucide-react';
import { Button } from "@lib/components/ui/button";
import fetchMedusaApi from "../../lib/lib/fetchMedusaApi";
import { Icon } from '@iconify/react';

interface UserData {
    username?: string;
    email?: string;
    phone?: string;
    company_name?: string;
    // add other fields as needed
}

function UserDetail() {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        async function getUserData() {
            // Ye code ab sirf client pe chalega
            const email = localStorage.getItem("userEmail");
            if (!email) {
                console.error("Email not found in localStorage");
                return;
            }

            const data = await fetchMedusaApi<any>({
                endpoint: "/store/customers/get-customer",
                query: { email },
            });

            setUserData(data);
            console.log("user data:", data);
        }

        getUserData();
    }, []);


    return (
        <div className="sticky top-0 xl:w-[25vw] w-full xl:h-[calc(100vh-32px)] h-full flex flex-col justify-between gap-[48px] xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-[48px] bg-primary rounded-48 text-white xl:shrink-0">
            <div className="w-full flex flex-col gap-[48px]">
                {userData ? (
                    <React.Fragment>
                        <div className="w-full flex flex-col items-center gap-4">
                            <div className="xl:size-[7.813vw] sm:size-[150px] size-[88px] rounded-full">
                                <input type="file" className="hidden" id="user-image" accept=".jpg, .jpeg, .png" />
                                <label htmlFor="user-image" className="cursor-pointer relative w-full h-full flex items-center justify-center border border-[--white] rounded-[100%]">
                                    <Camera className="xl:size-[2.5vw] sm:size-[48px] size-[26px] text-[--white]" />
                                    <div className="absolute xl:right-[0.729vw] sm:right-[14px] right-[6px] xl:bottom-[0.625vw] sm:bottom-[12px] bottom-[4px] xl:size-[0.938vw] size-[18px] bg-primary flex items-center justify-center">
                                        <Plus className="sm:size-[18px] size-[14px] text-[--white]" />
                                    </div>
                                </label>
                            </div>
                            <h4 className="text-xl">{userData.username}</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-lg">DETAIL</h5>
                            {userData.email && (
                                <div className="flex items-center gap-2 text-md">
                                    <p>Email:</p>
                                    <a href={`mailto:${userData.email}`} className="transition hover:text-[--Black]">{userData.email}</a>
                                </div>
                            )}
                            {userData.phone &&(
                                <div className="flex items-center gap-2 text-md">
                                    <p>Phone:</p>
                                    <a href={`tel:${userData.phone}`} className="transition hover:text-[--Black]">{userData.phone}</a>
                                </div>
                            )}
                            {userData.company_name &&(
                                <div className="flex items-center gap-2 text-md">
                                    <p>Company Name:</p>
                                    <p>{userData.company_name}</p>

                                    {/* <a href="" className="transition hover:text-[--Black]">AITHUR</a> */}
                                </div>
                            )}

                        </div>
                    </React.Fragment>
                ):(
                    <Icon icon="svg-spinners:8-dots-rotate" className="text-[36px] text-[--white] text-center mx-auto" />
                )}
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
    );
};

export default UserDetail;