const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler.js");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const url = process.env.URL

mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json());
app.use("/", express.static(path.resolve(`./dist`)));

app.use("/", errorHandler);

module.exports = app;
