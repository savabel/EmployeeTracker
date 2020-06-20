-- Drops the empltracker if it exists currently --
DROP DATABASE IF EXISTS empltracker;
-- Creates the "empltracker" database --
CREATE DATABASE empltracker;

-- Makes it so all of the following code will affect empltracker --
USE empltracker;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NULL,
  -- was having problems with decimal then double, finally worked as int
  salary INT NULL,
  -- department_id references the id from department table
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  -- reference role_id to the id in role for what positiion the employee has
  role_id INT NOT NULL, 
  -- returns role id of the manager of the employee
  -- as another employee from the table
  manager_id INT NULL
);
