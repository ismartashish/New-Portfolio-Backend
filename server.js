const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ================= DEBUG ================= */
console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

/* ================= APP ================= */
const app = express();

/* ================= CORS CONFIG (FINAL FIX) ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://ashishjha1-portfolio-git-main-ismartashishs-projects.vercel.app",
  "https://ashishjha1-portfolio.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-to-server
      if (!origin) return callback(null, true);

      // Allow exact known origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ✅ Allow ALL Vercel preview deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);

/* ✅ REQUIRED for preflight */
app.options("*", cors());

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
