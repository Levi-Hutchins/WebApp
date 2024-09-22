import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./CheckoutInputBox.module.css";

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
          input: { color: "black" },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: errorLevel ? "red" : "#454545",
            borderWidth: errorLevel ? "2px" : "1px",
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: errorLevel ? "red" : "#5e43f3",
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
