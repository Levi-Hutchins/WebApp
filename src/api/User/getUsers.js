const axios = require('axios');
require("dotenv").config()

const getAllUsers = async () =>{
    try{
        const users = await axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/User", {
            headers: {
                // For some reason this is the apiKey header
                "xc-token": process.env.APIKEY
            }
        })
        return users.data

    }catch(error){
        console.error("Error getting all users: " ,error)
        throw error
    }


}
getAllUsers()
module.exports = {getAllUsers}