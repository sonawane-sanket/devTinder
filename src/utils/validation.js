const validator = require("validator");
const { STATUS } = require("./constants");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const validationSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const validateProfileUpdateData = (req) => {
  const ALLOWED_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "about",
  ];

  const { age, gender, photoUrl, skills, about } = req.body;

  const isUpdateAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_FIELDS.includes(key)
  );

  if (!isUpdateAllowed) {
    throw new Error("Invalid update payload");
  } else if (age < 18) {
    throw new Error("Age should be 18+");
  } else if (!["male", "female", "others"].includes(gender)) {
    throw new Error("Gender can be male/female/others");
  } else if (!validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL: " + photoUrl);
  } else if (skills.length > 10) {
    throw new Error("Skills should be less than 10");
  } else if (about.length > 500) {
    throw new Error("About should be less than 500 chars");
  }
};

const validateNewPassword = (newPassword) => {
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please enter strong password");
  }
};

const validateSendConnectionReq = async (status, fromUserId, toUserId) => {
  const ALLOWED_STATUS = [STATUS.IGNORED, STATUS.INTERESTED];

  if (!ALLOWED_STATUS.includes(status)) {
    throw new Error("Invalid status type: " + status);
  } else {
    const isUserExist = await User.findById(toUserId);
    if (!isUserExist) {
      throw new Error("User does not exists");
    } else {
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        throw new Error("Connection request already exists");
      }
    }
  }
};

const validateReceiveConnectionReq = async (status, requestId, toUserId) => {
  const ALLOWED_STATUS = [STATUS.ACCEPTED, STATUS.REJECTED];

  if (!ALLOWED_STATUS.includes(status)) {
    throw new Error("Invalid status type: " + status);
  }

  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    status: STATUS.INTERESTED,
    toUserId,
  });

  if (!connectionRequest) {
    throw new Error("Invalid connection request");
  }
};

module.exports = {
  validationSignupData,
  validateProfileUpdateData,
  validateNewPassword,
  validateSendConnectionReq,
  validateReceiveConnectionReq,
};
