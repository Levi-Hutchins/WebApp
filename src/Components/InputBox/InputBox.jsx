import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./InputBox.css";

const InputBox = (props) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box
        component="form"
        className="input-box"
        noValidate
        autoComplete="off"
      >
        <TextField
          label= {props.displayValue}
          variant="outlined"
          className="input-field"
        />
              <TextField id="filled-basic" label="Filled" variant="filled" />

      </Box>
    </>
  );
};

export default InputBox;
