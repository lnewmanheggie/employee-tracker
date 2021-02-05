const { getDeptId, addPosition } = require("../db/sqlQueries");
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
        console.log(posId)
        DB.getManagerId(posId)
        .then(function (result) {
            const managerId = result;
            console.log(managerId)
            DB.addRegularEmployee(firstName, lastName, posId, managerId)
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

function manId(positionId) {
    DB.getManagerId(positionId)
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })
}


// manId(1);
// addRegEmployee("regular", "emp", "what")
// addMan("manager1", "hsdfi", "sosdfsd")
addRegEmployee("joe", "reg", "sosdfsd")

// addPstn("sosdfsd", 400, "sales");

// module.exports = { getEmp };