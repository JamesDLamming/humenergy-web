// NotFoundPage.jsx
import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import DefaultButton from '../components/DefaultButton';

export default function Custom404() {
  return (
    <>
      <div className="page-container bg-bgMain flex flex-col min-h-screen overflow-hidden">
        <Nav></Nav>
        <div className="content-container flex flex-col items-center justify-center w-full flex-grow ">
          <div className="main-content flex flex-col px-4 mx-2 w-full  sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="justify-center text-center items-center align-middle">
              <h1 className="text-6xl font-bold text-main">404</h1>
              <p className="text-xl text-gray-600">Page Not Found</p>
              <p className="mt-4 text-gray-600">
                The page you're looking for doesn't seem to exist.
              </p>
              <DefaultButton
                className="mt-6 px-6 py-3"
                onClick={() => (window.location.href = '/')}
              >
                Go Home
              </DefaultButton>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
