import React from "react";
import {  useSelector } from "react-redux";
import styles from "./ShoppingCartPage.module.css"
import CheckoutInputBox from "../../Components/InputBox/CheckoutInputBox";

const ShoppingCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <div className={styles["cart-summary-panel"]}>
      <h1 style={{ color: "white" }}>Cart Summary </h1>
      <ul style={{ listStyle: 'none'}}>
        {cartItems.map((item) => (
          <li key={item.ID} className={styles["cart-items"]}>
            {item.Name} - {item.cartQuantity}
          </li>
        ))}
      </ul>
      </div>

      <div className={styles["checkout-panel"]}>
      <h1 style={{ color: "black" }}>Check out </h1>
      <div className={styles["checkout-inputs"]}>
      <CheckoutInputBox/>
      <CheckoutInputBox/>
      


      </div>
      <div className={styles["checkout-inputs"]}>
      <CheckoutInputBox/>
      <CheckoutInputBox/>
      


      </div>

        </div>
     
    </div>
  );
};

export default ShoppingCartPage;
