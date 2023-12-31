import React, { useState } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import { TypeAnimation } from 'react-type-animation';
import DefaultButton from '../components/DefaultButton';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import Footer from '../components/Footer';

export default function earn() {
  const [modalVisibility, setModalVisibility] = useState(false);

  return (
    <>
      <SEO title="Hum Energy - Earn" />

      <div className="page-container bg-bgMain flex flex-col min-h-screen overflow-hidden">
        <Nav></Nav>
        <div className="main-content flex-grow">
          <section
            id="hero"
            className="overflow-hidden lg:relative py-12 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-mainSecondary to-main"
            sectionname="hero"
            sectionlabel="Hero"
            sortorder="0"
          >
            <div className="max-w-xl px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-24 relative z-10">
              <div className="relative z-[1] col-span-2">
                <div className="mt-6  sm:max-w-2xl">
                  <h1 className="text-3xl font-black tracking-tight text-bgMain sm:text-5xl xl:text-6xl  relative">
                    Make money from your{' '}
                    <span className="min-w-[250px]  inline-block">
                      <TypeAnimation
                        sequence={[
                          'EV',
                          1500,
                          'Smart Thermostat',
                          1500,
                          'Home Battery',
                          1500,
                          'Solar Panel',
                          1500,
                          'Heat Pump',
                          1500,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        cursor={false}
                        className="text-accent inline-block"
                      />
                    </span>
                  </h1>

                  <h2 className="font-regular font-cabin mt-6 text-lg text-bgMain sm:text-xl  relative">
                    Connect your energy devices into Virtual Power Plants and
                    other utility programs. Earn money from them while you
                    sleep, without impacting how you live your life
                  </h2>
                </div>

                <div className="mt-10 space-y-4">
                  <DefaultButton
                    onClick={() => (window.location.href = '/VPPFinder')}
                    className="!text-main"
                  >
                    Find local programs
                  </DefaultButton>
                </div>
              </div>
              <div className="col-span-1"></div>
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
        <Footer />
      </div>
    </>
  );
}
