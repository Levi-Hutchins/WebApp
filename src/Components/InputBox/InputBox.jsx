import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBox.css";

const InputBox = (props) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => {
    alert("Submittedddddddd");
  };
  const handleChange = (event) => {
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
            sx={{ input: { color: "rgb(185, 185, 185)" } }}
            onChange={handleChange}
          />
        </Box>
      </form>
    </>
  );
};

export default InputBox;
