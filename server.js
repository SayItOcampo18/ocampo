import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/mood", async (req, res) => {
  try {
    const { full_name, mood_text } = req.body;

    if (!full_name || !mood_text) {
      return res.status(400).json({ error: "Name and mood are required" });
    }

    const [userResult] = await db.query(
      "INSERT INTO users (full_name) VALUES (?)",
      [full_name]
    );

    const userId = userResult.insertId;

    const [moodResult] = await db.query(
      "INSERT INTO mood_entries (user_id, mood_text) VALUES (?, ?)",
      [userId, mood_text]
    );

    const moodEntryId = moodResult.insertId;

    const aiMessage =
      "It is okay to feel how you feel. Take one small step at a time.";

    await db.query(
      "INSERT INTO ai_responses (mood_entry_id, ai_message) VALUES (?, ?)",
      [moodEntryId, aiMessage]
    );

    res.json({
      success: true,
      ai_message: aiMessage
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to save mood",
      details: error.message
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
});