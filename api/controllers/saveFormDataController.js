const { json } = require('express');
// const fetch = import('node-fetch');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function saveFormData(req, res) {
  const clientIP = req.ip; // or use req.headers['x-forwarded-for'] if behind a proxy
  const myIP = '::1'; // Replace with your IP address; currently setup for avoiding local host submission requirements
  if (clientIP === myIP) {
    console.log('Form submission from my IP, not saving data.');
    res.status(200).json('Not saved due to IP match');
  } else {
    try {
      const doc = await accessSpreadsheet();
      const sheet = doc.sheetsByTitle['formData'];
      const response = await sheet.addRow(req.body);

      const emailData = {
        email: req.body.email,
        message: JSON.stringify(req.body), // Customize as needed
      };

      // Make the request to the email API
      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/send-program-form-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        }
      );

      if (emailResponse.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Email sending failed:', await emailResponse.text());
      }

      res.json(response.data); // Send back the response data to the client
    } catch (error) {
      console.error('Error in saveFormData:', error);
      res.status(500).json({ error: error.message }); // Send detailed error message
    }
  }
}

module.exports = { saveFormData };

//plant controller

const Plant = require('../models/Plant');

// Get all plants
exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add a new plant
exports.addPlant = async (req, res) => {
  try {
    const newPlant = new Plant(req.body);
    const plant = await newPlant.save();
    res.json(plant);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Update water date
exports.updateWaterDate = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    plant.lastWateredDate = Date.now();
    plant.nextWaterDate = new Date(
      Date.now() + plant.wateringFrequency * 24 * 60 * 60 * 1000
    );
    await plant.save();
    res.json(plant);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Edit Plant
exports.updatePlant = async (req, res) => {
  const { id } = req.params;
  const { name, location, wateringFrequency, lastWateredDate, nextWaterDate } =
    req.body;

  try {
    // Find the document by ID and update it
    const plant = await Plant.findById(id);
    if (!plant) {
      return res.status(404).send('Plant not found');
    }

    // Update fields
    plant.name = name || plant.name;
    plant.location = location || plant.location;
    plant.wateringFrequency = wateringFrequency || plant.wateringFrequency;
    plant.lastWateredDate = lastWateredDate || plant.lastWateredDate;
    plant.nextWaterDate = nextWaterDate || plant.nextWaterDate;

    await plant.save(); // Save the updated document

    res.json(plant); // Send back the updated plant data
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

//Delete plant
exports.deletePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlant = await Plant.findByIdAndDelete(id);

    if (!deletedPlant) {
      return res.status(404).send('Plant not found');
    }

    res
      .status(200)
      .json({ message: 'Plant successfully deleted', deletedPlant });
  } catch (error) {
    console.error('Delete Plant Error:', error);
    res.status(500).send('Server error');
  }
};
