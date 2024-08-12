import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBoxWithButton.css";
import CustomButton from "../Button/CustomButton";

const InputBoxWithButton = ({displayValue, onChange, onSubmit}) => {
 


  return (
      <div>
        <Box
          component="form"
          className="input-box"
          noValidate
          autoComplete="off"
          
        >
          <TextField

            label={displayValue}
            variant="outlined"
            className="input-field"
            sx={{
              color: "rgb(225, 225, 225)",
              "& .MuiOutlinedInput-root": {
                color: "white"},  
              "&.Mui-focused": { color: "white" },
            }}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <CustomButton onSubmit={onSubmit}></CustomButton>
              ),
            }}
          />

        </Box>
      </div>
  );
};

export default InputBoxWithButton;