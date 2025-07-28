const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
	  firstName, lastName, email, password, color, plate, vehicleType, capacity
}) => {
  if (!firstName || !email || !password || !color || !plate || !vehicleType || !capacity) {
	throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
	fullname: {
	  firstName,
	  lastName,
	},
	email,
	password,
	vehicle: {
	  color,
	  plate,
	  vehicleType,
	  capacity,
	},
  });

  return captain;
}