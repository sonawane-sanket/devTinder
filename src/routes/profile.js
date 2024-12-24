const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const {
  validateProfileUpdateData,
  validateNewPassword,
} = require("../utils/validation");

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    validateProfileUpdateData(req);

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {
  const { newPassword } = req.body;
  try {
    validateNewPassword(newPassword);
    const loggedInUser = req.user;

    const passwordHash = await loggedInUser.createPasswordHash(newPassword);

    loggedInUser.password = passwordHash;

    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, your password changed successfully`);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
