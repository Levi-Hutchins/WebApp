import React from "react";
import styles from "../Styles/CheckoutForm.module.css";
import CheckoutInputBox from "../../../shared-components/InputBox/CheckoutInputBox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
            <h1 className={styles["checkout-title"]}>Check Out</h1>

      <div className={styles["checkout-inputs"]}>
        <CheckoutInputBox
          displayValue={"Email Address"}
          handleChange={handleChange}
          errorLevel={!!errors.emailAddress}
          value={values.emailAddress}
          name="emailAddress"
        />

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
        </div>
        <div className={styles["checkout-inputs"]}>

        <CheckoutInputBox
          displayValue={"PostCode"}
          handleChange={handleChange}
          errorLevel={!!errors.postCode}
          value={values.postCode}
          name="postCode"
          onKeyPress={handleNumbersOnly}
        />
        <CheckoutInputBox
          displayValue={"Suburb"}
          handleChange={handleChange}
          errorLevel={!!errors.suburb}
          value={values.suburb}
          name="suburb"
        />
        </div>
        <div className={styles["checkout-inputs"]}>
        <FormControl
          sx={{
            width: "200px",
            color: "white",
            marginLeft: "15px",
            "& .MuiSelect-select": {
      color: "white", 
    },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: !!errors.state ? "red" : "#454545",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: !!errors.state ? "red" : "#5e43f3",
              },
            "& .MuiInputBase-root": {
              backgroundColor: "#24242c",
            },
          }}
        >
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select name="state" value={values.state} label="State" onChange={handleChange}>
            <MenuItem value={"NSW"}>NSW</MenuItem>
            <MenuItem value={"QLD"}>QLD</MenuItem>
            <MenuItem value={"SA"}>SA</MenuItem>
            <MenuItem value={"WA"}>WA</MenuItem>
            <MenuItem value={"NT"}>NT</MenuItem>
          </Select>
        </FormControl>

        {/* <CheckoutInputBox
       make this a drop down
        displayValue={"Suburb"}
        handleChange={handleChange}
        errorLevel={!!errors.suburb}
        value={values.suburb}
        name="suburb"
      /> */}
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
