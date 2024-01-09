// routes/emailRoutes.js
const express = require('express');
const contactFormEmailController = require('../controllers/contactFormEmailController');

const router = express.Router();

router.post(
  '/api/send-contact-form-email',
  contactFormEmailController.sendContactEmail
);

module.exports = router;
