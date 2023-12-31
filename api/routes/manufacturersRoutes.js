const express = require('express');
const router = express.Router();
const {
  getDevices,
  getManufacturers,
} = require('../controllers/getManufacturersController');

router.post('/api/get-manufacturers', getManufacturers);

module.exports = router;
