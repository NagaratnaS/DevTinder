const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, passWord } = req.body;
  if (!firstName || !lastName)
    throw new Error("First Name and Last Name are required");
  if (!validator.isEmail(emailId)) throw new Error("Invalid Email ID");
  if (!validator.isStrongPassword(passWord))
    throw new Error("Password is not strong enough");
};

module.exports = { validateSignUpData };
