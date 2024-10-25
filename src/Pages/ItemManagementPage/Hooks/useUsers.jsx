import axios from "axios";
import { useCallback } from "react";
import { hashPassword } from "../../../Utils/HahingService";
import { toast } from "react-toastify";

const useUsers = () => {
  const getAllUsers = useCallback(async () => {
    try {
      const users = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/User",
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return users.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);
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
        return true;
      }
    } catch (err) {
      throw err;
    }
    return false;
  };
  const addUser = async (user) => {
    if(await findUser(user.Email)){
      toast.warning("User with email: "+ user.Email+ " already exists",{
        position: "bottom-right"
      })
      return false;
    }
    const passwordSalt = hashPassword(user.Password);

    const userValues = {
      UserName: user.UserName,
      Email: user.Email,
      Name: user.Name,
      IsAdmin: JSON.stringify(user.IsAdmin),
      Salt: passwordSalt.salt,
      HashedPW: passwordSalt.hash,
    };
    console.log(userValues);
    try {
      const users = await axios.post(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/User",
        userValues,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return users.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { getAllUsers, addUser };
};
export default useUsers;
