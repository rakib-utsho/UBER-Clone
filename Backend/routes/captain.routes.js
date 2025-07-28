// Backend/routes/captain.routes.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

// Captain routes with validation
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isIn(["red", "blue", "green", "yellow", "black", "white"])
      .withMessage("Invalid vehicle color"),
    body("vehicle.vehicleType")
      .isIn(["car", "cng", "motorcycle"])
      .withMessage("Invalid vehicle type"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
  ],
  captainController.registerCaptain
);

module.exports = router;
