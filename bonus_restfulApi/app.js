const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const morganHandler = require("./handlers/morganHandler");
const errorHandler = require("./handlers/errorHandler.js");
const questionsRouter = require("./routes/questionsRouter");

app.use(cors());
app.use(
  morganHandler,
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());
app.use("/", questionsRouter);

app.use("/", errorHandler);

module.exports = app;
