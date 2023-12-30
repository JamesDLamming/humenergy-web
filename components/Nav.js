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
    <nav className="relative isolate z-50 shadow-sm bg-white">
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-xl mx-auto sm:max-w-3xl lg:max-w-7xl  relative">
        <div className="flex items-center justify-between">
          {/* Hum Logo */}
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
          {/* Links */}
          <div className="hidden items-center lg:flex lg:gap-x-12">
            <Link href="/earn" className="font-bold font-inter text-main">
              Earn
            </Link>
            <Link href="/about" className="font-bold font-inter text-main">
              About
            </Link>
            <DefaultButton>Login</DefaultButton>
          </div>
          {/* hamburger */}
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
        </div>
      </div>
      {menuOpen && (
        <div className="mobileMenu open shadow-sm">
          <div className="absolute w-screen items-center flex-1 justify-center shadow-sm text-center space-y-2 z-50 bg-white  pt-2 pb-6 lg:hidden">
            {/* Mobile Links */}
            <Link
              href="/earn"
              className="block font-bold font-inter text-main w-full"
            >
              Earn
            </Link>
            <Link
              href="/about"
              className="block font-bold font-inter text-main w-full"
            >
              About
            </Link>
            <DefaultButton>Login</DefaultButton>
          </div>
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

          .mobileMenu {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.7s ease, margin 0.7s ease;
          }

          .mobileMenu.open {
            grid-template-rows: 1fr;
            margin-top: 0rem !important;
          }

          .mobileMenu > div {
            overflow: hidden;
          }

          .closed {
            overflow: hidden;
          }
        `}
      </style>
    </nav>

    // <nav className="print:hidden z-40 fixed md:absolute top-0 w-full px-4 pt-4 flex justify-between bg-white pb-4 shadow-sm py-6 sm:px-6 lg:px-8 max-w-xl mx-auto sm:max-w-3xl lg:max-w-7xl">
    //   <div className="flex items-center justify-between">
    //     <a
    //       href="/"
    //       id="hum-logo"
    //       className="flex flex-wrap items-center lg:flex-1 gap-x-2"
    //     >
    //       <img
    //         className="w-auto h-8"
    //         src="/HumEnergyLogoSquare.svg"
    //         alt="Hum Energy logo"
    //       ></img>
    //       <h1 className="font-black text-main text-xl md:text-2xl">
    //         Hum Energy
    //       </h1>
    //     </a>
    //   </div>

    //   <div className={`hidden md:flex`}>
    //     <div className="hidden items-center lg:flex lg:gap-x-12">
    //       <Link href="/earn" className="font-bold font-inter text-main">
    //         Earn
    //       </Link>
    //       <Link href="/about" className="font-bold font-inter text-main">
    //         About
    //       </Link>
    //       <DefaultButton>Login</DefaultButton>
    //     </div>
    //   </div>

    //   <div className="flex flex-row justify-between">
    //     <div id="hamburger" className="lg:hidden">
    //       <button
    //         onClick={toggleMenu}
    //         className={`align-middle w-[32px] h-[25px] ${menuOpen && 'change'}`}
    //       >
    //         <div className="bar bar1 bg-mainSecondary rounded w-full h-[5px] block mb-[5px]"></div>
    //         <div className="bar bar2 bg-mainSecondary rounded w-full h-[5px] block my-[5px]"></div>
    //         <div className="bar bar3 bg-mainSecondary rounded w-full h-[5px] block mt-[5px]"></div>
    //       </button>
    //     </div>
    //     {menuOpen && (
    //       <div className="fixed shadow-sm w-full items-center flex-1 justify-center text-center space-y-2 right-0 z-50 bg-white pt-2 pb-6 px-6 lg:hidden">
    //         {/* Mobile Links */}
    //         <Link
    //           href="/earn"
    //           className="block font-bold font-inter text-main w-full"
    //         >
    //           Earn
    //         </Link>
    //         <Link
    //           href="/about"
    //           className="block font-bold font-inter text-main w-full"
    //         >
    //           About
    //         </Link>
    //         <DefaultButton>Login</DefaultButton>
    //       </div>
    //     )}
    //   </div>

    //   <style jsx>
    //     {`
    //       .bar {
    //         transition: 0.3s ease;
    //       }

    //       .change-bg {
    //         width: 550px;
    //         height: 540px;
    //         transform: translate(-60%, -30%);
    //       }
    //       .change .bar {
    //       }
    //       .change .bar1 {
    //         transform: translateY(10px) rotateZ(-45deg);
    //       }
    //       .change .bar3 {
    //         transform: translateY(-10px) rotate(45deg);
    //       }
    //       .change .bar2 {
    //         opacity: 0;
    //       }
    //       .change {
    //         display: block;
    //       }
    //     `}
    //   </style>
    // </nav>
  );
};

export default Nav;
