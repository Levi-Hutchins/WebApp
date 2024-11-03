import axios from 'axios'
import { toast } from 'react-toastify';

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
    }  

    // helper function that handles login functionality 
    const HandleLogin = async (email, password) => {   
        try {
            // check if user logging in is a User
            const response = await axios.get(
                "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
                {
                    headers: {
                        "xc-token": process.env.REACT_APP_APIKEY,
                    },
                    params: {
                        where: `(Email,eq,${email})`,
                    },
                }
            );
    
            const { Salt, IsAdmin, HashPW } = response.data;
            const inputHashed = await sha256(Salt + password);  // hash password
            
            // compare inputted password with stored password
            if (inputHashed === HashPW) {
                toast.success("Login successful", {
                    position: "bottom-right"
                });
                localStorage.setItem("LogInData",JSON.stringify({EmailAddress: response.data.Email, User: "Employee"}))
                
                // check is user is an Admin
                if (IsAdmin === true){
                    localStorage.setItem("LogInData",JSON.stringify({EmailAddress: response.data.Email, User: "Admin"}))
                    localStorage.setItem("IsAdmin", true)
                }else{
                    localStorage.setItem("IsAdmin", false)
                }
                return true } 
            
            // check if user logging in is Patron
            const patronResponse = await axios.get(
                "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/find-one",
                {
                    headers: {
                        "xc-token": process.env.REACT_APP_APIKEY,
                    },
                    params: {
                        where: `(Email,eq,${email})`,
                    },
                }
            );

            if (patronResponse.data) {
                const patronInputHashed = await sha256(patronResponse.data.Salt + password);  // hash password

                // compare inputted password with stored password
                if (patronInputHashed === patronResponse.data.HashPW) {
                    toast.success("Login successful", {
                        position: "bottom-right"
                    });
                    localStorage.setItem("IsAdmin", false)  // patrons cannot be admin
                    localStorage.setItem("LogInData",JSON.stringify({EmailAddress: patronResponse.data.Email, User: "Customer"}))
                    console.log("User is a Patron:", patronResponse.data);
                    return true; // return true if both login and Patron check are successful
                }
            } 
            else {
                console.log("User not found in Patrons table");
                return false;
            }             
        } catch (error) {
            console.error('Error fetching data:', error);
            return false;
        }
    };
    
    export default HandleLogin;