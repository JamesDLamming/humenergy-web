import React from 'react';

const Nav = () => {
  return (
    <div class="relative isolate z-10">
      <div class="px-6 py-6 lg:px-8 preview-menu-wrapper relative">
        <nav class="flex items-center justify-between" aria-label="Global">
          <a href="" class="flex flex-wrap items-center lg:flex-1 gap-x-2">
            <img
              class="w-auto h-8"
              src="/HumEnergyLogoSquare.svg"
              alt="Hum Energy logo"
            ></img>
            <p class="font-sans font-bold text-gray-900 text-xl md:text-2xl">
              Hum Energy
            </p>
          </a>
          <div class="flex items-center space-x-2 lg:hidden"></div>
          <div class="hidden lg:flex lg:gap-x-12"></div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4"></div>
        </nav>
        <div class="fixed h-0 p-0 overflow-hidden whitespace-nowrap border-0 hidden"></div>
      </div>
    </div>
  );
};

export default Nav;
