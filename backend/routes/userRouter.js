const {
  signupPostController,
  signupGetController,
  loginPostController,
  foodController,
  checkOutController,
  forgetPassController,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/signup", signupGetController);
userRouter.post("/signup", signupPostController);
userRouter.post("/login", loginPostController);
userRouter.get("/food", foodController);
userRouter.post("/create-checkout-session", checkOutController);
userRouter.post("/reset-password", forgetPassController);

module.exports = { userRouter };
