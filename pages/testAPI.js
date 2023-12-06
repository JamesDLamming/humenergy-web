import React, { useState } from 'react';
import Nav from '../components/Nav';
import SEO from '../components/SEO';
import { TypeAnimation } from 'react-type-animation';
import DefaultButton from '../components/DefaultButton';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import DataTable from '../components/DataTable';

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
        body: JSON.stringify({ stateRegion }),
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
    checkEligibility(stateRegion);
    setTableVisible(true);
  };

  const headers = '';
  if (responseData.length > 0) {
    const headers = Object.keys(responseData[0]); // Get column names from the first row
  }
  return (
    <>
      <SEO title="Hum Energy - Test" />
      <div className="bg-bgMain overflow-hidden min-h-screen">
        <Nav></Nav>
        <form onSubmit={handleSubmit}>
          <label>
            State/Region:
            <input
              type="text"
              value={stateRegion}
              onChange={(e) => setStateRegion(e.target.value)}
            />
          </label>
          <DefaultButton type="submit">Check API</DefaultButton>
        </form>
        <DataTable data={responseData} visible={tableVisible} />
      </div>
    </>
  );
}
