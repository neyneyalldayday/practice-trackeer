const express = require("express");
const inquirer = require("inquirer");
const hide = require("hide-secrets");
const mysql = require("mysql2");
// const routes = require("./routes/routes");
// const { query } = require("express");
// const sequelize = require("./public/config/connection");

// const Employee = require("./public/models/Employee");

// const PORT = 3001;
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(routes);

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "FrankY242424!",
      database: "employees_db"
    },
    console.log(`Connected to employees_db database.`)
  );

//database queries
db.query ("SELECT * FROM employee_list", function (err, results) {
    console.log(err,results);
  });

db.query("SELECT * FROM department_list", function(err, results) {
  console.log(results);
});

db.query("SELECT * FROM role_list", function(err, results) {
  console.log(results);
})

app.use((req, res) => {
  res.status(404).end();
  });
  
// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });