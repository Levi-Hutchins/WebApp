require('dotenv').config()

const databaseConfig = {
    user: process.env.USERACC,  
    password: process.env.PASSWORD, 
    server: process.env.SERVER,    
    port: parseInt(process.env.PORT,10),           
    database: process.env.MASTER, 

    options: {
        encrypt: true,       
        trustServerCertificate: true 
    }}

module.exports = databaseConfig