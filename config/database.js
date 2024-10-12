const mysql = require('mysql2/promise'); // For promise-based MySQL
const dotenv = require('dotenv'); // To load environment variables

// Load environment variables from the .env file
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,      // Database host (from .env)
    user: process.env.DB_USER,      // Database user (from .env)
    password: process.env.DB_PASSWORD, // Database password (from .env)
    database: process.env.DB_NAME,  // Database name (from .env)
    port: process.env.DB_PORT       // Database port (from .env, optional)
});

module.exports = pool; // Export the connection pool for use in other files
