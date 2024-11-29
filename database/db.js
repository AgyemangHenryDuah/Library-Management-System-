const mysql2 = require('mysql2');

const db = mysql2.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'nss@@M@L1T3C#',
  database: 'library_db_test'
}).promise();

if(db){
    console.log('DB pool created')
} else{
    throw new Error
}


module.exports = db;
