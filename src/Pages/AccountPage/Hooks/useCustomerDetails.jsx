import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCustomerDetails = (loggedInUser, setLoading = () => {}) => {
  const [userDetails, setUserDetails] = useState({});
  const [checkOutDetails, setCheckOutDetails] = useState({});

  useEffect(() => {
    const fetchCustomerData = async () => {
      // check if the user is logged in and has an email; if not, stop loading
      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // fetch patron data based on logged-in user's email
        const patronResponse = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/find-one",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
            params: {
              where: `(Email,eq,${loggedInUser.EmailAddress})`,
            },
          }
        );

        // set patron data in userDetails for use throughout the component
        const patronData = patronResponse.data;
        setUserDetails({
          ID: patronData.UserID,
          Email: patronData.Email,
          Name: patronData.Name,
        });

        // fetch checkout details based on the patron ID from the previous response
        const toResponse = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/TO/find-one",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
            params: {
              where: `(PatronId,eq,${patronData.UserID})`,
            },
          }
        );

        // set checkout data in checkOutDetails for further use
        const toData = toResponse.data;
        setCheckOutDetails({
          ID: toData.CustomerID,
          Email: toData.Email,
          CardNumber: toData.CardNumber,
          CardOwner: toData.CardOwner,
          PhoneNumber: toData.PhoneNumber,
          StreetAddress: toData.StreetAddress,
          Expiry: toData.Expiry,
          CVV: toData.CVV,
        });
      } catch (error) {
        // display an error message if the fetch fails
        toast.error("Error fetching customer data", { position: "bottom-right" });
      } finally {
        // set loading to false regardless of the fetch outcome
        setLoading(false);
      }
    };
    // call the function
    fetchCustomerData();
  }, [loggedInUser, setLoading]); //dependencies

  return { userDetails, checkOutDetails };
};

export default useCustomerDetails;
