import React, { useState } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <SEO title="Hum Energy" />

      <div className="page-container bg-bgMain flex flex-col min-h-screen overflow-hidden">
        <Nav></Nav>
        <div className="main-content flex-grow">
          <Hero></Hero>
        </div>
        <Footer />
      </div>
    </>
  );
}
