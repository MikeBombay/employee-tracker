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
    if (choices === "View all roles") {
      viewRoles();
    }
    if (choices === "View all employees") {
      viewEmployees();
    }
    if (choices === "Add a department") {
      addDepartment();
    }
    if (choices === "Add a role") {
      addRole();
    }
    if (choices === "Finished") {
      console.log('Press Ctrl+C to exit application')
      db.end()
    }
  })
};

const viewEmployees = () => {

  const sql = `SELECT employee.id,
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.department_name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;
db.query(sql, (err, res) => {
  if (err) {
    console.log(err);
  }
  console.table(res);
    menu();
  });
};

const viewRoles = () => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    menu();
  });
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

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDept',
      message: "Enter department name",
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (department_name)
                  VALUES (?)`;
      db.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Department Added'); 
        viewDepartments();
    });
  });
};

const addRole = () => {
  db.query(
    `SELECT department.id, department.department_name FROM department`,
    (err, res) => {
      if (err) {
        console.log(err);
      }
      const depChoices = res.map(({ id, department_name }) => ({
        name: department_name,
        value: id,
      }));

      inquirer.prompt([
          {
            type: "list",
            name: "department",
            message: "Select a department",
            choices: depChoices,
          },
          { type: "input", 
            name: "role", 
            message: "Enter title of new role" 
          },
          { type: "number", 
          name: "salary", 
          message: "Enter salary (example: 60000.00)" 
        },
        ])
        .then((answer) => {
          const inputs = [answer.department, answer.role, answer.salary];
          const sql =  `INSERT INTO role (department_id, title, salary) 
          Values (?, ?, ?)`
          db.query(sql, inputs, (err, result) => {
              if (err) throw err;
              console.log('Role Added'); 
              viewRoles();
            }
          );
        });
    }
  );
};