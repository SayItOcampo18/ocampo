import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Configuration
// Note: Railway MySQL usually uses port 3306
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection Route
app.get('/api/db-test', async (req, res) => {
  try {
    // MySQL query to get the current time
    const [rows] = await pool.query('SELECT NOW() as currentTime');
    res.json({ 
      success: true, 
      message: "Database connection successful!",
      time: rows[0].currentTime 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('Mental Health API is Live and Running!');
});

// IMPORTANT: Render defines the PORT for you
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server successfully started on port ${PORT}`);
});