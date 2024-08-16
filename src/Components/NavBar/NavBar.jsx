import React from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../Button/CustomButton";
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <Link to="/" className="homepage">
        HOME
      </Link>

      <ul>
        <li>
          <Link to="/Search">ITEM SEARCH</Link>
        </li>
        <li>
          <Link to="/Test">TEST</Link>
        </li>

        <li className="register-button-container">
          <Button
            className="register-button"
            variant="contained"
            onClick={() => navigate("/Register")}
            sx={{
              fontFamily: "Andale Mono, monospace	",
              backgroundColor: "#5e43f3",
              "&:hover": {
                backgroundColor: "#4e3ac0",
              },
            }}
          >
            Register
          </Button>
        </li>
        <li className="login-button-container">
          <Button
            className="login-button"
            variant="outlined"
            onClick={() => navigate("/LogIn")}
            sx={{
              fontFamily: "Andale Mono, monospace	",
              borderColor: "#5e43f3",
              color: "white",
              "&:hover": {
                borderColor: "#4e3ac0",
              },
            }}
          >
            Log In
          </Button>
        </li>
        <li className="shop-button-container">
          <CustomButton
            className="shop-button"
            onSubmit={() => navigate("/Search")}
            displayIcon={<ShoppingCartIcon/>}
          
          />
          
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
