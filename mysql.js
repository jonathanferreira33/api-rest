const mysql = require('mysql2');

var pool = mysql.createPool({
    // "user" : process.env.MYSQL_USER,
    // "password" : process.env.MYSQL_PASSWORD,
    // "database" : process.env.MYSQL_DATABASE,
    // "host": process.env.MYSQL_HOST,
    // "port" : process.env.MYSQL_PORT

    "user" : "root",
    "password" : "Tvgo653322*",
    "database" : "streaming",
    "host": "127.0.0.1",
    "port" : 3306


});

exports.pool = pool;