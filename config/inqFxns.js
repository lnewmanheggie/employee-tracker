const {
    menu,
    addDepartment,
    addRoleQstns,
    isManager,
    addEmpQstns,
    updateEmpRole,
    viewEmployeesByMan,
    updateEmployeeManQstns,
    deleteDeptQstns,
    deletePositionQstns,
    deleteEmpQstns
} = require('./questions');
const inquirer = require('inquirer');
const DB = require("../db/sqlQueries");

const menuFunction = () => {
    inquirer
        .prompt(menu)
        .then(({ menuAnswer }) => {
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
                case 'Update employee managers':
                    updateManagers();
                    break;
                case 'Delete department':
                    deleteDepartment();
                    break;
                case 'Delete role':
                    deleteRole();
                    break;
                case 'Delete employee':
                    deleteEmployee();
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
        .then(({ department }) => {
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

// const addRole = () => {
//     DB.getDepartments()
//         .then(function (result) {
//             if (result.length === 0) {
//                 console.log("\n****** You must add departments before you add roles ******\n")
//                 menuFunction();
//             } else {
//                 const deptArr = [];
//                 result.forEach(element => {
//                     let item = {
//                         name: element.name,
//                         value: element.id
//                     }
//                     deptArr.push(item);
//                 });
//                 inquirer
//                     .prompt(addRoleQstns(deptArr))
//                     .then(({ roleDepartment, role, salary }) => {
//                         DB.addPosition(role, salary, roleDepartment)
//                             .then(function (result) {
//                                 console.log("Department added successfully.")
//                                 menuFunction();
//                             })
//                             .catch(function (err) {
//                                 console.log(err)
//                             })
//                     }).catch(function (err) {
//                                 console.log(err)
//                             })
//             }
//         })
//         .catch(function (err) {
//             console.log(err)
//         })
// }

// const addRole = () => {
//     DB.getDepartments()
//         .then(function (result) {
//             if (result.length === 0) {
//                 console.log("\n****** You must add departments before you add roles ******\n")
//                 return menuFunction();
//             }

//             const deptArr = result.map(element => ({
//                 name: element.name,
//                 value: element.id
//             }));

//             return inquirer.prompt(addRoleQstns(deptArr))

//         }).then(({ roleDepartment, role, salary }) => {
//             return DB.addPosition(role, salary, roleDepartment)

//         }).then(function () {
//             console.log("Department added successfully.")
//             menuFunction();
//         })
//         .catch(function (err) {
//             console.log(err)
//         })
// }

const addRole = async () => {
    try {
        const deptArr = await DB.getDepartmentsINQ()
        if (deptArr.length === 0) {
            console.log("\n****** You must add departments before you add roles ******\n")
            return menuFunction();
        }

        const { roleDepartment, role, salary } = await inquirer.prompt(addRoleQstns(deptArr))

        await DB.addPosition(role, salary, roleDepartment)

        console.log("Department added successfully.")
        menuFunction();
    } catch (error) {
        console.log(error)
    }
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
                    .then(({ isMan }) => {
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
                                        .then(({ employeeRole, firstName, lastName, employeeManager }) => {
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

const viewEmployees = () => {
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
                        .then(({ employeeName, newPosition }) => {
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
                inquirer
                    .prompt(viewEmployeesByMan(managerArr))
                    .then(({ manager }) => {
                        DB.viewEmpByMan(manager)
                            .then(function (result) {
                                if (result.length === 0) {
                                    console.log("\nThis manager does not have any employees.\n")
                                    menuFunction()
                                } else {
                                    console.table(result)
                                    menuFunction();
                                }
                            })
                            .catch(function (err) {
                                console.log(err)
                            })
                    })
            }
        })
}


const updateManagers = () => {
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
            DB.getManagers()
                .then(function (result) {
                    const managerArr = [];
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
                        .prompt(updateEmployeeManQstns(employeeArr, managerArr))
                        .then(({ employee, manager }) => {
                            DB.updateEmployeeManager(employee, manager)
                                .then(function (result) {
                                    console.log("Manager successfully updated.")
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
        .catch(function (err) {
            console.log(err)
        })
}

const deleteDepartment = () => {
    DB.getDepartments()
        .then(function (result) {
            if (result.length === 0) {
                console.log("There are no departments to delete");
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
                    .prompt(deleteDeptQstns(deptArr))
                    .then(({ department }) => {
                        DB.deleteDepartment(department)
                            .then(function (result) {
                                console.log("Department successfully deleted.")
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

const deleteRole = () => {
    DB.getPositions()
        .then(function (result) {
            if (result.length === 0) {
                console.log("There are no roles to delete");
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
                    .prompt(deletePositionQstns(positionArr))
                    .then(({ position }) => {
                        DB.deletePosition(position)
                            .then(function (result) {
                                console.log("Role successfully deleted.")
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

const deleteEmployee = () => {
    DB.getEmployees()
        .then(function (result) {
            if (result.length === 0) {
                console.log("There are no employees to delete");
                menuFunction();
            } else {
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
                    .prompt(deleteEmpQstns(employeeArr))
                    .then(({ employee }) => {
                        DB.deleteEmployee(employee)
                            .then(function (result) {
                                console.log("Employee successfully deleted.")
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

const exit = () => {
    DB.endConnection();
}

module.exports = { menuFunction };