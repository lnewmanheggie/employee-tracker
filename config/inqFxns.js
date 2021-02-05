const { menu, addDepartment } = require('./questions');
const inquirer = require('inquirer');
const DB = require("../db/sqlQueries");
// const { getEmp } = require('../db/useSqlQueries');


const menuFunction = () => {
    inquirer
    .prompt(menu)
    .then(({menuAnswer}) => {
        switch (menuAnswer) {
            case 'Add a department':
                addDept();
                break;
            case 'Add a roll':

            case 'Add an employee':

            case 'View departments':
            
            case 'View roles':
            
            case 'View employees':

                break;

            case 'Update information':
                break;
            case 'Exit':
                break;
        }
        
    })
}

const addDept = () => {
    inquirer
    .prompt(addDepartment)
    .then(({department}) => {
        DB.addDepartment(department)
        .then(function (result) {
            console.log("Department added successfully.")
            menuFunction();
        })
        .catch(function (err) {
            console.log(err)
        })
    })
}

const addRoll = () => {

}

const addEmployee = () => {

}

const viewDepartments = () => {

}

const viewRoles = () => {

}

const viewEmployees = () =>{

}

const updateInfo = () => {

}

const exit = () => {
    connection.end();
}



module.exports = { menuFunction };