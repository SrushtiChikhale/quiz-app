
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Quiz API is running ");
});

const questions = [
  { id: 1, answer: "B" }, // Delhi
  { id: 2, answer: "B" }, // JavaScript
  { id: 3, answer: "B" }, // CPU
  { id: 4, answer: "C" }, // MySQL
  { id: 5, answer: "C" }  // Sun Microsystems
];

app.post("/submit", (req, res) => {
  const { responses } = req.body;
  let score = 0;

  questions.forEach((q, i) => {
    if (responses[i] === q.answer) score++;
  });

  res.json({ score });
});

if (require.main === module) {
  app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
  });
}

module.exports = app;