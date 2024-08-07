const databaseConfig = require('./SQLConfig'); 

const sql = require('mssql');


async function testConnection() {
    try {
        let pool = await sql.connect(databaseConfig);

        //let result = await pool.request()
        //.query('SELECT TOP 10 * FROM [master].[dbo].[Product]');

        //console.log(result);

        console.log("\n====== CONNECTION SUCCESSFUL ======\n")
        await sql.close();
    } catch (err) {
        console.error('SQL error', err);
    }
}

testConnection();
