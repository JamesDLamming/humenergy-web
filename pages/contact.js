import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

const ContactUsPage = () => {
  return (
    <>
      <SEO title="Contact Us" />

      <div className="page-container bg-bgMain flex flex-col min-h-screen overflow-hidden">
        <Nav></Nav>
        <div className="main-content about mx-4 flex-grow">
          <div
            className="max-w-xl px-4 align-center mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-4xl shadow-2xl text-bgMain bg-main  py-4 rounded-lg my-10
            "
          >
            <header className="text-center my-10">
              <h1 className="text-4xl font-bold text-accent">Contact Us</h1>
            </header>
            <div className="max-w-xl px-4 mx-auto sm:max-w-2xl sm:px-6 lg:px-8 lg:max-w-2xl  relative z-10 mb-10">
              <ContactForm />
            </div>
            <div className=" text-xl mb-3 flex flex-wrap items-center justify-center lg:flex-1 gap-x-2">
              <img
                className="w-auto h-10"
                src="/HumEnergyLogoSquare-nobackground.svg"
                alt="Hum Energy logo"
              ></img>
            </div>
          </div>
        </div>
        <Footer> </Footer>
      </div>
    </>
  );
};

export default ContactUsPage;
