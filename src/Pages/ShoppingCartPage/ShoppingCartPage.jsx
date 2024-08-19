import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ShoppingCartPage.module.css"

const ShoppingCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <div className={styles["div-border"]}>
      <h1 style={{ color: "white" }}>Cart Summary </h1>
      <ul style={{ listStyle: 'none'}}>
        {cartItems.map((item) => (
          <li key={item.ID} className={styles["cart-items"]}>
            {item.Name} - {item.cartQuantity}
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  );
};

export default ShoppingCartPage;
