import axios from "axios"
const useUserMutations = () => {
    const findUser = async (userEmail) => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
            {
              headers: {
                "xc-token": process.env.REACT_APP_APIKEY,
              },
              params: {
                where: `(Email,eq,${userEmail})`,
              },
            }
          );
          if (response.data) {
            console.log(response.data)
            return response.data.UserID;
          }
        } catch (err) {
          throw err;
        }
        return false;
      };
 const updateUser = async (userDetails) => {
    console.log(userDetails)
    const id = await findUser(userDetails.Email)
    if(!id) return;
    console.log(id)
    try {
        const response = await axios.patch(`http://localhost:8080/api/v1/db/data/v1/inft3050/User/${id}`, userDetails,{
          headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
        });  
        return response.data;  
      } catch (err) {
          console.log(err)
        throw err;  
      }

 }
 return {updateUser}
}
export default useUserMutations;