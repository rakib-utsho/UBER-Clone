// Backend/db/db.js
// This file is responsible for connecting to the MongoDB database using Mongoose
const mongoose = require("mongoose");

// Function to connect to the database
// It uses the connection string from environment variables
function connectToDb() {
  //  console.log("Connecting to DB...");
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => console.log(err));
}

module.exports = connectToDb;
