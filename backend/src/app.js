const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = process.env.PORT || 8000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "mysql", // This matches the service name in docker-compose.yml
  user: "root",
  password: "password",
  database: "myappdb",
  port: 3306,
});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM test_table", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
