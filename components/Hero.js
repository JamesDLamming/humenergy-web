import React, { useState } from 'react';
import DefaultButton from './DefaultButton';
import SignupForm from './SignupForm';
import Modal from './Modal';

const Hero = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <div className="section-spacing">
      <section
        id="hero"
        className=" lg:relative py-12 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-main from-50% to-accent"
        sectionname="hero"
        sectionlabel="Hero"
        sortorder="0"
      >
        <div className="max-w-xl px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24 relative z-10">
          <div className="relative z-[1]">
            <div className="">
              <div className="mt-6 sm:max-w-xl">
                <h1 className="text-3xl font-black tracking-tight text-accent sm:text-5xl xl:text-6xl  relative">
                  Take control of your energy
                </h1>
                <h2 className=" font-cabin mt-6 text-lg text-bgMain sm:text-xl  relative">
                  Manage and optimize your energy use with Hum Energy, the app
                  that helps you save money on your bills, earn money from your
                  devices, and reduce your environmental footprint; all without
                  lifting a finger.
                </h2>
              </div>
            </div>
            <div className="mt-10 items-center flex flex-wrap gap-4">
              <div>
                <DefaultButton
                  onClick={() => (window.location.href = '/earn')}
                  className="!text-main"
                >
                  Start earning money
                </DefaultButton>
              </div>
              <div>
                <DefaultButton
                  onClick={() => setModalVisibility(true)}
                  className="bg-gray-200 border-2 border-main !text-main "
                >
                  Join the waitlist
                </DefaultButton>
              </div>
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
