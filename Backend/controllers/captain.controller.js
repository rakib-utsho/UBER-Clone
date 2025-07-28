// This file contains the controller for handling captain-related operations
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

// Function to handle captain registration
module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  // Check if the captain already exists
  const isCaptainExists = await captainModel.findOne({ email})

  if (isCaptainExists) {
	return res.status(400).json({ message: "Captain already exists" });
  }

  // Hash the password before saving
  const hashPassword = await captainModel.hashPassword(password);

  // Create a new captain using the service
  const captain = await captainService.createCaptain({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    vehicleType: vehicle.vehicleType,
    capacity: vehicle.capacity,
  });

  const token = captain.generateAuthToken();

  res.status(200).json({ token, captain });
};
