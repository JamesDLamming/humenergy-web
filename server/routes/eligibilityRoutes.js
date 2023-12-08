const express = require('express');
const router = express.Router();
const { checkEligibility } = require('../controllers/eligibilityController');

//git purouter.post('/check-eligibility', checkEligibility);
router.post('/test', (req, res) => {
  res.json({ message: 'Test endpoint reached' });
});

module.exports = router;
