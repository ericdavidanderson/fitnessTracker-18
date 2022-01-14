const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
const logger = require("morgan");
const db = require("./models");

// setting PORT
const PORT = process.env.PORT || 3000;

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
app.use(apiRoutes);
app.use(htmlRoutes);

// mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const connection = mongoose.connection;

// if successful mongoose connection
connection.on("connected", () => {
  console.log("Mongoose connected successfully.");
});

// if unsuccessful mongoose connection
connection.on("error", (err) => {
  console.log("Mongoose connected error:" + err);
});

// listen on the PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
