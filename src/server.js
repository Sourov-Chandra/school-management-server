import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

// Basic Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "EduPulse API is running securely.",
  });
});

// Connect to MongoDB natively, THEN start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
