//external import
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//internal import
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");
const { User } = require("../models/signupModel");
const { jwtAccessKey } = require("../secret");
const { mongoose } = require("mongoose");

const signupGetController = (req, res) => {
  res.send("hi");
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
    const token = jwt.sign({ email: email, password: password }, jwtAccessKey, {
      expiresIn: "5m",
    });

    res.cookie("accessToken", token, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
    });

    isExist.tokens.push({ token: token });
    await isExist.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Successfully login",
      payload: token,
    });
  } catch (error) {
    return next(error);
  }
};

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
};
