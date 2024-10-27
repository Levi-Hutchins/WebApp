import React, { useState, useEffect } from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import CustomBadge from "../Badge/CustomBadge";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [adminMode, setAdminMode] = useState(false); // State to track if user is an admin
  const [isEmployee, setIsEmployee] = useState(false); //State to track if user is employee
  const [isCustomer, setIsCustomer] = useState(false); // State to track if user is a customer

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("LogInData"); // Get login status from localStorage
    if (loggedIn) {
      setIsLoggedIn(true);
  }})  
  
  // Helper function to update login and admin status from localStorage
  const updateLoginStatus = () => {
    const loginData = localStorage.getItem("LogInData");
    const isAdmin = localStorage.getItem("IsAdmin"); // Check if admin status is true

    // Parse login data and validate it
    if (loginData) {
      try {
        const parsedData = JSON.parse(loginData); // Parse JSON data
        if (parsedData.EmailAddress) {
          console.log("SetIsLoggedIn == True")
          setIsLoggedIn(true); // User is logged in if valid data exists
          setIsEmployee(parsedData.User === "Employee"); // check if user is employee
          setIsCustomer(parsedData.User === "Customer") // check if user is customer
          setAdminMode(isAdmin === "true")

        } else {
          console.log("SetIsLoggedIn == False")
          setIsLoggedIn(false);
          setIsEmployee(false)
          setIsCustomer(false)
        }
      } catch (error) {
        console.error("Error parsing LogInData", error);
        setIsLoggedIn(false); // Default to logged out state on error
      }
    } else {
      setIsLoggedIn(false); // Default to logged out if no data found
    }
  };

  // Check if the user is logged in when the component mounts or localStorage changes
  useEffect(() => {
    updateLoginStatus(); // Initial check

    // Add an event listener to detect changes in localStorage
    window.addEventListener("storage", updateLoginStatus);

    return () => { 
      window.removeEventListener("storage", updateLoginStatus);
    };
  });

  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("LogInData");
      localStorage.removeItem("IsAdmin");
      setIsLoggedIn(false);
      setAdminMode(false);
      setIsEmployee(false);
      setIsCustomer(false);
      navigate("/"); // Redirect to home after logout
    } else {
      navigate("/LogIn"); // Navigate to login page if not logged in
    }
  };

  const checkLogIn = () => {
    if (localStorage.getItem("LogInData")) {
      navigate("/UserAccount"); // Navigate to user account if logged in
    } else {
      navigate("/LogIn"); // Redirect to login page if not logged in
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
        {adminMode ? (   
          <Link to="/Admin" className="homepage">
            ADMIN
          </Link>) : (<></>)
        } 
        {isEmployee ? (
          <Link to="/Employee" className="nav-item">
            EMPLOYEE
          </Link>) : (<></>)
        }
        <Link to="/" className="homepage">
          HOME
        </Link>

        {!adminMode ? (
        <Link to="/Search" className="nav-item">
          ITEM SEARCH
        </Link>) : (<></>)
        }
      </div>

      <ul className="right-section">
        <li className="register-button-container">
          {!isLoggedIn ?(
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
          </Button>) : (<></>)
        }
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
        {!adminMode ? (<CustomBadge
            className="shop-button"
            onClick={() => navigate("/ShoppingCart")}
          />) : (<></>)
        }
        </li>
      </ul>
    </div>
  );
};
  
export default NavBar;
