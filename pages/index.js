import React, { useState } from 'react';
import Head from 'next/head';
import Button from '../components/Button';
import SignupForm from '../components/SignupForm';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>My App</title>
        <meta name="description" content="Welcome to Hum Energy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        {!isModalOpen && (
          <div className="bg-white p-8 rounded-lg shadow-md sm:w-9/12 w-11/12 max-w-3xl h-1/4 items-center justify-center flex">
            <div>
              <h1 className="text-2xl font-bold text-center mb-4">
                Welcome to <span className="text-blue-600">Hum</span>
              </h1>
              <div className="flex justify-center">
                <Button
                  text="Join the wailtlist"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal relative bg-white shadow-md p-10 pt-12 rounded-lg md:w-9/12 w-11/12">
            <div className="absolute top-1.5 left-3.5  ">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="text-2xl font-semibold"
              >
                &times;
              </button>
            </div>
            <SignupForm />
          </div>
        )}
      </div>
    </div>
  );
}
