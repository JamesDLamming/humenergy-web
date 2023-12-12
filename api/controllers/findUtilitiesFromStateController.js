const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function findUtilitiesFromState(req, res) {
  try {
    const { stateRegion, sectorOption } = req.body;

    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByIndex[0]; // or use sheetsById or sheetsByTitle
    const rows = await sheet.getRows();

    const filteredRows = rows.filter(
      (row) =>
        row.get('State/Region') === stateRegion &&
        (row.get('Sector').includes(sectorOption) ||
          row.get('Sector') === '') &&
        row.get('Status') != 'Ended'
    );
    res.json(
      // _.uniq(
      filteredRows.map((row) => {
        return {
          'State/Region': row.get('State/Region'),
          'Utility/CCA': row.get('Utility/CCA'),
        };
      })
      //   ,
      //   false
      // )
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
}

module.exports = { findUtilitiesFromState };
