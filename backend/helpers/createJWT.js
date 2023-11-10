//external emport
const jwt = require("jsonwebtoken");

//this helper function will create token
const createJWT = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    console.log("Password should be non empty object");
  }
  if (typeof secretKey !== "string" || secretKey === "") {
    console.log("secret should be non empty string");
  }

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createJWT };
