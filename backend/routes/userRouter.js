const {
  signupPostController,
  signupGetController,
  loginPostController,
  foodController,
  googleLoginController,
} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/signup", signupGetController);
userRouter.post("/signup", signupPostController);
userRouter.post("/login", loginPostController);
userRouter.get("/food", foodController);
userRouter.post("/google-login", googleLoginController);

module.exports = { userRouter };
