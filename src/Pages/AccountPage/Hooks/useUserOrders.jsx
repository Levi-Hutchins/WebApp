import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useUserOrders = (loggedInUser, setLoading = () => {}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setLoading(false);
        return;
      }

      setLoading(true); 

      try {
        const userResponse = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/TO/find-one",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
            params: {
              where: `(Email,eq,${loggedInUser.EmailAddress})`,
            },
          }
        );

        const userData = userResponse.data;
        const userID = userData.CustomerID;
        
        const ordersResponse = await axios.get(
          `http://localhost:8080/api/v1/db/data/v1/inft3050/Orders/`,
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
            params: {
              where: `(Customer,eq,${userID})`,
            },
          }
        );

        setOrders(ordersResponse.data.list);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.info("No orders found for this user", { position: "bottom-right" });
          setOrders([]); 
        } else {
          toast.error("Error fetching user orders", { position: "bottom-right" });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [loggedInUser, setLoading]);

  return { orders };
};

export default useUserOrders;
