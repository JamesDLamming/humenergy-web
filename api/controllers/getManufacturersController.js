const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');
const { toCamelCase } = require('../../utils/utils');

async function getManufacturers(req, res) {
  try {
    const { deviceType } = req.body;

    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByTitle['Manufacturers']; // or use sheetsById or sheetsByTitle
    const rows = await sheet.getRows();

    // Check if the sheet has any rows and headers
    if (rows.length === 0 || !rows[0]._worksheet.headerValues) {
      return res.status(404).json({ message: 'No data found in the sheet.' });
    }

    //Filter device list

    const manufacturerData = rows
      .filter((row) => row.get('Type') === deviceType)
      .map((row) => {
        const manufacturerName = row.get('Manufacturer');
        return {
          label: manufacturerName,
          value: toCamelCase(manufacturerName),
        };
      });

    manufacturerData.sort((a, b) => a.value.localeCompare(b.value));

    manufacturerData.push({
      label: 'Other',
      value: 'other',
    });

    // Respond with the extracted data
    res.json(manufacturerData);
  } catch (error) {
    console.error('Error in getDevices:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getManufacturers };
