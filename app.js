const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const errorHandler = require("./handlers/errorHandler.js");
const questionsRouter = require("./routes/questionsRouter")


app.use(cors());
app.use(express.json());
app.use("/", express.static(path.resolve(`./dist`)));

app.use("/", errorHandler);

module.exports = app;
