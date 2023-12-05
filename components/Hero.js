import React, { useState } from 'react';
import DefaultButton from './DefaultButton';
import SignupForm from './SignupForm';
import Modal from './Modal';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <div className="section-spacing">
      <section
        id="hero"
        className="overflow-hidden lg:relative pt-12 sm:pt-20 md:pt-24 lg:pt-32"
        sectionname="hero"
        sectionlabel="Hero"
        sortorder="0"
      >
        <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24 relative z-10">
          <div className="relative z-[1]">
            <div className="">
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-6xl xl:text-7xl  relative">
                  Take control of your home energy use
                </h1>
                <h2 className="font-medium font-cabin mt-6 text-lg text-gray-500 sm:text-xl  relative">
                  Manage and optimize your energy consumption with Hum Energy,
                  the user-friendly app designed to help you save money and
                  reduce your environmental footprint
                </h2>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              <DefaultButton onClick={() => setModalVisibility(true)}>
                Join the Waitlist
              </DefaultButton>{' '}
            </div>
            <div className="ratings mt-6 relative" data-testid="ratings">
              <div className="flex items-center gap-3 divide-x divide-gray-300 text-center sm:text-left">
                <div className="flex flex-wrap flex-shrink-0">
                  <img
                    src="/stars.svg"
                    className="w-5 h-5 text-yellow-400"
                  ></img>
                  <img
                    src="/stars.svg"
                    className="w-5 h-5 text-yellow-400"
                  ></img>
                  <img
                    src="/stars.svg"
                    className="w-5 h-5 text-yellow-400"
                  ></img>
                  <img
                    src="/stars.svg"
                    className="w-5 h-5 text-yellow-400"
                  ></img>
                  <img
                    src="/stars.svg"
                    className="w-5 h-5 text-yellow-400"
                  ></img>
                </div>
                <div className="min-w-0 py-1 text-xs sm:text-sm text-gray-500 pl-3">
                  Energy monitoring
                </div>
                <div className="min-w-0 py-1 text-xs sm:text-sm text-gray-500 pl-3">
                  Personalized tips
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pl-6">
          <div className="pt-12 sm:relative sm:mt-12 sm:pt-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 z-20">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 w-screen left-1/2 bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div>
              <svg
                className="absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0"
                width="404"
                height="392"
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-200"
                      fill="currentColor"
                    ></rect>
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="392"
                  fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                ></rect>
              </svg>
            </div>

            <div className="relative pl-4 ml-auto sm:max-w-4xl sm:px-0 lg:h-full lg:max-w-none lg:flex lg:items-center xl:pl-12 preview-menu-wrapper">
              <img
                className="w-full rounded-l-3xl lg:w-auto 2xl:h-full 2xl:max-w-none 2xl:rounded-3xl"
                src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE3MTAzODl8&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"
                alt="Hum Energy"
              ></img>
            </div>
          </div>
        </div>
      </section>

      <Modal
        visible={modalVisibility}
        onCancel={() => setModalVisibility(false)}
        buttonText="Submit"
        hideButton
      >
        <SignupForm
          isInModal={true}
          onFormSubmitted={() => setModalVisibility(false)}
        ></SignupForm>
      </Modal>
    </div>
  );
};

export default Hero;
