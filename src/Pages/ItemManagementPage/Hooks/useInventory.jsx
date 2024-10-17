import { useCallback } from "react";
import axios from "axios";

const useInventory = () => {
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/Product",
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data.list; 
    } catch (err) {
      console.error("Error fetching products:", err);
      return []; 
    }
  };

  const getAllStocktake = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake",
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      return response.data.list;
    } catch (err) {
      console.error("Error fetching stocktake:", err);
      return []; 
    }
  };
// a way to sort of cache the call to prevent future / redundant re-renders
  const getAllInventory = useCallback(async () => {
    try {
      const products = await getAllProducts();
      const stocktakes = await getAllStocktake();

      if (!Array.isArray(products) || !Array.isArray(stocktakes)) {
        throw new Error("Invalid data format: Expected arrays for products and stocktakes.");
      }

      // Loop through all the stocktake items, find the the corresponding products
      // by finding the id
      const inventory = stocktakes.map((stocktake) => {
        const relatedProduct = products.find(
          (product) => product.ID === stocktake.ProductId
        );
        // for each item return the productname and quantity 
        return {
          Name: relatedProduct ? relatedProduct.Name : "Unknown Product",
          Quantity: stocktake.Quantity,
          ItemType: stocktake.Source.SourceName
        };
      });
      console.log(inventory);
      return inventory;
    } catch (err) {
      console.error("Error fetching inventory:", err);
      return [];
    }
    // Empty dependency array to ensure `getAllInventory` has a stable reference
  }, []); 

  return { getAllInventory };
};

export default useInventory;
