const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const validateSignUpData = require("../utils/validation");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid Credentials");
    const isPassWordMatch = await user.isPasswordValid(passWord);
    if (!isPassWordMatch) throw new Error("Invalid Credentials");
    else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.send("User logged in successfully");
    }
  } catch (error) {
    res.status(400).send(`Error loggin in!!${error.message}`);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, passWord } = req.body;
    const hashedPassword = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: hashedPassword,
    });
    await user.save(user);
    res.send("User signed up successfully");
  } catch (error) {
    res.status(500).send("Error signing up user:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("User logged out successfully");
});

module.exports = authRouter;
