import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import DefaultButton from '../components/DefaultButton';
import VPPFinderOutput from '../components/VPPFinderOutput';

import MultiSelector from '../components/MultiSelector';
import SingleSelector from '../components/SingleSelector';

require('dotenv').config();

export default function VPPFinder() {
  const states = [
    { value: 'AL', label: 'AL' },
    { value: 'AK', label: 'AK' },
    { value: 'AR', label: 'AR' },
    { value: 'AZ', label: 'AZ' },
    { value: 'CA', label: 'CA' },
    { value: 'CO', label: 'CO' },
    { value: 'CT', label: 'CT' },
    { value: 'DE', label: 'DE' },
    { value: 'FL', label: 'FL' },
    { value: 'GA', label: 'GA' },
    { value: 'HI', label: 'HI' },
    { value: 'IA', label: 'IA' },
    { value: 'ID', label: 'ID' },
    { value: 'IL', label: 'IL' },
    { value: 'IN', label: 'IN' },
    { value: 'KS', label: 'KS' },
    { value: 'KY', label: 'KY' },
    { value: 'LA', label: 'LA' },
    { value: 'MA', label: 'MA' },
    { value: 'MD', label: 'MD' },
    { value: 'ME', label: 'ME' },
    { value: 'MI', label: 'MI' },
    { value: 'MN', label: 'MN' },
    { value: 'MO', label: 'MO' },
    { value: 'MS', label: 'MS' },
    { value: 'MT', label: 'MT' },
    { value: 'NC', label: 'NC' },
    { value: 'ND', label: 'ND' },
    { value: 'NE', label: 'NE' },
    { value: 'NH', label: 'NH' },
    { value: 'NJ', label: 'NJ' },
    { value: 'NM', label: 'NM' },
    { value: 'NV', label: 'NV' },
    { value: 'NY', label: 'NY' },
    { value: 'OH', label: 'OH' },
    { value: 'OK', label: 'OK' },
    { value: 'OR', label: 'OR' },
    { value: 'PA', label: 'PA' },
    { value: 'RI', label: 'RI' },
    { value: 'SC', label: 'SC' },
    { value: 'SD', label: 'SD' },
    { value: 'TN', label: 'TN' },
    { value: 'TX', label: 'TX' },
    { value: 'UT', label: 'UT' },
    { value: 'VA', label: 'VA' },
    { value: 'VT', label: 'VT' },
    { value: 'WA', label: 'WA' },
    { value: 'WI', label: 'WI' },
    { value: 'WV', label: 'WV' },
    { value: 'WY', label: 'WY' },
  ];
  const [programData, setProgramData] = useState([]);
  const [utilityData, setUtilityData] = useState('');
  const [tableVisible, setTableVisible] = useState(false);
  const [utilityVisible, setUtilityVisible] = useState(false);
  const [propertyTypeVisible, setPropertyTypeVisible] = useState(false);
  const [devicesVisible, setDevicesVisible] = useState(false);
  const [heatpumpPresent, setHeatpumpPresent] = useState(false);

  const [thermostatPresent, setThermostatPresent] = useState(false);

  const [deviceSelectionMenuIsOpen, setDeviceSelectionMenuIsOpen] =
    useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [thermostatMenuIsOpen, setThermostatMenuIsOpen] = useState(false);
  const [batteryMenuIsOpen, setBatteryMenuIsOpen] = useState(false);
  const [heatpumpMenuIsOpen, setHeatpumpMenuIsOpen] = useState(false);
  const [waterheaterMenuIsOpen, setWaterheaterMenuIsOpen] = useState(false);
  const [solarMenuIsOpen, setSolarMenuIsOpen] = useState(false);
  const [EVMenuIsOpen, setEVMenuIsOpen] = useState(false);
  const [generatorMenuIsOpen, setGeneratorMenuIsOpen] = useState(false);

  useEffect(() => {
    // Set deviceSelectionMenuIsOpen to true if either menu is open
    const isAnyDeviceMenuOpen =
      thermostatMenuIsOpen || batteryMenuIsOpen || heatpumpMenuIsOpen;
    setDeviceSelectionMenuIsOpen(isAnyDeviceMenuOpen);
  }, [thermostatMenuIsOpen, batteryMenuIsOpen, heatpumpMenuIsOpen]);

  const [batteryPresent, setBatteryPresent] = useState(false);
  const [waterheaterPresent, setWaterheaterPresent] = useState(false);

  const [EVPresent, setEVPresent] = useState(false);

  const [solarPresent, setSolarPresent] = useState(false);

  const [generatorPresent, setGeneratorPresent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [utilityState, setUtilityState] = useState('');
  const newStateRegion = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [Utility, setUtility] = useState([{ value: '', label: '' }]);
  const [utilityError, setUtilityError] = useState('');

  const [propertyTypeError, setPropertyTypeError] = useState('');
  const [batterySelectionError, setBatterySelectionError] = useState('');
  const [thermostatSelectionError, setThermostatSelectionError] = useState('');
  const [heatpumpSelectionError, setHeatpumpSelectionError] = useState('');
  const [waterheaterSelectionError, setWaterheaterSelectionError] =
    useState('');

  const [solarSelectionError, setSolarSelectionError] = useState('');
  const [EVSelectionError, setEVSelectionError] = useState('');
  const [generatorSelectionError, setGeneratorSelectionError] = useState('');

  const [sectorOption, setSectorOption] = useState('');

  const [selectedThermostats, setSelectedThermostats] = useState([]);
  const [selectedBatteries, setSelectedBatteries] = useState([]);
  const [selectedSolar, setSelectedSolar] = useState([]);
  const [selectedEVChargers, setSelectedEVChargers] = useState([]);
  const [selectedEVs, setSelectedEVs] = useState([]);

  const [selectedGenerators, setSelectedGenerators] = useState([]);
  const [selectedV2G, setSelectedV2G] = useState([]);
  const [selectedWaterheaters, setSelectedWaterheaters] = useState([]);
  const [selectedHeatpumps, setSelectedHeatpumps] = useState([]);

  const [thermostatOptions, setThermostatOptions] = useState([
    { value: '', label: '' },
  ]);
  const [batteryOptions, setBatteryOptions] = useState([
    { value: '', label: '' },
  ]);
  const [solarOptions, setSolarOptions] = useState([{ value: '', label: '' }]);
  const [evChargerOptions, setEVChargerOptions] = useState([
    { value: '', label: '' },
  ]);
  const [EVOptions, setEVOptions] = useState([{ value: '', label: '' }]);
  const [v2gOptions, setV2GOptions] = useState([{ value: '', label: '' }]);
  const [waterheaterOptions, setWaterheaterOptions] = useState([
    { value: '', label: '' },
  ]);
  const [heatpumpOptions, setHeatpumpOptions] = useState([
    { value: '', label: '' },
  ]);
  const [generatorOptions, setGeneratorOptions] = useState([
    { value: '', label: '' },
  ]);

  const [stateError, setStateError] = useState('');

  const [deviceSectionOpen, setDeviceSectionOpen] = useState(true);
  const toggleDeviceSection = () => {
    setDeviceSectionOpen(!deviceSectionOpen);
  };

  const handleStateSelectionChange = (option) => {
    setStateRegion(option);
    const newState = option;
    setStateRegion(newState);
    clearUtility();
    setPropertyTypeVisible(true);
    setStateError('');
    setTableVisible(false);
    getUtilities(newState.value, sectorOption);
    setDeviceSectionOpen(false);
    closeSelectorBackgroundOverflowVisible();
  };

  const handleUtilitySelectionChange = (option) => {
    setUtility(option);
    const newUtility = option;
    setUtility(newUtility);
    setUtilityError('');
    setDevicesVisible(true);
    setDeviceSectionOpen(false);
    closeSelectorBackgroundOverflowVisible();
    setTableVisible(false);
  };

  function clearUtility() {
    setUtility({ value: '', label: '' });
  }

  const getDevices = async (deviceType) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-devices`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deviceType }),
        }
      );
      const jsonResponse = await response.json();

      console.log(jsonResponse);
      setDeviceData(deviceType, jsonResponse);
      // Reset the Utility state every time new utility data is fetched
    } catch (error) {
      console.error('Error fetching data - deviceApi:', error);
    }
  };

  const deviceUpdateMap = {
    Thermostats: setThermostatOptions,
    Batteries: setBatteryOptions,
    Solar: setSolarOptions,
    EVChargers: setEVChargerOptions,
    EVs: setEVOptions,
    V2G: setV2GOptions,
    'Water Heaters': setWaterheaterOptions,
    Heatpumps: setHeatpumpOptions,
    Generators: setGeneratorOptions,
  };

  function setDeviceData(deviceType, data) {
    if (deviceUpdateMap[deviceType]) {
      deviceUpdateMap[deviceType](data);
    } else {
      throw new Error(`Function to update ${deviceType} not found`);
    }
  }

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
      setUtilityData(
        jsonResponse.map((item) => ({
          value: item.Value,
          label: item.Utility,
        }))
      );

      // Reset the Utility state every time new utility data is fetched
      setUtility(''); // Reset to default or empty value
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkEligibility = async () => {
    try {
      closeSelectorBackgroundOverflowVisible();

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
            stateRegion: stateRegion.value,
            sectorOption,
            Utility: Utility.value,
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

    if (
      (!Utility || !Utility.value || Utility.value.trim() === '') &&
      utilityVisible
    ) {
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

    if (!stateRegion || !stateRegion.value || stateRegion.value.trim() === '') {
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

    if (
      heatpumpPresent &&
      Object.values(selectedHeatpumps).every((element) => element === false)
    ) {
      setHeatpumpSelectionError('Please add a heatpump');
      isError = true;
    } else {
      setHeatpumpSelectionError(''); // Reset error
    }

    if (
      waterheaterPresent &&
      Object.values(selectedWaterheaters).every((element) => element === false)
    ) {
      setWaterheaterSelectionError('Please add a water heater');
      isError = true;
    } else {
      setWaterheaterSelectionError(''); // Reset error
    }

    if (
      solarPresent &&
      Object.values(selectedSolar).every((element) => element === false)
    ) {
      setSolarSelectionError('Please add a solar device');
      isError = true;
    } else {
      setSolarSelectionError(''); // Reset error
    }

    if (
      EVPresent &&
      Object.values(selectedEVs).every((element) => element === false)
    ) {
      setEVSelectionError('Please add an electric vehicle');
      isError = true;
    } else {
      setEVSelectionError(''); // Reset error
    }
    if (
      generatorPresent &&
      Object.values(selectedGenerators).every((element) => element === false)
    ) {
      setGeneratorSelectionError('Please add a generator');
      isError = true;
    } else {
      setGeneratorSelectionError(''); // Reset error
    }

    if (isError) {
      return; // Prevent form submission if there's any error
    }

    // No errors, proceed with form submission
    checkEligibility(stateRegion, sectorOption, Utility);
    setTableVisible(true);
    setDeviceSectionOpen(false);
  };

  // Handle 'None' radio button change
  const handleNoneChangeThermostat = () => {
    setSelectedThermostats([]);
  };

  const handleNoneChangeBattery = () => {
    setSelectedBatteries([]);
  };
  const handleNoneChangeHeatpump = () => {
    setSelectedHeatpumps([]);
  };

  const handleNoneChangeWaterheater = () => {
    setSelectedWaterheaters([]);
  };

  const handleNoneChangeSolar = () => {
    setSelectedSolar([]);
  };
  const handleNoneChangeEV = () => {
    setSelectedEVs([]);
  };
  const handleNoneChangeGenerator = () => {
    setSelectedGenerators([]);
  };

  useEffect(() => {
    setUtility('');
  }, [stateRegion, sectorOption]);

  const [utilitySelectorOverflow, setUtilitySelectorOverflow] =
    useState('hidden');
  const openUtilitySelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setUtilitySelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };

  const [thermostatSelectorOverflow, setThermostatSelectorOverflow] =
    useState('hidden');
  const openThermostatSelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setThermostatSelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };
  const closeThermostatSelector = () => {
    // Set timeout for overflow change
    setThermostatSelectorOverflow('hidden');
  };

  const [batterySelectorOverflow, setBatterySelectorOverflow] =
    useState('hidden');
  const openBatterySelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setBatterySelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };
  const closeBatterySelector = () => {
    // Set timeout for overflow change
    setBatterySelectorOverflow('hidden');
  };

  const [heatpumpSelectorOverflow, setHeatpumpSelectorOverflow] =
    useState('hidden');
  const openHeatpumpSelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setHeatpumpSelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };
  const closeHeatpumpSelector = () => {
    // Set timeout for overflow change
    setHeatpumpSelectorOverflow('hidden');
  };

  const [waterheaterSelectorOverflow, setWaterheaterSelectorOverflow] =
    useState('hidden');
  const openWaterheaterSelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setWaterheaterSelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };
  const closeWaterheaterSelector = () => {
    // Set timeout for overflow change
    setWaterheaterSelectorOverflow('hidden');
  };

  const [solarSelectorOverflow, setSolarSelectorOverflow] = useState('hidden');
  const openSolarSelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setSolarSelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };
  const closeSolarSelector = () => {
    // Set timeout for overflow change
    setSolarSelectorOverflow('hidden');
  };

  const [EVSelectorOverflow, setEVSelectorOverflow] = useState('hidden');
  const openEVSelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setEVSelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };
  const closeEVSelector = () => {
    // Set timeout for overflow change
    setEVSelectorOverflow('hidden');
  };

  const [generatorSelectorOverflow, setGeneratorSelectorOverflow] =
    useState('hidden');
  const openGeneratorSelector = () => {
    // Set timeout for overflow change
    setTimeout(() => setGeneratorSelectorOverflow('visible'), 700); // 0.5s for transition + s delay
  };
  const closeGeneratorSelector = () => {
    // Set timeout for overflow change
    setGeneratorSelectorOverflow('hidden');
  };

  const [selectorTimeoutID, setSelectorTimeoutID] = useState(null); // use this to prevent multiple timeouts occuring at once
  const [
    selectorBackgroundOverflowVisible,
    setSelectorBackgroundOverflowVisible,
  ] = useState('hidden');
  const openSelectorBackgroundOverflowVisible = () => {
    // Set timeout for overflow change
    if (selectorTimeoutID) {
      clearTimeout(selectorTimeoutID);
    }
    const id = setTimeout(
      () => setSelectorBackgroundOverflowVisible('visible'),
      700
    );
    setSelectorTimeoutID(id);
  };
  const closeSelectorBackgroundOverflowVisible = () => {
    // Set timeout for overflow change
    if (selectorTimeoutID) {
      clearTimeout(selectorTimeoutID);
      setSelectorTimeoutID(null);
    }
    setSelectorBackgroundOverflowVisible('hidden');
  };

  //Delay CSS animation rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <SEO title="Hum Energy - VPP finder" />
      <div className="bg-bgMain overflow-hidden min-h-screen">
        <Nav></Nav>
        <div className="w-full"></div>

        <div className="max-w-xl flex flex-col items-center px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="p-4 px-8 w-full sm:w-96 rounded-lg shadow-sm bg-white text-main  mt-10">
            <div className="text-xl pb-2 font-black items-center text-center ">
              Enter your details
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-2 flex gap-x-3 items-center">
                <div className="w-1/3 font-semibold">State:</div>
                <div className="w-2/3">
                  <SingleSelector
                    optionsList={states}
                    selectedOption={stateRegion}
                    onOptionSelected={handleStateSelectionChange}
                    menuIsOpen={menuIsOpen}
                    setMenuIsOpen={setMenuIsOpen}
                    placeholderClosedText="Select State"
                  ></SingleSelector>
                </div>
              </div>
              {stateError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {stateError}
                </div>
              )}
              {isClient && (
                <div className="content">
                  <div
                    className={`  propertySection ${
                      propertyTypeVisible ? 'open' : ' closed'
                    }`}
                  >
                    <div className="flex gap-x-3 mt-0">
                      <div className="font-semibold w-1/3">Property Type:</div>
                      <div className="w-2/3">
                        <div>
                          <label className="flex items-center">
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
                                getUtilities(
                                  stateRegion.value,
                                  newSectorOption
                                );
                                setUtilityVisible(true);
                                openUtilitySelector();
                                setDeviceSectionOpen(false);

                                closeSelectorBackgroundOverflowVisible();
                              }}
                            />
                            <span className="ml-2  mt-[0.5px]">
                              Residential
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="propertyType"
                              value="Multifamily"
                              checked={sectorOption === 'Multifamily'}
                              onChange={(e) => {
                                const newSectorOption = e.target.value;
                                setSectorOption(newSectorOption);
                                setSectorOption(e.target.value);
                                getUtilities(
                                  stateRegion.value,
                                  newSectorOption
                                );
                                setUtilityVisible(true);
                                setTableVisible(false);
                                openUtilitySelector();
                                setDeviceSectionOpen(false);

                                closeSelectorBackgroundOverflowVisible();
                              }}
                            />
                            <span className="ml-2 mt-[0.5px] ">
                              Multi-family
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="propertyType"
                              value="C&I"
                              checked={sectorOption === 'C&I'}
                              onChange={(e) => {
                                const newSectorOption = e.target.value;
                                setSectorOption(newSectorOption);
                                setSectorOption(e.target.value);
                                getUtilities(
                                  stateRegion.value,
                                  newSectorOption
                                );
                                setUtilityVisible(true);
                                setTableVisible(false);
                                openUtilitySelector();
                                setDeviceSectionOpen(false);

                                closeSelectorBackgroundOverflowVisible();
                              }}
                            />
                            <span className="ml-2  mt-[0.5px]">C&I</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {propertyTypeError && (
                    <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                      {propertyTypeError}
                    </div>
                  )}

                  <label
                    className={`  utilitySection  ${
                      utilityVisible ? 'open' : 'closed'
                    }`}
                  >
                    <div
                      className={`flex gap-x-3 items-center  `}
                      style={{ overflow: utilitySelectorOverflow }}
                    >
                      <div className="font-semibold w-1/3">Utility/CCA:</div>
                      <div className="w-2/3 !overflow-visible">
                        <SingleSelector
                          optionsList={utilityData}
                          selectedOption={Utility}
                          onOptionSelected={handleUtilitySelectionChange}
                          labelToBeAtBottom="My Utility/CCA is not in this list"
                          placeholderClosedText="Select Utility/CCA"
                          menuIsOpen={menuIsOpen}
                          setMenuIsOpen={setMenuIsOpen}
                        ></SingleSelector>
                      </div>
                    </div>
                  </label>
                  {utilityError && (
                    <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                      {utilityError}
                    </div>
                  )}
                  <div
                    className={`block gap-x-3 items-top addDevicesSection ${
                      Utility.value != 'Unavailable' ? 'open' : 'closed'
                    }`}
                  >
                    <div
                      className={`flex gap-x-0 justify-center items-center   w-full deviceTitleSection ${
                        devicesVisible && Utility.value != 'Unavailable'
                          ? 'open '
                          : 'closed'
                      }`}
                    >
                      <div className="flex gap-x-0 justify-center items-center">
                        <div className="text-xl  font-black items-center text-center">
                          Add devices
                        </div>
                        {deviceSectionOpen ? (
                          <div
                            className="flex items-center  text-main"
                            onClick={() => {
                              toggleDeviceSection();
                              closeSelectorBackgroundOverflowVisible();
                            }}
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
                            onClick={() => {
                              toggleDeviceSection();
                              openSelectorBackgroundOverflowVisible();
                            }}
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
                    </div>
                    <div
                      className={` block deviceSection ${
                        deviceSectionOpen && devicesVisible ? ' open' : 'closed'
                      }`}
                    >
                      <div
                        className={`selectorSection  `}
                        style={{
                          overflow: selectorBackgroundOverflowVisible,
                        }}
                      >
                        {/* Smart Thermostat */}
                        <div className="mt-0">
                          <p className="mb-0 font-medium">Smart Thermostat</p>
                          <div className="flex gap-x-3 gap-y-1 flex-wrap items-center">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="thermostat"
                                value="thermostatPresent"
                                checked={thermostatPresent === true}
                                onChange={() => {
                                  setThermostatPresent(true);
                                  openThermostatSelector();
                                  getDevices('Thermostats');
                                }}
                              />
                              <span className="ml-1">Yes</span>
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
                                  checkEligibility();
                                  closeThermostatSelector();
                                }}
                              />
                              <span className="ml-1">None</span>
                            </label>
                          </div>
                          <div
                            className={` thermostatSelection  ${
                              thermostatPresent ? 'open' : 'closed'
                            } `}
                          >
                            <div
                              className={`w-full
                    `}
                              style={{ overflow: thermostatSelectorOverflow }}
                            >
                              <MultiSelector
                                optionsList={thermostatOptions}
                                selectedOptions={selectedThermostats}
                                setSelectedOptions={(options) => {
                                  setSelectedThermostats(options);
                                  setThermostatSelectionError('');
                                }}
                                placeholderOpenText="Search"
                                placeholderClosedText="Add thermostats..."
                                menuIsOpen={thermostatMenuIsOpen}
                                setMenuIsOpen={setThermostatMenuIsOpen}
                              />
                            </div>
                          </div>
                        </div>
                        {thermostatSelectionError && (
                          <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
                            {thermostatSelectionError}
                          </div>
                        )}
                        {/*batteries*/}
                        <div className="mt-2">
                          <p className="mb-0 font-medium">Battery</p>
                          <div className="flex gap-x-3 gap-y-1 flex-wrap items-center">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="battery"
                                value="batteryPresent"
                                checked={batteryPresent === true}
                                onChange={() => {
                                  setBatteryPresent(true);
                                  openBatterySelector();
                                  getDevices('Batteries');
                                }}
                              />
                              <span className="ml-1">Yes</span>
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
                                  closeBatterySelector();
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
                            <div
                              className={`w-full
                    `}
                              style={{ overflow: batterySelectorOverflow }}
                            >
                              <MultiSelector
                                optionsList={batteryOptions}
                                selectedOptions={selectedBatteries}
                                setSelectedOptions={(options) => {
                                  setSelectedBatteries(options);
                                  setBatterySelectionError('');
                                }}
                                placeholderOpenText="Search"
                                placeholderClosedText="Add batteries..."
                                menuIsOpen={batteryMenuIsOpen}
                                setMenuIsOpen={setBatteryMenuIsOpen}
                              />
                            </div>
                          </div>
                        </div>
                        {batterySelectionError && (
                          <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
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
                                onChange={() => {
                                  setHeatpumpPresent(true);
                                  openHeatpumpSelector();
                                  getDevices('Heatpumps');
                                  console.log(
                                    'heatpump options: ',
                                    heatpumpOptions
                                  );
                                }}
                              />
                              <span className="ml-1">Yes</span>
                            </label>

                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="heatpump"
                                value="noHeatpumpPresent"
                                checked={heatpumpPresent === false}
                                onChange={() => {
                                  setHeatpumpPresent(false);
                                  handleNoneChangeHeatpump();
                                  closeHeatpumpSelector();
                                  setHeatpumpSelectionError('');
                                }}
                              />
                              <span className="ml-1">None</span>
                            </label>
                          </div>

                          <div
                            className={` heatpumpSelection ${
                              heatpumpPresent ? 'open' : 'closed'
                            } `}
                          >
                            <div
                              className={`w-full
                    `}
                              style={{ overflow: heatpumpSelectorOverflow }}
                            >
                              <MultiSelector
                                optionsList={heatpumpOptions}
                                selectedOptions={selectedHeatpumps}
                                setSelectedOptions={(options) => {
                                  setSelectedHeatpumps(options);
                                  setHeatpumpSelectionError('');
                                }}
                                placeholderOpenText="Search"
                                placeholderClosedText="Add heatpumps..."
                                menuIsOpen={heatpumpMenuIsOpen}
                                setMenuIsOpen={setHeatpumpMenuIsOpen}
                              />
                            </div>
                          </div>
                        </div>
                        {heatpumpSelectionError && (
                          <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
                            {heatpumpSelectionError}
                          </div>
                        )}{' '}
                        {/*water heater*/}
                        <div className="mt-2">
                          <p className="mb-0 font-medium">
                            Electric Water Heater
                          </p>
                          <div className="flex gap-x-3 gap-y-1 flex-wrap">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="waterheater"
                                value="waterheaterPresent"
                                checked={waterheaterPresent === true}
                                onChange={() => {
                                  setWaterheaterPresent(true);
                                  openWaterheaterSelector();
                                  getDevices('Water Heaters');
                                }}
                              />
                              <span className="ml-1">Yes</span>
                            </label>

                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="waterheater"
                                value="nowaterheaterPresent"
                                checked={waterheaterPresent === false}
                                onChange={() => {
                                  setWaterheaterPresent(false);
                                  handleNoneChangeWaterheater();
                                  closeWaterheaterSelector();
                                  setWaterheaterSelectionError('');
                                }}
                              />
                              <span className="ml-1">None</span>
                            </label>
                          </div>
                          <div
                            className={` waterheaterSelection ${
                              waterheaterPresent ? 'open' : 'closed'
                            } `}
                          >
                            <div
                              className={`w-full
                    `}
                              style={{
                                overflow: waterheaterSelectorOverflow,
                              }}
                            >
                              <MultiSelector
                                optionsList={waterheaterOptions}
                                selectedOptions={selectedWaterheaters}
                                setSelectedOptions={(options) => {
                                  setSelectedWaterheaters(options);
                                  setWaterheaterSelectionError('');
                                }}
                                placeholderOpenText="Search"
                                placeholderClosedText="Add electric water heaters..."
                                menuIsOpen={waterheaterMenuIsOpen}
                                setMenuIsOpen={setWaterheaterMenuIsOpen}
                              />
                            </div>
                          </div>
                        </div>
                        {waterheaterSelectionError && (
                          <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
                            {waterheaterSelectionError}
                          </div>
                        )}
                        {/*solar*/}
                        <div className="mt-2">
                          <p className="mb-0 font-medium">Solar</p>
                          <div className="flex gap-x-3 gap-y-1 flex-wrap">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="solarPresent"
                                value="solarPresent"
                                checked={solarPresent === true}
                                onChange={() => {
                                  setSolarPresent(true);
                                  openSolarSelector();
                                  getDevices('Solar');
                                }}
                              />
                              <span className="ml-1">Yes</span>
                            </label>

                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="solar"
                                value="noSolarPresent"
                                checked={solarPresent === false}
                                onChange={() => {
                                  setSolarPresent(false);
                                  handleNoneChangeSolar();
                                  closeSolarSelector();
                                  setSolarSelectionError('');
                                }}
                              />
                              <span className="ml-1">None</span>
                            </label>
                          </div>
                          <div
                            className={` solarSelection ${
                              solarPresent ? 'open' : 'closed'
                            } `}
                          >
                            <div
                              className={`w-full
                    `}
                              style={{ overflow: solarSelectorOverflow }}
                            >
                              <MultiSelector
                                optionsList={solarOptions}
                                selectedOptions={selectedSolar}
                                setSelectedOptions={(options) => {
                                  setSelectedSolar(options);
                                  setSolarSelectionError('');
                                }}
                                placeholderOpenText="Search"
                                placeholderClosedText="Add solar..."
                                menuIsOpen={solarMenuIsOpen}
                                setMenuIsOpen={setSolarMenuIsOpen}
                              />
                            </div>
                          </div>
                        </div>
                        {solarSelectionError && (
                          <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
                            {solarSelectionError}
                          </div>
                        )}{' '}
                        {/*EV*/}
                        <div className="mt-2">
                          <p className="mb-0 font-medium">Electric Vehicle</p>
                          <div className="flex gap-x-3 gap-y-1 flex-wrap">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="EVPresent"
                                value="EVPresent"
                                checked={EVPresent === true}
                                onChange={() => {
                                  setEVPresent(true);
                                  openEVSelector();
                                  getDevices('EVs');
                                }}
                              />
                              <span className="ml-1">Yes</span>
                            </label>

                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="EV"
                                value="noEVPresent"
                                checked={EVPresent === false}
                                onChange={() => {
                                  setEVPresent(false);
                                  handleNoneChangeEV();
                                  closeEVSelector();
                                  setEVSelectionError('');
                                }}
                              />
                              <span className="ml-1">None</span>
                            </label>
                          </div>
                          <div
                            className={` EVSelection ${
                              EVPresent ? 'open' : 'closed'
                            } `}
                          >
                            <div
                              className={`w-full
                    `}
                              style={{ overflow: EVSelectorOverflow }}
                            >
                              <MultiSelector
                                optionsList={EVOptions}
                                selectedOptions={selectedEVs}
                                setSelectedOptions={(options) => {
                                  setSelectedEVs(options);
                                  setEVSelectionError('');
                                }}
                                placeholderOpenText="Search"
                                placeholderClosedText="Add EV..."
                                menuIsOpen={EVMenuIsOpen}
                                setMenuIsOpen={setEVMenuIsOpen}
                              />
                            </div>
                          </div>
                        </div>
                        {EVSelectionError && (
                          <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
                            {EVSelectionError}
                          </div>
                        )}{' '}
                        {/*generator*/}
                        <div className="mt-2">
                          <p className="mb-0 font-medium">Generator</p>
                          <div className="flex gap-x-3 gap-y-1 flex-wrap">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="generatorPresent"
                                value="generatorPresent"
                                checked={generatorPresent === true}
                                onChange={() => {
                                  setGeneratorPresent(true);
                                  openGeneratorSelector();
                                  getDevices('Generators');
                                }}
                              />
                              <span className="ml-1">Yes</span>
                            </label>

                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="generator"
                                value="noGeneratorPresent"
                                checked={generatorPresent === false}
                                onChange={() => {
                                  setGeneratorPresent(false);
                                  handleNoneChangeGenerator();
                                  closeGeneratorSelector();
                                  setGeneratorSelectionError('');
                                }}
                              />
                              <span className="ml-1">None</span>
                            </label>
                          </div>
                          <div
                            className={` generatorSelection ${
                              generatorPresent ? 'open' : 'closed'
                            } `}
                          >
                            <div
                              className={`w-full
                    `}
                              style={{ overflow: generatorSelectorOverflow }}
                            >
                              <MultiSelector
                                optionsList={generatorOptions}
                                selectedOptions={selectedGenerators}
                                setSelectedOptions={(options) => {
                                  setSelectedGenerators(options);
                                  setGeneratorSelectionError('');
                                }}
                                placeholderOpenText="Search"
                                placeholderClosedText="Add generators..."
                                menuIsOpen={generatorMenuIsOpen}
                                setMenuIsOpen={setGeneratorMenuIsOpen}
                              />
                            </div>
                          </div>
                        </div>
                        {generatorSelectionError && (
                          <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
                            {generatorSelectionError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DefaultButton
                type="submit"
                className={
                  Utility.value != 'Unavailable'
                    ? 'mt-4 w-full'
                    : 'mt-6 w-full !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none'
                }
              >
                {Utility.value != 'Unavailable'
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

      {isClient && (
        <style>
          {`
              .propertySection, .utilitySection, .addDevicesSection, .deviceTitleSection, .thermostatSelection, .batterySelection, .heatpumpSelection,  .waterheaterSelection, .solarSelection, .EVSelection, .generatorSelection, .deviceSection {
                display: grid;
                grid-template-rows: 0fr;
                transition: grid-template-rows 0.7s ease, margin 0.7s ease;
              }
              .open {
                grid-template-rows: 1fr;
                margin-top: 0.5rem;
              }
              .propertySection > div, .utilitySection > div, .thermostatSelection > div , .batterySelection > div,  .heatpumpSelection > div ,  .waterheaterSelection > div, .solarSelection > div, .EVSelection > div, .generatorSelection > div, .deviceSection > div, .propertySection > div, .deviceTitleSection > div {
                overflow:hidden
              }
              .deviceTitleSection.open, .propertySection.open, .utilitySection.open {
                margin-top: 1rem;
              }
              .thermostatSelection.open, .batterySelection.open, .heatpumpSelection.open, .waterheaterSelection.open, .solarSelection.open, .EVSelection.open, .generatorSelection.open {
                margin-top: 0.25rem !important;
                margin-bottom: 0.75rem;
              }
              .closed {
                overflow: hidden;
              }
            `}
        </style>
      )}
    </>
  );
}
