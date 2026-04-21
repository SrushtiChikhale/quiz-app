const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ================= MONGODB =================
// Only connect DB if not testing

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(
    "mongodb+srv://quizuser:Srushti%40123@cluster0.wnrxnxq.mongodb.net/quizdb?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));
}

// ================= MODELS =================
const User = mongoose.model("User", {
  username: String,
  password: String,
});

const Result = mongoose.model("Result", {
  username: String,
  subject: String,
  correct: Number,
  wrong: Number,
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

// ================= AUTH =================
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.json({ msg: "User exists" });

  await User.create({ username, password });

  res.json({ msg: "Signup success" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.json({ msg: "Invalid" });

  res.json({ msg: "Login success" });
});

// ================= QUESTIONS =================
const quizzes = {
  gk: [
    { a: "Delhi", d: "easy" },
    { a: "Pacific", d: "easy" },
    { a: "Everest", d: "medium" },
    { a: "Nile", d: "medium" },
    { a: "Asia", d: "easy" },
    { a: "India", d: "easy" },
    { a: "1947", d: "medium" },
    { a: "Earth", d: "easy" },
    { a: "Japan", d: "medium" },
    { a: "O2", d: "hard" }
  ],

  tech: [
    { a: "Language", d: "easy" },
    { a: "Hyper Text Markup Language", d: "easy" },
    { a: "CSS", d: "easy" },
    { a: "Node.js", d: "medium" },
    { a: "Database", d: "medium" },
    { a: "API", d: "medium" },
    { a: "Docker", d: "hard" },
    { a: "Git", d: "easy" },
    { a: "Cloud", d: "medium" },
    { a: "CI/CD", d: "hard" }
  ],

  science: [
    { a: "Water", d: "easy" },
    { a: "Star", d: "easy" },
    { a: "Gravity", d: "medium" },
    { a: "O2", d: "easy" },
    { a: "Photosynthesis", d: "medium" },
    { a: "Atom", d: "easy" },
    { a: "Electron", d: "medium" },
    { a: "Newton", d: "easy" },
    { a: "Joule", d: "hard" },
    { a: "Tesla", d: "hard" }
  ],

  math: [
    { a: "4", d: "easy" },
    { a: "9", d: "easy" },
    { a: "16", d: "easy" },
    { a: "25", d: "easy" },
    { a: "36", d: "medium" },
    { a: "49", d: "medium" },
    { a: "64", d: "medium" },
    { a: "81", d: "medium" },
    { a: "100", d: "hard" },
    { a: "121", d: "hard" }
  ]
};

// ================= SUBMIT =================
app.post("/submit", async (req, res) => {
  const { responses, subject, username } = req.body;

  const qs = quizzes[subject];

  if (!qs || !responses || responses.length !== qs.length) {
    return res.json({ msg: "Invalid data" });
  }

  let correct = 0, wrong = 0, score = 0;

  qs.forEach((q, i) => {
    if (responses[i] === q.a) {
      correct++;

      if (q.d === "easy") score += 1;
      else if (q.d === "medium") score += 2;
      else if (q.d === "hard") score += 3;

    } else {
      wrong++;
    }
  });

  if (username) {
    await Result.create({ username, subject, correct, wrong, score });
  }

  res.json({ correct, wrong, score });
});

// ================= HISTORY (NEW FEATURE) =================
app.get("/results/:username", async (req, res) => {
  try {
    const data = await Result.find({ username: req.params.username });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching results" });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

// Only start server if NOT testing
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`);
  });
}

// Export app for testing
module.exports = app;