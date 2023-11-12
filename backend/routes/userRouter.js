const {
  signupPostController,
  signupGetController,
  loginPostController,
  foodController,

} = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.get("/signup", signupGetController);
userRouter.post("/signup", signupPostController);
userRouter.post("/login", loginPostController);
userRouter.get("/food", foodController);

module.exports = { userRouter };
