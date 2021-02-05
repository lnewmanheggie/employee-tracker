// const { getDeptId, addPosition } = require("../db/sqlQueries");
const DB = require("../db/sqlQueries");

function addDept(deptName) {
    DB.addDepartment(deptName)
    .then(function (result) {
        console.log("Department added successfully.")
    })
    .catch(function (err) {
        console.log(err)
    })
}

function addPstn(title, salary, deptName) {
    DB.getDeptId(deptName)
    .then(function (result) {
        const deptId = result;
        DB.addPosition(title, salary, deptId)
        .then(function (result) {
            console.table(result)
        })
        .catch(function (err) {
            console.log(err)
        })
    })
    .catch(function (err) {
        console.log(err)
    })
}

function addMan(firstName, lastName, position) {
    DB.getPositionId(position)
    .then(function (result) {
        const posId = result;
        DB.addManager(firstName, lastName, posId)
        .then(function (result) {
            console.table(result)
        })
        .catch(function (err) {
            console.log(err)
        })
    })
    .catch(function (err) {
        console.log(err)
    })
}

function addRegEmployee(firstName, lastName, position) {
    DB.getPositionId(position)
    .then(function (result) {
        const posId = result;
        console.log(posId, firstName, lastName)
        // DB.getManagerId(posId)
        // .then(function (result) {
        //     const managerId = result;
        //     console.log(managerId)
        //     DB.addRegularEmployee(firstName, lastName, posId, managerId)
        //     .then(function (result) {
        //         console.table(result)
        //     })
        //     .catch(function (err) {
        //         console.log(err)
        //     })
        // })
        // .catch(function (err) {
        //     console.log(err)
        // })
    })
    .catch(function (err) {
        console.log(err)
    })
}

function getDepts() {
    DB.getDepartments()
    .then(function (result) {
        result.length === 0 
        ? console.log("There are no departments") 
        : console.table(result)
    })
    .catch(function (err) {
        console.log(err)
    })
}

// getDepts();

function getPosns() {
    DB.getPositions()
    .then(function (result) {
        console.log("Positions:")
        console.table(result)
    })
    .catch(function (err) {
        console.log(err)
    })
}


function getEmp() {
    DB.getEmployees()
    .then(function (result) {
        console.table(result)
    })
    .catch(function (err) {
        console.log(err)
    })
}

function updateEmpRoll(position, employeeId) {
    DB.getPositionId(position)
    .then(function (result) {
        const posId = result;
        DB.updateEmployeeRole(posId, employeeId)
        .then(function (result) {
            console.table(result)
        })
        .catch(function (err) {
            console.log(err)
        })
    })
    .catch(function (err) {
        console.log(err)
    })
}

function promote(position, employeeId) {
    DB.getPositionId(position)
    .then(function (result) {
        const posId = result;
        DB.promoteToManager(posId, employeeId)
        .then(function (result) {
            console.log(`Employee ${employeeId} promoted!`)
            console.table(result)
        })
        .catch(function (err) {
            console.log(err)
        })
    })
    .catch(function (err) {
        console.log(err)
    })
}

// manId(1);
// addRegEmployee("regular", "emp", "sosdfsd")

// addMan("manager2", "ln", "lead accounter")
// addPstn("lead accounter", 433, "accounting");
// updateEmp("sales manager", 1);

// promote("sales manager", 2);
// getEmp();
// getPosns();


// addPstn("sosdfsd", 400, "sales");

module.exports = { getEmp };