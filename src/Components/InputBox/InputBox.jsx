import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//import "./InputBox.css";

const InputBox = (props) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box
        component="form"
        className="input-box"
        noValidate
        style={{
            width: "25ch",
            borderRadius: "20px"
        }}
        autoComplete="off"
      >
        <TextField
          label= {props.displayValue}
          variant="outlined"
          className="input-field"
          style ={{
            width: "25ch",
            borderRadius: "20px"


          }}
        />
      </Box>
    </>
  );
};

export default InputBox;
