const express = require('express');
const cors = require('cors');
const {
  checkEligibility,
} = require('../server/controllers/eligibilityController');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/check-eligibility', checkEligibility);

module.exports = app;
