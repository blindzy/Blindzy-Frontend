import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      {/* Sidebar menu - pinned to top-right with margin */}
      <div className="absolute top-4 right-2 w-full max-w-xs bg-white h-auto flex flex-col rounded-[32px] shadow-lg z-50 overflow-hidden p-0 m-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <span className="font-bold text-2xl">MENU</span>
          <button
            className="p-2 border border-black rounded-full"
            onClick={onClose}
          >
            <Icon icon="ic:round-close" className="text-xl" />
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
              className="font-extrabold text-xl py-2 px-2 rounded transition hover:bg-gray-100"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <div className="font-bold text-base mb-2">Customisation</div>
            <a href="/customization/shutter-customisation" className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]">Customize Shutters</a>
            <a href="/customization/curtain-customisation" className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]">Customize Curtains</a>
            <a href="/customization/double-curtain-customisation" className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]">Customize Double Curtains</a>
            <a href="/customization/blind-customisation" className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]">Customize Blinds</a>
            <a href="/customization/double-roller-blind-customisation" className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]">Customize Double Blinds</a>
            <a href="/customization/vertical-blind-customisation" className="block px-4 py-2 text-sm text-black rounded transition-all duration-200 hover:text-[--primary]">Customize Vertical Blinds</a>
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
