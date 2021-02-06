const { menu, addDepartment, addRoleQstns } = require('./questions');
const inquirer = require('inquirer');
const DB = require("../db/sqlQueries");
// const { addPosition } = require('../db/sqlQueries');
// const { getEmp } = require('../db/useSqlQueries');

const menuFunction = () => {
    inquirer
    .prompt(menu)
    .then(({menuAnswer}) => {
        switch (menuAnswer) {
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            // case 'Add a manager':
            //     break;
            case 'Add an employee':
                addEmployee();

            case 'View departments':
            
            case 'View roles':
            
            case 'View employees':

                break;

            case 'Update information':
                break;
            case 'Exit':
                exit();
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

const addRole = () => {
    DB.getDepartments()
    .then(function (result) {
        if (result.length === 0) {
            console.log("\n****** You must add departments before you add roles ******\n")
            menuFunction();
        } else {
            const deptArr = [];
            result.forEach(element => {
                let item = {
                    name: element.name,
                    value: element.id
                }
                deptArr.push(item);
            });
            inquirer
            .prompt(addRoleQstns(deptArr))
            .then(({roleDepartment, role, salary}) => {
                DB.addPosition(role, salary, roleDepartment)
                .then(function (result) {
                    console.log("Department added successfully.")
                    menuFunction();
                })
                .catch(function (err) {
                    console.log(err)
                })
            })
        }
    })
    .catch(function (err) {
        console.log(err)
    })
}

// const addManager = () => {
//     DB.getPositions()
//     .then(function (result) {
//         if (result.length === 0) {
//             console.log("\n****** You must add managers before you add other employees ******\n")
//             menuFunction();
//         } else {
//             const positionArr = [];
//             result.forEach(element => {
//                 let item = {
//                     name: element.title,
//                     value: element.id
//                 }
//                 positionArr.push(item);
//             });
//             console.log(positionArr)
//         }
//     })
// }


const addEmployee = () => {
    DB.getPositions()
    .then(function (result) {
        if (result.length === 0) {
            console.log("\n****** You must add managers before you add other employees ******\n")
            menuFunction();
        } else {
            const positionArr = [];
            result.forEach(element => {
                let item = {
                    name: element.title,
                    value: element.id
                }
                positionArr.push(item);
            });
            console.log(positionArr)
        }
    })
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