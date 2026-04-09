
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, X, Plus } from 'lucide-react';
import { Button } from "../../lib/components/ui/button";
import { CartPopup } from "@components/popup/cartPopup";
import './css/style.css';

export interface NavbarProps {
    customClass?: string;
    logo?: string;
    // other props...
}
function Navbar(props: NavbarProps) {
    const backDrop = useRef(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const toggleDropdown = (index: number) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const navigation = [
        {
            Name: 'Home',
            Link: '/'
        },
        {
            Name: 'About Us',
            Link: '/about'
        },
        {
            Name: 'Curtains',
            Link: '/curtains',
            // dropdown : [
            //     {
            //         Name : 'curtains',
            //         Link : '/curtains/single'
            //     },
            //     {
            //         Name : 'Double Curtains',
            //         Link : '/curtains/double'
            //     }
            // ]
        },
        {
            Name: 'Blinds',
            Link: '',
            dropdown: [
                {
                    Name: 'Roller Blinds',
                    Link: '/blinds/roller-blinds'
                },
                // {
                //     Name : 'Vertical Blinds',
                //     Link : '/blinds/vertical'
                // },
                {
                    Name: 'Double Roller Blinds',
                    Link: '/blinds/double'
                }
            ]
        },
        {
            Name: 'Shutters',
            Link: '/shutters',
        },
        {
            Name: 'Tutorials',
            Link: '/tutorial',
        },
        {
            Name: 'showroom',
            Link: '/showroom',
        },
        {
            Name: 'Blogs',
            Link: '/blogs',
        },
        {
            Name: 'Get Samples',
            Link: '/samples',
        },
    ]
    const handleMenu = () => {
        if (isSidebarOpen) {
            setSidebarOpen(false);
            setIsOpen(false)
            document.body.style.overflow = '';
        } else {
            setSidebarOpen(true);
            setIsOpen(true)
            document.body.style.overflow = 'hidden';
        }
    };

    // useEffect(() => {
    //     const lenis = (window as any).lenis;
    //     if (!lenis) return;

    //     if (isOpen) {
    //         lenis.stop();
    //     } else {
    //         lenis.start();
    //     }
    // }, [isOpen]);

    return (
        <>
            <div className={`relative w-full flex items-stretch justify-between xl:p-[1.25vw] sm:p-[2.344vw] p-4 z-10 ${props.customClass && props.customClass}`}>
                <div className="w-fit xl:p-[0.625vw] xl:pr-[1.25vw] xl:bg-[--white] xl:border xl:border-[--black] xl:rounded-full flex items-center xl:gap-[2.5vw] gap-[48px]">
                    <a href="">
                        <img src="/images/logo.png" className={`xl:w-[8.854vw] sm:w-[170px] w-[170px] ${props.logo === 'dark' ? 'block' : 'xl:block hidden'} `} alt="Logo" />
                        <img src="/images/logo-light.png" className={`xl:w-[8.854vw] sm:w-[170px] w-[170px] ${props.logo === 'dark' ? 'hidden' : 'xl:hidden block '}`} alt="Logo" />
                    </a>
                    <ul className="hidden xl:flex items-center xl:gap-[2.5vw]">
                        {navigation.map((item, index) => (
                            <li className="relative group w-fit" key={index}>
                                {item.dropdown ? (
                                    <React.Fragment>
                                        <button className="relative flex items-center gap-1 text-sm text-[--black] transition hover:text-[--primary]">
                                            {item.Name}
                                            <ChevronDown className="size-[18px]" />
                                        </button>
                                        <div className="w-fit min-w-[10.417vw] absolute left-[calc(-50%-16px)] top-[100%] flex flex-col items-center translate-y-[10px] opacity-0 group-hover:translate-y-[0] group-hover:opacity-100 transition group-hover:visible invisible pointer-events-none group-hover:pointer-events-auto">
                                            <img src="/images/vector/arrow-up.png" className="sm:w-fit w-[12px] shrink-0 relative z-[10]" alt="arrow-up" />
                                            <ul className="relative z-[1] flex flex-col gap-2 xl:p-[0.833vw] p-4 bg-white border border-[--black] rounded-[8px]  translate-y-[-1.96px]">
                                                {item.dropdown.map((list, i) => (
                                                    <li className="w-full text-[--black] shrink-0 hover:text-[--primary] transition" key={i}>
                                                        <a href={list.Link} className="w-full text-sm capitalize shrink-0">
                                                            {list.Name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <a href={item.Link} className="relative flex items-center gap-2 text-sm text-[--black] transition hover:text-[--primary] capitalize">
                                        {item.Name}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-fit xl:p-[0.208vw] p-1 flex items-center xl:gap-[0.833vw] gap-2 bg-[--white] border border-[--black] rounded-full">
                    <Button variant={'light'} size={'xl'} className="border-none rounded-full flex " asChild>
                        <a href="/login" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9 7.25C10.5188 7.25 11.75 6.01878 11.75 4.5C11.75 2.98122 10.5188 1.75 9 1.75C7.48122 1.75 6.25 2.98122 6.25 4.5C6.25 6.01878 7.48122 7.25 9 7.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.7621 15.516C14.6221 15.245 15.0741 14.295 14.7091 13.471C13.7391 11.28 11.5501 9.75 9.00011 9.75C6.45011 9.75 4.26111 11.28 3.29111 13.471C2.92611 14.296 3.37811 15.245 4.23811 15.516C5.46311 15.902 7.08411 16.25 9.00011 16.25C10.9161 16.25 12.5371 15.902 13.7621 15.516Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </Button>
                    <CartPopup />
                    <button className={`hamburger ${isSidebarOpen && 'show'}`} onClick={handleMenu}>
                        <svg viewBox="0 0 32 32">
                            <path
                                className="line line-top-bottom"
                                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                            ></path>
                            <path className="line" d="M7 16 27 16"></path>
                        </svg>
                    </button>
                    <Button variant={'primary'} size={'small'} className="xl:flex hidden" asChild>
                        <a href="/contact">
                            Contact Us
                        </a>
                    </Button>
                </div>
            </div>
            <div className={`absolute right-4 top-4 z-50 sm:w-[393px] w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] bg-[--white] p-6 xl:hidden flex flex-col gap-6 rounded-48 overflow-hidden transition ${!isSidebarOpen && 'opacity-0 pointer-events-none'}`}>
                <div className="w-full flex items-center justify-between shrink-0">
                    <h3 className="text-1xl text-[--black] uppercase">Menu</h3>
                    <Button variant={'light'} size={'xxl'} className=" rounded-full" onClick={handleMenu}>
                        <X />
                    </Button>
                </div>
                <div className="w-full flex items-center gap-2 shrink-0">
                    <Plus className="size-[18px] text-[--Black]" />
                    <div className="w-full border-b border-[--Black]"></div>
                    <Plus className="size-[18px] text-[--Black]" />
                </div>
                <div className="w-full max-h-[101%] flex flex-col gap-6 overflow-auto line-scroll">
                    {navigation.map((item, index) => (
                        item.dropdown ? (
                            <div className="w-full flex flex-col" key={index}>
                                <button
                                    className="relative flex items-end gap-1 text-xxl text-[--black] transition hover:text-[--primary]"
                                    onClick={() => toggleDropdown(index)}
                                >
                                    {item.Name}
                                    <ChevronDown
                                        className={`size-[28px] transition ${openDropdown === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition ${openDropdown === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <ul className="flex flex-col gap-3 list-none pt-3">
                                        {item.dropdown.map((list, i) => (
                                            <li key={i}>
                                                <a href={list.Link} className="sm:text-[3.516vw] text-[5.581vw] font-bold font-plus leading-tight text-[--black] transition hover:text-[--primary] ps-6">
                                                    {list.Name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <a href={item.Link} className="text-xxl capitalize text-[--black] transition hover:text-[--primary]" key={index}>{item.Name}</a>
                        )
                    ))}
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex items-center gap-2 shrink-0">
                        <Plus className="size-[18px] text-[--Black]" />
                        <div className="w-full border-b border-[--Black]"></div>
                        <Plus className="size-[18px] text-[--Black]" />
                    </div>
                    <div className="flex gap-4">
                        <Button variant={'light'} size={'large'} className="w-full flex-1 rounded-full" asChild>
                            <a href="/login">
                                Login
                            </a>
                        </Button>
                        <Button variant={'light'} size={'large'} className="w-full flex-1 rounded-full" asChild>
                            <a href="/signup">
                                Sign up
                            </a>
                        </Button>
                    </div>
                    <Button variant={'primary'} size={'large'} className="w-full rounded-full" asChild>
                        <a href="/contact">
                            Contact Us
                        </a>
                    </Button>
                </div>
            </div>
            <div className={`fixed top-0 left-0 z-[10] w-screen h-screen bg-[#00000078] backdrop-blur-[10px] transition ${!isSidebarOpen && 'opacity-0 pointer-events-none'}`} ref={backDrop}></div>

        </>
    );
}

export default Navbar;
