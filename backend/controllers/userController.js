//external import
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
//internal import
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");
const { User } = require("../models/signupModel");
const { jwtAccessKey } = require("../secret");
const { mongoose } = require("mongoose");
const { createJWT } = require("../helpers/createJWT");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../helpers/cookies");

const signupGetController = (req, res) => {
  res.send("hi");
};
//google login controller
const googleLoginController = async (req, res, next) => {
  const { name, email, googleId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const hasedPassword = await bcrypt.hash(googleId, 10);

      const newUser = await User.create({
        name,
        email,
        password: hasedPassword,
      });

      const response = await newUser.save();
      if (!response) {
        return errorResponse(res, {
          statusCode: 400,
          message: "Failed to sign up",
        });
      }
      successResponse(res, {
        statusCode: 201,
        message: "User Created Successfully",
        payload: newUser,
      });
    } else {
      successResponse(res, {
        statusCode: 200,
        message: "User Exist with this email",
        payload: email,
      });
    }
  } catch (error) {
    next(createError(error));
  }
};

//facebook login controller
const facebookLoginController = async (req, res, next) => {
  console.log(req.body);
};

//signup POST controller
const signupPostController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist)
      return errorResponse(res, {
        statusCode: 400,
        message: "User already exist",
      });

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hasedPassword,
    });

    const response = await newUser.save();
    if (!response) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Failed to sign up",
      });
    }
    successResponse(res, {
      statusCode: 201,
      message: "User Created Successfully",
      payload: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//login POST controller
const loginPostController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (!isExist) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User doesnot exist. Please signup first",
      });
    }

    const isMatched = await bcrypt.compare(password, isExist.password);
    if (!isMatched) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Password did not match",
      });
    }

    //createToken
    const accessToken = createJWT({ email, password }, jwtAccessKey, "10m");
    setAccessTokenCookie(accessToken);
    const refreshToken = createJWT({ email, password }, jwtAccessKey, "7d");
    setRefreshTokenCookie(refreshToken);

    return successResponse(res, {
      statusCode: 200,
      message: "Successfully login",
      payload: accessToken,
    });
  } catch (error) {
    return next(error);
  }
};

//food controller
const foodController = async (req, res, next) => {
  try {
    const foodItems = await mongoose.connection.db
      .collection("Food_items")
      .find({})
      .toArray();
    const foodCategory = await mongoose.connection.db
      .collection("Food_Category")
      .find({})
      .toArray();

    if (!foodCategory || !foodItems) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Failed to fetched Data",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Data successfylly fetched",
      payload: [foodCategory, foodItems],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupPostController,
  signupGetController,
  loginPostController,
  foodController,
  googleLoginController,
  facebookLoginController,
};
