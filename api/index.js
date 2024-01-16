require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//routes
const eligibilityRoutes = require('./routes/eligibilityRoutes');
const getUtilities = require('./routes/getUtilitiesRoute');
const getManufacturers = require('./routes/manufacturersRoutes');
const saveFormData = require('./routes/saveFormDataRoutes');
const contactFormEmailRoutes = require('./routes/contactFormEmailRoutes');
const programFormEmailRoutes = require('./routes/programFormEmailRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(eligibilityRoutes);
app.use(getUtilities);
app.use(getManufacturers);
app.use(saveFormData);
app.use(contactFormEmailRoutes);
app.use(programFormEmailRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
