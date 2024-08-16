import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBoxWithButton.css";
import CustomButton from "../Button/CustomButton";
import SendIcon from "@mui/icons-material/Search";


const InputBoxWithButton = ({displayValue, onSubmit, onChange}) => {
 


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
                <CustomButton onSubmit={onSubmit} displayIcon={<SendIcon/>}></CustomButton>
              ),
            }}
          />

        </Box>
      </form>
    </>
  );
};

export default InputBoxWithButton;
