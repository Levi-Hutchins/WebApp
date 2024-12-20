import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./InputBox.module.css";
// custome MUI inputbox to handle multiple use cases throughout the app
const InputBox = ({ displayValue, handleChange, errorLevel, isPassword, value, name, onKeyPress }) => {
  return (
    <Box
      component="form"
      className={styles["input-box-comp"]}
      noValidate
      autoComplete="off"
    >
      <TextField
        label={displayValue}
        variant="outlined"
        className={styles["input-field-comp"]}
        type={isPassword ? "password" : "text"}
        InputProps={{
          className: styles["input-field-root"],
        }}
        InputLabelProps={{
          className: styles["input-label"],
        }}
        sx={{
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
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5e43f3", 
          },

          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#5e43f3",
            },
        }}
        onChange={handleChange}
        value={value}  
        name={name}
        onKeyDown={onKeyPress}

      />
    </Box>
  );
};

export default InputBox;
