DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;



CREATE TABLE department_list (
    id INT  UNSIGNED  AUTO_INCREMENT PRIMARY KEY,    
     dept_name VARCHAR(30)  NOT NULL
    
);
CREATE TABLE role_list (
    id INT  UNSIGNED AUTO_INCREMENT PRIMARY KEY,     
     title VARCHAR(30) UNIQUE NOT NULL ,
     salary DECIMAL UNSIGNED NOT NULL,
    department_list_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_list_id) REFERENCES department_list(id) ON DELETE CASCADE
  
);
CREATE TABLE employee_list (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_list_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_list_id) REFERENCES role_list(id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee_list(id) ON DELETE SET NULL
);