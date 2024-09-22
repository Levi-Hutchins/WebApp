import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CustomButton from "../../../Components/Button/CustomButton";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "../Styles/ShoppingCart.module.css";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../Redux/Cart/CartSlice";



const ShoppingCart = ({ cartItems, productDetailsById, handleSubmit }) => {
    const dispatch = useDispatch();


    const handleRemoveFromCart= (event, value) => {
        event.stopPropagation();
        dispatch(removeFromCart(value))
    
      };
  return (
    <div className={styles["cart-summary-panel"]}>
      <h1 className={styles["order-summary-title"]}>Order Summary</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cartItems.map((cartItem) => {
          const productDetail = productDetailsById[cartItem.ID];
          if (productDetail) {
            return (
              <li key={cartItem.ID} className={styles["cart-item"]}>
                <div className={styles["item-details"]}>
                  <div className={styles["item-name-price"]}>
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
                  <div className={styles["item-buttons"]}>
                    <Fab
                      size="small"
                      sx={{
                        width: 24,
                        height: 24,
                        minHeight: 24,
                      }}
                      color="secondary"
                      aria-label="remove"
                      onClick={(event) => handleRemoveFromCart(event, cartItem)}
                    >
                      <RemoveIcon fontSize="small" />
                    </Fab>
                    <Fab
                      size="small"
                      sx={{
                        width: 24,
                        height: 24,
                        minHeight: 24,
                      }}
                      color="secondary"
                      aria-label="add"
                      onClick={() => alert("Increased: "+ cartItem.Name)}

                    >
                      <AddIcon fontSize="small" />
                    </Fab>
                  </div>
                </div>

                <Divider sx={{ borderColor: "white", margin: "8px 0" }} component="li" />
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
