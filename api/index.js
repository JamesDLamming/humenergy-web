require('dotenv').config();

const express = require('express');
const eligibilityRoutes = require('./routes/eligibilityRoutes');
const getUtilities = require('./routes/getUtilitiesRoute');
const getManufacturers = require('./routes/manufacturersRoutes');
const saveFormData = require('./routes/saveFormDataRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use(eligibilityRoutes);
app.use(getUtilities);
app.use(getManufacturers);
app.use(saveFormData);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
