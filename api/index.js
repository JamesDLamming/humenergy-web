require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//routes
const eligibilityRoutes = require('./routes/routes');
const getUtilities = require('./routes/routes');
const getManufacturers = require('./routes/routes');
const saveFormData = require('./routes/routes');
const contactFormEmailRoutes = require('./routes/routes');
const programFormEmailRoutes = require('./routes/routes');

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

app.use('/', require('./routes/plantRoutes'));
const connectDB = require('../config/db');
// Connect to Database
connectDB();

module.exports = app;
