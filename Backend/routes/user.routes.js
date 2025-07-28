// Backend/routes/user.routes.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// User routes with validation
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body
      .apply("password")
      .isLength({ min: 6 })
      .withMessage("Password is incorrect"),
  ],
  userController.loginUser
);

// Route to get user profile
router.get("/profile",authMiddleware.authUser, userController.getUserProfile);

// Route to update user profile
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
