import React from "react";
import { useState } from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import CustomBadge from "../Badge/CustomBadge";

const NavBar = () => {
  const navigate = useNavigate();
  const [adminMode, setAdminMode] = useState(true);
  return (
    <div className="nav">
      <div className="left-section">
        <Link to="/UserAccount" className="account-link">
          <AccountCircleIcon
            fontSize="large"
            sx={{
              color: "#5e43f3",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />
        </Link>
        {adminMode ? (   <Link to="/Admin" className="homepage">
          ADMIN
        </Link>) : (<></>)}

        <Link to="/" className="homepage">
          HOME
        </Link>
        <Link to="/Search" className="nav-item">
          ITEM SEARCH
        </Link>
        <Link to="/Test" className="nav-item">
          TEST
        </Link>
      </div>

      <ul className="right-section">
        <li className="register-button-container">
          <Button
            className="register-button"
            variant="contained"
            onClick={() => navigate("/Register")}
            sx={{
              fontFamily: "Andale Mono, monospace",
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
              fontFamily: "Andale Mono, monospace",
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
          <CustomBadge
            className="shop-button"
            onClick={() => navigate("/ShoppingCart")}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
