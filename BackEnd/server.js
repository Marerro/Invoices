const app = require('./app');
const env = require('dotenv');
const {sql, testConnection} = require('./dbConnection');

env.config();
const port = process.env.PORT;


(async () => {
    try {
        await testConnection();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        process.exit(1);
    }
    process.on("SIGNINT", async () => {
        console.log("Closing database connection");
        await sql.end();
        process.exit(0);
    })
})();