import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import DefaultButton from '../components/DefaultButton';
import ProgramFinderOutput from '../components/ProgramFinderOutput';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MultiSelector from '../components/MultiSelector';
import SingleSelector from '../components/SingleSelector';
import Footer from '../components/Footer';
import statesTwoLetter from '../models/statesTwoLetter';

require('dotenv').config();

export default function ProgramFinder() {
  const states = statesTwoLetter;
  const [programData, setProgramData] = useState([]);
  const [utilityData, setUtilityData] = useState('');
  const [tableVisible, setTableVisible] = useState(false);
  const [utilityVisible, setUtilityVisible] = useState(false);
  const [propertyTypeVisible, setPropertyTypeVisible] = useState(false);
  const [devicesVisible, setDevicesVisible] = useState(false);

  const derTypes = [
    {
      id: 'thermostat',
      label: 'Smart Thermostats',
      apiLabel: 'Smart Thermostats',
      selectType: 'multi',
      placeholderClosedText: 'Add thermostats...',
      errorMessageLabel: 'thermostat',
    },
    {
      id: 'battery',
      label: 'Batteries',
      apiLabel: 'Batteries',
      selectType: 'multi',
      placeholderClosedText: 'Add batteries...',
      errorMessageLabel: 'battery',
    },

    {
      id: 'solar',
      label: 'Solar Panel System',
      apiLabel: 'Solar',
      selectType: 'multi',
      placeholderClosedText: 'Add solar...',
      errorMessageLabel: 'solar device',
    },
    {
      id: 'EV',
      label: 'Electric Vehicles',
      apiLabel: 'EVs',
      selectType: 'multi',
      placeholderClosedText: 'Add EV...',
      errorMessageLabel: 'electric vehicle',
    },
    {
      id: 'heatpump',
      label: 'Heat Pumps',
      apiLabel: 'Heat Pumps',
      selectType: 'multi',
      placeholderClosedText: 'Add Heat Pump...',
      errorMessageLabel: 'heat pump',
    },

    {
      id: 'waterheater',
      label: 'Electric Water Heaters',
      apiLabel: 'Water Heaters',
      selectType: 'multi',
      placeholderClosedText: 'Add Water Heater...',
      errorMessageLabel: 'water heater',
    },
    {
      id: 'generator',
      label: 'Generators',
      apiLabel: 'Generators',
      selectType: 'multi',
      placeholderClosedText: 'Add Generator...',
      errorMessageLabel: 'generator',
    },
    {
      id: 'centralAC',
      label: 'Central A/C System',
      apiLabel: 'Central A/C System',
      selectType: 'radio',
      placeholderClosedText: 'Add A/C system...',
      errorMessageLabel: 'A/C system',
    },

    {
      id: 'poolpump',
      label: 'Pool Pump',
      apiLabel: 'Pool pump',
      selectType: 'radio',
      placeholderClosedText: 'Add Pool Pump...',
      errorMessageLabel: 'pool pump',
    },
  ];

  // state manager
  const [derState, setDerState] = useState({
    thermostat: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    battery: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    solar: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    EV: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    heatpump: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    waterheater: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    generator: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    centralAC: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
    poolpump: {
      present: false,
      options: [],
      selected: [],
      selectorOverflow: 'hidden',
      menuOpen: false,
      errorMessage: '',
    },
  });

  const setRadioYes = (type) => {
    // Immediately set 'present' to true
    setDerState((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        present: true,
      },
    }));

    // After a delay, set 'selectorOverflow' to 'visible'
    setTimeout(() => {
      setDerState((prevState) => {
        // Get the latest state for the specific type
        const currentDer = prevState[type];
        return {
          ...prevState,
          [type]: {
            ...currentDer,
            selectorOverflow: 'visible',
          },
        };
      });
    }, 700);
  };

  const setRadioNo = (type) => {
    setDerState((prevState) => {
      // Get the latest state for the specific type
      const currentDer = prevState[type];
      return {
        ...prevState,
        [type]: {
          ...currentDer,
          present: false,
          selectorOverflow: 'hidden',
          errorMessage: '',
          selected: [],
        },
      };
    });
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [stateRegion, setStateRegion] = useState('');
  const [Utility, setUtility] = useState([{ value: '', label: '' }]);
  const [utilityError, setUtilityError] = useState('');
  const [sectorOption, setSectorOption] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [propertyTypeError, setPropertyTypeError] = useState('');

  const [stateError, setStateError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

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

  const getManufacturers = async (deviceType) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-manufacturers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deviceType }),
        }
      );
      const jsonResponse = await response.json();

      setDeviceData(deviceType, jsonResponse);
      // Reset the Utility state every time new utility data is fetched
    } catch (error) {
      console.error('Error fetching data - deviceApi:', error);
    }
  };

  // Create a mapping from apiLabel to id
  const apiLabelToIdMap = derTypes.reduce((acc, derType) => {
    acc[derType.apiLabel] = derType.id;
    return acc;
  }, {});

  function setDeviceData(apiLabel, data) {
    // Find the corresponding derType id for the given apiLabel
    const id = apiLabelToIdMap[apiLabel];

    if (id) {
      setDerState((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          options: data.map((item) => ({
            value: item.value,
            label: item.label,
          })),
        },
      }));
    } else {
      throw new Error(
        `No matching DER type found for API label: ${deviceType}`
      );
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

      // Build the DER selections object
      const derSelections = derTypes.reduce((acc, derType) => {
        if (derState[derType.id].present) {
          acc[derType.apiLabel] = derState[derType.id].selected;
        }
        return acc;
      }, {});
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/check-eligibility`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stateRegion: stateRegion.value,
            sectorOption,
            Utility: Utility.value,
            ...derSelections,
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
    let isDerError = false;
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

    if (!email.trim()) {
      setEmailError('Email is required');
      isError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isError = true;
    } else {
      setEmailError('');
    }

    // Utility function to check if DER type is present and selected
    const isDerTypeValid = (derType) => {
      const der = derState[derType.id];

      if (!der.present || derType.selectType == 'radio') {
        return true;
      }
      return Object.values(der.selected).some((element) => element);
    };

    // Iterate over derTypes to validate each DER type
    derTypes.forEach((derType) => {
      if (!isDerTypeValid(derType)) {
        setDerState((prevState) => ({
          ...prevState,
          [derType.id]: {
            ...prevState[derType.id],
            errorMessage: `Please add a ${derType.errorMessageLabel}`,
          },
        }));
        isError = true;
        isDerError = true;
      } else {
        // Reset error message if valid
        setDerState((prevState) => ({
          ...prevState,
          [derType.id]: {
            ...prevState[derType.id],
            errorMessage: '',
          },
        }));
      }
    });

    if (isError) {
      if (isDerError && !deviceSectionOpen) {
        toggleDeviceSection();
        setSelectorBackgroundOverflowVisible();
      }
      return; // Prevent form submission if there's any error
    }

    // No errors, proceed with form submission
    checkEligibility(stateRegion, sectorOption, Utility);
    setTableVisible(true);
    setDeviceSectionOpen(false);
    try {
      await saveFormData();
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  // Function to format the current date and time
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const saveFormData = async () => {
    const derSelections = derTypes.reduce((acc, derType) => {
      if (derState[derType.id].present) {
        acc[derType.apiLabel] = derState[derType.id].selected.map(
          (item) => item.label
        );
      }
      return acc;
    }, {});

    const derSelectedTypes = derTypes.reduce((acc, derType) => {
      if (derState[derType.id].present) {
        acc[derType.apiLabel] = derState[derType.id].present;
      }
      return acc;
    }, {});

    const formData = {
      email: email,
      state: stateRegion.value,
      utility: Utility.value,
      sector: sectorOption,
      derSelectedTypes: JSON.stringify(derSelectedTypes),
      derSelectedOptions: JSON.stringify(derSelections),
      dateTime: formatDateTime(Date.now()),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/saveFormData`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result = {};
      if (response.headers.get('content-type')?.includes('application/json')) {
        result = await response;
      } else {
        console.error('Received non-JSON response');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
      <SEO title="Hum Energy - Program finder" />
      <div className="page-container bg-bgMain flex flex-col  min-h-screen overflow-hidden ">
        <Nav></Nav>
        <div className="content-container flex flex-col items-center w-full flex-grow ">
          <div className="main-content flex flex-col px-4 mx-2 w-full items-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl ">
            <div className="p-4 px-6 sm:px-8 w-full sm:w-[28rem] mx-auto rounded-lg shadow-sm bg-white text-main  mt-10">
              <div className="text-xl pb-2 font-black items-center text-center ">
                Enter your details
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mt-2  sm:flex gap-x-3 items-center">
                  <div className="sm:w-1/3 font-semibold">State:</div>
                  <div className="mt-2 sm:mt-0 sm:w-2/3">
                    {isClient && (
                      <SingleSelector
                        optionsList={states}
                        selectedOption={stateRegion}
                        onOptionSelected={handleStateSelectionChange}
                        menuIsOpen={menuIsOpen}
                        setMenuIsOpen={setMenuIsOpen}
                        placeholderClosedText="Select State"
                      ></SingleSelector>
                    )}
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
                      <div className="sm:flex gap-x-3 mt-0">
                        <div className="font-semibold sm:w-1/3">
                          Property Type:
                        </div>
                        <div className="mt-2 sm:mt-0 sm:w-2/3 ">
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
                      className={`utilitySection ${
                        utilityVisible ? 'open' : 'closed'
                      }`}
                    >
                      <div
                        className={`sm:flex gap-x-3 items-center`}
                        style={{ overflow: utilitySelectorOverflow }}
                      >
                        <div className=" sm:w-1/3 flex gap-x-2 items-center">
                          <span className="font-semibold">Utility/CCA:</span>
                          <div
                            className="relative"
                            onClick={() => setShowTooltip(!showTooltip)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                            <div className="cursor-pointer flex items-center justify-center align-middle sm:text-center">
                              <InfoOutlinedIcon fontSize="20" />
                            </div>
                            {showTooltip && (
                              <div
                                className="absolute bg-white border border-gray-300 p-2 rounded-md shadow-lg text-sm -translate-x-1/2 z-10 w-48"
                                style={{ top: '100%', left: '50%' }}
                              >
                                If you don't see your CCA, please select the
                                underlying utility
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:w-2/3 overflow-visible ">
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
                        Utility.value != 'Unavailable' && devicesVisible
                          ? 'open'
                          : 'closed'
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
                          deviceSectionOpen && devicesVisible
                            ? ' open'
                            : 'closed'
                        }`}
                      >
                        <div
                          className={`selectorSection  `}
                          style={{
                            overflow: selectorBackgroundOverflowVisible,
                          }}
                        >
                          {derTypes.map((derType) => {
                            const der = derState[derType.id];

                            return (
                              <div key={derType.id} className="mt-2">
                                <p className="mb-0 font-medium">
                                  {derType.label}
                                </p>
                                <div className="flex gap-x-3 gap-y-1 flex-wrap items-center">
                                  {/* Render radio buttons */}
                                  <>
                                    <label className="flex items-center">
                                      <input
                                        type="radio"
                                        name={derType.id}
                                        value={`${derType.id}Present`}
                                        checked={der.present === true}
                                        onChange={() => {
                                          setRadioYes(derType.id);
                                          getManufacturers(derType.apiLabel);
                                          openSelectorBackgroundOverflowVisible();
                                        }}
                                      />
                                      <span className="ml-1">Yes</span>
                                    </label>
                                    <label className="flex items-center">
                                      <input
                                        type="radio"
                                        name={derType.id}
                                        value={`no${
                                          derType.id.charAt(0).toUpperCase() +
                                          derType.id.slice(1)
                                        }Present`}
                                        checked={der.present === false}
                                        onChange={() => {
                                          setRadioNo(derType.id);
                                        }}
                                      />
                                      <span className="ml-1">None</span>
                                    </label>
                                  </>
                                </div>
                                {derType.selectType === 'multi' && (
                                  <div
                                    className={`${derType.id}Selection ${
                                      der.present ? 'open' : 'closed'
                                    }`}
                                  >
                                    <div
                                      className="w-full"
                                      style={{ overflow: der.selectorOverflow }}
                                    >
                                      <MultiSelector
                                        optionsList={der.options}
                                        selectedOptions={der.selected}
                                        setSelectedOptions={(options) => {
                                          setDerState((prevState) => ({
                                            ...prevState,
                                            [derType.id]: {
                                              ...prevState[derType.id],
                                              errorMessage: '',
                                              selected: options,
                                            },
                                          }));
                                        }}
                                        placeholderOpenText="Search"
                                        placeholderClosedText={
                                          derType.placeholderClosedText
                                        }
                                        menuIsOpen={der.menuOpen}
                                        setMenuIsOpen={(isOpen) => {
                                          // Update state
                                          setDerState((prevState) => ({
                                            ...prevState,
                                            [derType.id]: {
                                              ...prevState[derType.id],
                                              menuOpen: isOpen,
                                            },
                                          }));
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                                {der.errorMessage && (
                                  <div className="text-red-500 -mt-2 mb-0 text-sm text-right">
                                    {der.errorMessage}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block emailSection ${
                        devicesVisible && Utility.value != 'Unavailable'
                          ? 'open'
                          : 'closed'
                      }`}
                    >
                      <div
                        className={`flex items-center   w-full emailSection ${
                          devicesVisible && Utility.value != 'Unavailable'
                            ? 'open '
                            : 'closed'
                        }`}
                      >
                        <div className="mt-4 ">
                          <div
                            className={`py-2 px-4 !rounded-lg !shadow-sm bg-gray-50 text-main border-gray-400 hover:border-gray-500 leading-tight focus:outline-none focus-visible:outline-none focus-visible:shadow-outline focus:shadow-outline border w-full ${
                              emailError ? 'border-red-500' : ''
                            }`}
                          >
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="placeholder-main w-full bg-gray-50 focus:outline-none focus-visible:outline-none focus-visible:shadow-outline focus:shadow-outline"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => {
                                const newEmail = e.target.value;
                                setEmail(newEmail);
                                setEmail(e.target.value);
                                setEmailError('');
                              }}
                              required
                            />
                          </div>
                          {emailError && (
                            <div className="text-red-500 mt-2 mb-0 text-sm text-right">
                              {emailError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <DefaultButton
                  type="submit"
                  className={`
                  submitButton
                  ${
                    Utility.value != 'Unavailable'
                      ? 'mt-6 w-full'
                      : 'mt-6 w-full !text-main bg-bgMain hover:!shadow-none hover:!bg-opacity-100 pointer-events-none'
                  }

                  ${devicesVisible ? '!mt-2' : ''}
                  `}
                >
                  {Utility.value != 'Unavailable'
                    ? '   Find local programs'
                    : 'Your utility does not currently offer any programs'}
                </DefaultButton>
              </form>
            </div>
            <div className="my-10 flex-col flex w-full max-w-4xl items-center ">
              {loading && <div className="loading-icon">Loading...</div>}
              <ProgramFinderOutput
                data={programData}
                visible={tableVisible && !loading}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {isClient && (
        <style>
          {`
              .propertySection, .utilitySection, .addDevicesSection, .deviceTitleSection, .emailSection, .thermostatSelection, .batterySelection, .heatpumpSelection,  .waterheaterSelection, .solarSelection, .EVSelection, .generatorSelection, .deviceSection {
                display: grid;
                grid-template-rows: 0fr;
                transition: grid-template-rows 0.7s ease, margin 0.7s ease;
              }

              .submitButton{
                transition: margin 0.7s ease;
              }
              .open {
                grid-template-rows: 1fr;
                margin-top: 0.5rem;
              }
              .propertySection > div, .utilitySection > div, .thermostatSelection > div , .batterySelection > div,  .heatpumpSelection > div ,  .waterheaterSelection > div, .solarSelection > div, .EVSelection > div, .generatorSelection > div, .deviceSection > div, .propertySection > div, .deviceTitleSection > div, .emailSection > div {
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
