import axios from "axios";
import { useState } from "react";

// Use the one hook for all item mutations (ad, edit, delete) much easier to manage
const useItemMutations = () => {
    const [error, setError] = useState(false);

    const addItem = async (itemDetails) => {
        setError(null);
        try {
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
    const deleteItem = async (itemDetails) =>{
        setError(null);
        try {
          const response = await axios.delete(`http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${itemDetails.ID}`,{
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
    }
    
      return { addItem, deleteItem, error };
}

export default useItemMutations;