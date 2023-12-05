import React from 'react';
import Link from 'next/link';
import DefaultButton from './DefaultButton';

const navLinks = [{ href: '/earn', label: 'Earn' }];

const Nav = () => {
  return (
    <div className="relative isolate z-10">
      <div className="px-6 py-6 lg:px-8  relative">
        <nav className="flex items-center justify-between" aria-label="Global">
          <a href="/" className="flex flex-wrap items-center lg:flex-1 gap-x-2">
            <img
              className="w-auto h-8"
              src="/HumEnergyLogoSquare.svg"
              alt="Hum Energy logo"
            ></img>
            <h1 className="font-black text-main text-xl md:text-2xl">
              Hum Energy
            </h1>
          </a>
          <div className="flex items-center space-x-2 lg:hidden"></div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4"></div>
          <div className="hidden items-center lg:flex lg:gap-x-12">
            <Link href="/earn" className="font-bold font-inter text-main">
              Earn
            </Link>
            <Link href="/" className="font-bold font-inter text-main">
              About
            </Link>
            <DefaultButton>Login</DefaultButton>
          </div>
          <div></div>
        </nav>

        <div className="fixed h-0 p-0 overflow-hidden whitespace-nowrap border-0 hidden"></div>
      </div>
    </div>
  );
};

export default Nav;
