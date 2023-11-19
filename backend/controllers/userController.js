//external import
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
//internal import
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");
const { User } = require("../models/signupModel");
const { jwtAccessKey, jwtSecretKey } = require("../secret");
const { mongoose } = require("mongoose");
const { createJWT } = require("../helpers/createJWT");
const emailWithNodemailer = require("../helpers/emailWithNodemailer");

const signupGetController = (req, res) => {
  res.send("hi");
};
//google login controller
const googleLoginController = async (req, res, next) => {
  const { name, email, googleId, picture } = req.body;
  const accessToken = createJWT({ email, googleId }, jwtAccessKey, "10m");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const hasedPassword = await bcrypt.hash(googleId, 10);

      const newUser = await User.create({
        name,
        email,
        picture,
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
        payload: accessToken,
      });
    } else {
      successResponse(res, {
        statusCode: 200,
        message: "User Exist with this email",
        payload: accessToken,
      });
    }
  } catch (error) {
    next(createError(error));
  }
};
//logout controller
const logoutController = async (req, res, next) => {
  const { email } = req.body;
  const response = await User.findOneAndDelete(email);
  if (!response) {
    errorResponse(res, { statusCode: 400, message: "Failed To logout" });
  }
  successResponse(res, {
    statusCode: 200,
    message: "Successfully log out",
  });
};

//signup POST controller
const signupPostController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("3");
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

    const accessToken = createJWT({ email, password }, jwtAccessKey, "10m");

    successResponse(res, {
      statusCode: 201,
      message: "User Created Successfully",
      payload: accessToken,
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
    console.log(jwtAccessKey);
    //createToken
    const accessToken = createJWT({ email, password }, jwtAccessKey, "10m");

    // setAccessTokenCookie(res, accessToken);

    // const refreshToken = createJWT({ email, password }, jwtAccessKey, "7d");
    // setRefreshTokenCookie(refreshToken);

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

//forget password controller
const forgetPassController = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    errorResponse(res, {
      statusCode: 404,
      message: "User does not exist",
      success: false,
    });
  } else {
    const token = createJWT({ id: user._id, email }, jwtSecretKey, "1d");

    //emaildata
    const emailData = {
      email,
      subject: "Reset your password",
      html: `<a href="http://localhost:5173/reset-password/${user._id}/${token}" > Activate your account</a>`,
    };
    emailWithNodemailer(emailData);
  }
};

module.exports = {
  signupPostController,
  signupGetController,
  loginPostController,
  foodController,
  googleLoginController,
  logoutController,
  forgetPassController,
};
