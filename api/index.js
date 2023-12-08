require('dotenv').config();

const express = require('express');
const eligibilityRoutes = require('./routes/eligibilityRoutes');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.use(eligibilityRoutes);

app.use(
  router.post('/api/test2', (req, res) => {
    res.json({ message: 'Test endpoint reached' });
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
