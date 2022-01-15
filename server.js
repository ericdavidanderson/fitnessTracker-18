const express = require("express");
const mongoose = require("mongoose");
const apiRts = require("./routes/api-routes");
const htmlRts = require("./routes/html-routes");
const logger = require("morgan");
const db = require("./models");

// setting PORT
const PORT = process.env.PORT || 3023;

// creating instance of express
const app = express();

// logger middleware
app.use(logger("dev"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// reads public folder
app.use(express.static("public"));
// use routes
app.use(apiRts);
app.use(htmlRts);

// mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/FITNESSTRACKER-18",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const connection = mongoose.connection;

//  successful connection
connection.on("connected", () => {
  console.log("Mongoose connected.");
});

//unsuccessful connection
connection.on("error", (err) => {
  console.log("Mongoose connection error:" + err);
});

// listen to PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
