import React, { useEffect, useState } from "react";
import { api, type Cart } from '../../services/api';
import './css/style.css';
import MenuDropdown from '../popup/menu';

interface NavbarProps {
	customClass?: string;
}

function Navbar(props: NavbarProps) {
	const [cart, setCart] = useState<Cart | null>(null);
	const [cartCount, setCartCount] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	useEffect(() => {
		loadCart();

		const handleCartUpdate = () => {
			loadCart();
		};

		window.addEventListener('cartUpdated', handleCartUpdate);

		// Close dropdowns on outside click
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest('.navbar-dropdown')) {
				setOpenDropdown(null);
			}
		};
		document.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('cartUpdated', handleCartUpdate);
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	const loadCart = async () => {
		try {
			const cartData = await api.getCart();
			setCart(cartData);
			setCartCount(cartData.items.length);
		} catch (error) {
			console.error('Error loading cart:', error);
		}
	};

	return (
		<div className={`relative w-full flex items-center justify-between mini:p-[1.25vw] xl:p-2 sm:p-[2.344vw] p-2 z-[10] ${props.customClass && props.customClass}`}>

			{/* LEFT SECTION with max width */}
			<div className="max-w-[1125px] w-full">
				<div className="flex items-center gap-[2.3vw] py-3 xl:px-[1.2vw] sm:px-[2.2vw] px-4 bg-white xl:rounded-[2.5vw] sm:rounded-[4.688vw] rounded-[15px] border border-[--Black] shadow-lg">
					<a href="/">
						<img src="/images/logo.png" className="sm:w-fit w-[100px]" alt=" logo" />
					</a>
					<ul className="xl:flex hidden items-center gap-[1.5vw]">
						<li>
							<a className="text-sm px-1 py-1 text-black transition uppercase hover:text-[--primary]" href="/">Home</a>
						</li>
						<li>
							<a className="text-sm px-2 py-1 text-black transition uppercase whitespace-nowrap hover:text-[--primary]" href="/about">About Us</a>
						</li>
						<li>
							<a className="text-sm px-1 py-1 text-black transition uppercase hover:text-[--primary]" href="/customization/shutter-customisation">Shutters</a>
						</li>
						{/* Curtains Dropdown */}
						<li className="relative navbar-dropdown">
							<button
								className="text-sm px-1 py-1 text-black transition uppercase hover:text-[--primary] flex items-center gap-1"
								onClick={() => setOpenDropdown(openDropdown === 'curtains' ? null : 'curtains')}
								style={{ borderBottom: openDropdown === 'curtains' ? '2px solid var(--primary)' : undefined }}
							>
								Curtains <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
							</button>
							{openDropdown === 'curtains' && (
								<div className="absolute left-0 top-full mt-3 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 p-2 transition-all duration-300 space-y-1">
									<a
										href="/customization/curtain-customisation"
										className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]"
									>
										Curtains
									</a>
									<a
										href="/customization/double-curtain-customisation"
										className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]"
									>
										Double Curtains
									</a>
								</div>
							)}


						</li>
						{/* Blinds Dropdown */}
						<li className="relative navbar-dropdown">
							<button
								className="text-sm px-1 py-1 text-black transition uppercase hover:text-[--primary] flex items-center gap-1"
								onClick={() => setOpenDropdown(openDropdown === 'blinds' ? null : 'blinds')}
								style={{ borderBottom: openDropdown === 'blinds' ? '2px solid var(--primary)' : undefined }}
							>
								Blinds <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
							</button>
							{openDropdown === 'blinds' && (
								<div className="absolute left-0 top-full mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 p-2 transition-all duration-300 space-y-1">
									<a
										href="/customization/blind-customisation"
										className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]"
									>
										Blinds
									</a>
									<a
										href="/customization/double-roller-blind-customisation"
										className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]"
									>
										Double Roller Blinds
									</a>
									<a
										href="/customization/vertical-blind-customisation"
										className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]"
									>
										Vertical Blinds
									</a>
								</div>
							)}


						</li>
						
						<li>
							<a className="text-sm px-1 py-1 text-black transition uppercase hover:text-[--primary]" href="/tutorial">Tutorials</a>
						</li>
						<li>
							<a className="text-sm px-1 py-1 text-black transition uppercase hover:text-[--primary]" href="/showroom">Showroom</a>
						</li>
						<li>
							<a className="text-sm px-1 py-1 text-black transition uppercase hover:text-[--primary]" href="/blog">Blogs</a>
						</li>
					</ul>

				</div>
			</div>

			{/* RIGHT SECTION: icons + contact + menu */}
			<div className="flex items-center gap-4 p-1 xl:ps-4 xl:pr-1 pr-4 bg-white xl:rounded-[2.5vw] sm:rounded-[4.688vw] rounded-[15px] border border-[--Black]">
				<div className="sm:flex hidden items-center gap-4">
					<a href="/user" className="group w-[2.083vw] h-[2.083vw] flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<path d="M9 7.25C10.5188 7.25 11.75 6.01878 11.75 4.5C11.75 2.98122 10.5188 1.75 9 1.75C7.48122 1.75 6.25 2.98122 6.25 4.5C6.25 6.01878 7.48122 7.25 9 7.25Z" className="stroke-[--Black] group-hover:stroke-[--primary] group-hover:fill-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M13.7624 15.516C14.6224 15.245 15.0744 14.295 14.7094 13.471C13.7394 11.28 11.5504 9.75 9.00035 9.75C6.45035 9.75 4.26135 11.28 3.29135 13.471C2.92635 14.296 3.37835 15.245 4.23835 15.516C5.46335 15.902 7.08435 16.25 9.00035 16.25C10.9164 16.25 12.5374 15.902 13.7624 15.516Z" className="stroke-[--Black] group-hover:stroke-[--primary] group-hover:fill-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</a>
					<button className="open__cartPopup group w-[2.083vw] h-[2.083vw] flex items-center justify-center relative">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-[2.083vw] h-[2.083vw]" viewBox="0 0 40 40" fill="none">
							<path d="M15.75 17.5L18.25 13" className="stroke-[--Black] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M24.25 17.5L21.75 13" className="stroke-[--Black] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M26 17.5L25.403 24.666C25.317 25.703 24.45 26.5 23.41 26.5H16.59C15.55 26.5 14.683 25.703 14.597 24.666L14 17.5" className="stroke-[--Black] group-hover:fill-[--primary] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12.75 17.5H27.25" className="stroke-[--Black] group-hover:stroke-[--primary]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								{cartCount}
							</span>
						)}
					</button>
				</div>
				<button className="cus-btn sm open__contactPopup">
					Contact Us
				</button>
				<div className="xl:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" onClick={() => setMenuOpen(true)} style={{ cursor: 'pointer' }}>
						<path d="M2.25 9H15.75" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M2.25 3.75H15.75" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M9.75 14.25H15.75" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			</div>

			<MenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
		</div>
	);
}

export default Navbar;
