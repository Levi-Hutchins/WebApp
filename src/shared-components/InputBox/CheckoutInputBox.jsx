import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./CheckoutInputBox.module.css";
// custom MUI input box design for the checkout page specifically 
const CheckoutInputBox = ({ displayValue, handleChange, errorLevel, onKeyPress, width, value, name }) => {
  return (
    <Box
      component="form"
      className={styles["input-box-comp"]}
      noValidate
      autoComplete="off"
    >
      <TextField
        onKeyDown={onKeyPress}
        label={displayValue}
        variant="outlined"
        className={styles["input-field-comp"]}
        InputProps={{
          className: styles["input-field-root"],
        }}
        InputLabelProps={{
          className: styles["input-label"],
        }}
        sx={{
          width: width || "100%",
          input: { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: errorLevel ? "red" : "#454545",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: errorLevel ? "red" : "#5e43f3",
            borderWidth: errorLevel ? "1px" : "1px",


          },
        }}
        onChange={handleChange}  
        value={value}  
        name={name}  
        error={errorLevel}
      />
    </Box>
  );
};

export default CheckoutInputBox;
