const express = require("express");
const connectDB = require("./config/database");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const { userAuth } = require("./middlewares/auth");
const { validationSignupData } = require("./utils/validation");
const { JWT_SECRET_KEY } = require("./utils/constants");

app.use(express.json());
app.use(cookieParser());

// Signup user with dynamic data
app.post("/signup", async (req, res) => {
  try {
    validationSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

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

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    } else {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("Error swhile login: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const { user } = req;
  res.send(`${user.firstName} is sending connection request `);
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
