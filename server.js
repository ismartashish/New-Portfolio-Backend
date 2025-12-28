const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ================= DEBUG ================= */
console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

/* ================= APP ================= */
const app = express();

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://ashishjha1-portfolio.vercel.app",
  "https://ashishjha1-portfolio-git-main-ismartashishs-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/contact", require("./routes/contact"));

/* ================= DB ================= */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.status(200).send("Portfolio Server Running");
});

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
