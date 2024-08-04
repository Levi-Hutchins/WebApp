import React from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="nav">
      <Link to="/" className="homepage">
        Home
      </Link>

      <ul>
        <li>
          <Link to="/Search">Find Item</Link>
        </li>
        <li>
          <Link to="/Test">Test</Link>
        </li>

        <li className="register-button-container">
          <Button
            className="register-button"
            variant="contained"
            sx={{
              backgroundColor: "#5e43f3",
              "&:hover": {
                backgroundColor: "#4e3ac0", 
              },
            }}
          >
            Register
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
