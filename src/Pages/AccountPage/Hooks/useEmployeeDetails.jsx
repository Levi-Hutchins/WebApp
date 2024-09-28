import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useEmployeeDetails = (loggedInUser) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const loadingToast = toast.loading("Loading employee data...", {
        position: "bottom-right",
        autoClose: false,
        closeOnClick: false,
      });

      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setTimeout(() => {
          toast.dismiss(loadingToast);
        }, 1000);
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

        toast.dismiss(loadingToast);
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Error fetching employee data", {
          position: "bottom-right",
        });
      }
    };

    fetchEmployeeData();
  }, [loggedInUser]);

  return { userDetails };
};

export default useEmployeeDetails;
