const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');

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
  console.log('Connected to employee database')
);


  db.query(`SELECT * FROM employee`, (err, rows) => {
    console.log(rows);
  });

app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });