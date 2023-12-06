const express = require('express');
const router = express.Router();
const { checkEligibility } = require('../controllers/eligibilityController');

router.post('/check-eligibility', checkEligibility);

module.exports = router;
