import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface MenuDropdownProps {
  open: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shutters', href: '/shop' },
  { label: 'Curtains', href: '/shop' },
  { label: 'Blinds', href: '/shop' },
  { label: 'Tutorials', href: '/tutorial' },
  { label: 'Showroom', href: '/showroom' },
];

const MenuDropdown: React.FC<MenuDropdownProps> = ({ open, onClose }) => {
  const [customOpen, setCustomOpen] = useState(false);
  const [showAnim, setShowAnim] = useState(open);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
      setShowAnim(true);
    } else {
      document.body.classList.remove('overflow-hidden');
      setShowAnim(false);
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      {/* Sidebar menu - pinned to top-right with margin */}
      <div
        className={`absolute bg-white h-auto flex flex-col rounded-[32px] shadow-lg z-50 overflow-hidden m-0 transition-opacity duration-500 ease-out
        ${showAnim ? 'opacity-100' : 'opacity-0'}
        w-full p-2 max-w-full sm:w-[393px] sm:max-w-full sm:p-2 md:top-4 md:right-4 md:max-w-xs md:p-2 overflow-y-auto max-h-screen`}
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
          {menuLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="menu-main-link menu-option-link py-2 px-2 rounded transition hover:bg-gray-100 sm:menu-main-link sm:menu-option-link"
            >
              {link.label}
            </a>
          ))}
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
                <a href="/customization/shutter-customisation" className="menu-customisation-link block px-4 py-2 text-black rounded transition-all duration-200 hover:text-[--primary] sm:menu-customisation-link">Customize Shutters</a>
                <a href="/customization/curtain-customisation" className="menu-customisation-link block px-4 py-2 text-black rounded transition-all duration-200 hover:text-[--primary] sm:menu-customisation-link">Customize Curtains</a>
                <a href="/customization/double-curtain-customisation" className="menu-customisation-link block px-4 py-2 text-black rounded transition-all duration-200 hover:text-[--primary] sm:menu-customisation-link">Customize Double Curtains</a>
                <a href="/customization/blind-customisation" className="menu-customisation-link block px-4 py-2 text-black rounded transition-all duration-200 hover:text-[--primary] sm:menu-customisation-link">Customize Blinds</a>
                <a href="/customization/double-roller-blind-customisation" className="menu-customisation-link block px-4 py-2 text-black rounded transition-all duration-200 hover:text-[--primary] sm:menu-customisation-link">Customize Double Blinds</a>
                <a href="/customization/vertical-blind-customisation" className="menu-customisation-link block px-4 py-2 text-black rounded transition-all duration-200 hover:text-[--primary] sm:menu-customisation-link">Customize Vertical Blinds</a>
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
