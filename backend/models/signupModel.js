const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{ token: String }],
  verifyToken: {
    type: String,
  },
});

const User = mongoose.model("User", signupSchema);

module.exports = { User };
