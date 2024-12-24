const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { STATUS } = require("../utils/constants");
const User = require("../models/user");

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: STATUS.INTERESTED,
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    res.json({
      message: `You have ${connectionRequests.length} requests pending`,
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: STATUS.ACCEPTED },
        { toUserId: loggedInUser._id, status: STATUS.ACCEPTED },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const connections = connectionRequests.map((con) => {
      return con.fromUserId.toString() === loggedInUser._id.toString()
        ? con.toUserId
        : con.fromUserId;
    });

    res.json({
      message: `You have ${connections.length} connection(s)`,
      data: connections,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    hideUsersFromFeed.add(loggedInUser._id.toString());
    connections.forEach((con) => {
      hideUsersFromFeed.add(con.fromUserId.toString());
      hideUsersFromFeed.add(con.toUserId.toString());
    });

    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    }).select(USER_SAFE_DATA);

    res.json({
      message: "Feed API response",
      data: users,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
