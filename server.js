const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer'); 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'shnood6176',
    database: 'employee_db'
  },

);

db.connect((err) => {
  if (err) throw err;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  welcome();
});

welcome = () => {
  console.log("***********************************")
  console.log("*  WELCOME TO EMPLOYEE TRACKER    *")
  console.log("***********************************")
  menu();
};

const menu = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices', 
      message: 'What would you like to do?',
      choices: ['View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Finished']
    }
  ])
  .then((answers) => {
    const { choices } = answers; 

    if (choices === "View all departments") {
      viewDepartments();
    }
    if (choices === "Finished") {
      console.log('Press Ctrl+C to exit application')
      db.end()
    }
  })
};

  const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.table(res);
      menu();
    });
  };