const express = require('express');
const router = express.Router();
const { getDevices } = require('../controllers/getDevicesController');

router.post('/api/get-devices', getDevices);

module.exports = router;
