const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

requestRouter.get("/", async (req, res) => {});

module.exports = requestRouter;
