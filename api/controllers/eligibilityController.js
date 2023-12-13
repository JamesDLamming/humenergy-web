const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function checkEligibility(req, res) {
  try {
    const { stateRegion, sectorOption, Utility } = req.body;

    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByIndex[0]; // or use sheetsById or sheetsByTitle
    const rows = await sheet.getRows();

    const filteredRows = rows.filter(
      (row) =>
        row.get('State/Region') === stateRegion &&
        (row.get('Sector').includes(sectorOption) ||
          row.get('Sector') === '') &&
        row.get('Status') != 'Ended' &&
        row.get('Utility/CCA') === Utility
    );
    res.json(
      filteredRows.map((row) => {
        return {
          'Program Name': row.get('Program Name'),
          'Program URL': row.get('Program URL'),
          'State/Region': row.get('State/Region'),
          'DERs needed': row.get('DERs'),
          'Utility/CCA': row.get('Utility/CCA'),
          'Image URL': row.get('Image URL'),
          Enrollment: row.get('Enrolling?'),
          Status: row.get('Status'),
        };
      })
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
}

module.exports = { checkEligibility };
