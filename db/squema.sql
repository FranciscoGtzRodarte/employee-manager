-- `department`
--     * `id`: `INT PRIMARY KEY`
--     * `name`: `VARCHAR(30)` to hold department name

-- * `role`
--     * `id`: `INT PRIMARY KEY`
--     * `title`: `VARCHAR(30)` to hold role title
--     * `salary`: `DECIMAL` to hold role salary
--     * `department_id`: `INT` to hold reference to department role belongs to

-- * `employee`
--     * `id`: `INT PRIMARY KEY`
--     * `first_name`: `VARCHAR(30)` to hold employee first name
--     * `last_name`: `VARCHAR(30)` to hold employee last name
--     * `role_id`: `INT` to hold reference to employee role
--     * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

DROP DATABASE IF EXISTS companyEmployee_db;
CREATE DATABASE companyEmployee_db;

USE companyEmployee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT
  manager_id INT
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id)
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
  
  ON DELETE SET NULL
);

