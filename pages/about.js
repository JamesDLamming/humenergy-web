import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import SEO from '../components/SEO';

const AboutUsPage = () => {
  return (
    <>
      <SEO title="About Hum Energy" />

      <div className="bg-bgMain min-h-screen overflow-hidden">
        <Nav></Nav>
        <div className="about mx-4">
          <div
            className="max-w-xl px-4 align-center mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-4xl shadow-2xl text-bgMain bg-main py-4 rounded-lg my-10
            "
          >
            <header className="text-center my-10">
              <h1 className="text-4xl font-bold text-accent">About Us</h1>
            </header>
            <div className="max-w-xl px-4 mx-auto grid gap-6 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid-cols-2 lg:gap-24 relative z-10 mb-10">
              <div className="">
                At Hum Energy, we believe your energy should work for you.
                That's why we help you understand what is going on with your
                electricity use, and automatically optimize it, so you can save
                money and reduce your carbon footprint, all without impacting
                the way you live your life. We help you to save money - and earn
                it! - without lifting a finger.
              </div>
              <div>
                By bringing all your devices under one roof in the Hum App,
                you're able to have a complete picture of what is going on with
                your energy use, find new ways to reduce it, and even find ways
                to earn money from your devices.
              </div>
              <div className="font-bold text-lg italic">
                Take control of your energy and start saving today
              </div>
            </div>
            <div className=" text-xl mb-3 flex flex-wrap items-center justify-center lg:flex-1 gap-x-2">
              <img
                className="w-auto h-8"
                src="/HumEnergyLogoSquare.svg"
                alt="Hum Energy logo"
              ></img>
              {/* <h1 className="font-black text-accent text-xl md:text-2xl">
                  Hum Energy
                </h1> */}
            </div>
          </div>
        </div>
        <Footer> </Footer>
      </div>
    </>
  );
};

export default AboutUsPage;
