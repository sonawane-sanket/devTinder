const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const {
  validateSendConnectionReq,
  validateReceiveConnectionReq,
} = require("../utils/validation");
const { STATUS } = require("../utils/constants");

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    await validateSendConnectionReq(status, fromUserId, toUserId);

    const connectRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectRequest.save();

    res.json({
      message: `Connection request ${
        status === STATUS.INTERESTED ? "sent" : "ignored"
      } successfully`,
      data,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

requestRouter.post(
  "/receive/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      await validateReceiveConnectionReq(status, requestId, loggedInUser._id);

      const connectionRequest = await ConnectionRequest.findById(requestId);
      connectionRequest.status = status;

      connectionRequest.save();

      res.json({ message: `Connection request ${status}` });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;
