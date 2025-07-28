// Backend/controllers/user.controller.js
// This file contains the user-related controller functions for handling user registration, login, profile retrieval,
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenSchema = require("../models/blacklistToken.model");

// Function to handle user registration
// It validates the input, hashes the password, creates a new user, and generates a JWT
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // console.log(req.body);

  const { fullname, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();

  res.status(200).json({ token, user });
};

// Function to handle user login
// It validates the user credentials and generates a JWT token if successful
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

// Function to retrieve the user profile
// It checks if the user is authenticated and returns the user information
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

// Function to handle user logout
// It clears the JWT token from cookies and blacklists it
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenSchema.create({ token });
  
  res.status(200).json({ message: "Logged out successfully" });
};
