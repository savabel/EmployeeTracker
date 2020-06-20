let mysql = require("mysql2");
let inquirer = require("inquirer");
let logoCli = require('cli-logo'),
    version = 'v' + require('./package.json').version,
    description = require('./package.json').description,
    name = require('./package.json').name;
    // logoConfig = {"name": "CoolName","description": description,"version": version};
    logoCli.print({"name": name,"description": description,"version": version});

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Passw@rd",
  database: "empltracker"
  
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
 
  //call other functions here to get what to do
  start();
  
});

//function immediatly called on start
//asks user what they want to do
function start() {
    inquirer.prompt({
        name: "start",
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View Employees by Manager",
            "Delete Department",
            "Delete Role",
            "Delete Employee",
            "View Budget of Department"
        ]
    }).then(function(answer) {
        if (answer.start === "View All Departments") {
            viewDepartment();
        } else if (answer.start === "View All Roles") {
            viewRole();
        } else if (answer.start === "View All Employees") {
            viewEmployee();
        } else if (answer.start === "Add Department") {
            addDepartment();
        } else if (answer.start === "Add Role") {
            addRole();
        } else if (answer.start === "Add Employee") {
            addEmployee();
        } else if (answer.start === "Update Employee Role") {
            employeeRole();
        } else if (answer.start === "Update Employee Manager") {
            employeeManager();
        } else if (answer.start === "View Employees by Manager") {
            underManager();
        } else if (answer.start === "Delete Department") {
            //call function for that here
            console.log("Function not available yet, sorry!");
        } else if (answer.start === "Delete Role") {
            //call function for that here
            console.log("Function not available yet, sorry!");
        } else if (answer.start === "Delete Employee") {
            //call function for that here
            console.log("Function not available yet, sorry!");
        } else if (answer.start === "View Budget of Department") {
            //call function for that here
            console.log("Function not available yet, sorry!");
        } else {
            console.log("Something went wrong or nothing selected");
            connection.end();
        }
    });
}

//make a function for each of the choices at the start
//that switches back to start at the end of them

//function to view all departments
function viewDepartment() {
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("----------------------");
        start();
    });
}

//function to view all roles
function viewRole() {
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("----------------------");
        start();
    });
}

//function to view all employees
function viewEmployee() {
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        console.table(res);
        console.log("----------------------");
        start();
    });
}

//function to add new department
function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of the new department?"
    }).then(function(answer) {
        connection.query("INSERT INTO department SET ?",
            {name: answer.name},
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("----------------------");
                start();
            });
    });
}

//function to add new Role
function addRole() {
    //view department to help user with input id
    //the viewDepartment function isn't called because
    //it calls the start function at the end of it
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
    });

    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "What is the title of the new role?"},
        {name: "salary",
        type: "input",
        message: "What is the role salary?"},
        {name: "department_id",
        type: "input",
        message: "What is the id of the department for this role?"
    }]).then(function(answer) {
        connection.query("INSERT INTO role SET ?",
            {title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
            },
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("----------------------");
                start();
            });
    });
}

//function to add new Employee
function addEmployee() {
    //view role to help user during input
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
    });

    inquirer.prompt([{
        name: "first_name",
        type: "input",
        message: "What is the new employee first name?"},
        {name: "last_name",
        type: "input",
        message: "What is the new employee last name?"},
        {name: "role_id",
        type: "input",
        message: "What is the id of the role the new employee will have?"},
        {name: "manager_id",
        type: "input",
        message: "What is the employee id of the new employee's manager?"
    }]).then(function(answer) {
        connection.query("INSERT INTO employee SET ?",
            {first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
            },
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("----------------------");
                start();
            })
    });
}

//function to update employee role
function employeeRole() {
    //view role to help user during input
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        console.table(res);
    });
    //show current employees to help user choose input
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        console.table(res);
    });

    inquirer.prompt([{
        name: "employee_id",
        type: "input",
        message: "What is the id of the employee in question?"},
        {name: "role_id",
        type: "input",
        message: "What is the id of the new role for the employee?"
    }]).then(function(answer) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
            [answer.role_id, answer.employee_id],
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("----------------------");
                start();
            }
        )
    });
}

//function to update employee Manager
function employeeManager() {
    //show current employees to help user choose input
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        console.table(res);
    });

    inquirer.prompt([{
        name: "employee_id",
        type: "input",
        message: "What is the id of the employee in question?"},
        {name: "manager_id",
        type: "input",
        message: "What is the id of the new manager for the employee?"
    }]).then(function(answer) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
            [answer.manager_id, answer.employee_id],
            function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("----------------------");
                start();
            }
        )
    });
}