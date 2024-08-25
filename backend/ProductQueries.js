
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

        let similarResults = await db_connection.request()
        .input('productName', sql.VarChar, productName)
        .query('SELECT * FROM [master].[dbo].[Product] WHERE Name LIKE \'%\' + @productName + \'%\'');
        //.query('SELECT * FROM [master].[dbo].[Product]');


        
        await sql.close();

        return similarResults.recordset

    } catch(error){
        console.error(error);
        return null
    }
}
async function getProductDetails(productID) {

    try{
        let db_connection = await sql.connect(databaseConfig);

        let stocktakeEntries = await db_connection.request()
        .input('productID', sql.Int, productID)
        .query('SELECT * FROM [master].[dbo].[Stocktake] WHERE ProductId = ( SELECT ID FROM [master].[dbo].[Product] WHERE ID = @productID)');
        //.query('SELECT * FROM [master].[dbo].[Product]');


        
        await sql.close();
        console.log(result.recordset)


        //TODO: need to query the source table with the retrieved sourceIDs above to get what the product is
        return result.recordset

    } catch(error){
        console.error(error);
        return null
    }
}

getProductDetails(220)


module.exports = { searchProducts };
