import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useEmployeeDetails = (loggedInUser, setLoading) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
            params: {
              where: `(Email,eq,${loggedInUser.EmailAddress})`,
            },
          }
        );

        const userData = response.data;
        setUserDetails({
          Email: userData.Email,
          Name: userData.Name,
          UserName: userData.UserName,
        });
      } catch (error) {
        toast.error("Error fetching employee data", { position: "bottom-right" });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [loggedInUser, setLoading]);

  return { userDetails };
};

export default useEmployeeDetails;
