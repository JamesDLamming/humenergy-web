const express = require('express');
const router = express.Router();
const { saveFormData } = require('../controllers/saveFormDataController');

router.post('/api/saveFormData', saveFormData);

module.exports = router;
