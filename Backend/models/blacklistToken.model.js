const mongoose = require("mongoose");
const { create } = require("./user.model");

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

const tokenModel = mongoose.model("token", blacklistTokenSchema);
module.exports = tokenModel;
