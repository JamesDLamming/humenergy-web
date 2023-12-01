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
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Welcome to <span className="text-blue-600">Hum</span></h1>
                <div className="flex justify-center">
                <div>
          {!isModalOpen && (
            <Button  text="Join the wailtlist" onClick={() => setIsModalOpen(true)}></Button>
          )}

            {isModalOpen && (
                <div className="modal bg-white shadow-md p-10 rounded-lg">
                    <SignupForm 

                    />
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
            )}
        </div>
                </div>
            </div>


    </div>
    </div>

    
  );
}

