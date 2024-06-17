const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection(config.database);

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: ", error);
    return;
  }
  console.log("Connected to the database");
});

module.exports = connection;
