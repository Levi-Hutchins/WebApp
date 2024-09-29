import { useState } from "react";
import axios from "axios";

const useFindItem = () => {
  const [error, setError] = useState(false);

  const findItemByID = async (id) => {
    setError(null);
    try {
      const item = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/Product/find-one?",
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
          params: {
            where: `(ID,eq,${id})`,
          },
        }
      );
      return item.data;
    } catch (err) {
      setError(true);
    }
  };
  const findItemByName = async (name) => {
    setError(null);
    try {
      const encodedName = encodeURIComponent(name);

      const item = await axios.get(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/find-one?where=(Name,eq,${encodedName})`,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return item.data;
    } catch (err) {
      setError(true);
      console.error("Error fetching item:", err);
    }
  };
  const findItemByAuthor = async (author) => {
    setError(null);
    try {
      const encodedAuthor = encodeURIComponent(author);

      const item = await axios.get(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/find-one?where=(Author,eq,${encodedAuthor})`,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      console.log(item.data);
      return item.data;
    } catch (err) {
      setError(true);
      console.error("Error fetching item:", err);
    }
  };
  return { findItemByID, findItemByName, findItemByAuthor, error };
};

export default useFindItem;
