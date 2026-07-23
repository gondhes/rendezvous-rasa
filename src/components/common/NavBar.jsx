import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import logoSrc from '../../assets/logo-crp.jpeg'; // <-- Path ke logo yang sudah diimpor

const navigation = [
  { name: 'Home', href: '/', disabled: false },
  { name: 'Explore', href: '/explore', disabled: false },
  { name: 'About Us', href: '/aboutUs', disabled: false },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 overflow-x-hidden">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="bg-white p-0 shadow-md rounded-full flex justify-center items-center h-fit" style={{ minWidth: '112px' }}>
              <img
                alt="France Indonésie Logo"
                src={logoSrc}
                className="max-h-10 w-auto object-contain p-1" // Maintain aspect ratio by using w-auto
              />
            </a>
          </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* === Desktop Navigation Links === */}
        <div className="hidden lg:flex lg:gap-x-12 bg-white shadow-md rounded-full px-8 py-4">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className={`text-sm font-regular leading-6 text-gray-900 ${item.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`} style={{fontFamily: 'Marianne, serif'}}>
              {item.name}
            </a>
          ))}
        </div>

        {/* === Desktop Register Button === */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/register"
            className="flex items-center gap-x-2 rounded-full bg-gradient-to-r from-red-800 to-purple-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-shadow"
          >
            REGISTER NOW!
            {/* Icon panah */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </nav>

      {/* === Mobile Menu Dialog === */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">France Indonésie</span>
              <img
                alt="France Indonésie Logo"
                src={logoSrc}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="/register"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Register Now!
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavBar;