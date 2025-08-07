import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface MenuDropdownProps {
  open: boolean;
  onClose: () => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ open, onClose }) => {
  const [customOpen, setCustomOpen] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [blindsOpen, setBlindsOpen] = useState(false);
  const [showAnim, setShowAnim] = useState(open);

  useEffect(() => {
    if (open) {
      // Strict scroll lock
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100vw';
      document.body.classList.add('overflow-hidden');
      setShowAnim(true);
      return () => {};
    } else {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.classList.remove('overflow-hidden');
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || '0'));
      }
      setShowAnim(false);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm w-screen h-screen" onTouchMove={handleTouchMove}>
      {/* Sidebar menu - pinned to top-right with margin */}
      <div
        className={`absolute no-scrollbar bg-white h-auto flex flex-col rounded-[32px] shadow-lg z-[10000] overflow-hidden m-0 transition-opacity duration-500 ease-out
        ${showAnim ? 'opacity-100' : 'opacity-0'}
        w-[393px] max-w-full p-6 top-4 right-4 overflow-y-auto max-h-screen`}
        style={{ willChange: 'opacity' }}
        onTouchMove={handleTouchMove}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <span className="font-bold text-2xl sm:text-xl">MENU</span>
          <button
            className="p-2 border border-black rounded-full w-12 h-12 flex items-center justify-center"
            onClick={onClose}
          >
            <Icon icon="ic:round-close" className="text-2xl" />
          </button>
        </div>

        {/* Divider with plus icons */}
        <div className="flex items-center px-6 my-2">
          <Icon icon="uil:plus" className="text-gray-400 text-lg" />
          <div className="flex-1 h-px bg-gray-300 mx-2" />
          <Icon icon="uil:plus" className="text-gray-400 text-lg" />
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col gap-2 px-6">
          <a href="/" className="menu-main-link menu-option-link py-2 px-2 rounded transition hover:bg-gray-100 sm:menu-main-link sm:menu-option-link">
            Home
          </a>
          <a href="/shop" className="menu-main-link menu-option-link py-2 px-2 rounded transition hover:bg-gray-100 sm:menu-main-link sm:menu-option-link">
            Shutters
          </a>
          
          {/* Curtains Dropdown */}
          <div>
            <button
              type="button"
              className="menu-main-link menu-option-link py-2 px-2 rounded transition hover:bg-gray-100 w-full text-left flex items-center justify-between sm:menu-main-link sm:menu-option-link"
              onClick={() => setCurtainsOpen((prev) => !prev)}
              aria-expanded={curtainsOpen}
            >
              Curtains
              <Icon
                icon={curtainsOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                className="text-lg transition-transform"
              />
            </button>
            {curtainsOpen && (
              <div className="pl-4 mt-1">
                <a href="/shop" className="block py-2 px-2 text-base font-normal text-gray-800 hover:text-[--primary] transition-all duration-200">Simple Curtains</a>
                <a href="/shop" className="block py-2 px-2 text-base font-normal text-gray-800 hover:text-[--primary] transition-all duration-200">Double Curtains</a>
              </div>
            )}
          </div>

          {/* Blinds Dropdown */}
          <div>
            <button
              type="button"
              className="menu-main-link menu-option-link py-2 px-2 rounded transition hover:bg-gray-100 w-full text-left flex items-center justify-between sm:menu-main-link sm:menu-option-link"
              onClick={() => setBlindsOpen((prev) => !prev)}
              aria-expanded={blindsOpen}
            >
              Blinds
              <Icon
                icon={blindsOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                className="text-lg transition-transform"
              />
            </button>
            {blindsOpen && (
              <div className="pl-4 mt-1">
                <a href="/shop" className="block py-2 px-2 text-base font-normal text-gray-800 hover:text-[--primary] transition-all duration-200">Blinds</a>
                <a href="/shop" className="block py-2 px-2 text-base font-normal text-gray-800 hover:text-[--primary] transition-all duration-200">Vertical Blinds</a>
                <a href="/shop" className="block py-2 px-2 text-base font-normal text-gray-800 hover:text-[--primary] transition-all duration-200">Double Roller Blinds</a>
              </div>
            )}
          </div>

          <a href="/tutorial" className="menu-main-link menu-option-link py-2 px-2 rounded transition hover:bg-gray-100 sm:menu-main-link sm:menu-option-link">
            Tutorials
          </a>
          <a href="/showroom" className="menu-main-link menu-option-link py-2 px-2 rounded transition hover:bg-gray-100 sm:menu-main-link sm:menu-option-link">
            Showroom
          </a>
          <div className="mt-4">
            <button
              type="button"
              className="menu-main-link menu-option-link font-bold text-base mb-2 flex items-center w-full focus:outline-none sm:menu-main-link sm:menu-option-link"
              onClick={() => setCustomOpen((prev) => !prev)}
              aria-expanded={customOpen}
              aria-controls="customisation-dropdown"
            >
              Customisation
              <Icon
                icon={customOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                className="ml-2 text-lg transition-transform"
              />
            </button>
            {customOpen && (
              <div id="customisation-dropdown" className="mt-1">
                {[
                  { href: "/shop", label: "Customize Shutters" },
                  { href: "/shop", label: "Customize Curtains" },
                  { href: "/shop", label: "Customize Double Curtains" },
                  { href: "/shop", label: "Customize Blinds" },
                  { href: "/shop", label: "Customize Double Blinds" },
                  { href: "/shop", label: "Customize Vertical Blinds" },
                ].map(link => (
                  <a
  key={link.href}
  href={link.href}
  className="block px-4 py-2 text-base font-normal text-gray-800 hover:text-[--primary] transition-all duration-200"
>
  {link.label}
</a>

                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Divider with plus icons */}
        <div className="flex items-center px-6 mt-6 mb-4">
          <Icon icon="uil:plus" className="text-gray-400 text-lg" />
          <div className="flex-1 h-px bg-gray-300 mx-2" />
          <Icon icon="uil:plus" className="text-gray-400 text-lg" />
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 px-6 mb-4">
          <a
            href="/login"
            className="flex-1 rounded-full border border-black text-center py-3 font-medium text-base"
          >
            Login
          </a>
          <a
            href="/signUp"
            className="flex-1 rounded-full border border-black text-center py-3 font-medium text-base"
          >
            Sign up
          </a>
        </div>

        {/* Contact Us Button */}
        <div className="px-6 pb-6">
          <a
            href="/contact"
            className="block w-full rounded-full py-3 text-white text-center font-medium bg-[#B7A3F7] hover:bg-[#a18be6] transition text-base"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;
