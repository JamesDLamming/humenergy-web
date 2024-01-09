// services/emailService.js
const nodemailer = require('nodemailer');

const emailService = {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL_APP_EMAIL,
      pass: process.env.GOOGLE_EMAIL_APP_PASSWORD,
    },
  }),

  sendEmail: async (mailOptions) => {
    try {
      let info = await emailService.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = emailService;
