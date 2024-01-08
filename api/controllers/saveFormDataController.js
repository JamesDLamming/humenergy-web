const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function saveFormData(req, res) {
  try {
    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByTitle['formData'];
    const response = await sheet.addRow(req.body);
    res.json(response.data); // Send back the response data to the client
  } catch (error) {
    console.error('Error in saveFormData:', error);
    res.status(500).json({ error: error.message }); // Send detailed error message
  }
}

module.exports = { saveFormData };
