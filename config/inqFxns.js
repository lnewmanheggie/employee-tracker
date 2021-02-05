const { menu, addDepartment } = require('./questions');
const inquirer = require('inquirer');
const { getEmp } = require('../db/useSqlQueries');


const menuFunction = () => {
    inquirer
    .prompt(menu)
    .then(({menuAnswer}) => {
        switch (menuAnswer) {
            case 'Add a department, role or employee':
                addDept();
                break;
            case 'View departments, roles, or employees':
                // console.log('view');
                // internFxn();
                break;
            case 'Update information':
                // console.log('update');
                // createCards();
                break;
        }
        return;
    })
}

const addDept = () => {
    inquirer
    .prompt(addDepartment)
    .then(({department}) => {
        // call sqlQueries function
    })
}

module.exports = { menuFunction };