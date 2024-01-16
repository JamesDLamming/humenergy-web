// controllers/emailController.js
const emailService = require('../services/emailService');

const programFormEmailController = {
  sendContactEmail: async (req, res) => {
    try {
      const { email, message } = req.body;
      const mailOptions = {
        from: 'james@jameslamming.com',
        to: 'james@jameslamming.com',
        subject: `New Program Finder Form Submission`,
        text: `Email: ${email}\nMessage: ${message}`,
      };

      await emailService.sendEmail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  },
};

module.exports = programFormEmailController;
