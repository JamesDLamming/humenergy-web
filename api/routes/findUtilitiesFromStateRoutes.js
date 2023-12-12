const express = require('express');
const router = express.Router();
const {
  findUtilitiesFromState,
} = require('../controllers/findUtilitiesFromStateController');

router.post('/api/findUtilitiesFromState', findUtilitiesFromState);

module.exports = router;
