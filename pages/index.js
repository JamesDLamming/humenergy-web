import React, {useState} from 'react';
import Head from 'next/head';
import Button from '../components/Button'
import SignupForm from '../components/signupForm';



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
            <div className="bg-white p-8 rounded-lg shadow-md w-9/12">
            <h1 className="text-2xl font-bold text-center mb-4">Welcome to <span className="text-blue-600">Hum</span></h1>
            <div className="flex justify-center">
            <div>
            <Button  text="Join the wailtlist" onClick={() => setIsModalOpen(true)}></Button>
                    </div>
                </div>
            </div>
          )}

            {isModalOpen && (
                <div className="modal bg-white shadow-md p-10 pt-12 rounded-lg w-9/12">

<div className="relative bg-white rounded-lg  max-w-md w-full m-auto">

            <button
                onClick={() => { setIsModalOpen(false) }}
                className="absolute -top-10 left-1 -mt-18 -ml-8 mb-1 mr-1 text-2xl font-semibold"
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

