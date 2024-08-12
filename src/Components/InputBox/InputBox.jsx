import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBox.css";

const InputBox = ({ displayValue, handleChange, errroLevel }) => {


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
              input: { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": errroLevel
                ? { borderColor: "red" }
                : { borderColor: "#454545" },
            }}
            onChange={handleChange}
          />
        </Box>
      </form>
    </>
  );
};

export default InputBox;
