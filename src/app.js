const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.get("/getUser", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.status(404).send("No users found with the given emailId");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send(`Error Fetching Data${error.message}`);
  }
});

app.get("/getOneUser", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) res.status(400).send(`Error Fetching Data${error.message}`);
    else res.send(user);
  } catch (error) {
    res.status(400).send(`Error Fetching Data${error.message}`);
  }
});

app.get("/findAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send(`Error Fetching Data${error.message}`);
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
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
