// Backend/models/blacklistToken.model.js
const mongoose = require("mongoose");


// Blacklist token schema definition
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d", // Token will expire after 1 day
  },
});

// Create a model for the blacklist token
const tokenModel = mongoose.model("token", blacklistTokenSchema);
// Export the model
module.exports = tokenModel;
