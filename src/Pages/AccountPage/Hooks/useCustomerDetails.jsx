import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCustomerDetails = (loggedInUser, setLoading) => {
  const [userDetails, setUserDetails] = useState({});
  const [checkOutDetails, setCheckOutDetails] = useState({});

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setLoading(false);
        return;
      }

      try {
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

        const patronData = patronResponse.data;
        setUserDetails({
          ID: patronData.UserID,
          Email: patronData.Email,
          Name: patronData.Name,
        });

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

        const toData = toResponse.data;
        setCheckOutDetails({
          ID: toData.CustomerID,
          Email: toData.Email,
          CardNumber: toData.CardNumber,
          CardOwner: toData.CardOwner,
          PhoneNumber: toData.PhoneNumber,
          StreetAddress: toData.StreetAddress,
          ExpiryDate: toData.Expiry,
          CVV: toData.CVV,
        });
      } catch (error) {
        toast.error("Error fetching customer data", { position: "bottom-right" });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [loggedInUser, setLoading]);

  return { userDetails, checkOutDetails };
};

export default useCustomerDetails;