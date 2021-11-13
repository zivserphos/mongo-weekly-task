const express = require("express");
const questionsRouter = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const { response } = require("express");
// const Question = require("../mongo/question")
const env = require("dotenv").config();
const url = process.env.URL;
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
    console.log(db.Question);
    return res.send(await Question.find({}));
  } catch (err) {
    next({ status: 500, message: { error: "could not succed" } });
  }
});

questionsRouter.get(
  "/read/by/difficulty/:difficulty",
  async (req, res, next) => {
    const response = await Question.find({ difficulty: { $gte: 5 } });
    console.log(response);
    res.send(response);
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
      throw { status: 403, message: "Bad request" };
    }
    res.send({ response });
  } catch (err) {
    next(err);
  }
});
questionsRouter.post("/create", async (req, res, next) => {
  const question = req.body;
  try {
    const response = await Question.create(question);
    if (!response) {
      throw { status: 403, message: "Bad request" };
    }
    res.send({ status: "inserted succesfully", response });
  } catch (err) {
    next(err);
  }
});
questionsRouter.delete("/remove/:id", async (req, res, next) => {
  try {
    const response = await Question.deleteOne({ _id: req.params.id });
    if (response.deletedCount === 0) {
      throw { status: 404, message: "Not found" };
    }
    res.send("deleted succesfully");
  } catch (err) {
    if (!err.status) {
      err = { status: 403, message: err.message };
    }
    next(err);
  }
});

module.exports = questionsRouter;
