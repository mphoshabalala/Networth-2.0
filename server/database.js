// dbConnection.js
const mysql = require("mysql2");

module.exports = {
  databaseConnection: function () {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "thabiso.leboko",
      database: "authentication",
    });
  },
};
