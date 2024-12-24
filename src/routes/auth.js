const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

const { validationSignupData } = require("../utils/validation");
const User = require("../models/user");

// Signup user with dynamic data
authRouter.post("/signup", async (req, res) => {
  try {
    validationSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    // const passwordHash = await bcrypt.hash(password, 10);
    const passwordHash = await user.createPasswordHash(newPassword);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.send("User saved successfully..!");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await user.validatePassword(password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("Error swhile login: " + err.message);
  }
});

authRouter.post("/logout", (_, res) => {
  res.clearCookie("token");
  //   res.cookie('token', null, {expires: new Date(Date.now())});
  res.send("Logout successful");
});

module.exports = authRouter;
