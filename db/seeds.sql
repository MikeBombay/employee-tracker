INSERT INTO department (department_name)
VALUES 
('IT'),
('Accounting'),
('Marketing'),
('HR');


INSERT INTO role
  (title, salary, department_id)
VALUES
('Marketing Manager',100000.0, 3),
('Salesperson', 800000.0, 3),
('Project Manager', 120000.0, 1),
('Engineer', 100000.0, 1),
('Clerk', 60000.0, 4),
('HR Manager', 100000.0, 4),
('Accountant', 85000.0, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ronald', 'Firbank', 1, NULL),
('Virginia', 'Woolf', 2, 1),
('Piers', 'Gaveston', 2, 1),
('Charles', 'LeRoi', 3, NULL),
('Katherine', 'Mansfield', 4, 4),
('Dora', 'Carrington', 5, 8),
('Edward', 'Bellamy', 5, 8),
('Montague', 'Summers', 6, NULL),
('Octavia', 'Butler', 7, NULL),
('Unica', 'Zurn', 7, NULL);