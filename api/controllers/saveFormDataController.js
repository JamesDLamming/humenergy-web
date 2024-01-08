const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function saveFormData(req, res) {
  console.log(req.ip);
  const clientIP = req.ip; // or use req.headers['x-forwarded-for'] if behind a proxy
  const myIP = '::1'; // Replace with your IP address; currently setup for avoiding local host submission requirements
  if (clientIP === myIP) {
    console.log('Form submission from my IP, not saving data.');
    res.status(200).send('Not saved due to IP match');
  } else {
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
}

module.exports = { saveFormData };
