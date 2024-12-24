const validator = require("validator");

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

module.exports = {
  validationSignupData,
  validateProfileUpdateData,
  validateNewPassword,
};
