require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
const jwtAccessKey = process.env.ACCESS_KEY;
const fbId = process.env.FB_ID;
const fbSecret = process.env.FB_SECRET;

module.exports = {
  port,
  mongoURL,
  jwtAccessKey,
  fbId,
  fbSecret,
};
