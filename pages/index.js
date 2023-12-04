import React, { useState } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SEO title="Hum Energy" />

      <div class="bg-white overflow-hidden">
        <Nav></Nav>
        <Hero></Hero>
      </div>
    </>
  );
}
