import React, { useState } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <SEO title="Hum Energy" />

      <div className="bg-bgMain min-h-screen overflow-hidden">
        <Nav></Nav>
        <Hero></Hero>
        <Footer />
      </div>
    </>
  );
}
