import React, { useState } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';

const LandingPage = () => {
  return (
    <div class="bg-white overflow-hidden">
      <Nav></Nav>
      <Hero></Hero>
    </div>
  );
};

export default LandingPage;
