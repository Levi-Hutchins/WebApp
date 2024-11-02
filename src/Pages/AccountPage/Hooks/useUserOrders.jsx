import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useUserOrders = (loggedInUser, setLoading = () => {}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      // check if the user is logged in and has an email; if not, stop loading
      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // fetch user data to get the user ID based on email
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

        // fetch orders for the user using the retrieved user ID
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

        // set the fetched orders in the state
        setOrders(ordersResponse.data.list);
      } catch (error) {
        // if no orders are found, display a message
        if (error.response && error.response.status === 404) {
          toast.info("No orders found for this user", {
            position: "bottom-right",
          });
          setOrders([]);
        } else {
          // display an error message for any other error
          toast.error("Error fetching user orders", {
            position: "bottom-right",
          });
        }
      } finally {
        // set loading to false once the fetch completes
        setLoading(false);
      }
    };
    // call the function
    fetchUserOrders();
  }, [loggedInUser, setLoading]); //dependencies

  return { orders };
};

export default useUserOrders;
