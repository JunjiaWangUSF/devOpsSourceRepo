import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();

const port = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

// Add middleware for parsing JSON
app.use(express.json());

// Setup database connection from environment variables
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST, // Environment variable for database host
  user: process.env.DB_USER, // Environment variable for database user
  password: process.env.DB_PASSWORD, // Environment variable for database password
  database: process.env.DB_DATABASE, // Environment variable for database name
  port: process.env.DB_PORT || 3306, // Default to 3306 if not specified
});

app.post("/weight", (req, res) => {
  const { username, weight, date } = req.body;
  console.log(username, weight, date);
  try {
    const sql = `INSERT INTO weights (username, weight, date) VALUES (?, ?, ?)`;
    pool.query(sql, [username, weight, date], (err, result) => {
      if (err) {
        res.status(500).send("Error adding weight entry");
        return;
      }
      res.send("Weight added successfully!");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding weight entry");
  }
});

app.get("/weights/:username", (req, res) => {
  const username = decodeURIComponent(req.params.username);
  const sql = `SELECT * FROM weights WHERE username = ? ORDER BY date ASC`;
  pool.query(sql, [username], (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving weights");
      return;
    }
    res.json(results);
  });
});

app.get("/weights/test", (req, res) => {
  const sql = `SELECT * FROM weights`;
  pool.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving weights");
      return;
    }
    res.json(results);
  });
});

// Check if the module is being required elsewhere or run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
