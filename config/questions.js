const menu = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ["Add a department", "Add a role", "Add an employee", 
            "View departments", "View roles", "View employees", 
            "Update information", 
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
        message: "What is this employee's role?",
        choices: ["yes", "no"],
        name: 'employeeRole',
    },
]


function addRegEmpQstns(positionArr, managerArr) {
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
            message: "What is this employee's role?",
            choices: managerArr,
            name: 'employeeManager',
        },

    ]
}


module.exports = { menu, addDepartment, addRoleQstns, isManager }