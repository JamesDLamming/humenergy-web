const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');
const { toCamelCase } = require('../../utils/utils');

async function getDevices(req, res) {
  try {
    const { deviceType } = req.body;

    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByTitle['Manufacturers']; // or use sheetsById or sheetsByTitle
    const rows = await sheet.getRows();

    // Check if the sheet has any rows and headers
    if (rows.length === 0 || !rows[0]._worksheet.headerValues) {
      return res.status(404).json({ message: 'No data found in the sheet.' });
    }
    // Find the index of the column with the header matching 'deviceType'
    const columnIndex = rows[0]._worksheet.headerValues.indexOf(deviceType);
    if (columnIndex === -1) {
      return res
        .status(404)
        .json({ message: `Column '${deviceType}' not found.` });
    }

    // Extract data from the specified column

    // Extract and transform data
    let deviceData = rows.map((row) => row._rawData[columnIndex]);
    deviceData = deviceData
      .filter((device) => device != null && device != '')
      .map((device) => ({
        label: device,
        value: toCamelCase(device),
      }));

    // Sort data alphabetically by value
    deviceData.sort((a, b) => a.value.localeCompare(b.value));

    deviceData.push({
      label: 'Other',
      value: 'other',
    });

    // Respond with the extracted data
    res.json(deviceData);
  } catch (error) {
    console.error('Error in getDevices:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getDevices };
