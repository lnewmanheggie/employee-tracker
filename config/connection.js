const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_tracker"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;