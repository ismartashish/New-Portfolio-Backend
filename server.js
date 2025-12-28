const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const app = express();

/* ================= CORS CONFIG ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://ashishjha1-portfolio.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
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
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Portfolio Server Running");
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
