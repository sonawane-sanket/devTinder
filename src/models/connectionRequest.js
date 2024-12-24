const mongoose = require("mongoose");
const { STATUS } = require("../utils/constants");

const { Schema, model } = mongoose;

const { IGNORED, INTERESTED, ACCEPTED, REJECTED } = STATUS;

const connectionRequestSchema = new Schema(
  {
    fromUserId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    toUserId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    status: {
      type: String,
      required: true,
      enum: {
        values: [IGNORED, INTERESTED, ACCEPTED, REJECTED],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Can not send connection request to self");
  }
  next();
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequest = new model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
