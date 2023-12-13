import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import DefaultButton from '../components/DefaultButton';
import StateSelector from '../components/StateSelector';
import VPPFinderOutput from '../components/VPPFinderOutput';
import UtilitySelector from '../components/UtililtySelector';

export default function VPPFinder() {
  const [programData, setProgramData] = useState('');
  const [utilityData, setUtilityData] = useState('');
  const [tableVisible, setTableVisible] = useState(false);
  const [utilityVisible, setUtilityVisible] = useState(false);
  const [propertyTypeVisible, setPropertyTypeVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [utilityState, setUtilityState] = useState('');
  const newStateRegion = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [Utility, setUtility] = useState('');
  const [utilityError, setUtilityError] = useState('');

  const [stateError, setStateError] = useState('');

  const getUtilities = async (stateRegion, sectorOption) => {
    try {
      const response = await fetch('/api/getUtilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stateRegion, sectorOption }),
      });
      const jsonResponse = await response.json();
      setUtilityData(jsonResponse);
      // Reset the Utility state every time new utility data is fetched
      setUtility(''); // Reset to default or empty value
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkEligibility = async () => {
    try {
      setLoading(true); //start loading

      const response = await fetch('/api/check-eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include any necessary request body here
        body: JSON.stringify({ stateRegion, sectorOption, Utility }),
      });
      const jsonResponse = await response.json();
      setProgramData(jsonResponse);
      setLoading(false); //stop loading
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); //stop loading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Utility || Utility.trim() === '') {
      setUtilityError('Please select a Utility/CCA.');
      return; // Prevent form submission
    }
    if (!stateRegion || stateRegion.trim() === '') {
      setStateError('Please select a State.');
      return; // Prevent form submission
    }

    // Reset error message and continue with form submission
    setUtilityError('');
    checkEligibility(stateRegion, sectorOption, Utility);
    setTableVisible(true);
  };

  const [sectorOption, setSectorOption] = React.useState('');
  useEffect(() => {
    setUtility('');
  }, [stateRegion, sectorOption]);

  return (
    <>
      <SEO title="Hum Energy - VPP finder" />
      <div className="bg-bgMain overflow-hidden min-h-screen">
        <Nav></Nav>

        <div className="max-w-xl flex flex-col items-center px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="p-4 px-8 w-full sm:w-96 rounded-lg shadow-sm bg-white text-main  mt-10">
            <div className="text-xl pb-2 font-black items-center text-center ">
              Enter your details
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-2 flex gap-x-3 items-center">
                <div className="w-1/3 font-semibold">State:</div>
                <StateSelector
                  className="w-2/3"
                  value={stateRegion}
                  onChange={(e) => {
                    const newStateRegion = e.target.value;
                    setStateRegion(newStateRegion); // Update the state
                    setPropertyTypeVisible(true);
                    setStateError('');
                    getUtilities(newStateRegion, sectorOption);
                  }}
                ></StateSelector>
              </div>
              {stateError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {stateError}
                </div>
              )}

              {propertyTypeVisible && (
                <div className="mt-4 flex gap-x-3">
                  <div className="font-semibold w-1/3">Property Type:</div>
                  <div className="w-2/3">
                    <div>
                      <label className="">
                        <input
                          type="radio"
                          name="propertyType"
                          value="Residential"
                          checked={sectorOption === 'Residential'}
                          onChange={(e) => {
                            const newSectorOption = e.target.value;
                            setSectorOption(newSectorOption);
                            setSectorOption(e.target.value);
                            getUtilities(stateRegion, newSectorOption);
                            setUtilityVisible(true);
                          }}
                        />
                        <span className="ml-2">Residential</span>
                      </label>
                    </div>
                    <div>
                      <label className="">
                        <input
                          type="radio"
                          name="propertyType"
                          value="Multi-family"
                          checked={sectorOption === 'Multi-family'}
                          onChange={(e) => {
                            const newSectorOption = e.target.value;
                            setSectorOption(newSectorOption);
                            setSectorOption(e.target.value);
                            getUtilities(stateRegion, newSectorOption);
                            setUtilityVisible(true);
                          }}
                        />
                        <span className="ml-2">Multi-family</span>
                      </label>
                    </div>
                    <div>
                      <label className="">
                        <input
                          type="radio"
                          name="propertyType"
                          value="C&I"
                          checked={sectorOption === 'C&I'}
                          onChange={(e) => {
                            const newSectorOption = e.target.value;
                            setSectorOption(newSectorOption);
                            setSectorOption(e.target.value);
                            getUtilities(stateRegion, newSectorOption);
                            setUtilityVisible(true);
                          }}
                        />
                        <span className="ml-2">C&I</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {utilityVisible && (
                <label className="mt-2 flex gap-x-3 items-center">
                  <div className="font-semibold w-1/3">Utility/CCA:</div>
                  <UtilitySelector
                    className="w-2/3"
                    data={utilityData}
                    visible={utilityVisible}
                    value={Utility}
                    onChange={(e) => {
                      const newUtiltyValue = e.target.value;
                      setUtility(newUtiltyValue);
                      setUtilityError('');
                    }}
                  />
                </label>
              )}
              {utilityError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {utilityError}
                </div>
              )}

              <DefaultButton type="submit" className="mt-4 w-full">
                Find local programs
              </DefaultButton>
            </form>
          </div>
          <div className="mt-10 flex-col flex w-full items-center ">
            {loading && <div className="loading-icon">Loading...</div>}

            <VPPFinderOutput
              data={programData}
              visible={tableVisible && !loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
