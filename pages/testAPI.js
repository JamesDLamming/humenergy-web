import React, { useState } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import { TypeAnimation } from 'react-type-animation';
import DefaultButton from '../components/DefaultButton';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import VPPFinderOutput from '../components/VPPFinderOutput';

export default function testAPI() {
  const [responseData, setResponseData] = useState('');
  const [tableVisible, setTableVisible] = useState(false);
  const checkEligibility = async () => {
    try {
      const response = await fetch('http://localhost:3001/check-eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include any necessary request body here
        body: JSON.stringify({ stateRegion, sectorOption }),
      });
      const jsonResponse = await response.json();
      setResponseData(jsonResponse);
      console.log(jsonResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [stateRegion, setStateRegion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the function to check eligibility
    checkEligibility(stateRegion, sectorOption);
    setTableVisible(true);
  };

  const [sectorOption, setSectorOption] = React.useState('');

  const handleOptionChange = (event) => {
    setSectorOption(event.target.value);
    console.log(sectorOption);
  };

  const headers = '';
  if (responseData.length > 0) {
    const headers = Object.keys(responseData[0]); // Get column names from the first row
  }
  return (
    <>
      <SEO title="Hum Energy - VPP finder" />
      <div className="bg-bgMain overflow-hidden min-h-screen">
        <Nav></Nav>

        <div className="max-w-xl px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <form onSubmit={handleSubmit}>
            <label>
              State/Region:
              <input
                type="text"
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
              />
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="propertyType"
                  value="Multi-family"
                  checked={sectorOption === 'Multi-family'}
                  onChange={handleOptionChange}
                />
                Multi-family
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="propertyType"
                  value="Residential"
                  checked={sectorOption === 'Residential'}
                  onChange={handleOptionChange}
                />
                Residential
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="propertyType"
                  value="C&I"
                  checked={sectorOption === 'C&I'}
                  onChange={handleOptionChange}
                />
                C&I
              </label>
            </div>
            <DefaultButton type="submit">Check API</DefaultButton>
          </form>

          <VPPFinderOutput data={responseData} visible={tableVisible} />
        </div>
      </div>
    </>
  );
}
