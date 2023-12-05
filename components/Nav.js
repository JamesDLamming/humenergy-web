import React from 'react';

const Nav = () => {
  return (
    <div className="relative isolate z-10">
      <div className="px-6 py-6 lg:px-8 preview-menu-wrapper relative">
        <nav className="flex items-center justify-between" aria-label="Global">
          <a href="" className="flex flex-wrap items-center lg:flex-1 gap-x-2">
            <img
              className="w-auto h-8"
              src="/HumEnergyLogoSquare.svg"
              alt="Hum Energy logo"
            ></img>
            <h1 className="font-black text-gray-900 text-xl md:text-2xl">
              Hum Energy
            </h1>
          </a>
          <div className="flex items-center space-x-2 lg:hidden"></div>
          <div className="hidden lg:flex lg:gap-x-12"></div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4"></div>
        </nav>
        <div className="fixed h-0 p-0 overflow-hidden whitespace-nowrap border-0 hidden"></div>
      </div>
    </div>
  );
};

export default Nav;
