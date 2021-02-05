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

module.exports = { menu, addDepartment }