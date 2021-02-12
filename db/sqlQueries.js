const connection = require("../config/connection");
const { isManager } = require("../config/questions");

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

    addEmployee(firstName, lastName, posId, managerId, isMan) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO employee SET ?",
                {
                first_name: firstName,
                last_name: lastName,
                role_id: posId,
                manager_id: managerId,
                is_manager: isMan
                },
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getManagers() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name " +
                "FROM employee " +
                "WHERE is_manager = true;",
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getManagersINQ() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value " +
                "FROM employee " +
                "WHERE is_manager = true;",
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getPositions() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "select position.id, title, salary, department.name " +
                "from position " +
                "inner join department on department_id = department.id;",
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getPositionsINQ() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT title AS name, id AS value " + 
                "FROM position;",
                (err, result) => {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getDepartmentsINQ() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT name, id AS value " +
                "FROM department;",
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getDepartments() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "select * " +
                "from department;",
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getEmployeesINQ() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT CONCAT(first_name, ' ', last_name) AS name, employee.id AS value " + 
                "FROM employee " +
                "LEFT JOIN position ON role_id = position.id " +
                "LEFT JOIN department ON department_id = department.id;", 
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    getEmployees() {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT employee.id, employee.first_name, employee.last_name, position.title, position.salary, department.name " + 
                "FROM employee " +
                "LEFT JOIN position ON role_id = position.id " +
                "LEFT JOIN department ON department_id = department.id;", 
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    updateEmployeeRole(employeeId, positionId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        role_id: positionId,
                    },
                    {
                        id: employeeId
                    }
                ], 
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    viewEmpByMan(managerId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                `SELECT first_name, last_name FROM employee WHERE manager_id = ${managerId};`,
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }
    
    updateEmployeeManager(employeeId, managerId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        manager_id: managerId,
                    },
                    {
                        id: employeeId
                    }
                ],
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    deleteDepartment(departmentId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "DELETE FROM department WHERE ?",
                [
                    {
                        id: departmentId,
                    }
                ],
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    deletePosition(positionId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "DELETE FROM position WHERE ?",
                [
                    {
                        id: positionId,
                    }
                ],
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    deleteEmployee(employeeId) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "DELETE FROM employee WHERE ?",
                [
                    {
                        id: employeeId,
                    }
                ],
                function (err, result) {
                if (err) return reject(err);
                resolve(result)
            })
        })
    }

    endConnection() {
        return this.connection.end();
    }

}

module.exports = new DB(connection);