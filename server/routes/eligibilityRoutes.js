const express = require('express');
const router = express();
const { checkEligibility } = require('../controllers/eligibilityController');

router.post('/check-eligibility', checkEligibility);

module.exports = router;
