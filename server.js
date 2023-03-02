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
        choices: ["viewAllEmployees", "viewAllDepartments", "viewAllRoles", "quit"]
      }
    ]).then((inquirerResponse) => {
      console.log("user selected" + inquirerResponse.openingMessage)
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