import axios from "axios";
import { useCallback } from "react";
import { hashPassword } from "../../../Utils/HahingService";
import { toast } from "react-toastify";

const useUsers = () => {
  const getAllUsers = useCallback(async () => {
    try {
      // fetch all users from the api
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
      console.error("error fetching users:", err);
      return [];
    }
  }, []);

  const findUser = async (userEmail) => {
    try {
      // check if a user with the given email already exists
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
      // return true if user exists
      return Object.keys(response.data).length > 0;
    } catch (err) {
      console.error("error finding user:", err);
      throw err;
    }
  };

  const addUser = async (user) => {
    // check if user already exists by email
    if (await findUser(user.Email)) {
      toast.warning("user with email: " + user.Email + " already exists", {
        position: "bottom-right",
      });
      return false;
    }

    // hash the user's password before saving
    const passwordSalt = await hashPassword(user.Password);
    const userValues = {
      UserName: user.UserName,
      Email: user.Email,
      Name: user.Name,
      IsAdmin: JSON.stringify(user.IsAdmin),
      Salt: passwordSalt.salt,
      HashPW: passwordSalt.hash,
    };

    try {
      // send post request to add a new user
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
      console.error("error adding user:", err);
      throw err;
    }
  };

  return { getAllUsers, addUser };
};

export default useUsers;
