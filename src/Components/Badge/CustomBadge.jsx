import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 2px",
    fontSize: "0.7rem", 

  
  },
}));



const CustomBadge = ({ onClick}) => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  console.log("ITEMS ",cartItems)
  const itemCount = cartItems.reduce((a ,b) => a + b.cartQuantity, 0)
  console.log(itemCount)
  return (
    <IconButton aria-label="cart" onClick={onClick}>
      <StyledBadge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon fontSize="medium" sx={{color: 'white'}}/>
      </StyledBadge>
    </IconButton>
  );
};

export default CustomBadge;
