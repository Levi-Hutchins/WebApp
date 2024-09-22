import React from "react";
import Button from "@mui/material/Button";
const CustomButton = ({onClick, displayValue, displayIcon}) => {
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
        endIcon={displayIcon}
        className="SearchButton"
        onClick={onClick}
      >
        {displayValue}
      </Button>
    </div>
  );
};

export default CustomButton;
