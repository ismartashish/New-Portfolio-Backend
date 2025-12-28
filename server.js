const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ================= DEBUG (SAFE) ================= */
console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

/* ================= APP ================= */
const app = express();

/* ================= CORS CONFIG (IMPORTANT) ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://ashishjha1-portfolio.vercel.app",
  "https://ashishjha1-portfolio-git-main-ismartashishs-projects.vercel.app/"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
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

/* ================= DATABASE ================= */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).send("Portfolio Server Running");
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
