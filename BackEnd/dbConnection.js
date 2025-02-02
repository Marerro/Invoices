const postgres = require('postgres');
const env = require('dotenv');

env.config();

const sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
})

const testConnection = async () => {
    try {
        await sql`SELECT 1 AS RESULT`;
        console.log('Connected to database');
    } catch (error) {
        console.log("Connection failed to database", error.message);
        throw error;
    }
}

module.exports = { sql, testConnection };