const nodemailer = require("nodemailer");
const { smtpUsername, smtpPass } = require("../secret");
const createError = require("http-errors");

//create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUsername,
    pass: smtpPass,
  },
});

//send mail function
const emailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
    } catch (error) {
      next(createError(error));
    }
  } catch (error) {
    next(createError(error));
  }
};

module.exports = { emailWithNodemailer };
