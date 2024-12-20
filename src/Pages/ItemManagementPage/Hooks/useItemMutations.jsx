import axios from "axios";
import { useState } from "react";

// use one hook for all item mutations (add, edit, delete) to simplify management
const useItemMutations = () => {
  const [error, setError] = useState(false);

  const addItem = async (itemDetails) => {
    setError(null);
    try {
      // send post request to add a new item
      const response = await axios.post(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/Product",
        itemDetails,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(true);
      console.log(err);
      throw err;
    }
  };

  const deleteItem = async (itemDetails) => {
    setError(null);
    try {
      // send delete request to remove an item by id
      const response = await axios.delete(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${itemDetails.ID}`,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(true);
      console.log(err);
      throw err;
    }
  };

  const updateItem = async (itemID, updatedValues) => {
    setError(null);
    try {
      // send patch request to update item details by id
      const response = await axios.patch(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${itemID}`,
        updatedValues,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(true);
      console.log(err);
      throw err;
    }
  };

  return { addItem, deleteItem, updateItem, error };
};

export default useItemMutations;
