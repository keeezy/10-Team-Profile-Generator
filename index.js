const fs = require("fs");
const inquirer = require("inquirer");
const createTeam = require("./dist/createTeam.js");
const Manager = require("./lib/Manager.js");
const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");





function init() {
    createManager();
}

// Empty array for all employees
const employeeArr = []

// Create Manager
function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "what is the manager's name?",
        },
        {
            type: "input",
            name: "managerId",
            message: "what is the manager's Id?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "what is the manager's email?",
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "what is the manager's office number?",
        },
    ]).then((answers) => {
        const manager = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.managerOfficeNumber
        );
        employeeArr.push(manager)
        addMoreEmployees()
    });
}

// Choice to add more employees
function addMoreEmployees() {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",
            message: "Did you want to add more employees?",
            choices: ["New Engineer", "New Intern", "Exit"]
        }
    ]).then((answers) => {
        switch (answers.choices) {
            case "New Engineer":
                addEngineer();
                break;
            case "New Intern":
                addIntern();
                break;
            case "No additional employees":
                generateTeam();
                break;
        }
    })
}

// Create Engineer
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "WHat is the engineer's name? ",
        },
        {
            type: "input",
            name: "engineerId",
            message: "what is the engineer's Id?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "what is the engineer's email?",
        },
        {
            type: "input",
            name: "engineerGitHub",
            message: "what is the engineer's Github?",
        },
    ]).then((answers) => {
        const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGithub,
            );

        employeeArr.push(engineer);
        addMoreEmployees();
    })
}

// Create Intern
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "WHat is the intern's name? ",
        },
        {
            type: "input",
            name: "internId",
            message: "what is the intern's Id?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "what is the intern's email?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "what is the intern's School name?",
        },
    ]).then((answers) => {
        const intern = new Intern (
            answers.internName,
            answers.internId,
            answers.internEmail,
            answers.internSchool
            );

        employeeArr.push(intern);
        addMoreEmployees();
    })
}

function generateTeam() {
    createTeam(employeeArr);
}

function createCard(employee) {
    return `
        <div class= "card"> 
            <h3>${employee.name}</h3>
            <h4>${employee.role}</h4>
            
            <p>${employee.id}</p>
            <p>${employee.email}</p>
            <p>${employee.officeNumber || employee.GitHub || employee.school}</p>
        </div>
    `
}

// Creates html doc
// function createHtml() {
//     return `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
    
// </body>
//     ${employeeArr.map(createCard)}
// </html>
//     `;
// }
// fs.writeFileSynce("/dist/index.html", createHtml())

init();