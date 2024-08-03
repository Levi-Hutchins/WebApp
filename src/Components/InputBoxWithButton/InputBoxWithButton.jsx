import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBoxWithButton.css";
import SearchButton from "../Button/SearchButton";

const InputBoxWithButton = (props) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    alert("Submittedddddddd");
  };
  const handleChange = (event) => {
    console.log(event.target.value)
    setInputValue(event.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
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
            sx={{ input: { color: "rgb(225, 225, 225)" } }}
            onChange={handleChange}
            InputProps={{endAdornment: (<SearchButton inputData={inputValue}></SearchButton>)}}
          />
        </Box>
      </form>
    </>
  );
};

export default InputBoxWithButton;
