import axios from 'axios'

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

const HandleLogin = async (username, password) => {
    var token = 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ';
    console.log(process.env.REACT_APP_APIKEY)
    console.log("jbcknwvknwovwpo")
    await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
          params: {
            where: `(Email,eq,${username})`,
          },
        }
      ).then(response => {
            var salt = response.data.Salt;
            var isAdmin = response.data.isAdmin;
            var hashedPassword = response.data.HashPW;
            
            return sha256(salt + password).then(async input => {
                console.log("Input Hashed: ", input);
                console.log("Stored PW: ", response.data.HashPW);
                if (input === hashedPassword) {
                    console.log("Login successful");
                    console.log(response.data);
                    localStorage.setItem("EmailLoggedIn", response.data.Email);

                    await axios.get(
                      "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/find-one",
                      {
                        headers: {
                          "xc-token": process.env.REACT_APP_APIKEY,
                        },
                        params: {
                          where: `(Email,eq,${username})`,
                        },
                      }
                    ).then(response)

                    return token;
                }
                else {
                    console.log("Login unsuccessful");
                    return false;
                }
            });
        }).catch(error => {
            console.error('Error fetching data:', error);
            return false;
        });
};
export default HandleLogin;

