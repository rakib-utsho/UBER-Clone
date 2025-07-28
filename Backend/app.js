// Importing environment variables
const dotenv = require("dotenv");
dotenv.config();

// Importing necessary modules
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");

// Importing routes
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");

// Connecting to the database
connectToDb();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setting up routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// User routes
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
