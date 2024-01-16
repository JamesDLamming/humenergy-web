// routes/emailRoutes.js
const express = require('express');
const programFormEmailController = require('../controllers/programFormEmailController');

const router = express.Router();

router.post(
  '/api/send-program-form-email',
  programFormEmailController.sendContactEmail
);

module.exports = router;
