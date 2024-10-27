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
          console.log(response)
          if (response.data) {
            console.log(response.data)
            return response.data.UserID;
          }
        } catch (err) {
          throw err;
        }
        return false;
      };
 const updateUser = async (ID, userDetails) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/v1/db/data/v1/inft3050/User/${ID}`, (userDetails),{
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
 const deleteUser = async (ID) => {
  try{
    const response = await axios.delete(`http://localhost:8080/api/v1/db/data/v1/inft3050/User/${ID}`,{
      headers: {
        "xc-token": process.env.REACT_APP_APIKEY,
      },
    })
    if(response.data == "1"){
      return true;
    }
    return false;
  }catch(error){
    return false
  }
 }
 return {updateUser, deleteUser}
}
export default useUserMutations;