require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
const jwtAccessKey = process.env.ACCESS_KEY;
const jwtForgetPassKey = process.env.JWT_FORGET_KEY;
const smtpPass = process.env.SMTP_PASSWORD;
const smtpUsername = process.env.SMTP_USERNAME;

module.exports = {
  port,
  mongoURL,
  jwtAccessKey,
  jwtForgetPassKey,
  smtpPass,
  smtpUsername,
};
