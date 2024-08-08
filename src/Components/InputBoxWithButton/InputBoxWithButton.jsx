import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBoxWithButton.css";
import SearchButton from "../Button/SearchButton";

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
              "&.Mui-focused": { color: "white" },
            }}
            onChange={props.onChange}
            InputProps={{
              endAdornment: (
                <SearchButton onSubmit={props.onSubmit}></SearchButton>
              ),
            }}
          />
        </Box>
      </form>
    </>
  );
};

export default InputBoxWithButton;
