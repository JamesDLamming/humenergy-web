import React, { useState } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Head from 'next/head';

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="description" content="Welcome to Hum Energy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class="bg-white overflow-hidden">
        <Nav></Nav>
        <Hero></Hero>
      </div>
    </>
  );
};

export default LandingPage;
