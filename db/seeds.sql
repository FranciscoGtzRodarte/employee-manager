INSERT INTO department (name)
VALUES (Engineering), 
       (Finance),
       (Sales),
       (Legal); 
        

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 3),
       ("Salesperson", 80000, 3),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 150000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 160000, 2),
       ("Legal Team Lead", 190000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Doe", 1, null),
       ("Kevin", "Doe", 2, 1),
       ("Kevin", "Doe", 3, null),
       ("Kevin", "Doe", 4, 3),
       ("Kevin", "Doe", 5, null),
       ("Kevin", "Doe", 6, 4);
