const mongoose = require("mongoose");

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
      minLength: 4,
      maxLength: 20,
    },
    password: { type: String },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
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
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
      minLength: 50,
      maxLength: 500,
    },
    skills: { type: [String] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
