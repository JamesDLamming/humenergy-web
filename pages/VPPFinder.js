import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import DefaultButton from '../components/DefaultButton';
import StateSelector from '../components/StateSelector';
import VPPFinderOutput from '../components/VPPFinderOutput';
import UtilitySelector from '../components/UtililtySelector';
import MultiSelector from '../components/MultiSelector';
require('dotenv').config();

export default function VPPFinder() {
  const [programData, setProgramData] = useState([]);
  const [utilityData, setUtilityData] = useState('');
  const [tableVisible, setTableVisible] = useState(false);
  const [utilityVisible, setUtilityVisible] = useState(false);
  const [propertyTypeVisible, setPropertyTypeVisible] = useState(false);
  const [devicesVisible, setDevicesVisible] = useState(false);
  const [heatpumpPresent, setHeatpumpPresent] = useState(false);

  const [thermostatPresent, setThermostatPresent] = useState(false);

  const [batteryPresent, setBatteryPresent] = useState(false);
  const [waterheaterPresent, setWaterheaterPresent] = useState(false);

  const [EVPresent, setEVPresent] = useState(false);

  const [solarPresent, setSolarPresent] = useState(false);

  const [generatorPresent, setGeneratorPresent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [utilityState, setUtilityState] = useState('');
  const newStateRegion = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [Utility, setUtility] = useState('');
  const [utilityError, setUtilityError] = useState('');

  const [propertyTypeError, setPropertyTypeError] = useState('');
  const [batterySelectionError, setBatterySelectionError] = useState('');
  const [thermostatSelectionError, setThermostatSelectionError] = useState('');

  const [stateError, setStateError] = useState('');

  const [deviceSectionOpen, setDeviceSectionOpen] = useState(true);

  // Function to toggle the section
  const toggleDeviceSection = () => {
    setDeviceSectionOpen(!deviceSectionOpen);
  };

  const getUtilities = async (stateRegion, sectorOption) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/getUtilities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stateRegion, sectorOption }),
        }
      );
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/check-eligibility`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Include any necessary request body here
          body: JSON.stringify({
            stateRegion,
            sectorOption,
            Utility,
            thermostatPresent,
            batteryPresent,
            selectionsThermostat: selectedThermostats,
            selectionsBattery: selectedBatteries,
            heatpumpPresent,
            waterheaterPresent,
            solarPresent,
            EVPresent,
            generatorPresent,
          }),
        }
      );
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

    let isError = false; // Flag to indicate if there's any error

    if ((!Utility || Utility.trim() === '') && utilityVisible) {
      setUtilityError('Please select a Utility/CCA');
      isError = true;
    } else {
      setUtilityError(''); // Reset error
    }

    if ((!sectorOption || sectorOption.trim() === '') && propertyTypeVisible) {
      setPropertyTypeError('Please select a Property Type');
      isError = true;
    } else {
      setPropertyTypeError(''); // Reset error
    }

    if (!stateRegion || stateRegion.trim() === '') {
      setStateError('Please select a State');
      isError = true;
    } else {
      setStateError(''); // Reset error
    }

    if (
      thermostatPresent &&
      Object.values(selectedThermostats).every((element) => element === false)
    ) {
      setThermostatSelectionError('Please add a thermostat');
      isError = true;
    } else {
      setThermostatSelectionError(''); // Reset error
    }

    if (
      batteryPresent &&
      Object.values(selectedBatteries).every((element) => element === false)
    ) {
      setBatterySelectionError('Please add a battery');
      isError = true;
    } else {
      setBatterySelectionError(''); // Reset error
    }

    if (isError) {
      return; // Prevent form submission if there's any error
    }

    // No errors, proceed with form submission
    checkEligibility(stateRegion, sectorOption, Utility);
    setTableVisible(true);
    setDeviceSectionOpen(false);
  };

  const [sectorOption, setSectorOption] = useState('');

  const [selectedThermostats, setSelectedThermostats] = useState([]);

  const [selectedBatteries, setSelectedBatteries] = useState([]);

  console.log('Batteries: ', selectedBatteries);
  console.log('Thermostats: ', selectedThermostats);

  // Handle 'None' radio button change
  const handleNoneChangeThermostat = () => {
    setSelectedThermostats([]);
  };

  const handleNoneChangeBattery = () => {
    setSelectedBatteries([]);
  };

  useEffect(() => {
    setUtility('');
  }, [stateRegion, sectorOption]);

  const batteryOptions = [
    { value: 'Generac', label: 'Generac' },
    { value: 'TeslaPowerwall', label: 'Tesla Powerwall' },
    { value: 'Swell', label: 'Swell' },
    { value: 'Other', label: 'Other' },
  ];

  const thermostatOptions = [
    { value: 'Honeywell', label: 'Honeywell' },
    { value: 'Nest', label: 'Nest' },
    { value: 'Other', label: 'Other' },
  ];

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
                  className="!w-2/3"
                  value={stateRegion}
                  onChange={(e) => {
                    const newStateRegion = e.target.value;
                    setStateRegion(newStateRegion); // Update the state
                    setPropertyTypeVisible(true);
                    setStateError('');
                    setTableVisible(false);
                    getUtilities(newStateRegion, sectorOption);
                  }}
                ></StateSelector>{' '}
              </div>
              {stateError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {stateError}
                </div>
              )}

              <div
                className={` flex gap-x-3 overflow-hidden propertySection ${
                  propertyTypeVisible ? ' open' : ' closed'
                }`}
              >
                <div className="font-semibold w-1/3">Property Type:</div>
                <div className="w-2/3">
                  <div>
                    <label className="flex items-baseline">
                      <input
                        type="radio"
                        name="propertyType"
                        value="Residential"
                        checked={sectorOption === 'Residential'}
                        onChange={(e) => {
                          const newSectorOption = e.target.value;
                          setSectorOption(newSectorOption);
                          setSectorOption(e.target.value);
                          setPropertyTypeError('');
                          setTableVisible(false);

                          setTableVisible(false);
                          getUtilities(stateRegion, newSectorOption);
                          setUtilityVisible(true);
                        }}
                      />
                      <span className="ml-2">Residential</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-baseline">
                      <input
                        type="radio"
                        name="propertyType"
                        value="Multifamily"
                        checked={sectorOption === 'Multifamily'}
                        onChange={(e) => {
                          const newSectorOption = e.target.value;
                          setSectorOption(newSectorOption);
                          setSectorOption(e.target.value);
                          getUtilities(stateRegion, newSectorOption);
                          setUtilityVisible(true);
                          setTableVisible(false);
                        }}
                      />
                      <span className="ml-2">Multi-family</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-baseline">
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

                          setTableVisible(false);
                        }}
                      />
                      <span className="ml-2">C&I</span>
                    </label>
                  </div>
                </div>
              </div>
              {propertyTypeError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {propertyTypeError}
                </div>
              )}
              <label
                className={` flex gap-x-3 items-center utilitySection  ${
                  utilityVisible ? 'open' : 'closed'
                }`}
              >
                <div className="font-semibold w-1/3">Utility/CCA:</div>
                <UtilitySelector
                  className="!w-2/3"
                  data={utilityData}
                  visible={utilityVisible}
                  value={Utility}
                  onChange={(e) => {
                    const newUtiltyValue = e.target.value;
                    setUtility(newUtiltyValue);
                    setUtilityError('');
                    setDevicesVisible(true);
                    setTableVisible(false);
                  }}
                />
              </label>
              {utilityError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {utilityError}
                </div>
              )}
              {Utility != 'Unavailable' && (
                <div className={`block gap-x-3 items-top `}>
                  <div
                    className={`flex gap-x-0 mt-2  justify-center items-center overflow-hidden  w-full deviceTitleSection ${
                      devicesVisible ? 'open' : 'closed'
                    }`}
                  >
                    <div className="text-xl  font-black items-center text-center">
                      Add devices
                    </div>
                    {deviceSectionOpen ? (
                      <div
                        className="flex items-center  text-main"
                        onClick={() => toggleDeviceSection()}
                      >
                        <svg
                          className="fill-current h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.516 7.548c.436-.446 1.045-.481 1.576 0L10 10.405l2.908-2.857c.531-.481 1.141-.446 1.576 0 .436.445.408 1.197 0 1.642l-3.417 3.356c-.27.267-.631.408-.997.408s-.728-.141-.997-.408l-3.417-3.356c-.408-.445-.436-1.197 0-1.642z" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="flex items-center  text-main -rotate-90"
                        onClick={() => toggleDeviceSection()}
                      >
                        <svg
                          className="fill-current h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.516 7.548c.436-.446 1.045-.481 1.576 0L10 10.405l2.908-2.857c.531-.481 1.141-.446 1.576 0 .436.445.408 1.197 0 1.642l-3.417 3.356c-.27.267-.631.408-.997.408s-.728-.141-.997-.408l-3.417-3.356c-.408-.445-.436-1.197 0-1.642z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div
                    className={` block overflow-hidden deviceSection ${
                      deviceSectionOpen && devicesVisible ? ' open' : 'closed'
                    }`}
                  >
                    {/* Smart Thermostat */}
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Smart Thermostat</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="thermostat"
                            value="thermostatPresent"
                            checked={thermostatPresent === true}
                            onChange={() => setThermostatPresent(true)}
                          />
                          <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-center ">
                          <input
                            type="radio"
                            name="thermostat"
                            value="noThermostatPresent"
                            checked={thermostatPresent === false}
                            onChange={() => {
                              setThermostatPresent(false);
                              handleNoneChangeThermostat();
                              setThermostatSelectionError('');
                            }}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>
                      <div
                        className={`thermostatSelection ${
                          thermostatPresent ? 'open' : 'closed'
                        } `}
                      >
                        <MultiSelector
                          optionsList={thermostatOptions}
                          selectedOptions={selectedThermostats}
                          setSelectedOptions={setSelectedThermostats}
                          placeholderOpenText="Search"
                          placeholderClosedText="Add thermostats..."
                        ></MultiSelector>
                      </div>
                    </div>

                    {thermostatSelectionError && (
                      <div className="text-red-500 mt-1 -mb-2 text-sm text-right">
                        {thermostatSelectionError}
                      </div>
                    )}
                    {/*batteries*/}
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Battery</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="battery"
                            value="batteryPresent"
                            checked={batteryPresent === true}
                            onChange={() => setBatteryPresent(true)}
                          />
                          <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-center ">
                          <input
                            type="radio"
                            name="battery"
                            value="noBatteryPresent"
                            checked={batteryPresent === false}
                            onChange={() => {
                              setBatteryPresent(false);
                              handleNoneChangeBattery();
                              setBatterySelectionError('');
                            }}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>

                      <div
                        className={` batterySelection ${
                          batteryPresent ? 'open' : 'closed'
                        } `}
                      >
                        <MultiSelector
                          optionsList={batteryOptions}
                          selectedOptions={selectedBatteries}
                          setSelectedOptions={setSelectedBatteries}
                          placeholderOpenText="Search"
                          placeholderClosedText="Add batteries..."
                        ></MultiSelector>
                      </div>
                    </div>

                    {batterySelectionError && (
                      <div className="text-red-500 mt-1 -mb-2 text-sm text-right">
                        {batterySelectionError}
                      </div>
                    )}
                    {/*heatpump*/}
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Heat Pump</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="heatpump"
                            value="heatpumpPresent"
                            checked={heatpumpPresent === true}
                            onChange={() => setHeatpumpPresent(true)}
                          />
                          <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="heatpump"
                            value="noHeatpumpPresent"
                            checked={heatpumpPresent === false}
                            onChange={() => setHeatpumpPresent(false)}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>
                    </div>
                    {/*water heater*/}
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Electric Water Heater</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="waterheater"
                            value="waterheaterPresent"
                            checked={waterheaterPresent === true}
                            onChange={() => setWaterheaterPresent(true)}
                          />
                          <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="waterheater"
                            value="nowaterheaterPresent"
                            checked={waterheaterPresent === false}
                            onChange={() => setWaterheaterPresent(false)}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>
                    </div>
                    {/*solar*/}
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Solar</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="">
                          <input
                            type="radio"
                            name="solarPresent"
                            value="solarPresent"
                            checked={solarPresent === true}
                            onChange={() => setSolarPresent(true)}
                          />
                          <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-baseline">
                          <input
                            type="radio"
                            name="solar"
                            value="noSolarPresent"
                            checked={solarPresent === false}
                            onChange={() => setSolarPresent(false)}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>
                    </div>
                    {/*EV*/}
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Electric Vehicle</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="">
                          <input
                            type="radio"
                            name="EVPresent"
                            value="EVPresent"
                            checked={EVPresent === true}
                            onChange={() => setEVPresent(true)}
                          />
                          <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-baseline">
                          <input
                            type="radio"
                            name="EV"
                            value="noEVPresent"
                            checked={EVPresent === false}
                            onChange={() => setEVPresent(false)}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>
                    </div>
                    {/*generator*/}
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Generator</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="">
                          <input
                            type="radio"
                            name="generatorPresent"
                            value="generatorPresent"
                            checked={generatorPresent === true}
                            onChange={() => setGeneratorPresent(true)}
                          />
                          <span className="ml-2">Yes</span>
                        </label>

                        <label className="flex items-baseline">
                          <input
                            type="radio"
                            name="generator"
                            value="noGeneratorPresent"
                            checked={generatorPresent === false}
                            onChange={() => setGeneratorPresent(false)}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DefaultButton
                type="submit"
                className={
                  Utility != 'Unavailable'
                    ? 'mt-4 w-full'
                    : 'mt-4 w-full !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none'
                }
              >
                {Utility != 'Unavailable'
                  ? '   Find local programs'
                  : 'Your utility does not currently offer any programs'}
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
      <style>
        {`
          .deviceSection {
            transition: 0.7s ease;
            overflow: hidden;
          }
          .propertySection {
            transition: 0.5s ease;
            overflow: hidden;
          }

          .utilitySection {
            transition: 0.5s ease;
            overflow: hidden;
          }
          
          .deviceTitleSection{
            transition: 0.5s ease;
          }
          .thermostatSelection{
            transition: 0.7s ease;
          }

          
          .thermostatSelection.open{
            max-height: 100px;
           margin-top: 0.5rem
         
          }

          .batterySelection{
            transition: 0.7s ease;
          }

          
          .batterySelection.open{
            max-height: 100px;
            margin-top: 0.5rem
         
          }

          .deviceTitleSection.open {
            max-height: 100px;
            margin-top: 1rem
          }

          .utilitySection.open {
            margin-top: 1rem;
            max-height: 100px
          }
          .deviceSection.open {
            max-height: 800px
          }
          .propertySection.open {
            margin-top: 1rem;
            max-height: 150px
          }
          .closed {
            max-height: 0px;
            overflow: hidden
            
          }





        `}
      </style>
    </>
  );
}
