const express = require("express");
const mysql= require('mysql')

const app = express();

// SQL Server configuration
 const db = mysql.createConnection({
    host: "127.0.0.1", // Server IP address
    user: "root", // Database username
    password: "Austin$7", // Database password
    database: "blog", // Database name
    port: 3306,
    debug: "true"

})



// dotenv.config({ path: './.env'});

// const app = express();

// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE
// });


// Connect to the database with error handling
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to  database.");
});
 
// db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// db.end();

// db.connect((err) => {
//    if (err) {
//        console.error("Database connection error:", err);
//        return;  // Stop execution if there's an error
//    }
//    console.log("Connected to MySQL database!");
// });

// db.on('error', (err) => {
//    console.log("MySQL error", err);
//    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//        handleDisconnect();  // Reconnect on connection lost
//    } else {
//        throw err;
//    }
// });


// // Connect to SQL Server
// sql.connect(config, err => {
//     if (err) {
//         throw err;
//     }
//     console.log("Connection Successful!");
// });
module.exports= db