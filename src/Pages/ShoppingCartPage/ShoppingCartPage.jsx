import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./ShoppingCartPage.module.css";
import CheckoutInputBox from "../../Components/InputBox/CheckoutInputBox";
import { toast } from "react-toastify";

const ShoppingCartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailAddressChange = (e) => setEmailAddress(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  return (
    <div>
      <div className={styles["cart-summary-panel"]}>
        <h1 style={{ color: "white" }}>Cart Summary </h1>
        <ul style={{ listStyle: "none" }}>
          {cartItems.map((item) => (
            <li key={item.ID} className={styles["cart-items"]}>
              {item.Name} - {item.cartQuantity}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles["checkout-panel"]}>
        <h1 style={{ color: "black" }}>Check out </h1>
        <div className={styles["checkout-input-name"]}>
          <CheckoutInputBox
            displayValue={"First Name"}
            handleChange={handleFirstNameChange}
          />
          <CheckoutInputBox
            displayValue={"Last Name"}
            handleChange={handleLastNameChange}
          />
        </div>
        <div className={styles["checkout-inputs"]}>
          <CheckoutInputBox
            displayValue={"Email Address"}
            handleChange={handleEmailAddressChange}
          />
          <CheckoutInputBox
            displayValue={"Phone Number"}
            handleChange={handlePhoneNumberChange}
            onKeyPress={(event) => {
              if (
                !(
                  /[0-9]/.test(event.key) ||
                  event.key === "Backspace" ||
                  event.key === "Delete"
                )
              ) {
                event.preventDefault();
                toast.warning("Please enter numbers only", {
                  position: "bottom-right",
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
