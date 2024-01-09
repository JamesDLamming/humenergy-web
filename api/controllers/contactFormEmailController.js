// controllers/emailController.js
const emailService = require('../services/emailService');

const contactFormEmailController = {
  sendContactEmail: async (req, res) => {
    try {
      const { name, email, message } = req.body;
      const mailOptions = {
        from: 'james@jameslamming.com',
        to: 'james@jameslamming.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      await emailService.sendEmail(mailOptions);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  },
};

module.exports = contactFormEmailController;
