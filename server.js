const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table")
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "FrankY242424!",
      database: "employees_db"
    },
    console.log(`Connected to employees_db database.`)
  );

  function workTime(){
    inquirer.prompt([
      {
        type: "list",
        name: "openingMessage",
        message:"What would you like to do?",
        choices: ["viewAllEmployees", "viewAllDepartments", "viewAllRoles", "addADepartment", "addARole", "addAEmployee", "quit"]
      }
    ]).then((inquirerResponse) => {
      console.log("user selected:    " + inquirerResponse.openingMessage)
      let choices = inquirerResponse.openingMessage
         switch (choices){
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
                case "quit": 
                quit();
                break;
                default: 
                console.log("somethings wrong with you");
                break;         
    }})
  }

//database queries
function viewAllEmployees(){
  db.query("SELECT * FROM employee_list", function (err, results) {
     (err) ? console.log(err) :  console.table(results), workTime();
  });
  
}

function viewAllDepartments(){
  db.query("SELECT * FROM department_list", function(err, results) {
    (err) ? console.log(err) : console.table(results), workTime();
  });
}

function viewAllRoles(){
  db.query("SELECT * FROM role_list", function(err, results) {
    (err) ? console.log(err) : console.table(results), workTime();
  })
}

function addADepartment() {
    inquirer.prompt([
      {
        type: "input",
        name: "addADepartment",
        message: "enter a department dood."
      }
    ]).then((inquirerResponse) => {
      console.log("department added:  " + inquirerResponse.addADepartment)
      let departmentName = inquirerResponse.addADepartment
      db.query(`INSERT INTO
                department_list 
                (dept_name) VALUES 
                ('${departmentName}')`, function(err, results){
        (err) ? console.log(err) : console.table(`Added ${departmentName}!!!!`, results), workTime()
      })
    }) 
}

function addARole() {  
  db.query("SELECT * FROM department_list", function(err, results) {
    if (err) {
      console.log(err);
      return workTime();
    }
    const departmentChoices = results.map(department => ({
      value: department.id,
      name: department.dept_name
    })); 
    inquirer.prompt([
      {
        type: "input",
        name: "addARole",
        message: "Enter a Role Dood."
      },
      {
        type: "input",
        name: "salary",
        message: "how much this joker making?"
      },
      {    
        type: "list",
        name: "deptId",
        message: "witch department does this belong to?",
        choices: departmentChoices        
      }
     
    ]).then((inquirerResponse)=> {
        console.log("Role added:  " + inquirerResponse.addARole)
        let departmentId = inquirerResponse.deptId;      
        let roleName = inquirerResponse.addARole;
        let roleSalary = inquirerResponse.salary;
        db.query(`INSERT INTO 
                 role_list
                 (title, salary, department_list_id) 
                 VALUES 
                 ('${roleName}', 
                '${roleSalary}',
                '${departmentId}')`, function(err, results){
          (err) ? console.log(err) : console.table(`Added:  ${roleName}!!!!`,results) , workTime()
        })
      })    
    });
  
}


function addAEmployee() {
  console.log("yo"), workTime()
}
function quit(){
  console.log("quitting you")
  process.exit()
}


app.use((req, res) => {
  res.status(404).end();
  });
  


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


  workTime();