import React from "react";
import styles from "../styles/CheckoutForm.module.css";
import CheckoutInputBox from "../../../shared-components/InputBox/CheckoutInputBox";
import { toast } from "react-toastify";
const handleNumbersOnly = (e) => {
    if (!(/[0-9]/.test(e.key) || e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      toast.warning("Please enter numbers only", {
        position: "bottom-right",
      });
    }
  };
const CheckoutForm = ({ values, errors, handleChange, handleSubmit }) => {
  return (
    <div className={styles["checkout-panel"]}>

    <div className={styles["checkout-input-name"]}>
      <CheckoutInputBox
        displayValue={"First Name"}
        handleChange={handleChange}
        errorLevel={!!errors.firstName}
        value={values.firstName}
        name="firstName"
      />
      <CheckoutInputBox
        displayValue={"Last Name"}
        handleChange={handleChange}
        errorLevel={!!errors.lastName}
        value={values.lastName}
        name="lastName"
      />
    </div>

    <div className={styles["checkout-inputs"]}>
      <CheckoutInputBox
        displayValue={"Email Address"}
        handleChange={handleChange}
        errorLevel={!!errors.emailAddress}
        value={values.emailAddress}
        name="emailAddress"
      />
      {errors.emailAddress && (
        <span className={styles["error-text"]}>{errors.emailAddress}</span>
      )}
      <CheckoutInputBox
        displayValue={"Phone Number"}
        handleChange={handleChange}
        errorLevel={!!errors.phoneNumber}
        value={values.phoneNumber}
        name="phoneNumber"
        onKeyPress={handleNumbersOnly}
      />
    </div>

    <div className={styles["checkout-input-address"]}>
      <CheckoutInputBox
        width="450px"
        displayValue={"Street Address"}
        handleChange={handleChange}
        errorLevel={!!errors.streetAddress}
        value={values.streetAddress}
        name="streetAddress"
      />
      <CheckoutInputBox
        displayValue={"PostCode"}
        handleChange={handleChange}
        errorLevel={!!errors.postCode}
        value={values.postCode}
        name="postCode"
        onKeyPress={handleNumbersOnly}
      />
    </div>

    <div className={styles["checkout-input-card"]}>
      <CheckoutInputBox
        width="450px"
        displayValue={"Card Number"}
        handleChange={handleChange}
        errorLevel={!!errors.cardNumber}
        value={values.cardNumber}
        name="cardNumber"
        onKeyPress={handleNumbersOnly}
      />
      <CheckoutInputBox
        width="450px"
        displayValue={"Name on Card"}
        handleChange={handleChange}
        errorLevel={!!errors.nameOnCard}
        value={values.nameOnCard}
        name="nameOnCard"
      />
    </div>

    <div className={styles["checkout-input-card-expiry-cvv"]}>
      <CheckoutInputBox
        width="200px"
        displayValue={"Expiry Date (MM / YY)"}
        handleChange={handleChange}
        errorLevel={!!errors.expiryDate}
        value={values.expiryDate}
        name="expiryDate"
      />
      <CheckoutInputBox
        width="150px"
        displayValue={"Security Code"}
        handleChange={handleChange}
        errorLevel={!!errors.securityCode}
        value={values.securityCode}
        name="securityCode"
        onKeyPress={handleNumbersOnly}
      />
    </div>
  </div>
  );
};

export default CheckoutForm;
