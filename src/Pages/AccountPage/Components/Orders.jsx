import React, { useState } from "react";
import useUserOrders from "../Hooks/useUserOrders";
import styles from '../Styles/Orders.module.css';

const Orders = ({ loggedInUser }) => {
  const [loading, setLoading] = useState(true);
  // get the orders of the currently logged in user
  const { orders } = useUserOrders(loggedInUser, setLoading);

  return (
    <div className={styles["panel"]}>
      <h2 style={{ color: "white" }}>User Orders</h2>
      {/* if data is loading render loading  */}
      {loading ? (
        <p style={{ color: "#ffffff" }}>Loading orders...</p>
      ) : orders.length > 0 ? (
        // if there is data map through and render a list of orderId and its delivery address
        <ul style={{ listStyleType: "none", padding: 0, width: "100%" }}>
          {orders.map((order) => (
            <li key={order.OrderID} style={{ color: "#ffffff", padding: "10px", borderBottom: "1px solid #5e43f3" }}>
              <p><strong>Order ID: </strong> {order.OrderID}</p>
              <p><strong>Delivery Address: </strong> {order.StreetAddress}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#ffffff" }}>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
