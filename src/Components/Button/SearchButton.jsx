import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Search";
const SearchButton = (props) => {
  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#5e43f3",
          "&:hover": {
            backgroundColor: "#4e3ac0",
          },
        }}
        variant="contained"
        endIcon={<SendIcon />}
        className="SearchButton"
        onClick={props.onSubmit}
      >
        {props.displayValue}
      </Button>
    </div>
  );
};

export default SearchButton;
