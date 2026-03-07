import express from "express";
import dotenv from "dotenv";
import { db } from "./db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");
    res.json({ status: "DB Connected", rows });
  } catch (error) {
    res.status(500).json({
      error: "Database connection failed",
      details: error.message
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
});