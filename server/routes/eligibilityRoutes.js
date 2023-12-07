const express = require('express');
const router = express.Router();
const { checkEligibility } = require('../controllers/eligibilityController');

router.post('/api/check-eligibility', checkEligibility);

module.exports = router;
