import axios from "axios";

const useFindItem = () => {
  const findItemByID = async (id) => {
    try {
      // send request to fetch item by ID
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
      console.error("Error fetching item by ID:", err);
    }
  };

  const findItemByName = async (name) => {
    try {
      // encode the name to handle special characters in URL
      const encodedName = encodeURIComponent(name);
      // send  request to fetch item by name
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
      console.error("Error fetching item by name:", err);
    }
  };

  const findItemByAuthor = async (author) => {
    try {
      // encode the author name to handle special characters in URL
      const encodedAuthor = encodeURIComponent(author);
      // send  request to fetch item by author
      const item = await axios.get(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/find-one?where=(Author,eq,${encodedAuthor})`,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return item.data;
    } catch (err) {
      console.error("Error fetching item by author:", err);
    }
  };

  return { findItemByID, findItemByName, findItemByAuthor };
};

export default useFindItem;
