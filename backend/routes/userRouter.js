const {
  signupPostController,
  signupGetController,
  loginPostController,
  foodController,
  googleLoginController,
  logoutController,
  forgetPassController,
} = require("../controllers/userController");
const { signupValidator, loginValidator } = require("../validators/condition");
const { runValidation } = require("../validators/validation");
const userRouter = require("express").Router();

//all routes are here
userRouter.get("/signup", signupGetController);
userRouter.post(
  "/signup",
  signupValidator,
  runValidation,
  signupPostController
);
userRouter.post("/login", loginValidator, runValidation, loginPostController);
userRouter.post("/logout", logoutController);
userRouter.get("/food", foodController);
userRouter.post("/google-login", googleLoginController);
userRouter.post("/forget-password", forgetPassController);

module.exports = { userRouter };
