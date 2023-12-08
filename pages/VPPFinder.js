import React, { useState } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import DefaultButton from '../components/DefaultButton';
import StateSelector from '../components/StateSelector';
import VPPFinderOutput from '../components/VPPFinderOutput';

export default function VPPFinder() {
  const [responseData, setResponseData] = useState('');
  const [tableVisible, setTableVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkEligibility = async () => {
    try {
      setLoading(true); //start loading
      const response = await fetch('/api/check-eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include any necessary request body here
        body: JSON.stringify({ stateRegion, sectorOption }),
      });
      const jsonResponse = await response.json();
      setResponseData(jsonResponse);
      setLoading(false); //stop loading
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); //stop loading
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
  };

  return (
    <>
      <SEO title="Hum Energy - VPP finder" />
      <div className="bg-bgMain overflow-hidden min-h-screen">
        <Nav></Nav>

        <div className="max-w-xl flex flex-col items-center px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="p-4  rounded-lg shadow-sm bg-white text-main  mt-10">
            <div className="">
              <form onSubmit={handleSubmit}>
                <label className="mt-2 flex gap-x-2 items-center font-medium">
                  State/Region:
                  <StateSelector
                    className="ml-2"
                    value={stateRegion}
                    onChange={(e) => setStateRegion(e.target.value)}
                  ></StateSelector>
                </label>

                <div className="mt-4 flex">
                  <div>
                    <label className="">
                      <input
                        type="radio"
                        name="propertyType"
                        value="Residential"
                        checked={sectorOption === 'Residential'}
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Residential</span>
                    </label>
                  </div>
                  <div>
                    <label className="ml-6">
                      <input
                        type="radio"
                        name="propertyType"
                        value="Multi-family"
                        checked={sectorOption === 'Multi-family'}
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Multi-family</span>
                    </label>
                  </div>
                  <div>
                    <label className="ml-6">
                      <input
                        type="radio"
                        name="propertyType"
                        value="C&I"
                        checked={sectorOption === 'C&I'}
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">C&I</span>
                    </label>
                  </div>
                </div>
                <DefaultButton type="submit" className="mt-4 w-full">
                  Find local programs
                </DefaultButton>
              </form>
            </div>
          </div>
          <div className="mt-10 flex-col flex items-center ">
            {loading && <div className="loading-icon">Loading...</div>}

            <VPPFinderOutput data={responseData} visible={{ tableVisible }} />
          </div>
        </div>
      </div>
    </>
  );
}
