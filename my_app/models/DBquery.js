function DB_query(sql, type) {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '132',
        database: 'advertising'
    });

    connection.connect();

    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        console.log('sql output: ', rows)
    });

    connection.end();
}



module.exports = DB_query;
