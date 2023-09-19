//external import
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
//internal import
const { userRouter } = require("./routes/userRouter");
const { errorResponse } = require("./helpers/responseHandler");

//middleware array
const middleware = [
  morgan("dev"),
  cors(),
  rateLimit({
    windosMs: 1 * 60 * 1000,
    max: 10,
    message: "Sorry you have tried more than 5,try again later",
  }),
  xssClean(),
  express.urlencoded({ extended: true }),
  express.json(),
];

//use middleware

app.use(middleware);
app.use("/", userRouter);

//client error handling
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

//server error handling
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
