'user strict';

var mysql = require('mysql');
var config = require('./config');
//local mysql db connection
var connection = mysql.createConnection({
    host     :  config.db.host,
    user     : config.db.user,
    password : config.db.pass,
    database : config.db.dbname,
    port: 3306,
    connectTimeout: 30000,
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;