
const sql = require('mssql');
require('dotenv').config()

const databaseConfig = {
    user: process.env.USERACC,  
    password: process.env.PASSWORD, 
    server: process.env.SERVER,    
    port: parseInt(process.env.PORT,10),           
    database: process.env.DATABASE, 

    options: {
        encrypt: true,       
        trustServerCertificate: true 
    }}

async function searchProducts(productName) {

    try{
        let db_connection = await sql.connect(databaseConfig);

        let result = await db_connection.request()
        .input('productName', sql.VarChar, productName)
        .query('SELECT TOP 10 * FROM [master].[dbo].[Product] WHERE Name LIKE \'%\' + @productName + \'%\'');
        //.query('SELECT * FROM [master].[dbo].[Product]');


        
        await sql.close();

        return result.recordset

    } catch(error){
        console.error(error);
        return null
    }
}

module.exports = { searchProducts };
