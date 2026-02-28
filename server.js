import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg'; // Assuming PostgreSQL based on your variable names

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false } // Required for Render/managed DBs
});

// Test Database Connection Route
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
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