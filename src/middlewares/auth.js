const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../utils/constants");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("Admin is not authorised");
  } else {
    next();
  }
};

const userAuthOld = (req, res, next) => {
  const token = "xyz22";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    res.status(401).send("User is not authorised");
  } else {
    next();
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid, please login again");
    }

    const decodedObj = await jwt.verify(token, JWT_SECRET_KEY);

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
