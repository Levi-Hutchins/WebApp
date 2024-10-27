import { useState } from 'react';
import axios from 'axios';

const useUpdateCustomerDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const transformRowsToData = (rows) => {
    return rows.reduce((acc, row) => {
      acc[row.accountValue.replace(/\s+/g, '')] = row.value;
      return acc;
    }, {});
  };
  const updateCheckoutDetails = async (updatedData, ID) => {
    setLoading(true);
    setError(null);
    const transformData = transformRowsToData(updatedData)
    try {
      const response = await axios.patch(`http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${ID}`, transformData,{
        headers: {
          "xc-token": process.env.REACT_APP_APIKEY,
        }
      });
      return response.data;
    } catch (err) {
      setError('Error updating customer details');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const updateAccountDetails = async (updatedData, ID) => {
    setLoading(true);
    setError(null);
    const transformData = transformRowsToData(updatedData)
    
    const newData = {
      Email: transformData.EmailAddress,
      Name: transformData.FullName
    }
    try {
      const response = await axios.patch(`http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${ID}`, newData,{
        headers: {
          "xc-token": process.env.REACT_APP_APIKEY,
        }
      });
      return response.data;
    } catch (err) {
      setError('Error updating customer details');
      throw err;
    } finally {
      setLoading(false);
    }
  
  
  
  
  }

  return { updateCheckoutDetails, updateAccountDetails, loading, error };
};


export default useUpdateCustomerDetails;
