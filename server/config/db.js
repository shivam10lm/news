const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    return connection;
  } catch (error) {
    console.error("Error creating database connection:", error.message);
    throw error;
  }
};

module.exports = createConnection;
