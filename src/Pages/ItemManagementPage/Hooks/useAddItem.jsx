import { useState } from 'react';
import axios from 'axios';

const useAddItem = () => {
  const [error, setError] = useState(false);

  const addItem = async (itemDetails) => {
    setError(null);
    try {
        console.log("submitting ",itemDetails)
      const response = await axios.post('http://localhost:8080/api/v1/db/data/v1/inft3050/Product', itemDetails,{
        headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
      });  
      return response.data;  
    } catch (err) {

      setError(true);
      console.log(err)
      throw err;  
    }
  };

  return { addItem, error };
};

export default useAddItem;
