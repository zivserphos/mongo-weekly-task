const express = require("express")
const questionsRouter = express.Router();
const path = require("path")
const mongoose = require("mongoose");
const env = require("dotenv").config();
const url = process.env.URL
mongoose.connect(url);

const db = mongoose.connection;
//questions = db.questions;
async function x() 
{
  console.log(db.db)
}
x()

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// questionsRouter.get("/list" , async (req ,res , next) => {
//     try {
//         db.q=
//     }
//     catch(err) {

//     }
// })
// questionsRouter.put("/" , (req ,res , next))
// questionsRouter.post("/" , (req ,res , next))
// questionsRouter.delete("/" , (req ,res , next))

module.exports = questionsRouter;