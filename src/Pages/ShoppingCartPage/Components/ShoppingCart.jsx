import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CustomButton from "../../../Components/Button/CustomButton";
import styles from "../Styles/ShoppingCart.module.css";

const ShoppingCart = ({ cartItems, productDetailsById, handleSubmit }) => {
  return (
    <div className={styles["cart-summary-panel"]}>
      <h1 style={{ color: "white" }}>Shopping Cart</h1>
      <ul style={{ listStyle: "none" }}>
        {cartItems.map((cartItem) => {
          const productDetail = productDetailsById[cartItem.ID];
          if (productDetail) {
            return (
              <li key={cartItem.ID} className={styles["cart-item"]}>
                <div className={styles["item-details"]}>
                  {cartItem.cartQuantity > 1 ? (
                    <span className={styles["item-name"]}>
                      {cartItem.cartQuantity} x {cartItem.Name}
                    </span>
                  ) : (
                    <span className={styles["item-name"]}>{cartItem.Name}</span>
                  )}
                  <span className={styles["item-price"]}>
                    ${cartItem.cartQuantity * productDetail.Price.toFixed(2)}
                  </span>
                </div>
              </li>
            );
          } else {
            return (
              <li key={cartItem.ID} className={styles["cart-item"]}>
                <div className={styles["item-details"]}>
                  <span className={styles["item-name"]}>{cartItem.Name}</span>
                  <span className={styles["item-price"]}></span>
                </div>
                <div className={styles["item-quantity"]}>
                  Quantity: {cartItem.cartQuantity}
                </div>
              </li>
            );
          }
        })}
      </ul>
      <div className={styles["checkout-button"]}>
          <CustomButton
            displayValue={"Checkout"}
            onClick={handleSubmit}
            displayIcon={<ShoppingCartCheckoutIcon />}
          />
        </div>
    </div>
  );
};

export default ShoppingCart;
