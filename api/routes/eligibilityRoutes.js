const express = require('express');
const router = express.Router();
//const router = express();
const { checkEligibility } = require('../controllers/eligibilityController');

router.post('/api/check-eligibility', checkEligibility);
// router.post('/api/test2', (req, res) => {
//   res.json({ message: 'Test endpoint reached' });
// });

module.exports = router;
