
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const questions = [
  { id: 1, answer: "A" },
  { id: 2, answer: "B" }
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
  app.listen(3000, () => console.log("Server running"));
}

module.exports = app;