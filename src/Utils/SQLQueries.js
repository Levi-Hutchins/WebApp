const databaseConfig = require('./SQLConfig'); 

const sql = require('mssql');

async function searchProducts(productName) {

    try{
        let db_connection = await sql.connect(databaseConfig);

        let result = await db_connection.request()
        .input('productName', sql.VarChar, productName)
        .query('SELECT TOP 10 * FROM [master].[dbo].[Product] WHERE Name = @productName');

        console.log(result)
        await sql.close();

        
        return result

    } catch(error){
        console.error(error);
        return null
    }
}

searchProducts("Atonment")