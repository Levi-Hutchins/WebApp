import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Search";
const CustomButton = ({displayValue, buttonIcon, onSubmit}) => {
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
        endIcon={buttonIcon}
        className="SearchButton"
        onClick={onSubmit}
      >
        {displayValue}
      </Button>
    </div>
  );
};

export default CustomButton;
