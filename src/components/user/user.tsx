import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';

interface UserProps {
	// Add any props if needed in the future
}
function User(props: UserProps) {
    const [currentTab, setCurrentTab] = useState<string>('orders');
    const [imageSrc, setImageSrc] = useState<string>('');
    const [fade, setFade] = useState<'in' | 'out'>('in');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
        }
    };

    // Fade animation handler
    const handleTabChange = (tab: string) => {
        if (tab === currentTab) return;
        setFade('out');
        setTimeout(() => {
            setCurrentTab(tab);
            setFade('in');
        }, 200); // 200ms fade out, then fade in
    };

	useEffect(() => {
	}, []);
    

	return (
        <div className="relative w-screen h-[88vh] flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 overflow-hidden" id="user">
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
                        <h4 className="text-xl">NAME OF PERSON</h4>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">DETAIL</h5>
                        <div className="flex items-center gap-2 text-md">
                            <p>Email:</p>
                            <a href="mailto:example@gmail.com" className="transition hover:text-[--Black]">example@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-2 text-md">
                            <p>Nnumber:</p>
                            <a href="tel:123456789" className="transition hover:text-[--Black]">+123456789</a>
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
                        <div className="w-full h-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black overflow-auto scroll-hidden" id="order-history">
                            <div className="w-full flex flex-col items-center gap-2 p-4 border border-[--Black] rounded-24">
                                <div className="w-full flex xl:flex-row flex-col items-center xl:justify-between xl:gap-6 gap-4">
                                    <div className="w-full xl:w-[40%] flex items-center gap-2">
                                        <div className="w-[64px] h-[64px] bg-primary rounded-lg shrink-0"></div>
                                        <h6 className="text-md">Product Name</h6>
                                    </div>
                                    <span className="text-md">$7000</span>
                                    <div className="w-full xl:w-[40%] flex xl:justify-end justify-center">
                                        <button className="cus-btn text-sm small shrink-0">
                                            Reorder
                                        </button>
                                    </div>
                                </div>
                                <div className="w-fit mx-auto flex items-center justify-center cursor-pointer text-sm text-primary hover:text-[--Black]">
                                    <p>See More</p>
                                    <Icon icon="icon-park-outline:down" />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                                        <Icon icon="uil:plus" className="text-[18px]" />
                                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                                        <Icon icon="uil:plus" className="text-[18px]" />
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Color:</p>
                                        <p>Ash</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Size:</p>
                                        <p>24cm x 56cm</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Fit Type:</p>
                                        <p>Recess Fit</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Roll Direction:</p>
                                        <p>Front Roll</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Chain Colour:</p>
                                        <p>Silver</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Bracket Colour:</p>
                                        <p>Sandstone</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Base Rail Shape:</p>
                                        <p>Oval</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Base Rail Colour:</p>
                                        <p>Bone</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center gap-2 p-4 border border-[--Black] rounded-24">
                                <div className="w-full flex xl:flex-row flex-col items-center xl:justify-between xl:gap-6 gap-4">
                                    <div className="w-full xl:w-[40%] flex items-center gap-2">
                                        <div className="w-[64px] h-[64px] bg-primary rounded-lg shrink-0"></div>
                                        <h6 className="text-md">Product Name</h6>
                                    </div>
                                    <span className="text-md">$7000</span>
                                    <div className="w-full xl:w-[40%] flex xl:justify-end justify-center">
                                        <button className="cus-btn text-sm small shrink-0">
                                            Reorder
                                        </button>
                                    </div>
                                </div>
                                <div className="w-fit mx-auto flex items-center justify-center cursor-pointer text-sm text-primary hover:text-[--Black]">
                                    <p>See More</p>
                                    <Icon icon="icon-park-outline:down" />
                                </div>
                                <div className="w-full flex flex-col gap-2 hidden">
                                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                                        <Icon icon="uil:plus" className="text-[18px]" />
                                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                                        <Icon icon="uil:plus" className="text-[18px]" />
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Color:</p>
                                        <p>Ash</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Size:</p>
                                        <p>24cm x 56cm</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Fit Type:</p>
                                        <p>Recess Fit</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Roll Direction:</p>
                                        <p>Front Roll</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Chain Colour:</p>
                                        <p>Silver</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Bracket Colour:</p>
                                        <p>Sandstone</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Base Rail Shape:</p>
                                        <p>Oval</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Base Rail Colour:</p>
                                        <p>Bone</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center gap-2 p-4 border border-[--Black] rounded-24">
                                <div className="w-full flex xl:flex-row flex-col items-center xl:justify-between xl:gap-6 gap-4">
                                    <div className="w-full xl:w-[40%] flex items-center gap-2">
                                        <div className="w-[64px] h-[64px] bg-primary rounded-lg shrink-0"></div>
                                        <h6 className="text-md">Product Name</h6>
                                    </div>
                                    <span className="text-md">$7000</span>
                                    <div className="w-full xl:w-[40%] flex xl:justify-end justify-center">
                                        <button className="cus-btn text-sm small shrink-0">
                                            Reorder
                                        </button>
                                    </div>
                                </div>
                                <div className="w-fit mx-auto flex items-center justify-center cursor-pointer text-sm text-primary hover:text-[--Black]">
                                    <p>See More</p>
                                    <Icon icon="icon-park-outline:down" />
                                </div>
                                <div className="w-full flex flex-col gap-2 hidden">
                                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                                        <Icon icon="uil:plus" className="text-[18px]" />
                                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                                        <Icon icon="uil:plus" className="text-[18px]" />
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Color:</p>
                                        <p>Ash</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Size:</p>
                                        <p>24cm x 56cm</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Fit Type:</p>
                                        <p>Recess Fit</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Roll Direction:</p>
                                        <p>Front Roll</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Chain Colour:</p>
                                        <p>Silver</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Bracket Colour:</p>
                                        <p>Sandstone</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Base Rail Shape:</p>
                                        <p>Oval</p>
                                    </div>
                                    <div className="w-full flex items-center justify-between text-sm text-black">
                                        <p>Base Rail Colour:</p>
                                        <p>Bone</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):currentTab === 'address'?(
                        <div className="w-full max-h-full flex xl:flex-row flex-col items-stretch xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black" id="address">
                            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                <div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between gap-2">
                                    <h5 className="text-lg">ADDRESS</h5>
                                    <button className="cus-btn text-sm xl:w-fit w-full">
                                        Edit
                                    </button>
                                </div>
                                <p className="text-md xl:w-[80%] w-full">65 Berwick-Cranbourne Rd , Melbourne, Victoria, Australia</p>
                                <div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between gap-2">
                                    <h5 className="text-md">Postal Code: 3977</h5>
                                    <a href="/" className="flex items-center gap-2 text-md transition hover:text-[--primary]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                            <path d="M5.75 15.75V11C5.75 10.31 6.31 9.75 7 9.75C7.69 9.75 8.25 10.31 8.25 11V15.75" stroke="#9F89E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M10.75 9.75H12.25" stroke="#9F89E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M2.655 6.45L9 1.75L15.345 6.45C15.6 6.639 15.75 6.937 15.75 7.254V13.75C15.75 14.855 14.855 15.75 13.75 15.75H4.25C3.145 15.75 2.25 14.855 2.25 13.75V7.254C2.25 6.937 2.4 6.639 2.655 6.45Z" stroke="#9F89E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M13.75 2.75V5.269" stroke="#9F89E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Home
                                    </a>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                                <h5 className="text-lg text-center">WANT TO ADD A NEW ADDRESS?</h5>
                                <button className="w-fit cus-btn text-sm small">
                                    Add Address
                                </button>
                            </div>
                        </div>
                    ):currentTab === 'payment'?(
                        <></>
                    ):null
                }
                </div>
            </div>
        </div>
	);
}

export default User;

