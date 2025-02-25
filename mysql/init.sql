CREATE DATABASE IF NOT EXISTS weightTracker;
USE weightTracker;

CREATE TABLE IF NOT EXISTS weights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    date DATE NOT NULL,
    UNIQUE KEY unique_weight_entry (username, date)
);

-- Inserting dummy data
INSERT INTO weights (username, weight, date) VALUES
('test', 65.0, '2023-01-01');