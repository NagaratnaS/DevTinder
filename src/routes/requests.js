const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.get(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatuses = ["Ignore", "Interested"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type" + status,
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "The user you are trying to connect with does not exist",
        });
      }

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection request already exists between these users",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status: status,
      });
      const data = await connectionRequest.save();
      res.json({
        message:
          status === "Interested"
            ? "Connection request sent successfully"
            : "Connection request ignored",
        data,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  },
);

module.exports = requestRouter;
