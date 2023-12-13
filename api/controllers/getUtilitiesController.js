const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function getUtilities(req, res) {
  try {
    const { stateRegion, sectorOption } = req.body;

    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByIndex[0]; // or use sheetsById or sheetsByTitle
    const rows = await sheet.getRows();

    const utilityList = rows
      .filter(
        (row) =>
          row.get('State/Region') === stateRegion &&
          (row.get('Sector').includes(sectorOption) ||
            row.get('Sector') === '') &&
          row.get('Status') != 'Ended'
      )
      .map((row) => {
        const utilityName = row.get('Utility/CCA');
        return { Utility: utilityName, Value: utilityName };
      })
      .filter(
        (item, index, self) =>
          item.Utility &&
          self.findIndex((u) => u.Utility === item.Utility) === index
      )
      .sort((a, b) => a.Utility.localeCompare(b.Utility));

    utilityList.push({
      Utility: 'My Utility/CCA is not in this list',
      Value: 'Unavailable',
    });

    res.json(utilityList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
}

module.exports = { getUtilities };
