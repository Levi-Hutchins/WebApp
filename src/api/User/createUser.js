const axios = require('axios');
require("dotenv").config()

const createUser = async (user) =>{
   
    try{

        const createMe = await axios.post("http://localhost:8080/api/v1/db/data/v1/inft3050/User",user, {
            headers: {
                // For some reason this is the apiKey header
                "xc-token": process.env.APIKEY
            },
            
        }).then((response) =>{
            return response
        })

    }catch(error){
        console.error("Error getting all users: " ,error)
        throw error
    }


}

createUser();
module.exports = {createUser}