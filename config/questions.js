const menu = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ["Add a department, role or employee", "View departments, roles, or employees", "Update information"],
    name: 'menuAnswer',
}


const addDepartment = [
    {
        type: 'input',
        message: "What is the department called?",
        name: 'department',
    }
]

module.exports = { menu, addDepartment }