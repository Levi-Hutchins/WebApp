import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useEmployeeDetails = (loggedInUser, setLoading) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      // check if the user is logged in and has an email; if not, stop loading
      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setLoading(false);
        return;
      }

      try {
        // fetch employee data from the server based on the logged-in user's email
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

        // set user data in userDetails for further use in the component
        const userData = response.data;
        setUserDetails({
          Email: userData.Email,
          Name: userData.Name,
          UserName: userData.UserName,
        });
      } catch (error) {
        // display an error message if there is an issue with the data fetch
        toast.error("Error fetching employee data", {
          position: "bottom-right",
        });
      } finally {
        // set loading to false once the fetch completes, regardless of success or failure
        setLoading(false);
      }
    };
    // call the function
    fetchEmployeeData();
  }, [loggedInUser, setLoading]); // dependencies

  return { userDetails };
};

export default useEmployeeDetails;
