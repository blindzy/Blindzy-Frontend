import React, { useEffect } from "react";
import './css/style.css';

function navbar(props) {
	useEffect(() => {
	}, []);
	return (
		<div className={`relative w-full flex items-center justify-between mini:p-[1.25vw] xl:p-2 sm:p-[2.344vw] p-2 z-[10] ${props.customClass&&props.customClass}`}>
			<div className="flex items-center gap-[2.5vw] py-3 xl:px-[1.25vw] sm:px-[2.344vw] px-4 bg-white xl:rounded-[2.5vw] sm:rounded-[4.688vw] rounded-[15px] border border-[--Black]">
				<a href="/">
					<img src="/images/logo.png" className="sm:w-fit w-[100px]" alt=" logo" />
				</a>
				<ul className="xl:flex hidden items-center gap-[2.5vw]">
					<li className="text-md text-black transition uppercase hover:text-[--primary]">
						<a href="/">HOME</a>
					</li>
					<li className="text-md text-black transition uppercase hover:text-[--primary]">
						<a href="/shop">Shutters</a>
					</li>
					<li className="text-md text-black transition uppercase hover:text-[--primary]">
						<a href="/shop">Curtains</a>
					</li>
					<li className="text-md text-black transition uppercase hover:text-[--primary]">
						<a href="/shop">Blinds</a>
					</li>
					<li className="text-md text-black transition uppercase hover:text-[--primary]">
						<a href="/tutorial">Tutorials</a>
					</li>
					<li className="text-md text-black transition uppercase hover:text-[--primary]">
						<a href="/showroom">Showroom</a>
					</li>
				</ul>
				<div className="xl:block hidden">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path d="M2.25 9H15.75" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M2.25 3.75H15.75" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M9.75 14.25H15.75" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</div>
			<div className="flex items-center gap-4 p-1 xl:ps-4 xl:pr-1 pr-4 bg-white xl:rounded-[2.5vw] sm:rounded-[4.688vw] rounded-[15px] border border-[--Black]">
				
				<div className="sm:flex hidden items-center gap-4">
					<a href="/user" className="group w-[2.083vw] h-[2.083vw] flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<path d="M9 7.25C10.5188 7.25 11.75 6.01878 11.75 4.5C11.75 2.98122 10.5188 1.75 9 1.75C7.48122 1.75 6.25 2.98122 6.25 4.5C6.25 6.01878 7.48122 7.25 9 7.25Z" className="stroke-[--Black] group-hover:stroke-[--primary] group-hover:fill-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M13.7624 15.516C14.6224 15.245 15.0744 14.295 14.7094 13.471C13.7394 11.28 11.5504 9.75 9.00035 9.75C6.45035 9.75 4.26135 11.28 3.29135 13.471C2.92635 14.296 3.37835 15.245 4.23835 15.516C5.46335 15.902 7.08435 16.25 9.00035 16.25C10.9164 16.25 12.5374 15.902 13.7624 15.516Z" className="stroke-[--Black] group-hover:stroke-[--primary] group-hover:fill-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</a>
					<button className="group w-[2.083vw] h-[2.083vw] flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-[2.083vw] h-[2.083vw]" viewBox="0 0 40 40" fill="none">
							<path d="M20.028 26.472C20.325 26.627 20.672 26.627 20.969 26.472C22.539 25.653 27.498 22.685 27.498 17.859C27.506 15.739 25.794 14.013 23.672 14C22.395 14.016 21.208 14.66 20.499 15.72C19.789 14.66 18.602 14.016 17.326 14C15.203 14.013 13.492 15.739 13.5 17.859C13.5 22.685 18.458 25.653 20.028 26.472Z" className="stroke-[--Black] group-hover:stroke-[--primary] group-hover:fill-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</button>
					<button className="open__cartPopup group w-[2.083vw] h-[2.083vw] flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-[2.083vw] h-[2.083vw]" viewBox="0 0 40 40" fill="none">
							<path d="M15.75 17.5L18.25 13" className="stroke-[--Black] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M24.25 17.5L21.75 13" className="stroke-[--Black] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M26 17.5L25.403 24.666C25.317 25.703 24.45 26.5 23.41 26.5H16.59C15.55 26.5 14.683 25.703 14.597 24.666L14 17.5" className="stroke-[--Black] group-hover:fill-[--primary] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M12.75 17.5H27.25" className="stroke-[--Black] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</button>
				</div>
				<button className="cus-btn sm open__contactPopup">
					Contact Us
				</button>
				<div className="xl:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path d="M2.25 9H15.75" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M2.25 3.75H15.75" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M9.75 14.25H15.75" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</div>
		</div>
	);
};
  
  export default navbar;