import axios from "axios";

const useUserMutations = () => {
  const findUser = async (userEmail) => {
    try {
      // send get request to find a user by email
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
        return response.data.UserID;
      }
    } catch (err) {
      console.log("error finding user:", err);
      throw err;
    }
    return false;
  };

  const updateUser = async (ID, userDetails) => {
    try {
      // send patch request to update user details by id
      const response = await axios.patch(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${ID}`,
        userDetails,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("error updating user:", err);
      throw err;
    }
  };

  const deleteUser = async (ID) => {
    try {
      // send delete request to remove a user by id
      const response = await axios.delete(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${ID}`,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      // return true if deletion is successful, otherwise false
      return response.data === "1";
    } catch (error) {
      console.log("error deleting user:", error);
      return false;
    }
  };

  return { updateUser, deleteUser, findUser };
};

export default useUserMutations;
