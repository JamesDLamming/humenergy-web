const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function checkEligibility(req, res) {
  try {
    const { stateRegion } = req.body;
    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByIndex[0]; // or use sheetsById or sheetsByTitle
    const rows = await sheet.getRows();

    console.log(stateRegion);
    const filteredRows = rows.filter(
      (row) => row.get('State/Region') === stateRegion
    );

    res.json(
      filteredRows.map((row) => {
        return {
          'Program Name': row.get('Program Name'),
          'Program URL': row.get('Program URL'),
          // ... other columns you might want to include
          'State/Region': row.get('State/Region'),
          'DERs needed': row.get('DERs'),
          // ...
        };
      })
    );
    console.log(filteredRows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
}

module.exports = { checkEligibility };
