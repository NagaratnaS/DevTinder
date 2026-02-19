const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login");
    }
    //validate the token
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
    //find the user
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(`Error Fetching Data${error.message}`);
  }
};

module.exports = { userAuth };
