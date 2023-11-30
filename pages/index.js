import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>My App</title>
        <meta name="description" content="Welcome to Hum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">
          Welcome to <a className="text-blue-600" href="https://nextjs.org">Hum!</a>
        </h1>
      </main>
    </div>
  );
}
