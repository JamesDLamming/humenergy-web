// Master file for routes - ideally would be split into separate files for each API but need to minimise files for Vercel plan
const express = require('express');
const router = express.Router();

// contactFormEmail API
const contactFormEmailController = require('../controllers/contactFormEmailController');
router.post(
  '/api/send-contact-form-email',
  contactFormEmailController.sendContactEmail
);

// checkEligibility API
const { checkEligibility } = require('../controllers/eligibilityController');
router.post('/api/check-eligibility', checkEligibility);

// getUtilities API
const { getUtilities } = require('../controllers/getUtilitiesController');
router.post('/api/getUtilities', getUtilities);

// getManufacturers API
const {
  getDevices,
  getManufacturers,
} = require('../controllers/getManufacturersController');

router.post('/api/get-manufacturers', getManufacturers);

// programFormEmailRoutes
const programFormEmailController = require('../controllers/programFormEmailController');
router.post(
  '/api/send-program-form-email',
  programFormEmailController.sendContactEmail
);

// saveFormData API
const { saveFormData } = require('../controllers/saveFormDataController');
router.post('/api/saveFormData', saveFormData);

module.exports = router;
