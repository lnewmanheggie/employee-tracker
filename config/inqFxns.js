const { menu, addDepartment, addRoleQstns, isManager, addEmpQstns, updateEmpRole } = require('./questions');
const inquirer = require('inquirer');
const DB = require("../db/sqlQueries");
const { updateEmployeeRole } = require('../db/sqlQueries');
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
            case 'Add an employee':
                addEmployee();
                break;
            case 'View departments':
                viewDepartments();
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
                break;
            case 'View employees by manager':
                viewEmpByManager();
                break;
            case 'Update employee roles':
                updateInfo();
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

const addEmployee = () => {
    DB.getPositions()
    .then(function (result) {
        if (result.length === 0) {
            console.log("\n****** You must add positions before you add employees ******\n")
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
            inquirer
            .prompt(isManager)
            .then(({isMan}) => {
                DB.getManagers()
                .then(function (result) {
                    const managerArr = [];
                    if (result.length === 0 && isMan === false) {
                        console.log("\n****** You must add managers before you add other employees ******\n")
                        addEmployee();
                    } else {
                        result.forEach(element => {
                            let item = {
                                name: element.manager_name,
                                value: element.id
                            }
                            managerArr.push(item);
                        });
                        let itemNull = {
                            name: "No manager",
                            value: null
                        }
                        managerArr.push(itemNull)
                        inquirer
                        .prompt(addEmpQstns(positionArr, managerArr))
                        .then(({employeeRole, firstName, lastName, employeeManager}) => {
                            DB.addEmployee(firstName, lastName, employeeRole, employeeManager, isMan)
                            .then(function () {
                                console.log("Employee added successfully.")
                                menuFunction();
                            })
                            .catch(function (err) {
                                console.log(err)
                            })
                        })
                    }
                })
            })
        }
    })
}

const viewDepartments = () => {
    DB.getDepartments()
    .then(function (result) {
        console.table(result)
        menuFunction();
    })
    .catch(function (err) {
        console.log(err)
    })
}

const viewRoles = () => {
    DB.getPositions()
    .then(function (result) {
        console.table(result)
        menuFunction();
    })
    .catch(function (err) {
        console.log(err)
    })
}

const viewEmployees = () =>{
    DB.getEmployees()
    .then(function (result) {
        console.table(result)
        menuFunction();
    })
    .catch(function (err) {
        console.log(err)
    })
}

const updateInfo = () => {
    DB.getPositions()
    .then(function (result) {
        const positionArr = [];
        result.forEach(element => {
            let item = {
                name: element.title,
                value: element.id
            }
            positionArr.push(item);
        });
        DB.getEmployees()
        .then(function (result) {
            const employeeArr = [];
            result.forEach(element => {
                let fullName = element.first_name + " " + element.last_name;
                let item = {
                    name: fullName,
                    value: element.id
                }
                employeeArr.push(item);
            });
            inquirer
            .prompt(updateEmpRole(employeeArr, positionArr))
            .then(({employeeName, newPosition}) => {
                DB.updateEmployeeRole(employeeName, newPosition)
                .then(function () {
                    console.log("Employee added successfully.")
                    menuFunction();
                })
                .catch(function (err) {
                    console.log(err)
                })
            })
        })
        .catch(function (err) {
            console.log(err)
        })
    })
}

const viewEmpByManager = () => {
    DB.getManagers()
    .then(function (result) {
        if (result.length === 0) {
            console.log("There are no managers.");
            menuFunction();
        } else {
            const managerArr = [];
            result.forEach(element => {
                let item = {
                    name: element.manager_name,
                    value: element.id
                }
                managerArr.push(item);
            });
            console.log(managerArr)
        }
    })
}

const exit = () => {
    DB.endConnection();
}




module.exports = { menuFunction };