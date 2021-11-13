const express = require("express");
const questionsRouter = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const env = require("dotenv").config({ path: "./.env" });
const url = process.env.URL;
const notFound = { status: 404, message: "Not Found" };
const badRequest = (err) => ({ status: 400, message: err.message || "Bad Request"});
mongoose.connect(url);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    title: String,
    correctAnswer: String,
    answers: Array,
    difficulty: Number,
  }),
  "questions"
);

questionsRouter.get("/list", async (req, res, next) => {
  try {
    const response = await Question.find({});
    if (!response) {
      throw notFound;
    }
    res.send(response);
  } catch (err) {
    if (!err.status) {
      err = badRequest(err);
    }
    next(err);
  }
});

questionsRouter.get(
  "/read/by/difficulty/:difficulty",
  async (req, res, next) => {
    try {
      const difficulty = req.params.difficulty
      if (difficulty.typeOf !== Number) {
        throw "error"
      }
      const response = await Question.find({ difficuty: { $gte: difficulty } });
      res.send(response);
    } catch (err) {
      if (!err.status) {
        err = badRequest(err);
      }
      next(err);
    }
  }
);

questionsRouter.put("/update", async (req, res, next) => {
  const newQuestion = req.body.question;
  try {
    const response = await Question.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { title: newQuestion } },
      { new: true }
    );
    if (!response) {
      throw notFound;
    }
    res.send(response);
  } catch (err) {
    if (!err.status) {
      err = badRequest(err);
    }
    next(err);
  }
});
questionsRouter.post("/create", async (req, res, next) => {
  const question = req.body;
  try {
    const response = await Question.create(question);
    if (!response) {
      throw notFound;
    }
    res.send({ status: "inserted succesfully", response });
  } catch (err) {
    if (!err.status) {
      err = badRequest(err);
    }
    next(err);
  }
});
questionsRouter.delete("/remove/:id", async (req, res, next) => {
  try {
    const response = await Question.deleteOne({ _id: req.params.id });
    if (response.deletedCount === 0) {
      throw notFound;
    }
    res.send("deleted succesfully");
  } catch (err) {
    if (!err.status) {
      err = badRequest(err);
    }
    next(err);
  }
});

module.exports = questionsRouter;
