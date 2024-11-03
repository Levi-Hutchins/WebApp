import { useCallback } from "react";
import axios from "axios";

const useInventory = () => {
  const getAllProducts = async () => {
    try {
      // fetch all products from the api
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
      console.error("error fetching products:", err);
      return []; 
    }
  };

  const getAllStocktake = async () => {
    try {
      // fetch all stocktake entries from the api
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
      console.error("error fetching stocktake:", err);
      return []; 
    }
  };

  // memoiszd function to fetch and combine product and stocktake data
  const getAllInventory = useCallback(async () => {
    try {
      const products = await getAllProducts();
      const stocktakes = await getAllStocktake();

      if (!Array.isArray(products) || !Array.isArray(stocktakes)) {
        throw new Error("invalid data format: expected arrays for products and stocktakes.");
      }

      // map each stocktake entry to an inventory item, matching by product id
      const inventory = stocktakes.map((stocktake) => {
        const relatedProduct = products.find(
          (product) => product.ID === stocktake.ProductId
        );
        return {
          name: relatedProduct ? relatedProduct.Name : "unknown product",
          quantity: stocktake.Quantity,
          itemType: stocktake.Source.SourceName
        };
      });
      return inventory;
    } catch (err) {
      console.error("error fetching inventory:", err);
      return [];
    }
  }, []); // empty dependency array ensures function is only created once

  return { getAllInventory };
};

export default useInventory;
