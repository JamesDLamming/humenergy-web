require('dotenv').config();

const express = require('express');
const eligibilityRoutes = require('./routes/eligibilityRoutes');
const findUtilitiesFromState = require('./routes/findUtilitiesFromStateRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use(eligibilityRoutes, findUtilitiesFromState);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
