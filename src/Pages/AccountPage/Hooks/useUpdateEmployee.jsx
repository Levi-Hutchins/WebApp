import { useState } from "react";
import axios from "axios";

const useUpdateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // helper function to transform rows into an object with key-value pairs
  const transformRowsToData = (rows) => {
    return rows.reduce((acc, row) => {
      acc[row.accountValue.replace(/\s+/g, "")] = row.value; // removes whitespace from keys
      return acc;
    }, {});
  };

  const updateEmployeeDetails = async (updatedData, previousID) => {
    setLoading(true);
    setError(null);

    // transform the data to the format required by the API
    const transformedData = transformRowsToData(updatedData);

    const newData = {
      Email: transformedData.EmailAddress,
      Name: transformedData.FullName,
      UserName: transformedData.UserName,
    };

    try {
      // send a patch request to update employee details based on ID
      const response = await axios.patch(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${previousID}`,
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
      setError("Error updating employee details");
      throw err;
    } finally {
      setLoading(false); // stop loading after the request completes
    }
  };

  return { updateEmployeeDetails, loading, error };
};

export default useUpdateEmployee;
