import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBoxWithButton.css";
import CustomButton from "../Button/CustomButton";

const InputBoxWithButton = (props) => {
 


  return (
    <>
      <form>
        <Box
          component="form"
          className="input-box"
          noValidate
          autoComplete="off"
          
        >
          <TextField

            label={props.displayValue}
            variant="outlined"
            className="input-field"
            sx={{
              color: "rgb(225, 225, 225)",
              "& .MuiOutlinedInput-root": {
                color: "white"},  
              "&.Mui-focused": { color: "white" },
            }}
            onChange={props.onChange}
            InputProps={{
              endAdornment: (
                <CustomButton onSubmit={props.onSubmit}></CustomButton>
              ),
            }}
          />

        </Box>
      </form>
    </>
  );
};

export default InputBoxWithButton;
