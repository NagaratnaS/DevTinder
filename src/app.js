const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.get("/findOneUSer", async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const user = await User.findById(userId);
//     if (!user) res.status(400).send(`Error Fetching Data${error.message}`);
//     else res.send(user);
//   } catch (error) {
//     res.status(400).send(`Error Fetching Data${error.message}`);
//   }
// });

// app.get("/getUser", userAuth, async (req, res) => {
//   try {
//     const users = await User.find({ emailId: req.body.emailId });
//     if (users.length === 0) {
//       res.status(404).send("No users found with the given emailId");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send(`Error Fetching Data${error.message}`);
//   }
// });

// app.get("/getOneUser", async (req, res) => {
//   try {
//     const user = await User.findOne({ emailId: req.body.emailId });
//     if (!user) res.status(400).send(`Error Fetching Data${error.message}`);
//     else res.send(user);
//   } catch (error) {
//     res.status(400).send(`Error Fetching Data${error.message}`);
//   }
// });

// app.delete("/deleteUser", async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const deletedUser = await User.findByIdAndDelete(userId);
//     if (!deletedUser) {
//       res.status(404).send("User not found");
//     } else {
//       res.send("User deleted successfully");
//     }
//   } catch (error) {
//     res.status(400).send(`Error Deleting Data${error.message}`);
//   }
// });

// app.get("/findAllUsers", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send(`Error Fetching Data${error.message}`);
//   }
// });

// app.patch("/updateuser/:userId", async (req, res) => {
//   try {
//     const userId = req?.params?.userId;
//     const updateData = req?.body;
//     const ALLOWED_UPDATES = [
//       "firstName",
//       "lastname",
//       "passWord",
//       "age",
//       "gender",
//       "photoUrl",
//       "about",
//       "skills",
//     ];
//     const isUpdateAllowed = Object.keys(updateData).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) throw new Error("Update not allowed!");

//     if (updateData.skills.length > 10)
//       throw new Error("Skills cannot be more than 10");

//     await User.findByIdAndUpdate(userId, updateData, {
//       runValidators: true,
//       // returnDocument: "after"/"before"
//     });
//     res.send("User updated successfully");
//   } catch (error) {
//     res.status(500).send("Error updating user:" + error.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(7777, () => console.log("Listening on port 7777"));
