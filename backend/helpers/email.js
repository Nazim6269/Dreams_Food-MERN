const nodemailer = require("nodemailer");
const { smtpUsername, smtpPass } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUsername,
    pass: smtpPass,
  },
});

const emailWithNodemailer = async (emailData) => {
  try {
  } catch (error) {}
};
