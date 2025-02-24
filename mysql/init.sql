CREATE DATABASE IF NOT EXISTS myappdb;
USE myappdb;
CREATE TABLE test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
INSERT INTO test_table (name) VALUES ('test');