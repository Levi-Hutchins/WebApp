import { useState } from "react";
import axios from "axios";

const useUpdateCustomerDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // helper function to transform rows of data into an object with key-value pairs
  const transformRowsToData = (rows) => {
    return rows.reduce((acc, row) => {
      acc[row.accountValue.replace(/\s+/g, "")] = row.value; // removes whitespace from keys
      return acc;
    }, {});
  };

  const updateCheckoutDetails = async (updatedData, ID) => {
    setLoading(true);
    setError(null);

    // transforms the input data into a format compatible with the API
    const transformData = transformRowsToData(updatedData);
    try {
      // send a patch request to update checkout details
      const response = await axios.patch(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${ID}`,
        transformData,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      // set an error message if updating fails
      setError("Error updating customer details");
      throw err;
    } finally {
      setLoading(false); // stop loading after the request completes
    }
  };

  const updateAccountDetails = async (updatedData, ID) => {
    setLoading(true);
    setError(null);

    // transform input data and map fields to API format
    const transformData = transformRowsToData(updatedData);
    const newData = {
      Email: transformData.EmailAddress,
      Name: transformData.FullName,
    };

    try {
      // send a patch request to update account details
      const response = await axios.patch(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${ID}`,
        newData,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      // set an error message if updating fails
      setError("Error updating customer details");
      throw err;
    } finally {
      setLoading(false); // stop loading after the request completes
    }
  };

  return { updateCheckoutDetails, updateAccountDetails, loading, error };
};

export default useUpdateCustomerDetails;
