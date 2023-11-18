const jwt = require("jsonwebtoken");

const createJWT = (payload, secretKey, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be non-empty object");
  }

  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("Secret key must be non empty string");
  }
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createJWT };
