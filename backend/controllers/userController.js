//external import
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(
  "sk_test_51O982yHJK5WrpDDFt9gN9JEIrYyisFWZOAO6GBfWlgt0cIFmRF8cA5oPwj0NiPoXjxuFcnAyN4o8SMChAL8PkD2o00ysyezMub"
);
const nodmailer = require("nodemailer");
//internal import
const {
  errorResponse,
  successResponse,
} = require("../helpers/responseHandler");
const { User } = require("../models/signupModel");
const { jwtAccessKey, jwtForgetPassKey, clientURL } = require("../secret");
const { mongoose } = require("mongoose");
const { createJWT } = require("../helpers/createJWT");
const { emailWithNodemailer } = require("../helpers/email");

const signupGetController = (req, res) => {
  res.send("hi");
};

//signup POST controller
const signupPostController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please, porvide name",
      });
    }
    if (!email) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please, porvide email",
      });
    }
    if (!password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please, porvide passowrd",
      });
    }

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

    if (!email) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please, porvide email",
      });
    }
    if (!password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please, porvide password",
      });
    }

    const isExist = await User.findOne({ email });
    if (!isExist) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User does not exist in this email. Please signup first",
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

    // res.cookie("accessToken", token, {
    //   maxAge: 5 * 60 * 1000,
    //   httpOnly: true,
    //   sameSite: "none",
    // });

    // isExist.tokens.push({ token: token });
    // await isExist.save();

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

const checkOutController = async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => {
      const { full } = product.options[0];

      const unitAmount = full * 100;

      if (isNaN(unitAmount) || unitAmount <= 0) {
        throw new Error(`Invalid unit_amount for product: ${product.name}`);
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: unitAmount,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error in checkOutController:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//forgetPassController
const forgetPassController = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    errorResponse(res, {
      statusCode: 400,
      message: "User not found in this email",
    });
  }

  //create token
  const token = createJWT({ email }, jwtForgetPassKey, "120s");

  // // Verify token
  // try {
  //   jwt.verify(token, jwtForgetPassKey);
  // } catch (error) {
  //   return errorResponse(res, {
  //     statusCode: 400,
  //     message: "Invalid token",
  //   });
  // }

  const setUserToken = await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    { verifyToken: token },
    { new: true }
  );

  //prepare email
  const emailData = {
    email,
    subject: "Reset your Password",
    html: `<h2>hello ${user.name}</h2>
      <h3>Please click here <a href="${clientURL}/forget-password/${user._id}/${setUserToken.verifyToken}">to reset your password</a></h3>`,
  };
  //send email
  emailWithNodemailer(emailData);

  return successResponse(res, {
    statusCode: 201,
    success: true,
    message: "Check your Email",
  });
};

module.exports = {
  signupPostController,
  signupGetController,
  loginPostController,
  foodController,
  checkOutController,
  forgetPassController,
};
