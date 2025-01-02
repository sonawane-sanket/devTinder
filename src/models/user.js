const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const validator = require("validator");
const { JWT_SECRET_KEY } = require("../utils/constants");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 20 },
    lastName: { type: String, minLength: 4, maxLength: 20 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please provide strong password: " + value);
        }
      },
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      enums: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid geneder type",
      },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender can be male / female / others");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
      minLength: 20,
      maxLength: 500,
    },
    skills: { type: [String] },
  },
  { timestamps: true }
);

// Moving methods to userSchema so they can be reused easily
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordFromUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordFromUser, passwordHash);

  return isPasswordValid;
};

userSchema.methods.createPasswordHash = async function (plainTextPassword) {
  const passwordHash = await bcrypt.hash(plainTextPassword, 10);
  return passwordHash;
};

module.exports = mongoose.model("User", userSchema);
