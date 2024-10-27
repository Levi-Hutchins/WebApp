import axios from 'axios';
import { toast } from 'react-toastify';

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const HandleLogin = async (email, password) => {
    const token = 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ';
    const apiKey = process.env.REACT_APP_APIKEY;

    try {
        // Check Users table first
        const userResponse = await axios.get(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
            {
                headers: { "xc-token": apiKey },
                params: { where: `(Email,eq,${email})` }
            }
        );

        if (userResponse.data) {
            const { Salt, isAdmin, HashPW, Email } = userResponse.data;
            if (!Salt) {
                console.error("Salt is undefined in Users table response.");
            } else {
                const inputHashed = await sha256(Salt + password);
                if (inputHashed === HashPW) {
                    toast.success("Login successful", { position: "bottom-right" });
                    localStorage.setItem("LogInData", JSON.stringify({
                        EmailAddress: Email,
                        User: isAdmin ? "Admin" : "Employee"
                    }));
                    localStorage.setItem("IsAdmin", isAdmin);
                    return token;
                }
            }
        }
        
        // If user not found in Users table, check Patrons table
        const patronResponse = await axios.get(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/find-one",
            {
                headers: { "xc-token": apiKey },
                params: { where: `(Email,eq,${email})` }
            }
        );

        if (patronResponse.data) {
            const { Salt, HashPW, Email } = patronResponse.data;
            if (!Salt) {
                console.error("Salt is undefined in Patrons table response.");
            } else {
                const patronInputHashed = await sha256(Salt + password);
                console.log(patronInputHashed)
                console.log(HashPW)
                if (patronInputHashed === HashPW) {
                    toast.success("Login successful", { position: "bottom-right" });
                    localStorage.setItem("LogInData", JSON.stringify({
                        EmailAddress: Email,
                        User: "Customer"
                    }));
                    localStorage.setItem("IsAdmin", false);
                    return token;
                } else {
                    toast.error("Email or Password Incorrect!", { position: "bottom-right" });
                }
            }
        } else {
            console.log("User not found in Patrons table");
            toast.error("Email or Password Incorrect!", { position: "bottom-right" });
        }

        return false; // Return false if no match is found
    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
};

export default HandleLogin;
