/******************************************************************************
***
* ITE5315 – Assignment 4
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Frin Sureshbhai Patel Student ID: N01680041 Date: Nov 19, 2025
*
*
******************************************************************************
**/


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/database");

const app = express();

// Built‑in Express body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// hbs setup
const exphbs = require("express-handlebars");

const path = require("path");

app.engine("hbs", exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials")
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


// MongoDB connection
mongoose.connect(config.url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

// Connect to Airbnb DB (Atlas)
// mongoose.connect(process.env.MONGO_URI_AIRBNB)
//   .then(() => console.log("Airbnb DB connected"))
//   .catch((err) => console.error("Airbnb DB connection error:", err));

// // Local DB for the question 1
// const employeeDB = mongoose.createConnection(process.env.MONGO_URI);      

// // atlas DB for the question 2
// const airbnbDB   = mongoose.createConnection(process.env.MONGO_URI_AIRBNB);

// employeeDB.on("connected", () => console.log("Local Employee DB connected"));
// airbnbDB.on("connected", () => console.log("Airbnb DB connected"));

const db = mongoose.connection;

// Event logs
db.on("connected", () => console.log("Mongoose connected"));
db.on("error", (err) => console.error("Mongoose error:", err));
db.on("disconnected", () => console.log("Mongoose disconnected"));

// Graceful shutdown
process.on("SIGINT", async () => {
  await db.close();
  console.log("Mongoose disconnected on app termination");
  process.exit(0);
});

// Load routes
const employeeRoutes = require("./routes/employees");
app.use("/api/employees", employeeRoutes);


// Assignment 2: using Airbnb dataset
const airbnbRoutes = require("./routes/airbnb");
app.use("/api/airbnb", airbnbRoutes);

const airbnbHbsRoutes = require("./routes/airbnb_hbs");
app.use("/airbnb_hbs", airbnbHbsRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.errors
    });
  }

  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});