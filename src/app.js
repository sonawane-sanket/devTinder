const express = require("express");
const connectDB = require("./config/database");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const { validationSignupData } = require("./utils/validation");
const { PRIVATE_KEY } = require("./utils/constants");

app.use(express.json());
app.use(cookieParser());

// Signup user with dynamic data
app.post("/signup", async (req, res) => {
  try {
    validationSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email: ", email);

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    } else {
      const token = jwt.sign({ _id: user._id }, PRIVATE_KEY);
      res.cookie("token", token);
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("Error swhile login: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  const cookies = req.cookies;

  const { token } = cookies;

  if (!token) {
    throw new Error("Please login again");
  }

  const decodedMessage = await jwt.verify(token, PRIVATE_KEY);

  const { _id } = decodedMessage;

  const user = await User.findById(_id);

  if (!user) {
    throw new Error("User not found");
  }

  res.send(user);
});

// Get a user by email
app.get("/user", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user.length === 0) {
      res.status(404).send("Users not found..");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Feed API - GET /feed - get all users  from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404).send("Users not found..");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Delete a User from database
app.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User is deleted");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
  try {
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("User is updated");
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection successful...");
    app.listen(7777, () => {
      console.log("Server is runnning on port 7777...");
    });
  })
  .catch((err) => {
    console.error(err);
  });
