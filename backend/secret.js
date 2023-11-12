require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
const jwtAccessKey = process.env.ACCESS_KEY;

module.exports = {
  port,
  mongoURL,
  jwtAccessKey,
};
