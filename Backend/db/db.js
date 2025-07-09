const mongoose = require("mongoose");

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
