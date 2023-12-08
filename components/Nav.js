import React, { useState } from 'react';
import Link from 'next/link';
import DefaultButton from './DefaultButton';

const navLinks = [{ href: '/earn', label: 'Earn' }];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // creates a function that toggles menuOPen to be the opposite value
  };
  return (
    <div className="relative isolate z-50 shadow-sm bg-white">
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-xl mx-auto sm:max-w-3xl lg:max-w-7xl  relative">
        <nav className="flex items-center justify-between" aria-label="Global">
          <a
            href="/"
            id="hum-logo"
            className="flex flex-wrap items-center lg:flex-1 gap-x-2"
          >
            <img
              className="w-auto h-8"
              src="/HumEnergyLogoSquare.svg"
              alt="Hum Energy logo"
            ></img>
            <h1 className="font-black text-main text-xl md:text-2xl">
              Hum Energy
            </h1>
          </a>

          <div id="hamburger" className="lg:hidden">
            <button
              onClick={toggleMenu}
              className={`align-middle w-[32px] h-[25px] ${
                menuOpen && 'change'
              }`}
            >
              <div className="bar bar1 bg-mainSecondary rounded w-full h-[5px] block mb-[5px]"></div>
              <div className="bar bar2 bg-mainSecondary rounded w-full h-[5px] block my-[5px]"></div>
              <div className="bar bar3 bg-mainSecondary rounded w-full h-[5px] block mt-[5px]"></div>
            </button>
          </div>
          {/* Mobile Menu */}

          <div className="hidden items-center lg:flex lg:gap-x-12">
            <Link href="/earn" className="font-bold font-inter text-main">
              Earn
            </Link>
            <Link href="/" className="font-bold font-inter text-main">
              About
            </Link>
            <DefaultButton>Login</DefaultButton>
          </div>
        </nav>

        <div className="fixed h-0 p-0 overflow-hidden whitespace-nowrap border-0 hidden"></div>
      </div>
      {menuOpen && (
        <div className="fixed shadow-sm w-full items-center flex-1 justify-center text-center space-y-2 right-0 z-50 bg-white pt-2 pb-6 px-6 lg:hidden">
          {/* Mobile Links */}
          <Link
            href="/earn"
            className="block font-bold font-inter text-main w-full"
          >
            Earn
          </Link>
          <Link
            href="/"
            className="block font-bold font-inter text-main w-full"
          >
            About
          </Link>
          <DefaultButton>Login</DefaultButton>
        </div>
      )}
      <style jsx>
        {`
          .bar {
            transition: 0.3s ease;
          }

          .change-bg {
            width: 550px;
            height: 540px;
            transform: translate(-60%, -30%);
          }
          .change .bar {
          }
          .change .bar1 {
            transform: translateY(10px) rotateZ(-45deg);
          }
          .change .bar3 {
            transform: translateY(-10px) rotate(45deg);
          }
          .change .bar2 {
            opacity: 0;
          }
          .change {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export default Nav;
