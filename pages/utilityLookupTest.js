import React, { useState } from 'react';
import StateSelector from '../components/StateSelector';

const ZipCodeFetcher = () => {
  const [zipCode, setZipCode] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [sectorOption, setSectorOption] = 'Residential';

  const handleSubmit = (event) => {
    event.preventDefault();
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     accept: 'application/json',
    //     'x-api-key': 'Btek5LlUxt27DsnTJvsOU5Nxj0Bi4eRm9IbprpI2',
    //   },
    // };

    // fetch(
    //   `https://apis.wattbuy.com/v3/electricity/info?zip=${zipCode}`,
    //   options
    // )
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));

    const utilitiesLookupAPI = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stateRegion, sectorOption }),
    };

    fetch('/api/findUtilitiesFromState', utilitiesLookupAPI)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="mt-2 flex gap-x-2 items-center font-medium">
        State/Region:
        <StateSelector
          className="ml-2"
          value={stateRegion}
          onChange={(e) => setStateRegion(e.target.value)}
        ></StateSelector>
      </label>
      {/* 
      <label htmlFor="zipCode">Enter Zip Code:</label>
      <input
        type="text"
        id="zipCode"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
      /> */}
      <button type="submit">Get Electricity Info</button>
    </form>
  );
};

export default ZipCodeFetcher;
