require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
const jwtAccessKey = process.env.ACCESS_KEY;
const fbId = process.env.FB_ID;
const fbSecret = process.env.FB_SECRET;
const jwtSecretKey = process.env.SECRET_KEY;
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;

module.exports = {
  port,
  mongoURL,
  jwtAccessKey,
  fbId,
  fbSecret,
  jwtSecretKey,
  smtpPassword,
  smtpUsername,
};
