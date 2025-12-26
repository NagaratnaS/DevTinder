const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastname: "Kohli",
    emailId: "viratkohli@gmail.com",
    passWord: "viratkohli@123",
  });
  try {
    await user.save(user);
    res.send("User signed up successfully");
  } catch (error) {
    res.status(500).send("Error signing up user:" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(7777, () => console.log("Listening on port 7777"));
