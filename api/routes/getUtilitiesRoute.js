const express = require('express');
const router = express.Router();
const { getUtilities } = require('../controllers/getUtilitiesController');

router.post('/api/getUtilities', getUtilities);

module.exports = router;
