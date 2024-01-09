// services/emailService.js
const nodemailer = require('nodemailer');

const emailService = {
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'james@jameslamming.com',
      pass: 'yuhj lbtm feol cnke',
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
