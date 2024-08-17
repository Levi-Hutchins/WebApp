import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 2px",
    fontSize: "0.7rem", // Adjust the font size to make it smaller

  
  },
}));

const CustomBadge = ({itemCount}) => {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon fontSize="medium" sx={{color: 'white'}}/>
      </StyledBadge>
    </IconButton>
  );
};

export default CustomBadge;
