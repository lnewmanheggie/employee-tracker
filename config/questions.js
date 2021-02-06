const menu = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ["Add a department", "Add a role", "Add an employee", 
            "View departments", "View roles", "View employees", "View employees by manager", 
            "Update employee roles", "Update employee managers", 
            "Exit"],
    name: 'menuAnswer'
}


const addDepartment = [
    {
        type: 'input',
        message: "What is the department called?",
        name: 'department',
    }
]

function addRoleQstns(deptArr) {
    return [
        {
            type: 'list',
            message: "What department is this role under?",
            choices: deptArr,
            name: 'roleDepartment',
        },
        {
            type: 'input',
            message: "What is the name of the role?",
            name: 'role',
        },
        {
            type: 'input',
            message: "What is the salary?",
            name: 'salary',
        }
    ]
}

const isManager = [
    {
        type: 'list',
        message: 'Is the employee a manager?',
        choices: [
            {
                name: "yes",
                value: true
            }, 
            {
                name: "no",
                value: false
            }
        ],
        name: 'isMan',
    },
]

function addEmpQstns(positionArr, managerArr) {
    return [
        {
            type: 'list',
            message: "What is this employee's role?",
            choices: positionArr,
            name: 'employeeRole',
        },
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName',
        },
        {
            type: 'list',
            message: "Who is this employee's manager?",
            choices: managerArr,
            name: 'employeeManager',
        }
    ]
}

function updateEmpRole(employeeArr, positionArr) {
    return [
        {
            type: 'list',
            message: "Which employee would you like to update?",
            choices: employeeArr,
            name: 'employeeName',
        },
        {
            type: 'list',
            message: "What is their new role?",
            choices: positionArr,
            name: 'newPosition',
        }
    ]
}

function viewEmployeesByMan(managerArr) {
    return [
        {
            type: 'list',
            message: "Which manager would you like to view employees for?",
            choices: managerArr,
            name: 'manager',
        }
    ]
}

function updateEmployeeManQstns(employeeArr, managerArr) {
    return [
        {
            type: 'list',
            message: "Which employee would you like to update?",
            choices: employeeArr,
            name: 'employee',
        },
        {
            type: 'list',
            message: "Who is the employee's new manager?",
            choices: managerArr,
            name: 'manager',
        }
    ]
}

module.exports = { 
    menu, 
    addDepartment, 
    addRoleQstns, 
    isManager, 
    addEmpQstns, 
    updateEmpRole, 
    viewEmployeesByMan,
    updateEmployeeManQstns
}