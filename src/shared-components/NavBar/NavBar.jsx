import React, { useState, useEffect } from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import CustomBadge from "../Badge/CustomBadge";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [adminMode, setAdminMode] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("LogInData"); // Get login status from localStorage
    setAdminMode(localStorage.getItem("IsAdmin"));

    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle Log In/Log Out button click
  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      // Log out the user
      localStorage.removeItem("LogInData");
      setIsLoggedIn(false); // Update the state to reflect the logout
      navigate("/"); 
    } else {
      // Navigate to login page if not logged in
      navigate("/LogIn");
    }
  };

  const checkLogIn = () =>  {
    const UserLoggedIn = localStorage.getItem("LogInData"); //check if user is logged in

    if (UserLoggedIn){
      console.log("User Account")
      navigate("/UserAccount"); // If logged in, navigate to account page    }
    }
    else {
      navigate("/LogIn"); // If not logged in, redirect to login page
    }
  };


  return (
    <div className="nav">
      <div className="left-section">
        <div className="account-link" onClick={checkLogIn}>
          <AccountCircleIcon
            fontSize="large"
            sx={{
              color: "#5e43f3",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          />
          </div>
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
            variant={isLoggedIn ? "contained" : "outlined"}
            onClick={handleLoginLogoutClick}
            sx={{
              fontFamily: "Andale Mono, monospace",
              borderColor: isLoggedIn ? "transparent" : "#5e43f3", 
              backgroundColor: isLoggedIn ? "#5e43f3" : "transparent", 
              color: isLoggedIn ? "white" : "#5e43f3", 
              "&:hover": {
                backgroundColor: isLoggedIn ? "#4e3ac0" : "transparent",
                borderColor: isLoggedIn ? "transparent" : "#4e3ac0",
              },
            }}
          >
            {isLoggedIn ? "Log Out" : "Log In"} 
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
