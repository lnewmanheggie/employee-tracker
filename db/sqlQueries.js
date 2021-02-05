const connection = require("../config/connection")

class DB {
    constructor(conn) {
        this.connection = conn
    }

    addDepartment(deptName) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO department SET ?",
                {
                name: deptName,
                },
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    addPosition(posTitle, posSalary, deptId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO position SET ?",
                {
                title: posTitle,
                salary: posSalary,
                department_id: deptId
                },
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    addManager(firstName, lastName, posId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO employee SET ?",
                {
                first_name: firstName,
                last_name: lastName,
                role_id: posId
                },
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    addRegularEmployee(firstName, lastName, posId, managerId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO employee SET ?",
                {
                first_name: firstName,
                last_name: lastName,
                role_id: posId,
                manager_id: managerId
                },
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getDeptId(deptName) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT id FROM department WHERE name = "${deptName}"`,
                function (err, result) {
                if (err) return reject(err);
                resolve(result[0].id)
            })
        })
    }

    getPositionId(posName) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT id FROM position WHERE title = "${posName}"`,
                function (err, result) {
                if (err) return reject(err);
                resolve(result[0].id)
            })
        })
    }

    getManagerId(positionId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT id FROM employee WHERE role_id = "${positionId}" and manager_id is null`,
                function (err, result) {
                if (err) return reject(err);
                resolve(result[0].id)
            })
        })
    }

    getEmployees() {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from employee", function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

}

module.exports = new DB(connection);