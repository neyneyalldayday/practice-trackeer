const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
const PORT = process.env.PORT || 3001;
const app = express();
require("console.table");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "FrankY242424!",
    database: "employees_db",
  },
  console.log(`Connected to employees_db database.`)
);

function workTime() {
  const logoText = logo({ name: "TEAM * OF * DOOFS \n :p" }).render();
  console.log(logoText);
  inquirer
    .prompt([
      {
        type: "list",
        name: "openingMessage",
        message: "What would you like to do?",
        choices: [
          "viewAllEmployees",
          "viewAllDepartments",
          "viewAllRoles",
          "addADepartment",
          "addARole",
          "addAEmployee",
          "updateEmployee",
          "quit",
        ],
      },
    ])
    .then((inquirerResponse) => {
      console.log("user selected:    " + inquirerResponse.openingMessage);
      let choices = inquirerResponse.openingMessage;
      switch (choices) {
        case "viewAllEmployees":
          viewAllEmployees();
          break;
        case "viewAllDepartments":
          viewAllDepartments();
          break;
        case "viewAllRoles":
          viewAllRoles();
          break;
        case "addADepartment":
          addADepartment();
          break;
        case "addARole":
          addARole();
          break;
        case "addAEmployee":
          addAEmployee();
          break;
        case "updateEmployee":
          updateEmployee();
          break;
        case "quit":
          quit();
          break;
        default:
          console.log("somethings wrong with you");
          break;
      }
    });
}

//database queries
function viewAllEmployees() {
  db.query("SELECT * FROM employee_list", function (err, results) {
    err ? console.log(err) : console.table(results), workTime();
  });
}

function viewAllDepartments() {
  db.query("SELECT * FROM department_list", function (err, results) {
    err ? console.log(err) : console.table(results), workTime();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role_list", function (err, results) {
    err ? console.log(err) : console.table(results), workTime();
  });
}

function addADepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addADepartment",
        message: "enter a department dood.",
      },
    ])
    .then((inquirerResponse) => {
      console.log("department added:  " + inquirerResponse.addADepartment);
      let departmentName = inquirerResponse.addADepartment;
      db.query(
        `INSERT INTO
                department_list 
                (dept_name) VALUES 
                ('${departmentName}')`,
        function (err, results) {
          err
            ? console.log(err)
            : console.table(`Added ${departmentName}!!!!`, results),
            workTime();
        }
      );
    });
}

function addARole() {
  db.query("SELECT * FROM department_list", function (err, results) {
    if (err) {
      console.log(err);
      return workTime();
    }
    const departmentChoices = results.map((department) => ({
      value: department.id,
      name: department.dept_name,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "addARole",
          message: "Enter a Role Dood.",
        },
        {
          type: "input",
          name: "salary",
          message: "how much this joker making?",
        },
        {
          type: "list",
          name: "deptId",
          message: "witch department does this belong to?",
          choices: departmentChoices,
        },
      ])
      .then((inquirerResponse) => {
        console.log("Role added:  " + inquirerResponse.addARole);
        let departmentId = inquirerResponse.deptId;
        let roleName = inquirerResponse.addARole;
        let roleSalary = inquirerResponse.salary;
        db.query(
          `INSERT INTO 
                 role_list
                 (title, salary, department_list_id) 
                 VALUES 
                 ('${roleName}', 
                '${roleSalary}',
                '${departmentId}')`,
          function (err, results) {
            err
              ? console.log(err)
              : console.table(`Added:  ${roleName}!!!!`, results),
              workTime();
          }
        );
      });
  });
}

function addAEmployee() {
  db.query("SELECT * FROM role_list", function (err, results) {
    if (err) {
      console.log(err);
      return workTime();
    }

    const roleChoices = results.map((role) => ({
      value: role.id,
      name: role.title,
    }));
    db.query("SELECT * FROM employee_list", function (err, employeeResults) {
      if (err) {
        console.log(err);
        return workTime();
      }

      const managerChoices = employeeResults.map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`,
      }));

      // Add an option for no manager
      managerChoices.push({ value: null, name: "No Manager" });
    ///inquirer
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter an employee name dood.",
        },
        {
          type: "input",
          name: "lastName",
          message: "enter an employee last name dood.",
        },
        {
          type: "list",
          name: "roleId",
          message: "wich role are we adding this guy to.",
          choices: roleChoices,
        },
        {
          type: "list",
          name: "managerId",
          message: "Select the employee's manager (or 'No Manager'):",
          choices: managerChoices,
        },
      ])
      .then((inquirerResponse) => {
        console.log("dood added: " + inquirerResponse.roleId);
        const roleId = inquirerResponse.roleId;
        const empName = inquirerResponse.firstName;
        const empLast = inquirerResponse.lastName;
        const managerId = inquirerResponse.managerId;
        db.query(
          `INSERT INTO employee_list 
               (first_name, last_name, 
                role_list_id, manager_id) VALUES 
                ('${empName}', 
                '${empLast}', 
                '${roleId}',
                '${managerId}')`,
          function (err, results) {
            err
              ? console.log(err)
              : console.table(`Added:  ${empName}!!!!`, results),
              workTime();
          }
        );
      });
  });
});
}
function updateEmployee() {
  // Display a prompt to get the employee's ID and the new role ID
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee you want to update:",
      },
      {
        type: "list",
        name: "roleId",
        message: "Select the new role for the employee:",
        choices: roleChoices,
      },
    ])
    .then((inquirerResponse) => {
      const { employeeId, roleId } = inquirerResponse;

      // Update the employee in the database
      db.query(
        `UPDATE employee_list 
                SET role_list_id = ? 
                WHERE id = ?`,
        [roleId, employeeId],
        function (err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log(
              `Employee with ID ${employeeId} has been updated with the new role ID ${roleId}.`
            );
          }
          workTime();
        }
      );
    });
}

function quit() {
  console.log("quitting you");
  process.exit();
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

workTime();
