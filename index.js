// packages needed for this application
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
const cTable = require("console.table");
var figlet = require("figlet");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "root",
    database: "companyEmployee_db",
  }
  // console.log(`Connected to the companyEmployee_db database.`)
);

const departments = ["Engineering", "Finance", "Sales", "Legal"];

const rolesTitle = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Software Engineer",
  "Account Manager",
  "Accountant",
  "Legal Team Lead",
  "Lawyer",
];

const employeesList = [];
db.query(
  "SELECT employees.first_name, employees.last_name FROM employees;",
  function (err, results) {
    results.forEach((element) => {
      employeesList.push(`${element.first_name} ${element.last_name}`);
    });
  }
);

const managers = ["None"];
db.query(
  "SELECT employees.first_name, employees.last_name FROM employees;",
  function (err, results) {
    results.forEach((element) => {
      managers.push(`${element.first_name} ${element.last_name}`);
    });
  }
);

figlet.text(
  "Employee Company",
  {
    font: "Merlin1",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100,
    whitespaceBreak: true,
  },
  function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  }
);
// Hardcoded query: DELETE FROM course_names WHERE id = 3;

//   db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// Array of questions for user input
const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "option",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Departments",
      "Add Department",
      "View All Roles",
      "Add Role",

      "Exit",
    ],
  },
];

const addDepartment = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "newDepartment",
  },
];

const addRole = [
  {
    type: "input",
    message: "What is the name of the role?",
    name: "roleName",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "salary",
  },
  {
    type: "list",
    message: "What department belongs to?",
    name: "department",
    choices: departments,
  },
];

const updateRole = [
  {
    type: "list",
    message: "Which employee's role do you want to update?",
    name: "employeeUpdate",
    choices: employeesList,
  },
  {
    type: "list",
    message: "Which role do you want to assign to the selected employee?",
    name: "roleUpdate",
    choices: rolesTitle,
  },
];
const addEmployee = [
  {
    type: "input",
    message: "First name:",
    name: "first_name",
  },
  {
    type: "input",
    message: "Last name:",
    name: "last_name",
  },
  {
    type: "list",
    message: "Role:",
    name: "employeeRole",
    choices: rolesTitle,
  },
  {
    type: "list",
    message: "Manager:",
    name: "employeeManager",
    choices: managers,
  },
];

// function that initializes the app
function init() {
  inquirer.prompt(questions).then(({ option }) => {
    switch (option) {
      case "View All Employees":
        // Query database
        db.query(
          'SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees AS manager ON manager.id = employees.manager_id;',
          function (err, results) {
            console.log("\n");
            console.table(results);
            console.log("\n");
          }
        );
        setTimeout(init, 500);

        break;
      case "View All Roles":
        db.query(
          "SELECT role.id, role.title, department.name AS department, role.salary from role LEFT JOIN department ON role.department_id = department.id",
          function (err, results) {
            console.log("\n");
            console.table(results);
            //console.log(results);
            console.log("\n");
            for (i = 0; i < results.length; i++) {
              if (rolesTitle[i] === results[i].title) {
              } else {
                rolesTitle.push(results[i].title);
              }
            }
          }
        );
        setTimeout(init, 500);
        break;
      case "View All Departments":
        db.query("SELECT * from department", function (err, results) {
          console.log("\n");
          console.table(results);
          console.log("\n");
        });
        setTimeout(init, 500);
        break;

      case "Add Department":
        inquirer.prompt(addDepartment).then((data) => {
          //   console.log(data.newDepartment);
          db.query(
            `INSERT INTO department (name) VALUES ("${data.newDepartment}");`
          );
          console.log("\n");
          console.log(
            "\x1b[35m%s\x1b[0m",
            "Added " + data.newDepartment + " to the database."
          );
          console.log("\n");
          //console.log(data);
          if (departments.includes(data.newDepartment)) {
          } else {
            departments.push(data.newDepartment);
          }

          setTimeout(init, 500);
        });

        break;
      case "Add Role":
        inquirer.prompt(addRole).then((data) => {
          //   console.log(data.newDepartment);
          //console.log(departments.indexOf(data.department));

          db.query(
            `INSERT INTO role (title, salary, department_id) VALUES ("${
              data.roleName
            }", ${data.salary}, ${departments.indexOf(data.department) + 1});`
          );
          console.log("\n");
          console.log(
            "\x1b[35m%s\x1b[0m",
            "Added " + data.roleName + " to the database."
          );
          console.log("\n");
          setTimeout(init, 500);
        });

        break;
      case "Update Employee Role":
        inquirer.prompt(updateRole).then((data) => {
          //   console.log(data.newDepartment);
          //console.log(departments.indexOf(data.department));

          db.query(
            `UPDATE employees SET role_id=${
              rolesTitle.indexOf(data.roleUpdate) + 1
            } WHERE employees.id=${
              employeesList.indexOf(data.employeeUpdate) + 1
            }`
          );
          console.log("\n");
          console.log("\x1b[35m%s\x1b[0m", "Updated employee's role.");
          console.log("\n");
          setTimeout(init, 500);
        });

        break;
      case "Add Employee":
        inquirer.prompt(addEmployee).then((data) => {
          //   console.log(data.newDepartment);
          //console.log(departments.indexOf(data.department));

          if (data.employeeManager === "None") {
            db.query(
              `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${
                data.first_name
              }", "${data.last_name}", ${
                rolesTitle.indexOf(data.employeeRole) + 1
              }, null);`
            );
          } else {
            db.query(
              `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${
                data.first_name
              }", "${data.last_name}", ${
                rolesTitle.indexOf(data.employeeRole) + 1
              }, ${managers.indexOf(data.employeeManager)});`
            );
          }
          employeesList.push(`${data.first_name} ${data.last_name}`);
          console.log("\n");
          console.log(
            "\x1b[35m%s\x1b[0m",
            `Added ${data.first_name} ${data.last_name} to the database.`
          );
          console.log("\n");
          setTimeout(init, 500);
        });

        break;

      //   case "Exit":

      //     break;

      default:
        console.log("\n");
        console.log("\x1b[41m%s\x1b[0m", "Good Bye!");
        console.log("\n");
        process.exit();
        break;
    }
  });
}

// Function call to initialize app
setTimeout(init, 500);
