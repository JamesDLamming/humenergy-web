import Modal from './Modal';
import SignupForm from './SignupForm';
import DefaultButton from './DefaultButton';
import React, { useState } from 'react';

const Footer = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <>
      <div className="relative isolate z-50 shadow-sm bg-white h-auto">
        <footer className="print:hidden" aria-labelledby="footerHeading">
          <h2 id="footerHeading" className="sr-only">
            Footer
          </h2>
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="xl:col-span-1">
                <div
                  className={` text-xl mb-3 flex flex-wrap items-center lg:flex-1 gap-x-2`}
                >
                  <img
                    className="w-auto h-8"
                    src="/HumEnergyLogoSquare.svg"
                    alt="Hum Energy logo"
                  ></img>
                  <h1 className="font-black text-main text-xl md:text-2xl">
                    Hum Energy
                  </h1>
                </div>

                {/* <p className=" text-base mb-6">Make your home Hum</p> */}

                <p className=" text-base mb-6">Take control of your energy</p>

                {/* <p className=" text-base mb-6">Your energy, on auto-pilot</p> */}
                <div className="flex space-x-6 mb-6">
                  <a
                    href="https://twitter.com/humenergyapp"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/humenergyapp/"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
                <div className="">
                  <DefaultButton onClick={() => setModalVisibility(true)}>
                    Join the waitlist
                  </DefaultButton>
                </div>
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
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Footer;
