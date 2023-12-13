import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import DefaultButton from '../components/DefaultButton';
import StateSelector from '../components/StateSelector';
import VPPFinderOutput from '../components/VPPFinderOutput';
import UtilitySelector from '../components/UtililtySelector';
require('dotenv').config();

export default function VPPFinder() {
  const [programData, setProgramData] = useState([]);
  const [utilityData, setUtilityData] = useState('');
  const [tableVisible, setTableVisible] = useState(false);
  const [utilityVisible, setUtilityVisible] = useState(false);
  const [propertyTypeVisible, setPropertyTypeVisible] = useState(false);
  const [devicesVisible, setDevicesVisible] = useState(false);
  const [heatpumpPresent, setHeatpumpPresent] = useState(false);

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

  const [stateError, setStateError] = useState('');
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
            selectionsThermostat,
            selectionsBattery,
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
    if ((!Utility || Utility.trim() === '') && utilityVisible) {
      setUtilityError('Please select a Utility/CCA');
      return; // Prevent form submission
    }
    if ((!sectorOption || sectorOption.trim() === '') && propertyTypeVisible) {
      setPropertyTypeError('Please select a Property Type');
      return; // Prevent form submission
    }
    if (!stateRegion || stateRegion.trim() === '') {
      setStateError('Please select a State');
      return; // Prevent form submission
    }

    // Reset error message and continue with form submission
    setUtilityError('');
    checkEligibility(stateRegion, sectorOption, Utility);
    setTableVisible(true);
  };

  const [sectorOption, setSectorOption] = useState('');

  const [selectionsThermostat, setSelectionsThermostat] = useState({
    Honeywell: false,
    Nest: false,
    OtherThermostat: false,
    NoThermostat: true, // 'None' option selected by default
  });

  const [selectionsBattery, setSelectionsBattery] = useState({
    Generac: false,
    TeslaPowerwall: false,
    OtherBattery: false,
    NoBattery: true, // 'None' option selected by default
  });

  const handleCheckboxChangeThermostat = (event) => {
    setSelectionsThermostat({
      ...selectionsThermostat,
      [event.target.name]: event.target.checked,
      NoThermostat: false, // Uncheck 'None' when any checkbox is checked
    });
  };

  const handleCheckboxChangeBattery = (event) => {
    setSelectionsBattery({
      ...selectionsBattery,
      [event.target.name]: event.target.checked,
      NoBattery: false, // Uncheck 'None' when any checkbox is checked
    });
  };

  // Handle 'None' radio button change
  const handleNoneChangeThermostat = () => {
    setSelectionsThermostat({
      Honeywell: false,
      Nest: false,
      OtherThermostat: false,

      NoThermostat: true,
    });
  };

  const handleNoneChangeBattery = () => {
    setSelectionsBattery({
      Generac: false,
      TeslaPowerwall: false,
      OtherBattery: false,
      NoBattery: true,
    });
  };

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
              )}
              {propertyTypeError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {propertyTypeError}
                </div>
              )}
              {utilityVisible && (
                <label className="mt-2 flex gap-x-3 items-center">
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
              )}
              {utilityError && (
                <div className="text-red-500 mt-2 -mb-2 text-sm text-right">
                  {utilityError}
                </div>
              )}
              {devicesVisible && Utility != 'Unavailable' && (
                <label className="mt-2 block gap-x-3 items-top">
                  <div className="text-xl pt-2 font-black items-center text-center">
                    Add devices
                  </div>
                  <div className="block">
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Smart Thermostat</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <label className="flex items-baseline">
                          <input
                            type="checkbox"
                            name="Honeywell"
                            checked={selectionsThermostat.Honeywell}
                            onChange={handleCheckboxChangeThermostat}
                          />
                          <span className="ml-1 ">Honeywell</span>
                        </label>
                        <label className="flex items-baseline">
                          <input
                            type="checkbox"
                            name="Nest"
                            checked={selectionsThermostat.Nest}
                            onChange={handleCheckboxChangeThermostat}
                          />
                          <span className="ml-1">Nest</span>
                        </label>
                        <label className="flex items-baseline">
                          <input
                            type="checkbox"
                            name="OtherThermostat"
                            checked={selectionsThermostat.OtherThermostat}
                            onChange={handleCheckboxChangeThermostat}
                          />
                          <span className="ml-1">Other</span>
                        </label>
                        <label className="flex items-baseline">
                          <input
                            type="radio"
                            name="NoThermostat"
                            checked={selectionsThermostat.NoThermostat}
                            onChange={handleNoneChangeThermostat}
                          />
                          <span className="ml-1">None</span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="mb-0 font-medium">Battery</p>
                      <div className="flex gap-x-3 gap-y-1 flex-wrap">
                        <div>
                          <label className="flex items-baseline">
                            <input
                              type="checkbox"
                              name="Generac"
                              checked={selectionsBattery.Generac}
                              onChange={handleCheckboxChangeBattery}
                            />
                            <span className="ml-1">Generac</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-baseline">
                            <input
                              type="checkbox"
                              name="TeslaPowerwall"
                              checked={selectionsBattery.TeslaPowerwall}
                              onChange={handleCheckboxChangeBattery}
                            />
                            <span className="ml-1">Tesla Powerwall</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-baseline">
                            <input
                              type="checkbox"
                              name="OtherBattery"
                              checked={selectionsBattery.OtherBattery}
                              onChange={handleCheckboxChangeBattery}
                            />
                            <span className="ml-1">Other</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-baseline">
                            <input
                              type="radio"
                              name="NoBattery"
                              checked={selectionsBattery.NoBattery}
                              onChange={handleNoneChangeBattery}
                            />
                            <span className="ml-1">None</span>
                          </label>
                        </div>
                      </div>
                    </div>
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
                </label>
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
    </>
  );
}
